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

  renderDom(createDom(node))
}

const createDom = (node) => {
  if (!node.alternate) return

  const dom = { ...node, children: node.children.map(i => i) }

  while (dom.children.some((i) => i && typeof i.alternate !== "string")) {
    dom.children.forEach((i, index) => { if (typeof i.alternate !== "string") dom.children[index] = i.children })
    dom.children = dom.children.flat().filter(Boolean)
  }

  return {
    ...dom,
    children: dom.children.map(createDom).filter(Boolean).map(i => Object({ ...i, parent: dom }))
  }
}

const renderDom = (dom) => {
  if (typeof dom.alternate === 'string' && ReactDomTag.render(dom.alternate)) {
    ReactDomTag.renderBefore({ ...dom.element.props, children: dom.children }, dom)

    ReactDomTag.render(dom.alternate)({ ...dom.element.props, children: dom.children }, dom)

    ReactDomTag.renderAfter({ ...dom.element.props, children: dom.children }, dom)
  }

  if (dom.children) {
    dom.children.forEach(i => renderDom(i))
  }

  if (typeof dom.alternate === 'string' && ReactDomTag.render(dom.alternate)) {
    ReactDomTag.renderEnd({ ...dom.element.props, children: dom.children }, dom)
  }
}


const ReactDom = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount }

export default ReactDom