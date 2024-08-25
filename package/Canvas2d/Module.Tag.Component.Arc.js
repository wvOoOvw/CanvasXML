import Core from './Core'
import Graph from './Module.Graph'

const cover = (targetX, targetY, circleX, circleY, radius) => {
  return (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5 <= radius
}

const App = {
  onLocationMount: (dom) => {
    if (dom.props.w === undefined && dom.props.radius) dom.props.w = dom.props.radius * 2
    if (dom.props.h === undefined && dom.props.radius) dom.props.h = dom.props.radius * 2
  },

  onRenderMounting: (dom) => {
    Core.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)
  },

  onRenderUnmounting: (dom) => {
    dom._cover = (x, y) => cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)
  },
}

export default App