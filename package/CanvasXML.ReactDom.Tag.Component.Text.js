import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const caculateLine = (text, font, w, split = '') => {
  ReactDom.context().save()

  ReactDom.context().font = font

  const px = Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', ''))

  var caculateText = ''
  var caculateTextLine = []

  text = text.split(split).map((i, index) => index ? [split, i] : [i]).flat()

  text.forEach((i, index) => {
    const tw = ReactDom.context().measureText(caculateText + i).width
    if (tw > w && caculateText !== '') caculateTextLine.push(caculateText)
    if (tw > w && caculateText !== '') caculateText = i
    if (tw > w && caculateText === '') caculateTextLine.push(i)
    if (tw < w) caculateText = caculateText + i
  })

  if (caculateText) caculateTextLine.push(caculateText)

  caculateTextLine = caculateTextLine.map(i => {
    return {
      text: i.trim(),
      w: ReactDom.context().measureText(i.trim()).width,
      h: px,
      font: ReactDom.context().font,
    }
  })

  ReactDom.context().restore()

  return caculateTextLine
}

const caculateLineLocation = (line, lineHeight, gap) => {
  const w = Math.max(...line.map(i => i.w))
  const h = line.reduce((t, n, index) => t + n.h * lineHeight + (index ? gap : 0), 0)

  return { w, h }
}

const App = {
  locationMount: (dom) => {
    ReactDomTag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    ReactDomTag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    ReactDomTag.renderMount_0(dom)

    const lineHeight = dom.props.lineHeight || 1
    const gap = dom.props.gap || 0

    if (Boolean(dom.props.wrap) === true) {
      const px = Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', ''))

      const lines = caculateLine(dom.props.text, dom.props.font, dom.props.w, dom.props.split)

      lines.forEach((i, index) => {
        var x = dom.props.x
        var y = dom.props.y
        var h = px * lineHeight

        y = y - px * 0.18 - (h - px) * 0.5
        y = y + (index + 1) * h + index * gap

        if (dom.props.align === 'left') x = x
        if (dom.props.align === 'center') x = x + (dom.props.w - i.w) / 2
        if (dom.props.align === 'right') x = x + (dom.props.w - i.w)

        if (Boolean(dom.props.fillText) === true) ReactDom.context().fillText(i.text, x, y)
        if (Boolean(dom.props.strokeText) === true) ReactDom.context().strokeText(i.text, x, y)
      })
    }

    if (Boolean(dom.props.wrap) !== true) {
      const px = Number(ReactDom.context().font.match(/\d+px/)[0].replace('px', ''))

      var w = ReactDom.context().measureText(dom.props.text).width
      var h = px * lineHeight

      var x = dom.props.x
      var y = dom.props.y

      y = y - px * 0.18 - (h - px) * 0.5
      y = y + h

      if (dom.props.align === 'left') x = x
      if (dom.props.align === 'center') x = x + (dom.props.w - w) / 2
      if (dom.props.align === 'right') x = x + (dom.props.w - w)

      if (Boolean(dom.props.fillText) === true) ReactDom.context().fillText(dom.props.text, x, y)
      if (Boolean(dom.props.strokeText) === true) ReactDom.context().strokeText(dom.props.text, x, y)
    }

    ReactDomTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactDomTag.renderUnmount(dom)
  },
}

const CaculateLine = (props) => {
  var w
  var h

  const line = React.useMemo(() => {
    return caculateLine(props.text, props.font, props.w, props.split).map(i => Object({ ...props, ...i }))
  }, [props.w, props.text, props.font, props.split])

  if (props.lineHeight !== undefined && props.gap !== undefined) {
    const location = caculateLineLocation(line, props.lineHeight, props.gap)
    w = location.w
    h = location.h
  }

  return props.children.map(i => i(line, { w: w, h: h }))
}

App.caculateLine = caculateLine
App.caculateLineLocation = caculateLineLocation

App.CaculateLine = CaculateLine

export default App