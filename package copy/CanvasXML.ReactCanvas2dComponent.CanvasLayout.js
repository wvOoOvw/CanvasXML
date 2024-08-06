import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

function App(props) {
  const onLocationMounted = dom => {
    dom.props.x = Canvas2d.rect().x
    dom.props.y = Canvas2d.rect().y
    dom.props.w = Canvas2d.rect().width * Canvas2d.dpr()
    dom.props.h = Canvas2d.rect().height * Canvas2d.dpr()
  }

  return <layout onLocationMounted={onLocationMounted}>{props.children}</layout>
}

export default App