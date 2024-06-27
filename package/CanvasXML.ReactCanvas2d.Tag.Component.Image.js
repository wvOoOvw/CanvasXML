import React from './CanvasXML.React'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

import ReactCanvas2dTag from './CanvasXML.ReactCanvas2d.Tag'

const caculateImageParams = (location, image, size, position) => {
  var { x, y, w, h } = location

  if (image.width === 0 || image.height === 0) return

  var sx = 0
  var sy = 0
  var sw = image.width
  var sh = image.height

  if (size === 'auto-max' && position === 'center') {
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

  if (size === 'auto-min' && position === 'center') {
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
  locationMount: (dom) => {
    ReactCanvas2dTag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    ReactCanvas2dTag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    ReactCanvas2dTag.renderMount_0(dom)

    const params = caculateImageParams({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, dom.props.image, dom.props.size, dom.props.position)

    if (params !== undefined) {
      ReactCanvas2d.context().drawImage(dom.props.image, params.sx, params.sy, params.sw, params.sh, params.x, params.y, params.w, params.h)
    }

    ReactCanvas2dTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactCanvas2dTag.renderUnmount(dom)
  },
}

export default App