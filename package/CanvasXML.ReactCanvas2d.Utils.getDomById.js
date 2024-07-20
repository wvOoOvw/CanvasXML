const flatDom = (dom) => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()]
}

const getDomById = (dom, id) => {
  if (dom.props.id === id) return dom
  if (dom.props.id !== id && dom.children !== undefined) return  dom.children.find((i) => getDomById(i, id))
  if (dom.props.id !== id && dom.children === undefined) return  undefined
}

const ReactCanvas2dUtils = { flatDom, getDomById }

export default ReactCanvas2dUtils