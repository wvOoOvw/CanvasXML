import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { distance, move } from './utils'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      imageIndex: 'imagePngかに',

      movePoint: optionOverlay.movePoint,
      moveSpeed: optionOverlay.moveSpeed,

      attributeHitPointOrigin: 100,
      attributeHitPoint: 100,

      privateOver: false,
      privateCollisions: false,
    }, optionOverlay
  )

  option.x = option.movePoint[0].x
  option.y = option.movePoint[0].y

  const ifCollisions = () => {
    return option.privateCollisions
  }

  const ifHit = () => {
    return option.attributeHitPoint > 0 && option.privateOver === false
  }

  const onHit = (value) => {
    option.attributeHitPoint = option.attributeHitPoint - value
    if (option.attributeHitPoint < 0) option.attributeHitPoint = 0
  }

  return { type: 'HitBaseA', option: option, ifCollisions, ifHit, onHit }
}

function Meth(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const animationCountAppear = props.animationCountAppear

  const size = contextApp.unitpx * 0.16

  return <layout cx={option.x} cy={option.y} w={size * 2} h={size * 2} globalAlpha={animationCountAppear} onLocationMounted={() => option.privateCollisions = []}>
    <circle clip cx='50%' cy='50%' w={size * 2} h={size * 2} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={size}>
      <image src={contextApp[option.imageIndex]} size='auto-min' position='center' />
    </circle>
    <circle cx='50%' cy='50%' sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={size} onLocationMounted={dom => option.privateCollisions.push({ tag: dom.element.tag, cx: dom.props.cx, cy: dom.props.cy, radius: dom.props.radius })}/>
  </layout>
}

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const onDestory = props.onDestory

  const ifDestination = () => option.movePoint.every(i => i.pass === true && i.time <= 0)

  const [inSuccess, setInSuccess] = React.useState(false)
  const [inFail, setInFail] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAppearSuccess } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay && inSuccess, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAppearFail } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay && inFail, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => { if (option.attributeHitPoint === 0) setInSuccess(true) }, [option.attributeHitPoint])
  React.useEffect(() => { if (ifDestination() === true) setInFail(true) }, [ifDestination()])
  React.useEffect(() => { if (inSuccess === true && animationCountAppearSuccess === 1) onDestory() }, [inSuccess, animationCountAppearSuccess])
  React.useEffect(() => { if (inFail === true && animationCountAppearFail === 1) onDestory() }, [inFail, animationCountAppearFail])

  React.useEffect(() => {
    if (contextPlayground.gamePlay && ifDestination() === false && inSuccess === false && inFail === false) {
      var count = option.moveSpeed * contextPlayground.gameTimeRate

      while (count > 0 && ifDestination() === false) {
        const start = { x: option.x, y: option.y }
        const destination = option.movePoint.find(i => i.pass === false || i.time > 0)

        if (start.x !== destination.x || start.y !== destination.y) {
          const moved = move(start, destination, count)

          if (start.x > destination.x) moved.x = Math.max(moved.x, destination.x)
          if (start.x < destination.x) moved.x = Math.min(moved.x, destination.x)
          if (start.y > destination.y) moved.y = Math.max(moved.y, destination.y)
          if (start.y < destination.y) moved.y = Math.min(moved.y, destination.y)

          count = count - distance(moved, start)

          option.x = moved.x
          option.y = moved.y
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
        inSuccess === false && inFail === false ? <Meth option={option} animationCountAppear={animationCountAppear} /> : null
      }
    </layout>
  </>
}

export { init, App }