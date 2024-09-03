import React from '../React'

function App(props) {
  const onLocationMounted = (dom) => {
    dom.props.transform = [
      {
        translate: { x: dom.props.cx, y: dom.props.cy }
      },
      {
        rotate: { angle: props.rotateAngle }
      },
      {
        translate: { x: 0 - dom.props.cx, y: 0 - dom.props.cy }
      },
    ]
  }

  return <layout onLocationMounted={onLocationMounted}>{props.children}</layout>
}

export default App