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
    var x = props.x
    var y = props.y + i.h + index * i.h

    if (props.gap) y = y + index * (props.gap || 0)

    if (props.align && props.align === 'left') x = x
    if (props.align && props.align === 'center') x = x + (props.w - i.w) / 2
    if (props.align && props.align === 'right') x = x + (props.w - i.w)

    if (Boolean(props.fillText) === true) ReactDom.context().fillText(i.text, x, y)
    if (Boolean(props.strokeText) === true) ReactDom.context().strokeText(i.text, x, y)
  })

  if (props.onLoad) props.onLoad(lines)
}

App.caculateTextLine = caculateTextLine

export default App