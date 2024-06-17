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
  renderMount: (dom) => {
    ReactDomTag.renderMount_0(dom)

    if (Boolean(dom.props.wrap) === true) {
      const lines = caculateLine(dom.props.w, dom.props.text, dom.props.font, dom.props.split)
  
      lines.forEach((i, index) => {
        var x = dom.props.x
        var y = dom.props.y
  
        if (dom.props.lineHeight !== undefined) y = y + (index + 1) * i.h * dom.props.lineHeight
        if (dom.props.lineHeight === undefined) y = y + (index + 1) * i.h
  
        if (dom.props.align === 'left') x = x
        if (dom.props.align === 'center') x = x + (dom.props.w - i.w) / 2
        if (dom.props.align === 'right') x = x + (dom.props.w - i.w)
  
        if (Boolean(dom.props.fillText) === true) ReactDom.context().fillText(i.text, x, y)
        if (Boolean(dom.props.strokeText) === true) ReactDom.context().strokeText(i.text, x, y)
      })
    }
  
    if (Boolean(dom.props.wrap) !== true) {
      const tw = ReactDom.context().measureText(dom.props.text).width
      const th = Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', ''))
  
      var x = dom.props.x
      var y = dom.props.y + th * dom.props.lineHeight
  
      if (dom.props.align === 'left') x = x
      if (dom.props.align === 'center') x = x + (dom.props.w - tw) / 2
      if (dom.props.align === 'right') x = x + (dom.props.w - tw)
  
      if (Boolean(dom.props.fillText) === true) ReactDom.context().fillText(dom.props.text, x, y)
      if (Boolean(dom.props.strokeText) === true) ReactDom.context().strokeText(dom.props.text, x, y)
    }

    ReactDomTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactDomTag.renderUnmount(dom)
  },
}

const Line = (props) => {
  const lines = caculateLine(props.w, props.text, props.font, props.split)

  return props.children.map(i => i(lines))
}

App.caculateLine = caculateLine

App.Line = Line

export default App