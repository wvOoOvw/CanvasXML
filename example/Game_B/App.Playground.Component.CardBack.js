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

  const transform = translateX || translateY || rotateAngle ? 
    [
      { translate: { x: translateX, y: translateY } },
      { rotate: { angle: rotateAngle } },
      { translate: { x: 0 - translateX, y: 0 - translateY } },
    ]
    : []

  return <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, translateX, translateY, rotateAngle, imageIndex]}>
    <layout x={x} y={y} w={w} h={h} transform={transform}>
      <rectradiusarc fill fillStyle='rgb(255, 255, 255)' radius={Math.min(w, h) * 0.064} />
      <rectradiusarc cx='50%' cy='50%' w={w - Math.min(w, h) * 0.04} h={h - Math.min(w, h) * 0.04} fill fillStyle='rgb(75, 75, 75)' radius={Math.min(w, h) * 0.064} />
      <rectradiusarc cx='50%' cy='50%' w={w - Math.min(w, h) * 0.04} h={h - Math.min(w, h) * 0.04} clip radius={Math.min(w, h) * 0.064}>
        <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp[imageIndex]} />
      </rectradiusarc>
    </layout>
  </ReactCanvas2dExtensions.CanvasOffscreen>
}

export default App