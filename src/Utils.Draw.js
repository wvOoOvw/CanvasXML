const drawImage = (context, position, image) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  x = x - w / 2
  y = y - h / 2

  context.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

const drawImageClipMaxCenter = (context, position, image) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  const dw = w / sw
  const dh = h / sh

  if (dw > dh) {
    sy = (sh - sh * dh / dw)
    sh = sh - (sh - sh * dh / dw)
  }

  if (dh > dw) {
    sx = (sw - sw * dw / dh)
    sw = sw - (sw - sw * dw / dh)
  }

  x = x - w / 2
  y = y - h / 2

  context.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

const drawImageClipMinCenter = (context, position, image) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  const dw = w / sw
  const dh = h / sh

  if (dw > dh) {
    w = w - (w - w * dh / dw)
  }

  if (dh > dw) {
    h = h - (h - h * dw / dh)
  }

  x = x - w / 2
  y = y - h / 2

  context.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

const drawArc = (context, position, radius, sAngle, eAngle, counterclockwise) => {
  var { x, y, w, h } = position

  context.beginPath()
  context.arc(x, y, radius, sAngle, eAngle, counterclockwise)
}

const drawRect = (context, position) => {
  var { x, y, w, h } = position

  x = x - w / 2
  y = y - h / 2

  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x + w, y)
  context.lineTo(x + w, y + h)
  context.lineTo(x, y + h)
  context.closePath()
}

const drawRectRadius = (context, position, radius) => {
  var { x, y, w, h } = position

  const radiusFill = Array.isArray(radius) ? radius : new Array(4).fill(radius)

  x = x - w / 2
  y = y - h / 2

  context.beginPath()
  context.moveTo(x, y + radiusFill[0])
  context.arcTo(x, y, x + radiusFill[0], y, radiusFill[0])
  context.lineTo(x + w - radiusFill[1], y)
  context.arcTo(x + w, y, x + w, y + radiusFill[1], radiusFill[1])
  context.lineTo(x + w, y + h - radiusFill[2])
  context.arcTo(x + w, y + h, x + w - radiusFill[2], y + h, radiusFill[2])
  context.lineTo(x + radiusFill[3], y + h)
  context.arcTo(x, y + h, x, y + h - radiusFill[3], radiusFill[3])
  context.closePath()
}

// const drawMultilineText = (context, position) => {
//   const x = x
//   const y = y
//   const width = w
//   const wrapSpace = position.wrapSpace
//   const text = position.text
//   const onlyread = position.onlyread

//   var temp = ''
//   var row = []

//   text.split('').forEach(i => {
//     if (context.measureText(temp + i).width > width) {
//       row.push(temp)
//       temp = ''
//     }
//     temp = temp + i
//   })
//   row.push(temp)

//   if (onlyread) return row.length

//   row.forEach((i, index) => {
//     context.fillText(i, x, y + index * wrapSpace)
//   })
// }

const Draw = { drawImage, drawImageClipMinCenter, drawImageClipMaxCenter, drawArc, drawRect, drawRectRadius }

export default Draw