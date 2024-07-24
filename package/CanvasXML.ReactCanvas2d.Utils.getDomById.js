const getDomById = (dom, id) => {
  if (dom.props.id === id) return dom
  if (dom.props.id !== id && dom.children !== undefined) return  dom.children.find((i) => getDomById(i, id))
  if (dom.props.id !== id && dom.children === undefined) return  undefined
}

export default getDomById