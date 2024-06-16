import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const caculateLine = (w, text, font, split) => {
  ReactDom.context().save()

  ReactDom.context().font = font

  var caculateText = ''
  var caculateLine = []

  text
    .split(split)
    .map((i, index) => index ? [split, i] : [i])
    .flat()
    .forEach(i => {
      const tw = ReactDom.context().measureText(caculateText + i).width
      if (tw > w) caculateLine.push({ text: caculateText, w: tw, h: Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', '')), font: ReactDom.context().font })
      if (tw > w) caculateText = ''
      caculateText = caculateText + i
    })

  caculateLine = caculateLine.map(i => {
    return {
      ...i,
      text: i.text.trim(),
      w: ReactDom.context().measureText(i.text.trim()).width
    }
  })

  if (caculateText) caculateLine.push({ text: caculateText.trim(), w: ReactDom.context().measureText(caculateText).width, h: Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', '')), font: ReactDom.context().font })

  ReactDom.context().restore()

  return caculateLine
}

const App = {
  renderMount: (props, dom) => {
    ReactDomTag.renderMount_0(props, dom)

    if (Boolean(props.wrap) === true) {
      const lines = caculateLine(props.w, props.text, props.font, props.split)
  
      lines.forEach((i, index) => {
        var x = props.x
        var y = props.y
  
        if (props.lineHeight !== undefined) y = y + (index + 1) * i.h * props.lineHeight
        if (props.lineHeight === undefined) y = y + (index + 1) * i.h
  
        if (props.align === 'left') x = x
        if (props.align === 'center') x = x + (props.w - i.w) / 2
        if (props.align === 'right') x = x + (props.w - i.w)
  
        if (Boolean(props.fillText) === true) ReactDom.context().fillText(i.text, x, y)
        if (Boolean(props.strokeText) === true) ReactDom.context().strokeText(i.text, x, y)
      })
    }
  
    if (Boolean(props.wrap) !== true) {
      const tw = ReactDom.context().measureText(props.text).width
      const th = Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', ''))
  
      var x = props.x
      var y = props.y + th * props.lineHeight
  
      if (props.align === 'left') x = x
      if (props.align === 'center') x = x + (props.w - tw) / 2
      if (props.align === 'right') x = x + (props.w - tw)
  
      if (Boolean(props.fillText) === true) ReactDom.context().fillText(props.text, x, y)
      if (Boolean(props.strokeText) === true) ReactDom.context().strokeText(props.text, x, y)
    }

    ReactDomTag.renderMount_1(props, dom)
  },

  renderUnmount: (props, dom) => {
    ReactDomTag.renderUnmount(props, dom)
  },
}

const Line = (props) => {
  const lines = caculateLine(props.w, props.text, props.font, props.split)

  return props.children.map(i => i(lines))
}

App.caculateLine = caculateLine

App.Line = Line

export default App