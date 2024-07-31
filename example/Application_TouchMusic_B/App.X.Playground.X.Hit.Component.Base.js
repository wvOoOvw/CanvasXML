import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { distance, move } from './utils'

const init = (optionOverlay, time) => {
  const option = Object.assign(
    {
      geometryMode: '',

      status: [],

      inSuccess: false,
      inFail: false,

      x: 0,
      y: 0,

      radius: 0,

      path: [],

      speed: 0.01,

      count: 1,
    }, optionOverlay
  )

  const ifCollision = () => {
    return { x: option.x, y: option.y, radius: option.radius, geometryMode: option.geometryMode }
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

  return { key: Math.random(), component: App, option: option, time: time, ifCollision, ifHit, ifSuccess, ifFail, onHit, onMove }
}

const Mesh = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const globalAlpha = React.useMemo(() => props.animationCountAppear - props.animationCountDisappear, [props.animationCountAppear, props.animationCountDisappear])

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
  
  const ifDestination = () => {
    return props.option.path.some(i => i.destination === true && i.pass === true && i.time <= 0)
  }

  const ifPass = () => {
    return props.option.path.every(i => i.pass === true && i.time <= 0)
  }

  const ifEnd = () => {
    return props.option.inSuccess || props.option.inFail
  }

  const ifPlay = () => {
    return contextPlayground.gamePlay === true
  }

  const { animationCount: animationCountAppear } = React.useAnimationDestination(
    {
      play: ifPlay() === true && ifEnd() === false,
      defaultCount: 0,
      destination: 1,
      rate: 1 / 30 * contextPlayground.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  const { animationCount: animationCountDisappear } = React.useAnimationDestination(
    {
      play: ifPlay() === true && (ifDestination() === true || ifEnd() === true),
      defaultCount: 0,
      destination: 1,
      rate: 1 / 30 * contextPlayground.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  React.useEffect(() => {
    if (props.option.count === 0) {
      props.option.inSuccess = true
      props.onUpdate()
    }
  }, [props.option.count])

  React.useEffect(() => {
    if (ifDestination() === true) {
      props.option.inFail = true
      props.onUpdate()
    }
  }, [ifDestination()])

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      props.onDestory()
      props.onUpdate()
    }
  }, [animationCountDisappear])

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
    <Mesh animationCountAppear={animationCountAppear} animationCountDisappear={animationCountDisappear} {...props} />
  </>
}

export { init, App }