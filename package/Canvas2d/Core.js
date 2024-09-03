import Tag from './Module.Tag'
import Event from './Module.Event'

var canvas
var context
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
}

const mount = (canvas_0, dpr_0) => {
  canvas = canvas_0
  dpr = dpr_0

  context = canvas.getContext('2d')

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


export default { dpr: () => dpr, canvas: () => canvas, context: () => context, rect: () => rect, mount, unMount, render, update }