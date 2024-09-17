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

  const onPointerDown = props.onPointerDown
  const onPointerDownAway = props.onPointerDownAway
  const onPointerMove = props.onPointerMove
  const onPointerMoveAway = props.onPointerMoveAway
  const onPointerUp = props.onPointerUp
  const onPointerUpAway = props.onPointerUpAway

  return <layout x={x} y={y} w={w} h={h}>

    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card]}>
      <layout globalAlpha={animationCountAppear}>
        <rectradiusarc fill radius={Math.min(w, h) * 0.064} shadowBlur={Math.min(w, h) * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
        <rectradiusarc cx='50%' cy='50%' clip radius={Math.min(w, h) * 0.16}>
          <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

    <rectradiusarc radius={Math.min(w, h) * 0.064} onPointerDown={onPointerDown} onPointerDownAway={onPointerDownAway} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />

  </layout>
}

export default App