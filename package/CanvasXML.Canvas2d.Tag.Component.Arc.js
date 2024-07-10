import Canvas2d from './CanvasXML.Canvas2d'

const cover = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5
  return distance <= radius
}

const App = {
  locationMount: (dom) => {
    Canvas2d.Tag.locationMount(dom, App)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom, App)
  },

  renderMount: (dom) => {
    Canvas2d.Tag.renderMount_0(dom, App)

    Canvas2d.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)

    Canvas2d.Tag.renderMount_1(dom, App)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom, App)
    Canvas2d.Tag.renderUnmount_1(dom, (x, y) => cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise))
  },
}

export default App