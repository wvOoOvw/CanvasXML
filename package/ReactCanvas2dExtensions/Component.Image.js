import React from '../React'

function App(props) {
  const onLocationUnmounted = (dom) => {
    var image = props.image

    var x = props.x
    var y = props.y
    var w = props.w
    var h = props.h
    var sx = 0
    var sy = 0
    var sw = image.width
    var sh = image.height

    const dw = w / sw
    const dh = h / sh

    var clip = props.clip
    var horizontalAlign = props.horizontalAlign
    var verticalAlign = props.verticalAlign

    if (clip) {
      if (horizontalAlign === 'forward') {

      }

      if (horizontalAlign === 'center') {  
        if (dh > dw) {
          sx = (sw - sw * dw / dh)
          sw = sw - (sw - sw * dw / dh)
        }
      }

      if (horizontalAlign === 'reverse') {

      }

      if (verticalAlign === 'forward') {

      }

      if (verticalAlign === 'center') {
        if (dw > dh) {
          sy = (sh - sh * dh / dw)
          sh = sh - (sh - sh * dh / dw)
        }
      }

      if (verticalAlign === 'reverse') {

      }
    }

    if (!image || image.width === 0 || image.height === 0) return



    if (size === 'auto-max' && position === 'center') {



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

  return <image {...props} onLocationUnmounted={onLocationUnmounted} />
}

export default App