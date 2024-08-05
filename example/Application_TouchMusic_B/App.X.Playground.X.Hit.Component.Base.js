import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { distance, move } from './utils'

const init = (optionOverlay, time) => {
  const option = Object.assign(
    {
      path: optionOverlay.path,
      speed: optionOverlay.speed,

      status: [],
      collisions: [],
      inSuccess: false,
      inFail: false,
      count: 1,
    }, optionOverlay
  )

  option.x = option.path[0].x
  option.y = option.path[0].y

  const ifCollisions = () => {
    return option.collisions
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

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const onUpdate = props.onUpdate
  const onDestory = props.onDestory
  const onMove = props.onMove

  const ifPlay = () => contextPlayground.gamePlay === true
  const ifSuccess = () => option.inSuccess
  const ifFail = () => option.inFail
  const ifDestination = () => option.path.every(i => i.pass === true && i.time <= 0)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: ifPlay() === true, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAppearSuccess } = React.useAnimationDestination({ play: ifPlay() === true && ifSuccess() === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAppearFail } = React.useAnimationDestination({ play: ifPlay() === true && ifFail() === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => { if (option.count === 0) { option.inSuccess = true; onUpdate(); } }, [option.count])
  React.useEffect(() => { if (ifDestination() === true) { option.inFail = true; onUpdate(); } }, [ifDestination()])
  React.useEffect(() => { if (ifSuccess() === true && animationCountAppearSuccess === 1) { onDestory(); onUpdate(); } }, [ifSuccess(), animationCountAppearSuccess])
  React.useEffect(() => { if (ifFail() === true && animationCountAppearFail === 1) { onDestory(); onUpdate(); } }, [ifSuccess(), animationCountAppearFail])

  React.useEffect(() => {
    if (ifPlay() === true && ifDestination() === false && ifSuccess() === false && ifFail() === false) {
      var count = option.speed * contextPlayground.gameTimeRate

      while (count > 0 && ifDestination() === false) {
        const start = { x: option.x, y: option.y }
        const destination = option.path.find(i => i.pass === false || i.time > 0)

        if (start.x !== destination.x || start.y !== destination.y) {
          const moved = move(start, destination, count)

          if (start.x > destination.x) moved.x = Math.max(moved.x, destination.x)
          if (start.x < destination.x) moved.x = Math.min(moved.x, destination.x)
          if (start.y > destination.y) moved.y = Math.max(moved.y, destination.y)
          if (start.y < destination.y) moved.y = Math.min(moved.y, destination.y)

          count = count - distance(moved, start)

          onMove(moved.x, moved.y)
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
    <layout zIndex={contextPlayground.zIndex.HitMeth}>
      {
        ifSuccess() === false && ifFail() === false ?
          <circle
            fill
            clip
            cx={option.x}
            cy={option.y}
            w={contextApp.unitpx * 0.32}
            h={contextApp.unitpx * 0.32}
            sAngle={0}
            eAngle={Math.PI * 2}
            counterclockwise={false}
            radius={contextApp.unitpx * 0.16}
            fillStyle={'white'}
            globalAlpha={animationCountAppear}
            onLocationMounted={dom => option.collisions[0] = { x: dom.props.x, y: dom.props.y, cx: dom.props.cx, cy: dom.props.cy, w: dom.props.w, h: dom.props.h }}
          />
          : null
      }
    </layout>
  </>
}

export { init, App }