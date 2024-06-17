import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = {
  renderMount: (dom) => {
    ReactDomTag.renderMount_0(dom)

    ReactDom.context().arc(dom.props.x, dom.props.y, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)

    ReactDomTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactDomTag.renderUnmount(dom)
  },
}

export default App