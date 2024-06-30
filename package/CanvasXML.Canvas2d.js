import Tag from './CanvasXML.Canvas2d.Tag'
import Event from './CanvasXML.Canvas2d.Event'
import Location from './CanvasXML.Canvas2d.Location'

var canvas
var context
var dpr

const mount = (canvasFrom, contextFrom, dprFrom) => {
  canvas = canvasFrom
  context = contextFrom
  dpr = dprFrom
}

const Canvas2d = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount, Tag, Event, Location }

export default Canvas2d