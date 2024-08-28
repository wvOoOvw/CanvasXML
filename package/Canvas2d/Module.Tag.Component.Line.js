import Core from './Core'

const App = {
  onLocationUnmounted: (dom) => {
    if (dom.props.path !== undefined) {
      dom.props.props = dom.props.path
    }
    if (dom.path === undefined){
      dom.props.props = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)
    }
  },
  
  onRenderMounting: (dom) => {
    dom.props.props.forEach((i, index) => {
      if (index === 0) Core.context().moveTo(i.x, i.y)
      if (index === 0) Core.context().lineTo(i.x, i.y)
      if (index !== 0) Core.context().lineTo(i.x, i.y)
    })
  },
}

export default App