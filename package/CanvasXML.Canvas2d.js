import Tag from './CanvasXML.Canvas2d.Tag'
import Event from './CanvasXML.Canvas2d.Event'
import Location from './CanvasXML.Canvas2d.Location'

var canvas
var context
var dpr

const mount = (canvas_0, context_0, dpr_0) => {
  canvas = canvas_0
  context = context_0
  dpr = dpr_0

  Event.removeEventListenerWithCanvas(canvas)
  Event.addEventListenerWithCanvas(canvas)
}

const render = (dom) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  Event.clearEventListener()

  Tag.relocation(dom)
  Tag.rerender(dom)
}

const Export = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount, render, Tag, Event, Location }

export default Export