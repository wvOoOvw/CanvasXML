import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { distance, move } from './utils'

const init = (optionOverlay, time) => {
  const option = Object.assign(
    {
      geometryMode: optionOverlay.geometryMode,
      radius: optionOverlay.radius,
      x: optionOverlay.x,
      y: optionOverlay.y,
      path: optionOverlay.path,
      speed: optionOverlay.speed,

      status: [],
      inSuccess: false,
      inFail: false,
      count: 1,
    }, optionOverlay
  )

  const ifCollisions = () => {
    return [{ x: option.x, y: option.y, radius: option.radius, geometryMode: option.geometryMode }]
  }

  const ifHit = () => {
    return option.count > 0
  }

  const ifSuccess = () => {
    return option.inSuccess
  }

  const ifFail = () => {
    return option.inFail
  }

  const onHit = () => {
    option.count = option.count - 1
  }

  const onMove = (x, y) => {
    option.x = x
    option.y = y
  }

  const onStatus = (status) => {
    option.status.push(status)
  }

  return { key: Math.random(), component: App, option: option, time: time, ifCollisions, ifHit, ifSuccess, ifFail, onHit, onMove, onStatus }
}

const Mesh = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const globalAlpha = React.useMemo(() => props.animationCountTransition, [props.animationCountTransition])

  return <layout
    cx={props.option.x}
    cy={props.option.y}
    w={props.option.radius * 2}
    h={props.option.radius * 2}
    globalAlpha={globalAlpha}
  >
    <circle
      fill
      clip
      cx={'50%'}
      cy={'50%'}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={props.option.radius}
      fillStyle={'white'}
    />
  </layout>
}

const App = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const ifDestination = () => props.option.path.some(i => i.destination === true && i.pass === true && i.time <= 0)
  const ifPass = () => props.option.path.every(i => i.pass === true && i.time <= 0)
  const ifEnd = () => props.option.inSuccess || props.option.inFail
  const ifPlay = () => contextPlayground.gamePlay === true

  const { animationCount: animationCountTransition } = React.useAnimationDestination({ play: ifPlay() === true, defaultCount: 0, destination: ifDestination() === false && ifEnd() === false ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => { if (props.option.count === 0) { props.option.inSuccess = true; props.onUpdate(); } }, [props.option.count])
  React.useEffect(() => { if (ifDestination() === true) { props.option.inFail = true; props.onUpdate(); } }, [ifDestination()])
  React.useEffect(() => { if (animationCountTransition === 0 && (ifDestination() === true || ifEnd() === true)) { props.onDestory(); props.onUpdate(); } }, [animationCountTransition])

  React.useEffect(() => {
    if (ifPlay() === true) {
      var count = props.option.speed * contextPlayground.gameTimeRate

      while (count > 0 && ifPass() === false) {
        const start = { x: props.option.x, y: props.option.y }
        const destination = props.option.path.find(i => i.pass === false || i.time > 0)

        if (start.x !== destination.x || start.y !== destination.y) {
          const moved = move(start, destination, count)

          if (start.x > destination.x) moved.x = Math.max(moved.x, destination.x)
          if (start.x < destination.x) moved.x = Math.min(moved.x, destination.x)
          if (start.y > destination.y) moved.y = Math.max(moved.y, destination.y)
          if (start.y < destination.y) moved.y = Math.min(moved.y, destination.y)

          count = count - distance(moved, start)

          props.onMove(moved.x, moved.y)
        }

        if (start.x === destination.x && start.y === destination.y) {
          const min = Math.min(destination.time, count)
          destination.pass = true
          destination.time = destination.time - min
          count = count - min
        }

        if (count && Math.abs(count) < 0.001) count = 0
      }
    }
  })

  return <>
    <Mesh animationCountTransition={animationCountTransition} {...props} />
  </>
}

export { init, App }