const App = {
  onConstructMounted: (dom) => {
    dom.props.radius = dom.element.props.radius
    dom.props.sAngle = dom.element.props.sAngle
    dom.props.eAngle = dom.element.props.eAngle
    dom.props.counterclockwise = dom.element.props.counterclockwise
  },

  onLocationMount: (dom) => {
    if (dom.props.w === undefined && dom.props.radius !== undefined) dom.props.w = dom.props.radius * 2
    if (dom.props.h === undefined && dom.props.radius !== undefined) dom.props.h = dom.props.radius * 2
  },

  onRenderMount: (dom) => {
    if (dom.props.sAngle === undefined) dom.props.sAngle = Math.PI * 0
    if (dom.props.eAngle === undefined) dom.props.eAngle = Math.PI * 2
    if (dom.props.counterclockwise === undefined) dom.props.counterclockwise = false

    dom.path = (context) => {
      context.arc(dom.props.x, dom.props.y, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)
    }
  },
}

export default App