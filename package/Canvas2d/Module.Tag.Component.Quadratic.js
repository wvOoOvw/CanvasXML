const App = {
  onConstructMounted: (dom) => {
    dom.props.path = dom.element.props.path && JSON.parse(JSON.stringify(dom.element.props.path))
  },

  onRenderMount: (dom) => {
    if (dom.props.path === undefined) {
      dom.props.path = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)
    }

    dom.path = (context) => {
      context.moveTo(dom.props.path[0].x, dom.props.path[0].y)
      context.quadraticCurveTo(dom.props.path[1].x, dom.props.path[1].y, dom.props.path[2].x, dom.props.path[2].y)
    }
  },
}

export default App