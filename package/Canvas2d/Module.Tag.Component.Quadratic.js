import Core from './Core'

const App = {
  onLocationUnmounted: (dom) => {
    if (dom.props.path !== undefined) {
      dom.props.path = dom.props.path
    }
    if (dom.props.path === undefined) {
      dom.props.path = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)
    }
  },
  
  onRenderMounting: (dom) => {
    Core.context().moveTo(dom.props.path[0].x, dom.props.path[0].y)
    Core.context().quadraticCurveTo(dom.props.path[1].x, dom.props.path[1].y, dom.props.path[2].x, dom.props.path[2].y)
  },
}

export default App