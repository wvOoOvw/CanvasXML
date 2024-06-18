import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = {
  renderMount: (dom) => {
    ReactDomTag.renderMount_0(dom)
    ReactDomTag.renderMount_1(dom)

    ReactDom.context().stroke()

    ReactDomTag.renderMount_2(dom)
  },

  renderUnmount: (dom) => {
    ReactDomTag.renderUnmount(dom)
  },
}

export default App