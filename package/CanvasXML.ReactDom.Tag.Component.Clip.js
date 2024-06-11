import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = (props) => {
  ReactDom.context().save()

  ReactDomTag.componentRunBefore(props)

  ReactDom.context().clip(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h })

  ReactDomTag.componentRunAfter(props)

  React.useEffectLoopEnd(() => ReactDom.context().restore(), [])

  return props.children
}

export default App