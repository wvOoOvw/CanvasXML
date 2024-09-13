const App = {
  onConstructMounted: (dom) => {
    dom.props.canvas = dom.element.props.canvas
    dom.props.context = dom.element.props.context
    dom.props.dpr = dom.element.props.dpr
    dom.props.rect = dom.element.props.rect
  },

  onRenderMount: (dom) => {
    dom.props.context.clearRect(0, 0, dom.props.canvas.width, dom.props.canvas.height)
  },
}

export default App