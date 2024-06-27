import React from './CanvasXML.React'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

import ReactCanvas2dTag from './CanvasXML.ReactCanvas2d.Tag'

const caculateLine = (text, font, w, split = '') => {
  ReactCanvas2d.context().save()

  ReactCanvas2d.context().font = font

  const px = Number(ReactCanvas2d.context().font.match(/\d+px/)[0].replace('px', ''))

  var caculateText = ''
  var caculateTextLine = []

  text = text.split(split).map((i, index) => index ? [split, i] : [i]).flat()

  text.forEach((i, index) => {
    const tw = ReactCanvas2d.context().measureText(caculateText + i).width
    if (tw > w && caculateText !== '') caculateTextLine.push(caculateText)
    if (tw > w && caculateText !== '') caculateText = i
    if (tw > w && caculateText === '') caculateTextLine.push(i)
    if (tw < w) caculateText = caculateText + i
  })

  if (caculateText) caculateTextLine.push(caculateText)

  caculateTextLine = caculateTextLine.map(i => {
    return {
      text: i.trim(),
      w: ReactCanvas2d.context().measureText(i.trim()).width,
      h: px,
      font: ReactCanvas2d.context().font,
    }
  })

  ReactCanvas2d.context().restore()

  return caculateTextLine
}

const caculateLineLocation = (line, lineHeight, gap) => {
  const w = Math.max(...line.map(i => i.w))
  const h = line.reduce((t, n, index) => t + n.h * lineHeight + (index ? gap : 0), 0)

  return { w, h }
}

const App = {
  locationMount: (dom) => {
    ReactCanvas2dTag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    ReactCanvas2dTag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    ReactCanvas2dTag.renderMount_0(dom)

    const lineHeight = dom.props.lineHeight || 1
    const gap = dom.props.gap || 0

    if (Boolean(dom.props.wrap) === true) {
      const px = Number(ReactCanvas2d.context().font.match(/\d+px/)[0].replace('px', ''))

      const line = dom.props.line ? dom.props.line : caculateLine(dom.props.text, dom.props.font, dom.props.w, dom.props.split)

      line.forEach((i, index) => {
        var x = dom.props.x
        var y = dom.props.y
        var h = px * lineHeight

        y = y - px * 0.18 - (h - px) * 0.5
        y = y + (index + 1) * h + index * gap

        if (dom.props.align === 'left') x = x
        if (dom.props.align === 'center') x = x + (dom.props.w - i.w) / 2
        if (dom.props.align === 'right') x = x + (dom.props.w - i.w)

        if (Boolean(dom.props.fillText) === true) ReactCanvas2d.context().fillText(i.text, x, y)
        if (Boolean(dom.props.strokeText) === true) ReactCanvas2d.context().strokeText(i.text, x, y)
      })
    }

    if (Boolean(dom.props.wrap) !== true) {
      const px = Number(ReactCanvas2d.context().font.match(/\d+px/)[0].replace('px', ''))

      var w = ReactCanvas2d.context().measureText(dom.props.text).width
      var h = px * lineHeight

      var x = dom.props.x
      var y = dom.props.y

      y = y - px * 0.18 - (h - px) * 0.5
      y = y + h

      if (dom.props.align === 'left') x = x
      if (dom.props.align === 'center') x = x + (dom.props.w - w) / 2
      if (dom.props.align === 'right') x = x + (dom.props.w - w)

      if (Boolean(dom.props.fillText) === true) ReactCanvas2d.context().fillText(dom.props.text, x, y)
      if (Boolean(dom.props.strokeText) === true) ReactCanvas2d.context().strokeText(dom.props.text, x, y)
    }

    ReactCanvas2dTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactCanvas2dTag.renderUnmount(dom)
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