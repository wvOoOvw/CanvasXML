import React from '../React'

function App(props) {
  const onLocationMounted0 = (dom) => {
    if (props.onLocationMounted) props.onLocationMounted(dom)
  }

  const onLocationMounted1 = (dom) => {
    if (props.onLocationMounted) props.onLocationMounted(dom)
    dom.props.translateX = dom.props.translateX * -1
    dom.props.translateY = dom.props.translateY * -1
  }

  return <translate translateX={props.translateX} translateY={props.translateY} onLocationMounted={onLocationMounted0}>
    <rotate rotateAngle={props.rotateAngle}>
      <translate translateX={props.translateX} translateY={props.translateY} onLocationMounted={onLocationMounted1}>
        {props.children}
      </translate>
    </rotate>
  </translate>
}

export default App