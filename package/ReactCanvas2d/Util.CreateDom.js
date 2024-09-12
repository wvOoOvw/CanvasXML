const createDom = (node) => {
  const dom = { element: node.element, children: node.children }

  while (dom.children.some(i => i.type !== 'string')) {
    dom.children = dom.children.map(i => i.type !== 'string' ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => createDom(i))
  dom.children.forEach(i => i.parent = dom)

  return dom
}

export default createDom