import Core from './Core'

const App = {
  onRenderMounting: (dom) => {
    Core.context().translate(dom.props.translateX, dom.props.translateY)
  },
}

export default App