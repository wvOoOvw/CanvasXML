import Core from './Core'

const App = {
  onLocationUnmounted: (dom) => {
    if (dom.path !== undefined) {
      dom._path = dom.path
    }
    if (dom.path === undefined){
      dom._path = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)
    }
  },
  
  onRenderMounting: (dom) => {
    dom._path.forEach((i, index) => {
      if (index === 0) Core.context().moveTo(i.x, i.y)
      if (index === 0) Core.context().lineTo(i.x, i.y)
      if (index !== 0) Core.context().lineTo(i.x, i.y)
    })
  },
}

export default App