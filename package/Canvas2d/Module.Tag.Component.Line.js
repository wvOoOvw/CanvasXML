import Core from './Core'

const App = {
  onRenderMounting: (dom) => {
    dom.children
      .filter((i) => i.element.tag === 'path')
      .map((i) => i.props)
      .forEach((i, index) => {
        if (index === 0) Core.context().moveTo(i.x, i.y)
        if (index === 0) Core.context().lineTo(i.x, i.y)
        if (index !== 0) Core.context().lineTo(i.x, i.y)
      })
  },
}

export default App