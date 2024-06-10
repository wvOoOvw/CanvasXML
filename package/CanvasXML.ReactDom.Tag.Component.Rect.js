import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const drawRect = (context, position) => {
  var { x, y, w, h } = position

  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x + w, y)
  context.lineTo(x + w, y + h)
  context.lineTo(x, y + h)
  context.closePath()
}

const drawRectRadius = (context, position, radius) => {
  var { x, y, w, h } = position

  const radiusFill = Array.isArray(radius) ? radius : new Array(4).fill(radius)

  context.beginPath()
  context.moveTo(x, y + radiusFill[0])
  context.arcTo(x, y, x + radiusFill[0], y, radiusFill[0])
  context.lineTo(x + w - radiusFill[1], y)
  context.arcTo(x + w, y, x + w, y + radiusFill[1], radiusFill[1])
  context.lineTo(x + w, y + h - radiusFill[2])
  context.arcTo(x + w, y + h, x + w - radiusFill[2], y + h, radiusFill[2])
  context.lineTo(x + radiusFill[3], y + h)
  context.arcTo(x, y + h, x, y + h - radiusFill[3], radiusFill[3])
  context.closePath()
}

const App = (props) => {
  ReactDomTag.componentRunBefore(props)

  if (Boolean(props.radius) === true) drawRectRadius(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.radius)
  if (Boolean(props.radius) !== true) drawRect(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h })

  ReactDomTag.componentRunAfter(props)

  return props.children
}

export default App