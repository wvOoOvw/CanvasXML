import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

var events = []

const addEventListener = (type, callback) => {
  if (callback) events = [...events, { type, callback }]
}

const removeEventListener = (type, callback) => {
  if (callback) events = events.filter(i => i.type !== type || i.callback !== callback)
}

const useEventListener = (type, callback) => {
  React.useEffectImmediate(() => { if (callback) addEventListener(type, callback) }, [type, callback])
  React.useEffectImmediate(() => { if (callback) return () => removeEventListener(type, callback) }, [type, callback])
}

const clearEventListener = () => {
  events = []
}

const execute = (e, type) => {
  const exe = events
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

    if (window.ontouchstart === undefined) x = e.pageX
    if (window.ontouchstart === undefined) y = e.pageY
    if (window.ontouchstart !== undefined) x = e.changedTouches
    if (window.ontouchstart !== undefined) y = e.changedTouches

    x = x * ReactDom.dpr()
    y = y * ReactDom.dpr()

    const re = {
      native: e,
      x: x,
      y: y,
      stopPropagation: () => stopPropagation = true
    }

    if (stopPropagation === false) i.callback(re)
  })
}

const addEventListenerWithCanvas = (canvas) => {
  new Array('click', 'touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup').forEach(type => {
    canvas.addEventListener(type, e => execute(e, type), { passive: true })
  })
}

const ReactDomEvent = { addEventListener, removeEventListener, clearEventListener, useEventListener, addEventListenerWithCanvas }

export default ReactDomEvent