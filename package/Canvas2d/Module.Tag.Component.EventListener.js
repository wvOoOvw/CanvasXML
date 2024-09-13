const App = {
  onConstructMounted: (dom) => {
    dom.props.addEventListener = dom.element.props.addEventListener
    dom.props.removeEventListener = dom.element.props.removeEventListener
    dom.props.clearEventListener = dom.element.props.clearEventListener
  },

  onEventMount: (dom) => {
    dom.props.clearEventListener()
  },
}

export default App