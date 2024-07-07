import Canvas2d from './CanvasXML.Canvas2d'

const distanceCircleCenter = (targetX, targetY, circleX, circleY) => {
  const x = Math.abs(targetX - circleX)
  const y = Math.abs(targetY - circleY)
  return (x ** 2 + y ** 2) ** 0.5
}

const coverArc = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = distanceCircleCenter(targetX, targetY, circleX, circleY)
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
    Canvas2d.Tag.renderUnmount_1(dom, e => coverArc(e.x, e.y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise))
  },
}

export default App