import Canvas2d from './CanvasXML.Canvas2d'

var event = []
var eventWithCanvas = []

const addEventListener = (type, callback) => {
  if (callback) event = [...event, { type, callback }]
}

const removeEventListener = (type, callback) => {
  if (callback) event = event.filter(i => i.type !== type || i.callback !== callback)
}

const clearEventListener = () => {
  event = []
}

const execute = (e, type) => {
  const exe = event
    .filter(i => i.type === type)
    .sort((a, b) => {
      const a_ = a.option === undefined || a.option.priority === undefined ? 0 : a.option.priority
      const b_ = b.option === undefined || b.option.priority === undefined ? 0 : b.option.priority
      return b_ - a_
    })

  var stopPropagation = false

  exe.forEach(i => {
    var x
    var y
    var xs
    var ys
    var device

    if (e.pageX) x = (e.pageX - Canvas2d.rect().x) * Canvas2d.dpr()
    if (e.pageY) y = (e.pageY - Canvas2d.rect().y) * Canvas2d.dpr()

    if (e.changedTouches) xs = [...e.changedTouches].map(i => (i - Canvas2d.rect().x) * Canvas2d.dpr())
    if (e.changedTouches) ys = [...e.changedTouches].map(i => (i - Canvas2d.rect().y) * Canvas2d.dpr())

    if (window.ontouchstart === undefined) device = 'mouse'
    if (window.ontouchstart !== undefined) device = 'touch'

    if (x === undefined) x = xs[0]
    if (y === undefined) y = ys[0]

    if (xs === undefined) xs = [x]
    if (ys === undefined) ys = [y]

    const re = {
      native: e,
      x: x,
      y: y,
      xs: xs,
      ys: ys,
      device: device,
      stopPropagation: () => stopPropagation = true
    }

    if (stopPropagation === false) i.callback(re)
  })
}

const addEventListenerWithCanvas = (canvas) => {
  const add = (type) => {
    const event = e => execute(e, type)
    canvas.addEventListener(type, event, { passive: true })
    eventWithCanvas.push({ type, event })
  }

  new Array('click', 'pointerdown', 'pointermove', 'pointerup').forEach(add)

  if (window.ontouchstart !== undefined) {
    new Array('touchstart', 'touchmove', 'touchend', ).forEach(add)
  }

  if (window.ontouchstart === undefined) {
    new Array('mousedown', 'mousemove', 'mouseup').forEach(add)
  }
}

const removeEventListenerWithCanvas = (canvas) => {
  eventWithCanvas.forEach(i => canvas.removeEventListener(i.type, i.event))
  eventWithCanvas = []
}

const Canvas2dEvent = { addEventListener, removeEventListener, clearEventListener, addEventListenerWithCanvas, removeEventListenerWithCanvas }

export default Canvas2dEvent