import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const imageIndex = props.imageIndex

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
    <rectradius fill fillStyle='rgb(255, 255, 255)' radius={min * 0.048} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp[imageIndex]} />
    </rectradius>
  </layout>
}

export default App