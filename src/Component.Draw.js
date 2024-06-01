const drawImageClipCenter = (context, position, image) => {
  const { x, y, w, h } = position

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  const ratio = Math.max(w / image.width, h / image.height)

  const realWidth = image.width * ratio
  const realHeight = image.height * ratio

  const widthDiff = realWidth - w
  const heightDiff = realHeight - h

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

// const drawImageFullHeight = (context, image, position) => {
//   var x = x
//   var y = y
//   var width = w
//   var height = h

//   const ratio = height / image.height

//   const realWidth = image.width * ratio

//   x = x + (width - realWidth) / 2

//   context.drawImage(image, x, y, realWidth, height)
// }

const drawArc = (context, position, radius, sAngle, eAngle, counterclockwise) => {
  const { x, y, w, h } = position

  context.beginPath()
  context.arc(x, y, radius, sAngle, eAngle, counterclockwise)
}

const drawRectRadius = (context, position, radius) => {
  const { x, y, w, h } = position

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

// const drawRectAngle = (context, position) => {
//   const x = x
//   const y = y
//   const width = w
//   const height = h
//   const radius = Array.isArray(position.radius) ? position.radius : new Array(4).fill(position.radius)

//   context.beginPath()
//   context.moveTo(x, y + radius[0])
//   context.lineTo(x + radius[0], y)
//   context.lineTo(x + width - radius[1], y)
//   context.lineTo(x + width, y + radius[1])
//   context.lineTo(x + width, y + height - radius[2])
//   context.lineTo(x + width - radius[1], y + height)
//   context.lineTo(x + radius[3], y + height)
//   context.lineTo(x, y + height - radius[3])
//   context.closePath()
// }

// const drawRect = (context, position) => {
//   const x = x
//   const y = y
//   const width = w
//   const height = h

//   context.beginPath()
//   context.moveTo(x, y)
//   context.lineTo(x + width, y)
//   context.lineTo(x + width, y + height)
//   context.lineTo(x, y + height)
//   context.closePath()
// }

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

// const drawFullColor = (context, color) => {
//   drawRect({ x: 0, y: 0, width: Canvas.width, height: Canvas.height })
//   context.fillStyle = color
//   context.fill()
// }

export { drawImageClipCenter, drawArc, drawRectRadius }