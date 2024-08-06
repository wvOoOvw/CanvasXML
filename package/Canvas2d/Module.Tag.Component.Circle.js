import Core from './Core'
import Tag from './Module.Tag'

const cover = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5
  const atan = Math.atan2(targetY - circleY, targetX - circleX)
  const angle = atan + (atan < 0 ? Math.PI * 2 : 0)

  var sAngleUse = sAngle
  var eAngleUse = eAngle
  var counterclockwiseUse = counterclockwise

  if (Boolean(counterclockwise) === true && sAngle > eAngle && sAngle - eAngle >= Math.PI * 2) {
    sAngleUse = Math.PI * 2
    eAngleUse = 0
  }

  if (Boolean(counterclockwise) !== true && sAngle < eAngle && eAngle - sAngle >= Math.PI * 2) {
    sAngleUse = 0
    eAngleUse = Math.PI * 2
  }

  while (sAngleUse > Math.PI * 2) sAngleUse = sAngleUse - Math.PI * 2
  while (eAngleUse > Math.PI * 2) eAngleUse = eAngleUse - Math.PI * 2
  while (sAngleUse < 0) sAngleUse = sAngleUse + Math.PI * 2
  while (eAngleUse < 0) eAngleUse = eAngleUse + Math.PI * 2

  if (Boolean(counterclockwise) === true && sAngleUse > eAngleUse) {
    counterclockwiseUse = !Boolean(counterclockwise)
    var [sAngleUse, eAngleUse] = [eAngleUse, sAngleUse]
  }

  if (Boolean(counterclockwise) !== true && sAngleUse > eAngleUse) {
    counterclockwiseUse = !Boolean(counterclockwise)
    var [sAngleUse, eAngleUse] = [eAngleUse, sAngleUse]
  }

  if (Boolean(counterclockwiseUse) === true) {
    return distance <= radius && (angle <= sAngleUse || angle >= eAngleUse)
  }

  if (Boolean(counterclockwiseUse) !== true) {
    return distance <= radius && (angle >= sAngleUse && angle <= eAngleUse)
  }
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

    Core.context().moveTo(dom.props.cx, dom.props.cy)
    Core.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)
    Core.context().lineTo(dom.props.cx, dom.props.cy)

    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
    Tag.renderUnmount_1(dom, (x,y) => cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise))
  },
}

export default App