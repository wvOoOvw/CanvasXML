const App = {
  onConstructMounted: (dom) => {
    dom.props.addEventListener = dom.element.props.addEventListener
    dom.props.removeEventListener = dom.element.props.removeEventListener
    dom.props.clearEventListener = dom.element.props.clearEventListener
    dom.props.addEventListenerWithCanvas = dom.element.props.addEventListenerWithCanvas
    dom.props.clearEventListenerWithCanvas = dom.element.props.clearEventListenerWithCanvas

    dom.props.addEventListenerWithCanvas(dom.findCanvas())
  },

  onEventMount: (dom) => {
    dom.props.clearEventListener()
  },
}

export default App