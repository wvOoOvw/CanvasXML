import Canvas2d from './CanvasXML.Canvas2d'

const coverRectRadius = (targetX, targetY, rectX, rectY, rectWidth, rectHeight, radius) => {
  const coverRectIn = targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight

  if (coverRectIn === false) {
    const atan = Math.atan2(targetY - circleY, targetX - circleX)
    if ((Math.abs(targetX - (rectX + rectWidth - radius)) ** 2 + Math.abs(targetY - (rectY + rectHeight - radius)) ** 2) ** 0.5 > radius && atan > Math.PI * 0 && atan < Math.PI * 0.5) return false
    if ((Math.abs(targetX - (rectX + radius)) ** 2 + Math.abs(targetY - (rectY + rectHeight - radius)) ** 2) ** 0.5 > radius && atan > Math.PI * 0.5 && atan < Math.PI * 1) return false
    if ((Math.abs(targetX - (rectX + radius)) ** 2 + Math.abs(targetY - (rectY + radius)) ** 2) ** 0.5 > radius && atan > Math.PI * 1 && atan < Math.PI * 1.5) return false
    if ((Math.abs(targetX - (rectX + rectWidth - radius)) ** 2 + Math.abs(targetY - (rectY + radius)) ** 2) ** 0.5 > radius && atan > Math.PI * 1.5 && atan < Math.PI * 2) return false
  }

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