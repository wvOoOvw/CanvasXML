import Core from './Core'

const App = {
  onRenderMounting: (dom) => {
    Core.context().rotate(dom.props.rotateAngle)
  },
}

export default App