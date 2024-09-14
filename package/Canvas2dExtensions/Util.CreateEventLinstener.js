const createEventLinstener = () => {
  var event = []
  var eventWithCanvas = []

  const execute = (e, type, option) => {
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

      if (e.pageX) x = (e.pageX - option.rect.x) * option.dpr
      if (e.pageY) y = (e.pageY - option.rect.y) * option.dpr

      if (e.changedTouches) xs = [...e.changedTouches].map(i => (i.pageX - option.rect.x) * option.dpr)
      if (e.changedTouches) ys = [...e.changedTouches].map(i => (i.pageY - option.rect.y) * option.dpr)

      if (window.ontouchstart === undefined) device = 'mouse'
      if (window.ontouchstart !== undefined) device = 'touch'

      if (x === undefined && xs === undefined) return
      if (y === undefined && ys === undefined) return

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

  const addEventListener = (type, callback, option) => {
    if (type === 'pointerdown') type = window.ontouchstart === undefined ? 'mousedown' : 'touchstart'
    if (type === 'pointermove') type = window.ontouchstart === undefined ? 'mousemove' : 'touchmove'
    if (type === 'pointerup') type = window.ontouchstart === undefined ? 'mouseup' : 'touchend'
    if (callback) event = [...event, { type, callback, option }]
  }

  const removeEventListener = (type, callback) => {
    if (callback) event = event.filter(i => i.type !== type || i.callback !== callback)
  }

  const clearEventListener = () => {
    event = []
  }

  const addEventListenerWithCanvas = (canvas, option) => {
    const add = (type) => {
      const event = e => execute(e, type, option)
      canvas.addEventListener(type, event, { passive: true })
      eventWithCanvas.push({ type, event, canvas })
    }

    if (window.ontouchstart !== undefined) {
      new Array('touchstart', 'touchmove', 'touchend').forEach(i => {
        if (eventWithCanvas.every(n => n.canvas !== i.canvas && n.type !== i)) add(i)
      })
    }

    if (window.ontouchstart === undefined) {
      new Array('mousedown', 'mousemove', 'mouseup').forEach(i => {
        if (eventWithCanvas.every(n => n.canvas !== i.canvas && n.type !== i)) add(i)
      })
    }
  }

  const removeEventListenerWithCanvas = (canvas) => {
    eventWithCanvas.forEach(i => {
      if (i.canvas === canvas) {
        i.canvas.removeEventListener(i.type, i.event)
        eventWithCanvas = eventWithCanvas.filter(n => n !== i)
      }
    })
  }

  const clearEventListenerWithCanvas = () => {
    eventWithCanvas.forEach(i => {
      i.canvas.removeEventListener(i.type, i.event)
      eventWithCanvas = eventWithCanvas.filter(n => n !== i)
    })
  }

  return { addEventListener, removeEventListener, clearEventListener, addEventListenerWithCanvas, removeEventListenerWithCanvas, clearEventListenerWithCanvas }
}

export default createEventLinstener