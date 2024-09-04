import Canvas from './Module.Canvas'
import Event from './Module.Event'
import Tag from './Module.Tag'

var canvas
var context
var dpr
var rect

var offscreenCanvas
var offscreenContext

const update = () => {
  rect = canvas.getBoundingClientRect()

  rect.x = rect.x
  rect.y = rect.y

  if (rect.x === undefined) rect.x = rect.left
  if (rect.y === undefined) rect.y = rect.top

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  offscreenCanvas.width = rect.width * dpr
  offscreenCanvas.height = rect.height * dpr
}

const mount = (canvas_0, dpr_0) => {
  canvas = canvas_0
  dpr = dpr_0

  context = canvas.getContext('2d')

  offscreenCanvas = Canvas.createOffscreenCanvas(0, 0)
  offscreenContext = offscreenCanvas.getContext('2d')

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


export default { dpr: () => dpr, canvas: () => canvas, context: () => context, rect: () => rect, offscreenCanvas: () => offscreenCanvas, offscreenContext: () => offscreenContext, mount, unMount, render, update }