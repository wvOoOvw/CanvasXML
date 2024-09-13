const App = {
  onConstructMounted: (dom) => {
    dom.props.addEventListener = dom.element.props.addEventListener
    dom.props.removeEventListener = dom.element.props.removeEventListener
    dom.props.clearEventListener = dom.element.props.clearEventListener
    dom.props.addEventListenerWithCanvas = dom.element.props.addEventListenerWithCanvas
    dom.props.removeEventListenerWithCanvas = dom.element.props.removeEventListenerWithCanvas
    dom.props.clearEventListenerWithCanvas = dom.element.props.clearEventListenerWithCanvas
    dom.props.offscreenCanvas = dom.element.props.offscreenCanvas
    dom.props.offscreenContext = dom.element.props.offscreenContext
  },

  onEventMount: (dom) => {
    const canvasDom = dom.findParentDomCanvas()

    dom.props.removeEventListenerWithCanvas(canvasDom.props.canvas)
    dom.props.addEventListenerWithCanvas(canvasDom.props.canvas, canvasDom.props)

    dom.props.clearEventListener()
  },
}

export default App