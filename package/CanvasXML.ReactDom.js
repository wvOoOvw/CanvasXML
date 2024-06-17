import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

import Position from './CanvasXML.Position'

var dpr
var canvas
var context


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

    canvas.coordinate = Position.coordinate({ x: 0, y: 0, w: canvas.width, h: canvas.height })
  }

  const resize = () => {
    flex()
    ReactDomEvent.removeEventListenerWithCanvas(canvas)
    ReactDomEvent.addEventListenerWithCanvas(canvas)
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

  ReactDomEvent.removeEventListenerWithCanvas(canvas)
  ReactDomEvent.addEventListenerWithCanvas(canvas)

  React.mount(renderListener, option.frameTimeDiffMax)

  return { render: () => React.render(component) }
}

const renderListener = (node) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  ReactDomEvent.clearEventListener()

  const dom = createDom(node)

  renderDom(dom)

  console.log(window.t)
}

const createDom = (node) => {
  const dom = { ...node }

  while (dom.children.some(i => i.type !== 0b0010)) {
    dom.children = dom.children.map(i => i.type !== 0b0010 ? i.children : i).flat()
  }

  dom.children = dom.children.map(createDom)

  dom.children.forEach(i => i.parent = node)

  return dom
}

const renderDom = (dom) => {
  window.t = window.t ? window.t + 1 : 1

  if (ReactDomTag.pick(dom.alternate) !== undefined) {
    ReactDomTag.pick(dom.alternate).renderMount({ ...dom.element.props, children: dom.children }, dom)
  }

  if (dom.children) {
    dom.children.forEach(i => renderDom(i))
  }

  if (ReactDomTag.pick(dom.alternate) !== undefined) {
    ReactDomTag.pick(dom.alternate).renderUnmount({ ...dom.element.props, children: dom.children }, dom)
  }
}


const ReactDom = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount }

export default ReactDom