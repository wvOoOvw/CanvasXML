import Core from './Core'
import Tag from './Module.Tag'

const circleCenterDistance = (targetX, targetY, circleX, circleY) => {
  return (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5
}

const circleCenterAngle = (targetX, targetY, circleX, circleY) => {
  var angle = Math.atan2(targetY - circleY, targetX - circleX)
  if (angle < 0) angle = angle + Math.PI * 2
  return angle
}

const coverRectRadius = (targetX, targetY, rectX, rectY, rectWidth, rectHeight, radius) => {
  const coverRectIn = targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight

  if (
    coverRectIn === true &&
    targetX > rectX + rectWidth / 2 &&
    targetY > rectY + rectHeight / 2 &&
    circleCenterDistance(targetX, targetY, rectX + rectWidth - radius[2], rectY + rectHeight - radius[2]) > radius[2] &&
    circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[2], rectY + rectHeight - radius[2]) > Math.PI * 0 &&
    circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[2], rectY + rectHeight - radius[2]) < Math.PI * 0.5
  ) {
    return false
  }

  if (
    coverRectIn === true &&
    targetX < rectX + rectWidth / 2 &&
    targetY > rectY + rectHeight / 2 &&
    circleCenterDistance(targetX, targetY, rectX + radius[3], rectY + rectHeight - radius[3]) > radius[3] &&
    circleCenterAngle(targetX, targetY, rectX + radius[3], rectY + rectHeight - radius[3]) > Math.PI * 0.5 &&
    circleCenterAngle(targetX, targetY, rectX + radius[3], rectY + rectHeight - radius[3]) < Math.PI * 1
  ) {
    return false
  }

  if (
    coverRectIn === true &&
    targetX < rectX + rectWidth / 2 &&
    targetY < rectY + rectHeight / 2 &&
    circleCenterDistance(targetX, targetY, rectX + radius[0], rectY + radius[0]) > radius[0] &&
    circleCenterAngle(targetX, targetY, rectX + radius[0], rectY + radius[0]) > Math.PI * 1 &&
    circleCenterAngle(targetX, targetY, rectX + radius[0], rectY + radius[0]) < Math.PI * 1.5
  ) {
    return false
  }

  if (
    coverRectIn === true &&
    targetX > rectX + rectWidth / 2 &&
    targetY < rectY + rectHeight / 2 &&
    circleCenterDistance(targetX, targetY, rectX + rectWidth - radius[1], rectY + radius[1]) > radius[1] &&
    circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[1], rectY + radius[1]) > Math.PI * 1.5 &&
    circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[1], rectY + radius[1]) < Math.PI * 2
  ) {
    return false
  }

  return coverRectIn
}

const fillRadius = (radius) => {
  var rRadius = new Array(4).fill(0)

  if (radius && typeof radius === 'object') rRadius = radius
  if (radius && typeof radius === 'number') rRadius = new Array(4).fill(radius)

  return rRadius
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

    const radius = fillRadius(dom.props.radius)

    radius.forEach((i, index) => {
      if (radius[index] > dom.props.w / 2) radius[index] = dom.props.w / 2
      if (radius[index] > dom.props.h / 2) radius[index] = dom.props.h / 2
      if (radius[index] < 0) radius[index] = 0
    })

    Core.context().moveTo(dom.props.x, dom.props.y + radius[0])
    Core.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0])
    Core.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y)
    Core.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1])
    Core.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2])
    Core.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2])
    Core.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h)
    Core.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3])
    Core.context().lineTo(dom.props.x, dom.props.y + radius[0])

    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
    renderUnmount_1(dom, (x, y) => coverRectRadius(x, y, dom.props.x, dom.props.y, dom.props.w, dom.props.h, fillRadius(dom.props.radius)))
  },
}

export default App