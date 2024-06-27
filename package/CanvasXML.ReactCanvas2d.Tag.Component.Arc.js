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

    ReactCanvas2d.context().arc(dom.props.x, dom.props.y, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)

    ReactCanvas2dTag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    ReactCanvas2dTag.renderUnmount(dom)
  },
}

export default App