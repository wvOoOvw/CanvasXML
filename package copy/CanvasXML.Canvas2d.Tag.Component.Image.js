import Canvas2d from './CanvasXML.Canvas2d'

const caculateImageParams = (location, image, size, position) => {
  var { x, y, w, h } = location

  if (!image || image.width === 0 || image.height === 0) return

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
    Canvas2d.Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    if (dom.props.beginPath === undefined) dom.props.beginPath = false

    Canvas2d.Tag.renderMount_0(dom)

    if (dom.props.src) {
      const params = caculateImageParams({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, dom.props.src, dom.props.size, dom.props.position)

      if (dom.props.key === 1) console.log(params)
      
      if (params !== undefined) {
        Canvas2d.context().drawImage(dom.props.src, params.sx, params.sy, params.sw, params.sh, params.x, params.y, params.w, params.h)
      }
    }

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
  },
}

export default App