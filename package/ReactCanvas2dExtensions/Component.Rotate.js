import React from '../React'

function App(props) {
  return <translate translateX={props.translateX} translateY={props.translateY}>
    <rotate rotateAngle={props.rotateAngle}>
      <translate translateX={(props.translateX) * -1} translateY={(props.translateY) * -1}>
        {props.children}
      </translate>
    </rotate>
  </translate>
}

export default App


