import Core from './Core'

const coverRect = (targetX, targetY, rectX, rectY, rectWidth, rectHeight) => {
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight
}

const App = {
  onRenderMounting: (dom) => {
    Core.context().rect(dom.props.x, dom.props.y, dom.props.w, dom.props.h)
  },
  onRenderUnmounting: (dom) => {
    dom._cover = (x, y) => coverRect(x, y, dom.props.x, dom.props.y, dom.props.w, dom.props.h)
  },
}

export default App