import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

import Location from './CanvasXML.Location'

const flatDom = (dom) => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()]
}


const ReactDomPlugin = { flatDom }

export default ReactDomPlugin