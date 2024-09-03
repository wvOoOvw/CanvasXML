const App = {
  onRenderMount: (dom) => {
    if (dom.props.path === undefined) {
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