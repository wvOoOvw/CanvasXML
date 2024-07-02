import Canvas2d from './CanvasXML.Canvas2d'

const caculateLine = (text, font, w, split = '') => {
  Canvas2d.context().save()

  Canvas2d.context().font = font

  const px = Number(Canvas2d.context().font.match(/\d+px/)[0].replace('px', ''))

  var caculateText = ''
  var caculateTextLine = []

  text = text.split(split).map((i, index) => index ? [split, i] : [i]).flat()

  text.forEach((i, index) => {
    const tw = Canvas2d.context().measureText(caculateText + i).width
    if (tw > w && caculateText !== '') caculateTextLine.push(caculateText)
    if (tw > w && caculateText !== '') caculateText = i
    if (tw > w && caculateText === '') caculateTextLine.push(i)
    if (tw < w) caculateText = caculateText + i
  })

  if (caculateText) caculateTextLine.push(caculateText)

  caculateTextLine = caculateTextLine.map(i => {
    return {
      text: i.trim(),
      w: Canvas2d.context().measureText(i.trim()).width,
      h: px,
      font: Canvas2d.context().font,
    }
  })

  Canvas2d.context().restore()

  return caculateTextLine
}

const caculateLineLocation = (line, lineHeight, gap) => {
  const w = Math.max(...line.map(i => i.w))
  const h = line.reduce((t, n, index) => t + n.h * lineHeight + (index ? gap : 0), 0)

  return { w, h }
}

const App = {
  locationMount: (dom) => {
    Canvas2d.Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    Canvas2d.Tag.renderMount_0(dom)

    const lineHeight = dom.props.lineHeight || 1
    const gap = dom.props.gap || 0

    if (Boolean(dom.props.wrap) === true) {
      const px = Number(Canvas2d.context().font.match(/\d+px/)[0].replace('px', ''))

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

        if (Boolean(dom.props.fillText) === true) Canvas2d.context().fillText(i.text, x, y)
        if (Boolean(dom.props.strokeText) === true) Canvas2d.context().strokeText(i.text, x, y)
      })
    }

    if (Boolean(dom.props.wrap) !== true) {
      const px = Number(Canvas2d.context().font.match(/\d+px/)[0].replace('px', ''))

      var w = Canvas2d.context().measureText(dom.props.text).width
      var h = px * lineHeight

      var x = dom.props.x
      var y = dom.props.y

      y = y - px * 0.18 - (h - px) * 0.5
      y = y + h

      if (dom.props.align === 'left') x = x
      if (dom.props.align === 'center') x = x + (dom.props.w - w) / 2
      if (dom.props.align === 'right') x = x + (dom.props.w - w)

      if (Boolean(dom.props.fillText) === true) Canvas2d.context().fillText(dom.props.text, x, y)
      if (Boolean(dom.props.strokeText) === true) Canvas2d.context().strokeText(dom.props.text, x, y)
    }

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
  },
}

App.caculateLine = caculateLine
App.caculateLineLocation = caculateLineLocation

export default App