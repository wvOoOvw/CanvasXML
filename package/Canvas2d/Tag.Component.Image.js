const App = {
  onConstructMounted: (dom) => {
    dom.props.src = dom.element.props.src
    dom.props.sx = dom.element.props.sx
    dom.props.sy = dom.element.props.sy
    dom.props.sw = dom.element.props.sw
    dom.props.sh = dom.element.props.sh

    dom.props.clipHorizontalForward = dom.element.props.clipHorizontalForward
    dom.props.clipHorizontalCenter = dom.element.props.clipHorizontalCenter
    dom.props.clipHorizontalReverse = dom.element.props.clipHorizontalReverse
    dom.props.clipVerticalForward = dom.element.props.clipVerticalForward
    dom.props.clipVerticalCenter = dom.element.props.clipVerticalCenter
    dom.props.clipVerticalReverse = dom.element.props.clipVerticalReverse

  },

  onLocationMount: (dom) => {
    if (dom.props.src) {
      dom.resize()

      var image = dom.props.src

      var x = dom.props.x
      var y = dom.props.y
      var w = dom.props.w
      var h = dom.props.h
      var sx = 0
      var sy = 0
      var sw = image.width
      var sh = image.height

      const dw = w / sw
      const dh = h / sh

      const clipHorizontalFind = Object.keys(dom.props).find(i => {
        return ['clipHorizontalForward', 'clipHorizontalCenter', 'clipHorizontalReverse'].includes(i) && dom.props[i]
      })

      const clipVerticalFind = Object.keys(dom.props).find(i => {
        return ['clipVerticalForward', 'clipVerticalCenter', 'clipVerticalReverse'].includes(i) && dom.props[i]
      })

      if (dh > dw && clipHorizontalFind === 'clipHorizontalForward') {
        sx = 0
        sw = sw * dw / dh
      }

      if (dh > dw && clipHorizontalFind === 'clipHorizontalCenter') {
        sx = (sw - sw * dw / dh) / 2
        sw = sw - (sw - sw * dw / dh)
      }

      if (dh > dw && clipHorizontalFind === 'clipHorizontalReverse') {
        sx = sw - sw * dw / dh
        sw = sw
      }

      if (dw > dh && clipVerticalFind === 'clipVerticalForward') {
        sy = 0
        sh = sh * dh / dw
      }

      if (dw > dh && clipVerticalFind === 'clipVerticalCenter') {
        sy = (sh - sh * dh / dw) / 2
        sh = sh - (sh - sh * dh / dw)
      }

      if (dw > dh && clipVerticalFind === 'clipVerticalReverse') {
        sy = sh - sh * dh / dw
        sh = sh
      }

      const rdw = w / sw
      const rdh = h / sh

      if (rdw > rdh) w = w * rdh / rdw
      if (rdh > rdw) h = h * rdw / rdh

      dom.props.w = w
      dom.props.h = h
      dom.props.sx = sx
      dom.props.sy = sy
      dom.props.sw = sw
      dom.props.sh = sh
    }
  },

  onRenderMounted: (dom) => {
    if (dom.props.src) {
      dom.findParentContext().drawImage(dom.props.src, dom.props.sx, dom.props.sy, dom.props.sw, dom.props.sh, dom.props.x, dom.props.y, dom.props.w, dom.props.h)
    }
  },
}

export default App