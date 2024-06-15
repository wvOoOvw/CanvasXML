import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = (props) => {
  ReactDom.context().arc(props.x, props.y, props.radius, props.sAngle, props.eAngle, props.counterclockwise)
}

export default App