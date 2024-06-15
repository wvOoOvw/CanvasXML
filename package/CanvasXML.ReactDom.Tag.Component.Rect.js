import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = (props) => {
  var radius = new Array(4).fill(0)

  if (props.radius && typeof radius === 'object' && Array.isArray(radius)) radius = props.radius
  if (props.radius && typeof radius === 'number') radius = new Array(4).fill(props.radius)

  ReactDom.context().moveTo(props.x, props.y + radius[0])
  ReactDom.context().arcTo(props.x, props.y, props.x + radius[0], props.y, radius[0])
  ReactDom.context().lineTo(props.x + props.w - radius[1], props.y)
  ReactDom.context().arcTo(props.x + props.w, props.y, props.x + props.w, props.y + radius[1], radius[1])
  ReactDom.context().lineTo(props.x + props.w, props.y + props.h - radius[2])
  ReactDom.context().arcTo(props.x + props.w, props.y + props.h, props.x + props.w - radius[2], props.y + props.h, radius[2])
  ReactDom.context().lineTo(props.x + radius[3], props.y + props.h)
  ReactDom.context().arcTo(props.x, props.y + props.h, props.x, props.y + props.h - radius[3], radius[3])
}

export default App