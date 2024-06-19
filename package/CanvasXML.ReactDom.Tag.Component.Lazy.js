import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = {
  renderMount: (dom) => {
    if (typeof dom.children === 'function') {
      dom.children = dom.children(dom)
      ReactDom.renderDom(dom)
    }

    ReactDom.renderView(dom)
  },

  renderUnmount: (dom) => {
    // ReactDomTag.renderUnmount(dom)
  },
}

export default App