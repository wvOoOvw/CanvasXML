const createOffscreenCanvas = (...props) => {
  try {
    if (wx) return wx.createCanvas(...props)
  } catch {
    return document.createElement('canvas')
  }
}


export default createOffscreenCanvas