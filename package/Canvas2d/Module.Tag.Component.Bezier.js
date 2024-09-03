const App = {
  onRenderMount: (dom) => {
    if (dom.props.path !== undefined) {
      dom.props.path = dom.props.path
    }
    if (dom.props.path === undefined) {
      dom.props.path = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)
    }

    dom.path = (context) => {
      context.moveTo(dom.props.path[0].x, dom.props.path[0].y)
      context.quadraticCurveTo(dom.props.path[1].x, dom.props.path[1].y, dom.props.path[2].x, dom.props.path[2].y, dom.props.path[3].x, dom.props.path[3].y)
    }
  },
}

export default App