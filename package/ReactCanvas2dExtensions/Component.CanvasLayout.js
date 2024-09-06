import React from '../React'
import Canvas2d from '../Canvas2d'

function App(props) {
  const onLocationMounted = dom => {
    dom.props.x = 0
    dom.props.y = 0
    dom.props.w = Canvas2d.rect().width * Canvas2d.dpr()
    dom.props.h = Canvas2d.rect().height * Canvas2d.dpr()
    dom.recoordinate()
  }

  return <layout canvas={Canvas2d.canvas()} context={Canvas2d.context()} onLocationMounted={onLocationMounted}>{props.children}</layout>
}

export default App