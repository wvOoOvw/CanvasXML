import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = {
  renderMount: (dom) => {
    ReactDomTag.renderMount_0(dom)
    ReactDomTag.renderMount_1(dom)

    dom.children = dom.element.props.children.map(i => typeof i === 'function' ? i(dom) : i)
    
    ReactDomTag.renderMount_2(dom)

    ReactDom.renderDom(dom)
    ReactDom.renderView(dom)
  },

  renderUnmount: (dom) => {
    ReactDomTag.renderUnmount(dom)
  },
}

export default App