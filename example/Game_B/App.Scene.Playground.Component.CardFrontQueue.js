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

  const globalAlpha = props.globalAlpha

  return <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, globalAlpha, card]}>
    <layout x={x} y={y} w={w} h={h} globalAlpha={globalAlpha}>
      <arc cx='50%' cy='50%' clip radius={w / 4 + h / 4}>
        <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
      </arc>
    </layout>
  </ReactCanvas2dExtensions.CanvasOffscreen>
}

export default App