import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

const App = {
  locationMount: (dom) => {
    ReactDomTag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    
  },

  renderMount: (dom) => {
    ReactDomTag.renderMount_0(dom)

    var radius = new Array(4).fill(0)

    if (dom.props.radius && typeof radius === 'object' && Array.isArray(radius)) radius = dom.props.radius
    if (dom.props.radius && typeof radius === 'number') radius = new Array(4).fill(dom.props.radius)

    ReactDom.context().moveTo(dom.props.x, dom.props.y + radius[0])
    ReactDom.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0])
    ReactDom.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y)
    ReactDom.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1])
    ReactDom.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2])
    ReactDom.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2])
    ReactDom.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h)
    ReactDom.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3])

    ReactDomTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactDomTag.renderUnmount(dom)
  },
}

export default App