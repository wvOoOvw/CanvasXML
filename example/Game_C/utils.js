import { Graph } from '../../package/Canvas2d'

const collisions = (a, b) => {
  if ((a.shape === 'circle' || a.shape === 'arc') && (b.shape === 'circle' || b.shape === 'arc')) {
    return Graph.intersectionCircleCircle(a, b)
  }

  if (a.shape === 'rect' && b.shape === 'rect') {
    return Graph.intersectionPolygonPolygon(Graph.conversionRectPoint(a), Graph.conversionRectPoint(b))
  }

  if ((a.shape === 'circle' || a.shape === 'arc') && b.shape === 'rect') {
    return Graph.conversionRectLine(b).some(line => Graph.intersectionLineCircle(line, a))
  }

  if (a.shape === 'rect' && (b.shape === 'circle' || b.shape === 'arc')) {
    return Graph.conversionRectLine(a).some(line => Graph.intersectionLineCircle(line, b))
  }
}

export { collisions }