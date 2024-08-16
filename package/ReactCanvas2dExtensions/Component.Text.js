import React from '../React'

import Canvas2d from '../Canvas2d'

const App = (props) => {
  const text = props.text
  const font = props.font
  const w = props.w
  const wrap = props.wrap
  const ellipsis = props.ellipsis || ''
  const split = props.split || ''
  const lineHeight = props.lineHeight || 1
  const gap = props.gap || 0

  const line = React.useMemo(() => {
    const px = Number(font.match(/[\d\.]+px/)[0].replace('px', ''))
  
    Canvas2d.context().save()
    Canvas2d.context().font = font
  
    var caculateText = ''
    var caculateTextLine = []
  
    var texts = text.split(split).map((i, index) => index ? [split, i] : [i]).flat()
  
    if (Boolean(wrap) === true) {
      texts.forEach((i) => {
        const tw = Canvas2d.context().measureText(caculateText + i).width
        if (tw > w && caculateText !== '') caculateTextLine.push(caculateText)
        if (tw > w && caculateText !== '') caculateText = i
        if (tw > w && caculateText === '') caculateTextLine.push(i)
        if (tw < w) caculateText = caculateText + i
      })
    }
  
    if (Boolean(wrap) !== true) {
      texts.some((i) => {
        const tw = Canvas2d.context().measureText(caculateText + i + ellipsis).width
        if (tw > w) caculateTextLine.push(caculateText + ellipsis)
        if (tw > w) caculateText = ''
        if (tw < w) caculateText = caculateText + i
        return caculateTextLine.length > 0
      })
    }
  
    if (caculateText) caculateTextLine.push(caculateText)
  
    caculateTextLine = caculateTextLine.map(i => {
      return {
        text: i.trim(),
        w: Canvas2d.context().measureText(i.trim()).width,
        h: px,
        font: font,
      }
    })
  
    Canvas2d.context().restore()
  
    return caculateTextLine
  }, [text, font, w, wrap, ellipsis, split])

  const location = React.useMemo(() => {
    const w = Math.max(...line.map(i => i.w))
    const h = line.reduce((t, i, index) => t + i.h * lineHeight + (index ? gap : 0), 0)
    
    line.forEach((i, index) => i.y = index * (i.h * (lineHeight - 1) / 2 + gap))

    return { w: w, h: h }
  }, [line, lineHeight, gap])

  return props.children.map(i => i(line, location))
}

export default App