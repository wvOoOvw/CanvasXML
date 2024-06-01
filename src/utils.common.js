

const number = (number, fixed) => Number(number.toFixed(fixed))

const random = (number, offset, fixed) => Number(((Math.random() * number).toFixed(fixed))) + offset

const ifPointCover = (point, area) => {
  return point.x >= area.x && point.x <= area.x + area.width && point.y >= area.y && point.y <= area.y + area.height
}

const drawImageCenter = (context, image, area) => {
  const x = area.x
  const y = area.y
  const width = area.width
  const height = area.height

  var sx = 0
  var sy = 0
  var swidth = image.width
  var sheight = image.height

  const ratio = Math.max(width / image.width, height / image.height)

  const realWidth = image.width * ratio
  const realHeight = image.height * ratio

  const widthDiff = realWidth - width
  const heightDiff = realHeight - height

  if (widthDiff) {
    sx = widthDiff / 2 / ratio
    swidth = swidth - widthDiff / ratio
  }

  if (heightDiff) {
    sy = heightDiff / 2 / ratio
    sheight = sheight - heightDiff / ratio
  }

  context.drawImage(image, sx, sy, swidth, sheight, x, y, width, height)
}

const drawImageFullHeight = (context, image, area) => {
  var x = area.x
  var y = area.y
  var width = area.width
  var height = area.height

  const ratio = height / image.height

  const realWidth = image.width * ratio

  x = x + (width - realWidth) / 2

  context.drawImage(image, x, y, realWidth, height)
}

const drawRectRadius = (context, area) => {
  const x = area.x
  const y = area.y
  const width = area.width
  const height = area.height
  const radius = Array.isArray(area.radius) ? area.radius : new Array(4).fill(area.radius)

  context.beginPath()
  context.moveTo(x, y + radius[0])
  context.arcTo(x, y, x + radius[0], y, radius[0])
  context.lineTo(x + width - radius[1], y)
  context.arcTo(x + width, y, x + width, y + radius[1], radius[1])
  context.lineTo(x + width, y + height - radius[2])
  context.arcTo(x + width, y + height, x + width - radius[2], y + height, radius[2])
  context.lineTo(x + radius[3], y + height)
  context.arcTo(x, y + height, x, y + height - radius[3], radius[3])
  context.closePath()
}

const drawRectAngle = (context, area) => {
  const x = area.x
  const y = area.y
  const width = area.width
  const height = area.height
  const radius = Array.isArray(area.radius) ? area.radius : new Array(4).fill(area.radius)

  context.beginPath()
  context.moveTo(x, y + radius[0])
  context.lineTo(x + radius[0], y)
  context.lineTo(x + width - radius[1], y)
  context.lineTo(x + width, y + radius[1])
  context.lineTo(x + width, y + height - radius[2])
  context.lineTo(x + width - radius[1], y + height)
  context.lineTo(x + radius[3], y + height)
  context.lineTo(x, y + height - radius[3])
  context.closePath()
}

const drawRect = (context, area) => {
  const x = area.x
  const y = area.y
  const width = area.width
  const height = area.height

  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x + width, y)
  context.lineTo(x + width, y + height)
  context.lineTo(x, y + height)
  context.closePath()
}

const drawMultilineText = (context, area) => {
  const x = area.x
  const y = area.y
  const width = area.width
  const wrapSpace = area.wrapSpace
  const text = area.text
  const onlyread = area.onlyread

  var temp = ''
  var row = []

  text.split('').forEach(i => {
    if (context.measureText(temp + i).width > width) {
      row.push(temp)
      temp = ''
    }
    temp = temp + i
  })
  row.push(temp)

  if (onlyread) return row.length

  row.forEach((i, index) => {
    context.fillText(i, x, y + index * wrapSpace)
  })
}

const drawFullColor = (context, color) => {
  drawRect({ x: 0, y: 0, width: Canvas.width, height: Canvas.height })
  context.fillStyle = color
  context.fill()
}

export { number, random, ifPointCover }

export { drawImageCenter, drawImageFullHeight, drawRect, drawRectRadius, drawRectAngle, drawMultilineText, drawFullColor }