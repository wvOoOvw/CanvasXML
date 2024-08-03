import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { distance, move } from './utils'

const init = (optionOverlay, time) => {
  const option = Object.assign(
    {
      geometryMode: optionOverlay.geometryMode,
      radius: optionOverlay.radius,
      path: optionOverlay.path,
      speed: optionOverlay.speed,

      status: [],
      inSuccess: false,
      inFail: false,
      count: 1,
    }, optionOverlay
  )

  option.x = option.path[0].x
  option.y = option.path[0].y

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

function Mesh(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    <circle
      fill
      clip
      cx={props.option.x}
      cy={props.option.y}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={props.option.radius}
      fillStyle={'white'}
      globalAlpha={props.animationCountAppear}
    />
  </>
}

function MeshSuccess(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    <circle
      fill
      clip
      cx={props.option.x}
      cy={props.option.y}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={props.option.radius}
      fillStyle={'white'}
      globalAlpha={props.animationCountAppear}
    />
  </>
}

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const ifPlay = () => contextPlayground.gamePlay === true
  const ifSuccess = () => props.option.inSuccess
  const ifFail = () => props.option.inFail
  const ifDestination = () => props.option.path.every(i => i.pass === true && i.time <= 0)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: ifPlay() === true, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAppearSuccess } = React.useAnimationDestination({ play: ifPlay() === true && ifSuccess() === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAppearFail } = React.useAnimationDestination({ play: ifPlay() === true && ifFail() === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => { if (props.option.count === 0) { props.option.inSuccess = true; props.onUpdate(); } }, [props.option.count])
  React.useEffect(() => { if (ifDestination() === true) { props.option.inFail = true; props.onUpdate(); } }, [ifDestination()])
  React.useEffect(() => { if (ifSuccess() === true && animationCountAppearSuccess === 1) { props.onDestory(); props.onUpdate(); } }, [ifSuccess(), animationCountAppearSuccess])
  React.useEffect(() => { if (ifFail() === true && animationCountAppearFail === 1) { props.onDestory(); props.onUpdate(); } }, [ifSuccess(), animationCountAppearFail])

  React.useEffect(() => {
    if (ifPlay() === true && ifDestination() === false && ifSuccess() === false && ifFail() === false) {
      var count = props.option.speed * contextPlayground.gameTimeRate

      while (count > 0 && ifDestination() === false) {
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

  return <layout zIndex={contextPlayground.zIndex.Hit}>
    {
      ifSuccess() === false && ifFail() === false ? <Mesh animationCountAppear={animationCountAppear} {...props} /> : null
    }
  </layout>
}

export { init, App }