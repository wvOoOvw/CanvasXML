import { Graph } from '../../package/Canvas2d'

const distance = (a, b) => {
  return ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5
}

const move = (a, b, distance) => {
  const dx = b.x - a.x
  const dy = b.y - a.y

  const abMagnitude = Math.sqrt(dx * dx + dy * dy)

  const normalizedDx = dx / abMagnitude
  const normalizedDy = dy / abMagnitude

  const displacementDx = distance * normalizedDx
  const displacementDy = distance * normalizedDy

  let r = {
    x: a.x + displacementDx,
    y: a.y + displacementDy
  }

  return r
}

const domCollisions = (dom0, dom1) => {
  if (dom0.element.tag === 'circle' && dom1.element.tag === 'circle') {
    return Graph.intersectionCircleCircle(dom0.props, dom1.props)
  }

  if (dom0.element.tag === 'rect' && dom1.element.tag === 'rect') {
    return Graph.intersectionPolygonPolygon(Graph.conversionRectPoint(dom0.props), Graph.conversionRectPoint(dom1.props))
  }

  if (dom0.element.tag === 'circle' && dom1.element.tag === 'rect') {
    return Graph.conversionRectLine(dom1.props).some(line => Graph.intersectionLineCircle(line, dom0.props))
  }

  if (dom0.element.tag === 'rect' && dom1.element.tag === 'circle') {
    return Graph.conversionRectLine(dom0.props).some(line => Graph.intersectionLineCircle(line, dom1.props))
  }
}

export { distance, move, domCollisions }