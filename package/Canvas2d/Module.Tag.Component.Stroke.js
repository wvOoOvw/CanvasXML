import Core from './Core'

const App = {
  onRenderMounting: (dom) => {
    Core.context().stroke()
  },
}

export default App