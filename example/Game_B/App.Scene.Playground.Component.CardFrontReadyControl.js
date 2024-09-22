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

  const card = props.card

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y
  
  const animationCountAppear = props.animationCountAppear
  const animationCountUse = props.animationCountUse

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountUse, card]}>
      <layout x={x} y={y} w={w} h={h}>
        <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08 + animationCountUse * w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
        <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
          <image cx='50%' cy='50%' w={w * (1 + animationCountUse * 0.25)} h={h * (1 + animationCountUse * 0.25)} src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return Component
}

export default App