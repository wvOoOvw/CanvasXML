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

const collisions = (dom0, dom1) => {
  if (dom0.tag === 'circle' && dom1.tag === 'circle') {
    return Graph.intersectionCircleCircle(dom0, dom1)
  }

  if (dom0.tag === 'rect' && dom1.tag === 'rect') {
    return Graph.intersectionPolygonPolygon(Graph.conversionRectPoint(dom0), Graph.conversionRectPoint(dom1))
  }

  if (dom0.tag === 'circle' && dom1.tag === 'rect') {
    return Graph.conversionRectPoint(dom1).some(i => Graph.intersectionLineCircle(i, dom0))
  }

  if (dom0.tag === 'rect' && dom1.tag === 'circle') {
    return Graph.conversionRectPoint(dom0).some(i => Graph.intersectionLineCircle(i, dom1))
  }
}

export { distance, move, collisions }