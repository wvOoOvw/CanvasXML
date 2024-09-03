const App = {
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
        return ['clipHorizontalForward', 'clipHorizontalCenter', 'clipHorizontalReverse'].includes(i)
      })

      const clipVerticalFind = Object.keys(dom.props).find(i => {
        return ['clipVerticalForward', 'clipVerticalCenter', 'clipVerticalReverse'].includes(i)
      })

      if (dh > dw && clipHorizontalFind === 'clipHorizontalForward') {
        sx = 0
        sw = sw * dw / dh
      }

      if (dh > dw && clipHorizontalFind === 'clipHorizontalCenter') {
        sx = sw - sw * dw / dh
        sx = sx / 2
        sw = sw * dw / dh
      }

      if (dh > dw && clipHorizontalFind === 'clipHorizontalReverse') {
        sx = sw - sw * dw / dh
        sw = sw * dw / dh
      }

      if (dw > dh && clipVerticalFind === 'clipVerticalForward') {
        sy = 0
        sh = sh * dh / dw
      }

      if (dw > dh && clipVerticalFind === 'clipVerticalCenter') {
        sy = sh - sh * dh / dw
        sy = sy / 2
        sh = sh * dh / dw
      }

      if (dw > dh && clipVerticalFind === 'clipVerticalReverse') {
        sy = sh - sh * dh / dw
        sh = sh * dh / dw
      }

      dom.props.sx = sx
      dom.props.sy = sy
      dom.props.sw = sw
      dom.props.sh = sh

      const rdw = dom.props.w / sw
      const rdh = dom.props.h / sh

      if (rdh > rdw) dom.props.h = dom.props.h * rdw / rdh
      if (rdw > rdh) dom.props.w = dom.props.w * rdw / rdh
    }
  },
  
  onRenderMount: (dom) => {
    if (dom.props.src) {
      dom.context.drawImage(dom.props.src, dom.props.sx, dom.props.sy, dom.props.sw, dom.props.sh, dom.props.x, dom.props.y, dom.props.w, dom.props.h)
    }
  },
}

export default App