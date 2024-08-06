import Core from './Core'
import Tag from './Module.Tag'

const cover = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5
  return distance <= radius
}

const App = {
  locationMount: (dom) => {
    Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Tag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    Tag.renderMount_0(dom)
    Core.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)
    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
    Tag.renderUnmount_1(dom, (x, y) => cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise))
  },
}

export default App