import Core from './Core'

const App = {
  onRenderMounting: (dom) => {
    Core.context().clip()
  },
}

export default App