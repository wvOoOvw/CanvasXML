import Core from './Core'

const App = {
  onLocationUnmounted: (dom) => {
    if (dom.path !== undefined) {
      dom._path = dom.path
    }
    if (dom.path === undefined) {
      dom._path = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)
    }
  },
  
  onRenderMounting: (dom) => {
    Core.context().moveTo(dom._path[0].x, dom._path[0].y)
    Core.context().quadraticCurveTo(dom._path[1].x, dom._path[1].y, dom._path[2].x, dom._path[2].y)
  },
}

export default App