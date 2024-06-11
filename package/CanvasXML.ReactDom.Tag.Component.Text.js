import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const drawText = (context, position, text) => {
  var { x, y, w, h } = position

  context.fillText(text, x, y)
}

const drawTextCaculateLine = (context, position, text) => {
  var { x, y, w, h } = position

  var caculateText = ''
  var caculateLine = []

  text.split('').forEach(i => {
    const tw = context.measureText(caculateText + i).width

    if (tw > w) caculateLine.push({ text: caculateText, w: tw, h: Number(context.font.match(/\d+px/)[0].replace('px', '')) })
    if (tw > w) caculateText = ''

    caculateText = caculateText + i
  })

  if (caculateText) caculateLine.push({ text: caculateText, w: context.measureText(caculateText).width, h: Number(context.font.match(/\d+px/)[0].replace('px', '')) })

  return caculateLine
}

const App = (props) => {
  ReactDomTag.componentRunBefore(props)

  drawArc(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.radius, props.sAngle, props.eAngle, props.counterclockwise)

  ReactDomTag.componentRunAfter(props)

  return props.children
}

export default App