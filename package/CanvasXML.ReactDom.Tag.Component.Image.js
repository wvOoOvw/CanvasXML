import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const caculateImageParams = (position, image, size, align) => {
  var { x, y, w, h } = position

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  if (size === 'auto-max' && align === 'center') {
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
  }

  if (size === 'auto-min' && align === 'center') {
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
  }

  return { sx, sy, sw, sh, x, y, w, h }
}

const App = {
  renderMount: (props, dom) => {
    ReactDomTag.renderMount_0(props, dom)

    const params = caculateImageParams({ x: props.x, y: props.y, w: props.w, h: props.h }, props.image, props.size, props.align)

    if (params !== undefined) {
      ReactDom.context().drawImage(props.image, params.sx, params.sy, params.sw, params.sh, params.x, params.y, params.w, params.h)
    }

    ReactDomTag.renderMount_1(props, dom)
  },

  renderUnmount: (props, dom) => {
    ReactDomTag.renderUnmount(props, dom)
  },
}

export default App