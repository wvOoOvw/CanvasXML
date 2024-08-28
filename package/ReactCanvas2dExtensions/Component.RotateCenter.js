import React from '../React'

function App(props) {
  const onLocationMounted0 = (dom) => {
    dom.props.translateX = dom.props.cx
    dom.props.translateY = dom.props.cy
  }

  const onLocationMounted1 = (dom) => {
    dom.props.translateX = dom.props.cx * -1
    dom.props.translateY = dom.props.cy * -1
  }

  return <translate onLocationMounted={onLocationMounted0}>
    <rotate save={false} rotateAngle={props.rotateAngle}>
      <translate save={false} onLocationMounted={onLocationMounted1}>
        {props.children}
      </translate>
    </rotate>
  </translate>
}

export default App