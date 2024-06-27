import React from './CanvasXML.React'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

import ReactCanvas2dTag from './CanvasXML.ReactCanvas2d.Tag'

const App = {
  locationMount: (dom) => {
    ReactCanvas2dTag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    ReactCanvas2dTag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    ReactCanvas2dTag.renderMount_0(dom)

    var radius = new Array(4).fill(0)

    if (dom.props.radius && typeof radius === 'object' && Array.isArray(radius)) radius = dom.props.radius
    if (dom.props.radius && typeof radius === 'number') radius = new Array(4).fill(dom.props.radius)

    ReactCanvas2d.context().moveTo(dom.props.x, dom.props.y + radius[0])
    ReactCanvas2d.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0])
    ReactCanvas2d.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y)
    ReactCanvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1])
    ReactCanvas2d.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2])
    ReactCanvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2])
    ReactCanvas2d.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h)
    ReactCanvas2d.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3])

    ReactCanvas2dTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactCanvas2dTag.renderUnmount(dom)
  },
}

export default App