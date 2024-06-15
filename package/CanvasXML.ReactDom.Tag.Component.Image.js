import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const drawImage = (position, image) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  ReactDom.context().drawImage(image, sx, sy, sw, sh, x, y, w, h)

  return { sx, sy, sw, sh, x, y, w, h }
}

const drawImageClipMaxCenter = (position, image) => {
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

  ReactDom.context().drawImage(image, sx, sy, sw, sh, x, y, w, h)

  return { sx, sy, sw, sh, x, y, w, h }
}

const drawImageClipMinCenter = (position, image) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  const dw = w / sw
  const dh = h / sh

  if (dw > dh) {
    x = x + (w - w * dh / dw) / 2
    w = w - (w - w * dh / dw)
  }

  if (dh > dw) {
    y = y + (h - h * dw / dh) / 2
    h = h - (h - h * dw / dh)
  }

  ReactDom.context().drawImage(image, sx, sy, sw, sh, x, y, w, h)

  return { sx, sy, sw, sh, x, y, w, h }
}

const App = (props) => {
  var clipPosition

  if (Boolean(props.image) === true) {
    if (Boolean(props.clipMaxCenter) === true) clipPosition = drawImageClipMaxCenter({ x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
    if (Boolean(props.clipMinCenter) === true) clipPosition = drawImageClipMinCenter({ x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
    if (Boolean(props.clipMaxCenter) !== true && Boolean(props.clipMinCenter) !== true) drawImage({ x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
  }

  if (Boolean(clipPosition) === true && Boolean(props.onClipPosition) === true) props.onClipPosition(clipPosition)
}

export default App