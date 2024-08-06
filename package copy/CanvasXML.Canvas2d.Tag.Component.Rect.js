import Canvas2d from './CanvasXML.Canvas2d'

const coverRect = (targetX, targetY, rectX, rectY, rectWidth, rectHeight) => {
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight
}

const App = {
  locationMount: (dom) => {
    Canvas2d.Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    Canvas2d.Tag.renderMount_0(dom)

    Canvas2d.context().rect(dom.props.x, dom.props.y, dom.props.w, dom.props.h)

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
    Canvas2d.Tag.renderUnmount_1(dom, (x, y) => coverRect(x, y, dom.props.x, dom.props.y, dom.props.w, dom.props.h))
  },
}

export default App