import React from './CanvasXML.React'
import ReactCanvas2dTag from './CanvasXML.ReactCanvas2d.Tag'
import ReactCanvas2dEvent from './CanvasXML.ReactCanvas2d.Event'

import Location from './CanvasXML.Location'

const flatDom = (dom) => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()]
}

const getDomById = (dom, id) => {
  return dom.props.id === id ? dom : dom.children.reduce((t, i) => t || getDomById(i, id), null)
}

const ReactCanvas2dUtils = { flatDom, getDomById }

export default ReactCanvas2dUtils