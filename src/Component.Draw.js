const drawImageClipMaxCenter = (context, position, image) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  const ratio = Math.max(w / image.width, h / image.height)

  const widthReal = image.width * ratio
  const heightReal = image.height * ratio

  const widthDiff = widthReal - w
  const heightDiff = heightReal - h

  if (widthDiff) {
    sx = widthDiff / 2 / ratio
    sw = sw - widthDiff / ratio
  }

  if (heightDiff) {
    sy = heightDiff / 2 / ratio
    sh = sh - heightDiff / ratio
  }

  context.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

const drawImageClipMinCenter = (context, position, image) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  const ratio = Math.max(image.width / w, image.height / h)

  const widthReal = w * ratio
  const heightReal = h * ratio

  const widthDiff = widthReal - image.width
  const heightDiff = heightReal - image.height

  if (widthDiff) {
    x = widthDiff / 2 / ratio
    w = w - widthDiff / ratio
  }

  if (heightDiff) {
    y = heightDiff / 2 / ratio
    h = h - heightDiff / ratio
  }

  context.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}

const drawArc = (context, position, radius, sAngle, eAngle, counterclockwise) => {
  var { x, y, w, h } = position

  context.beginPath()
  context.arc(x, y, radius, sAngle, eAngle, counterclockwise)
}

const drawRect = (context, position) => {
  var { x, y, w, h } = position

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

export { drawImageClipMinCenter, drawImageClipMaxCenter, drawArc, drawRect, drawRectRadius }