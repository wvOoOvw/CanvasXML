import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Template(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y
  const translateX = props.translateX
  const translateY = props.translateY
  const rotateAngle = props.rotateAngle

  const imageGlobalAlpha = props.imageGlobalAlpha

  const onPointerDown = props.onPointerDown
  const onPointerUp = props.onPointerUp

  const min = Math.min(w, h)

  const transform = [
    {
      translate: { x: translateX, y: translateY }
    },
    {
      rotate: { angle: rotateAngle }
    },
    {
      translate: { x: 0 - translateX, y: 0 - translateY }
    },
  ]

  return <layout x={x} y={y} w={w} h={h} transform={transform}>
    <rectradius fill fillStyle='rgb(255, 255, 255)' radius={min * 0.048} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' w='50%' h='50%' src={contextApp.imagePngVileFluidWhite} globalAlpha={imageGlobalAlpha} />
    </rectradius>
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [pointerDown, setPointerDown] = React.useState(false)

  const { animationCount: animationCountPointerDown } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: pointerDown ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.24
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w - contextApp.unitpx * 0.08 + contextApp.unitpx * 0.12
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 + contextApp.unitpx * 0.2

  const rotateAngle = 0 - Math.PI * 0.64
  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2

  const onPointerDown = e => {
    e.stopPropagation()

    setPointerDown(true)

    if (contextPlayground.gameSelfCardLibrary.length === 0) {
      return contextApp.addMessage('牌库抽空')
    }

    if (contextPlayground.gameSelfCardReady.length === 12) {
      return contextApp.addMessage('手牌到达上限')
    }

    if (contextPlayground.gameSelfCardReady.length < 12) {
      contextPlayground.setGameSelfCardReady(i => [...i, contextPlayground.gameSelfCardLibrary[0]])
      contextPlayground.setGameSelfCardLibrary(i => i.filter(n => n !== contextPlayground.gameSelfCardLibrary[0]))
    }
  }

  const onPointerUp = e => {
    setPointerDown(false)
  }

  return <layout zIndex={contextPlayground.zIndex.SelfCardLibrary}>
    <Template
      x={x}
      y={y}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={rotateAngle}
      imageGlobalAlpha={1 - animationCountPointerDown * 0.75}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}

    />
  </layout>
}

export default App