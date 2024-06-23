import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

import Location from './CanvasXML.Location'

const flatDom = (dom) => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()]
}

const getDomById = (dom, id) => {
  return dom.props.id === id ? dom : dom.children.reduce((t, i) => t || getDomById(i, id), null)
}

const ReactDomUtils = { flatDom, getDomById }

export default ReactDomUtils