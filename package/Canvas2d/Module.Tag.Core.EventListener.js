const App = {
  onConstructMounted: (dom) => {
    dom.props.add = dom.element.props.add
    dom.props.remove = dom.element.props.remove
    dom.props.clear = dom.element.props.clear
    dom.props.addWithCanvas = dom.element.props.addWithCanvas
    dom.props.removeWithCanvas = dom.element.props.removeWithCanvas

    dom.props.addWithCanvas(dom.findCanvas)
  },

  onEventMount: (dom) => {
    dom.props.clear()
  },
}

export default App