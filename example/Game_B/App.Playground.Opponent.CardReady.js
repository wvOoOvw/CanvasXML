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
    <rectradius fill fillStyle='rgb(255, 255, 255)' radius={min * 0.048} shadowBlur={min * 0.04} shadowColor='rgb(255, 255, 255)' />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' w='50%' h='50%' src={contextApp.imagePngCampfireWhite} />
    </rectradius>
  </layout>
}

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameOpponentCardReady.filter(i => i !== contextPlayground.gameOpponentCardControl).length

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.24
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w * 3.6 + ((lengthMax - lengthGameCard + 1) * w * 0.048 + w * 0.12) * (index - (lengthGameCard - 1) / 2)
  const y = 0 - h * 0.36

  const rotateAngle = Math.PI
  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2

  const shouldRender = React.useShouldRender()

  const rotateAngleUnitCache = React.useRef([undefined, undefined])

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountRotateAngle } = ReactExtensions.useAnimationDestination({ play: Boolean(rotateAngleUnitCache.current[0] !== undefined && rotateAngleUnitCache.current[1] !== undefined), defaultCount: rotateAngle, destination: rotateAngle, rate: Math.abs(rotateAngleUnitCache.current[1] - rotateAngleUnitCache.current[0]) / 10, postprocess: n => Number(n.toFixed(4)) })

  React.useEffectImmediate(() => {
    rotateAngleUnitCache.current = [animationCountRotateAngle, rotateAngle]
    shouldRender()
  }, [rotateAngle])

  return <layout zIndex={contextPlayground.zIndex.OpponentCardReady}>
    <Template
      x={x}
      y={y + (animationCountAppear - 1) * h * 0.12}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={animationCountRotateAngle}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return contextPlayground.gameOpponentCardReady.map((i, index) => <Card key={i.key} card={i} index={index} />)
}

export default App