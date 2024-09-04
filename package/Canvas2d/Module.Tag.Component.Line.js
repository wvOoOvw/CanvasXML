const App = {
  onConstructMounted: (dom) => {
    dom.props.path = dom.element.props.path
    if (dom.props.path) dom.props.path = JSON.parse(JSON.stringify(dom.element.props.path))
  },

  onRenderMount: (dom) => {
    if (Boolean(dom.props.path) === false) {
      dom.props.path = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)
    }

    dom.path = (context) => {
      dom.props.path.forEach((i, index) => {
        if (index === 0) context.moveTo(i.x, i.y)
        if (index === 0) context.lineTo(i.x, i.y)
        if (index !== 0) context.lineTo(i.x, i.y)
      })
    }
  },
}

export default App