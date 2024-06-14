import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = (props) => {
  ReactDomTag.preprocessing(props)

  props.children.forEach((i, index) => { if (typeof i === 'function') props.children[index] = i() })

  ReactDomTag.postprocessing(props)

  return props.children
}

export default App