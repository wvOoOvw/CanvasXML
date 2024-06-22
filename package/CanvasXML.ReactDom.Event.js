import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

var event = []

var eventWithCanvas = []

const addEventListener = (type, callback) => {
  if (callback) event = [...event, { type, callback }]
}

const removeEventListener = (type, callback) => {
  if (callback) event = event.filter(i => i.type !== type || i.callback !== callback)
}

const useEventListener = (type, callback) => {
  React.useEffectImmediate(() => { if (callback) addEventListener(type, callback) }, [type, callback])
  React.useEffectImmediate(() => { if (callback) return () => removeEventListener(type, callback) }, [type, callback])
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
    var device

    if (window.ontouchstart === undefined) x = e.pageX * ReactDom.dpr()
    if (window.ontouchstart === undefined) y = e.pageY * ReactDom.dpr()
    if (window.ontouchstart !== undefined) x = e.pageX ? [e.pageX * ReactDom.dpr()] : [...e.changedTouches].map(i => i * ReactDom.dpr())
    if (window.ontouchstart !== undefined) y = e.pageY ? [e.pageY * ReactDom.dpr()] : [...e.changedTouches].map(i => i * ReactDom.dpr())
    if (window.ontouchstart === undefined) device = 'mouse'
    if (window.ontouchstart !== undefined) device = 'touch'

    const re = {
      native: e,
      x: x,
      y: y,
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

  new Array('click').forEach(add)

  if (window.ontouchstart !== undefined) {
    new Array('touchstart', 'touchmove', 'touchend').forEach(add)
  }

  if (window.ontouchstart === undefined) {
    new Array('mousedown', 'mousemove', 'mouseup').forEach(add)
  }
}

const removeEventListenerWithCanvas = (canvas) => {
  eventWithCanvas.forEach(i => canvas.removeEventListener(i.type, i.event))
  eventWithCanvas = []
}

const ReactDomEvent = { addEventListener, removeEventListener, clearEventListener, useEventListener, addEventListenerWithCanvas, removeEventListenerWithCanvas }

export default ReactDomEvent