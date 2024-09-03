import React from '../React'

function App(props) {
  const onLocationMounted = (dom) => {
    dom.props.transform = [
      {
        translate: { x: props.translateX, y: props.translateY }
      },
      {
        rotate: { angle: props.rotateAngle }
      },
      {
        translate: { x: 0 - props.translateX, y: 0 - props.translateY }
      },
    ]
  }

  return <layout onLocationMounted={onLocationMounted}>{props.children}</layout>
}

export default App