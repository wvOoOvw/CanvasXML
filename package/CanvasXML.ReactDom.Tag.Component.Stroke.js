import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = (props) => {
  ReactDomTag.preprocessing({...props,stroke: false})

  ReactDom.context().stroke()

  ReactDomTag.postprocessing(props)

  return props.children
}

export default App