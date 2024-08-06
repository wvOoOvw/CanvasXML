import Core from './Core'
import Tag from './Module.Tag'

const coverRect = (targetX, targetY, rectX, rectY, rectWidth, rectHeight) => {
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight
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

    Core.context().rect(dom.props.x, dom.props.y, dom.props.w, dom.props.h)

    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
    Tag.renderUnmount_1(dom, (x, y) => coverRect(x, y, dom.props.x, dom.props.y, dom.props.w, dom.props.h))
  },
}

export default App