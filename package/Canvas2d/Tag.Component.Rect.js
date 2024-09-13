const App = {
  onRenderMount: (dom) => {
    dom.path = (context) => {
      context.rect(dom.props.x, dom.props.y, dom.props.w, dom.props.h)
    }
  },
}

export default App