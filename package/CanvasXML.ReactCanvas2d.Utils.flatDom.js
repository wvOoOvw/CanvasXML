const flatDom = (dom) => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()]
}

export default flatDom