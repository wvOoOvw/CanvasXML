import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const drawArc = (context, position, radius, sAngle, eAngle, counterclockwise) => {
  var { x, y, w, h } = position

  context.beginPath()
  context.arc(x, y, radius, sAngle, eAngle, counterclockwise)
}

const App = (props) => {
  ReactDomTag.preprocessing(props)

  drawArc(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.radius, props.sAngle, props.eAngle, props.counterclockwise)

  ReactDomTag.postprocessing(props)

  return props.children
}

export default App