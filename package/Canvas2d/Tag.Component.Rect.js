const App = {
  onRenderMount: (dom) => {
    dom.path = (context) => {
      context.rect(dom.props.x - dom.props.w / 2, dom.props.y - dom.props.h / 2, dom.props.w, dom.props.h)
    }
  },
}

export default App