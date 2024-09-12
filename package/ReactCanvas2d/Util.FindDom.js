const findDom = (node) => {
  var dom
  var nodes = [node]

  while (dom === undefined || dom.type !== 'string') {
    dom = nodes.find(i => i.type === 'string')
    nodes = nodes.map(i => i.children).flat()
  }

  return dom
}

export default findDom