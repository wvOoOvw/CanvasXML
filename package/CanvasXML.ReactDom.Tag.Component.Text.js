import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const caculateTextLine = (w, text) => {
  var caculateText = ''
  var caculateLine = []

  text.split('').forEach(i => {
    const tw = ReactDom.context().measureText(caculateText + i).width

    if (tw > w) caculateLine.push({ text: caculateText, w: tw, h: Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', '')) })
    if (tw > w) caculateText = ''

    caculateText = caculateText + i
  })

  if (caculateText) caculateLine.push({ text: caculateText, w: ReactDom.context().measureText(caculateText).width, h: Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', '')) })

  return caculateLine
}

const App = (props) => {
  const lines = caculateTextLine(props.w, props.text)

  lines.forEach((i, index) => {
    if (Boolean(props.fillText) === true) ReactDom.context().fillText(i.text, props.x, props.y + i.h + index * i.h + index * (props.gap || 0))
    if (Boolean(props.strokeText) === true) ReactDom.context().strokeText(i.text, props.x, props.y + i.h + index * i.h + index * (props.gap || 0))
  })
}

App.caculateTextLine = caculateTextLine

export default App