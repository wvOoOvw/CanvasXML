import * as Canvas2dExtensions from '../../package/Canvas2dExtensions'

const collisions = (a, b) => {
  if ((a.shape === 'circle' || a.shape === 'arc') && (b.shape === 'circle' || b.shape === 'arc')) {
    return Canvas2dExtensions.Graph.intersectionCircleCircle(a, b)
  }

  if (a.shape === 'rect' && b.shape === 'rect') {
    return Canvas2dExtensions.Graph.intersectionPolygonPolygon(Canvas2dExtensions.Graph.conversionRectPoint(a), Canvas2dExtensions.Graph.conversionRectPoint(b))
  }

  if ((a.shape === 'circle' || a.shape === 'arc') && b.shape === 'rect') {
    return Canvas2dExtensions.Graph.conversionRectLine(b).some(line => Canvas2dExtensions.Graph.intersectionLineCircle(line, a))
  }

  if (a.shape === 'rect' && (b.shape === 'circle' || b.shape === 'arc')) {
    return Canvas2dExtensions.Graph.conversionRectLine(a).some(line => Canvas2dExtensions.Graph.intersectionLineCircle(line, b))
  }
}

export { collisions }