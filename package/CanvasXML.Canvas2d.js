import Tag from './CanvasXML.Canvas2d.Tag'
import Event from './CanvasXML.Canvas2d.Event'
import Location from './CanvasXML.Canvas2d.Location'

var canvas
var context
var dpr
var rect

const mount = (canvas_0, context_0, dpr_0, rect_0) => {
  canvas = canvas_0
  context = context_0
  dpr = dpr_0
  rect = rect_0

  Event.removeEventListenerWithCanvas(canvas)
  Event.addEventListenerWithCanvas(canvas)
}

const render = (dom) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  Event.clearEventListener()

  Tag.relocation(dom)
  Tag.rerender(dom)
}

const updateRect = (value) => {
  rect = value
}

const Export = { dpr: () => dpr, canvas: () => canvas, context: () => context, rect: () => rect, updateRect, mount, render, Tag, Event, Location }

export default Export