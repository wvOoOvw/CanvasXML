import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomEvent from './CanvasXML.ReactDom.Event'
import ReactDomEventDrag from './CanvasXML.ReactDom.Event.Drag'

import Position from './CanvasXML.Position'

var dpr
var canvas
var context
var coordinate

const mount = (component, option) => {
  const style = document.createElement('style')

  style.innerHTML =
    [
      `::-webkit-scrollbar { width: 0; height: 0; }`,
      `body { padding: 0; margin: 0; }`,
      `body, body * { overscroll-behavior: none; }`
    ]
      .join(' ')

  document.head.appendChild(style)

  window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
  window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
  window.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })

  dpr = 2
  canvas = document.createElement('canvas')
  context = canvas.getContext('2d')

  const flex = () => {
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    coordinate = Position.coordinate({ x: 0, y: 0, w: canvas.width, h: canvas.height })
  }

  const resize = () => {
    flex()
    React.shouldRender()
  }

  canvas.style.position = 'absolute'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.background = 'black'
  canvas.style.overflow = 'hidden'
  flex()
  window.addEventListener('resize', resize)
  document.body.appendChild(canvas)

  ReactDomEvent.addEventListenerWithCanvas(canvas)

  const renderUpdate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    renderCompoment(component)
  }

  React.mount(renderUpdate, option.frameTimeDiffMax)

  return { render: React.render }
}

const renderCompoment = (compoment) => {
  if (!compoment || typeof compoment !== 'object') return

  if (Array.isArray(compoment) === true) {
    compoment.forEach(i => renderCompoment(i))
  }

  if (Array.isArray(compoment) === false && typeof compoment.alternate === 'function') {
    React.compoment(compoment.alternate, compoment.props, result => renderCompoment(result))
  }

  if (Array.isArray(compoment) === false && typeof compoment.alternate === 'string') {
    const callback = (result) => {
      if (compoment.props && typeof compoment.props.onClick === 'function') ReactDomEvent.useEventListener('click', compoment.props.onClick)
      if (compoment.props && typeof compoment.props.onTouchStart === 'function') ReactDomEvent.useEventListener('touchstart', compoment.props.onTouchStart)
      if (compoment.props && typeof compoment.props.onTouchMove === 'function') ReactDomEvent.useEventListener('touchmove', compoment.props.onTouchMove)
      if (compoment.props && typeof compoment.props.onTouchEnd === 'function') ReactDomEvent.useEventListener('touchend', compoment.props.onTouchEnd)
      if (compoment.props && typeof compoment.props.onMouseUp === 'function') ReactDomEvent.useEventListener('mousedown', compoment.props.onMouseUp)
      if (compoment.props && typeof compoment.props.onMouseMove === 'function') ReactDomEvent.useEventListener('mousemove', compoment.props.onMouseMove)
      if (compoment.props && typeof compoment.props.onMouseUp === 'function') ReactDomEvent.useEventListener('mouseup', compoment.props.onMouseUp)
      if (compoment.props && typeof compoment.props.onDrag === 'object') ReactDomEventDrag.useDragControl(compoment.props.onDrag)

      renderCompoment(result)
    }

    React.compoment(ReactDomTag.render(compoment.alternate), compoment.props, callback)
  }

  if (Array.isArray(compoment) === false && compoment.children) {
    compoment.children.forEach(i => renderCompoment(i))
  }
}

const ReactDom = { dpr: () => dpr, canvas: () => canvas, context: () => context, coordinate: () => coordinate, mount }

export default ReactDom