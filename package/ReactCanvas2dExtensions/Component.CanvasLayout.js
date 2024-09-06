import React from '../React'

function App(props) {
  const onLocationMounted = dom => {
    dom.props.x = 0
    dom.props.y = 0
    dom.props.w = dom.canvas.width
    dom.props.h = dom.canvas.height
    dom.recoordinate()
  }

  return <layout canvas={props.canvas} context={props.context} onLocationMounted={onLocationMounted}>{props.children}</layout>
}

export default App