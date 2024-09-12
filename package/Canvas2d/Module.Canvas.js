const createOffscreenCanvas = (...props) => {
  try {
    if (wx) return wx.createCanvas(...props)
  } catch {
    // return new OffscreenCanvas(...props)
    return document.createElement('canvas')
  }
}

export default { createOffscreenCanvas }