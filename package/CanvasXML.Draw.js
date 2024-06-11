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