import Canvas from './Module.Canvas'
import Event from './Module.Event'
import Tag from './Module.Tag'

var canvas
var context

var offscreenCanvasWithEvent
var offscreenContextWithEvent

var dpr
var rect

const update = () => {
  rect = canvas.getBoundingClientRect()

  rect.x = rect.x
  rect.y = rect.y

  if (rect.x === undefined) rect.x = rect.left
  if (rect.y === undefined) rect.y = rect.top

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  offscreenCanvasWithEvent.width = canvas.width
  offscreenCanvasWithEvent.height = canvas.height
}

const mount = (canvas0, dpr0) => {
  canvas = canvas0
  dpr = dpr0

  context = canvas.getContext('2d')

  offscreenCanvasWithEvent = Canvas.createOffscreenCanvas(0, 0)
  offscreenContextWithEvent = offscreenCanvasWithEvent.getContext('2d')

  update()

  Event.removeEventListenerWithCanvas(canvas)
  Event.addEventListenerWithCanvas(canvas)
}

const unMount = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  canvas = undefined
  context = undefined
  dpr = undefined
  rect = undefined

  Event.clearEventListener()
}

const render = (dom) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  Event.clearEventListener()

  Tag.onConstruct(dom)
  Tag.onLocation(dom)
  Tag.onRender(dom)
}


export default { dpr: () => dpr, canvas: () => canvas, context: () => context, rect: () => rect, offscreenCanvasWithEvent: () => offscreenCanvasWithEvent, offscreenContextWithEvent: () => offscreenContextWithEvent, mount, unMount, render, update }