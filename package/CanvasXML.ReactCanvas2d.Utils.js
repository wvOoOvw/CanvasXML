const flatDom = (dom) => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()]
}

const getDomById = (dom, id) => {
  return dom.props.id === id ? dom : dom.children.reduce((t, i) => t || getDomById(i, id), null)
}

const ReactCanvas2dUtils = { flatDom, getDomById }

export default ReactCanvas2dUtils