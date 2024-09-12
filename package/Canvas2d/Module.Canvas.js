const createOffscreenCanvas = (...props) => {
  try {
    if (wx) return wx.createCanvas(...props)
  } catch {
    return document.createElement('canvas')
  }
}

const caculateRect = (canvas) => {
  const rect = canvas.getBoundingClientRect()

  rect.x = rect.x
  rect.y = rect.y

  if (rect.x === undefined) rect.x = rect.left
  if (rect.y === undefined) rect.y = rect.top
  

  return rect
}

export default { createOffscreenCanvas, caculateRect }