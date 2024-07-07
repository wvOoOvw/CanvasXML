import Canvas2d from './CanvasXML.Canvas2d'

const coverRect = (targetX, targetY, rectX, rectY, rectWidth, rectHeight) => {
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight
}

const distanceCircleCenter = (targetX, targetY, circleX, circleY) => {
  const x = Math.abs(targetX - circleX)
  const y = Math.abs(targetY - circleY)
  return (x ** 2 + y ** 2) ** 0.5
}

const coverRectRadius = (targetX, targetY, rectX, rectY, rectWidth, rectHeight, radius) => {
  const coverRectIn = coverRect(targetX, targetY, rectX, rectY, rectWidth, rectHeight)
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + radius, rectY + radius) > radius) return false
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + rectWidth - radius, rectY + radius) > radius) return false
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + radius, rectY + rectHeight - radius) > radius) return false
  if (coverRectIn === false && distanceCircleCenter(targetX, targetY, rectX + rectWidth - radius, rectY + rectHeight - radius) > radius) return false
  return coverRectIn
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

    var radius = new Array(4).fill(0)

    if (dom.props.radius && typeof dom.props.radius === 'object') radius = dom.props.radius
    if (dom.props.radius && typeof dom.props.radius === 'number') radius = new Array(4).fill(dom.props.radius)

    radius.forEach((i, index) => {
      if (radius[index] > dom.props.w / 2) radius[index] = dom.props.w / 2
      if (radius[index] > dom.props.h / 2) radius[index] = dom.props.h / 2
      if (radius[index] < 0) radius[index] = 0
    })

    Canvas2d.context().moveTo(dom.props.x, dom.props.y + radius[0])
    Canvas2d.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0])
    Canvas2d.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y)
    Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1])
    Canvas2d.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2])
    Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2])
    Canvas2d.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h)
    Canvas2d.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3])
    Canvas2d.context().lineTo(dom.props.x, dom.props.y + radius[0])

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
    Canvas2d.Tag.renderUnmount_1(dom, e => coverRectRadius(e.x, e.y, dom.props.x, dom.props.y, dom.props.w, dom.props.h, dom.props.radius))
  },
}

export default App