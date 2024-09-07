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
    <rectradius fill fillStyle='rgb(255, 255, 255)' radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngCampfireWhite} />
    </rectradius>
  </layout>
}

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.16 * 1.42
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w + contextApp.unitpx * 0.028 * (2 - index)
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 - contextApp.unitpx * 0.2 - contextApp.unitpx * 0.028 * (2 - index)

  const rotateAngle = 0 - Math.PI * 0.35 + Math.PI * 0.12 * (2 - index)
  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2

  return <layout zIndex={contextPlayground.zIndex.OpponentCardLibrary}>
    <Template
      x={x}
      y={y}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={rotateAngle}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return new Array(3).fill().map((i, index) => <Card index={index} />)
}

export default App