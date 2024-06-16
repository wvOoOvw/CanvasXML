import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = {
  renderMount: (props, dom) => {
    ReactDomTag.renderMount_0(props, dom)

    ReactDom.context().arc(props.x, props.y, props.radius, props.sAngle, props.eAngle, props.counterclockwise)

    ReactDomTag.renderMount_1(props, dom)
  },

  renderUnmount: (props, dom) => {
    ReactDomTag.renderUnmount(props, dom)
  },
}

export default App