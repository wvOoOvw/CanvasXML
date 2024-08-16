import Core from './Core'

const App = {
  onRenderMounting: (dom) => {
    Core.context().scale(dom.props.scaleW, dom.props.scaleH)
  },
}

export default App