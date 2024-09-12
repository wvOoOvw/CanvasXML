import React from '../React'
import Canvas2d from '../Canvas2d'

function App(props) {
  const onLocationMounted = dom => {
    dom.props.x = 0
    dom.props.y = 0
    dom.props.w = dom.props.canvas.width
    dom.props.h = dom.props.canvas.height
    dom.recoordinate()
  }

  return <canvas canvas={Canvas2d.canvas()} context={Canvas2d.context()} onLocationMounted={onLocationMounted}>{props.children}</canvas>
}

export default App