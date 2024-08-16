import Core from './Core'
import Tag from './Module.Tag'

const App = {
  onRenderMounting: (dom) => {
    Core.context().fill()
  },
}

export default App