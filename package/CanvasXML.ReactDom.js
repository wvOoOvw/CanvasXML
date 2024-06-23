import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomUtils from './CanvasXML.ReactDom.Utils'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

import Location from './CanvasXML.Location'

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

    canvas.coordinate = Location.coordinate({ x: 0, y: 0, w: canvas.width, h: canvas.height })
  }

  const resize = () => {
    flex()
    React.shouldRender(React.renderQueueNode())
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

  const root = createDom({ element: { props: canvas.coordinate }, children: [node] })

  const dom = renderDom(root)

  relocation(dom)
  rerender(dom)
}

const createDom = (node) => {
  return { ...node, props: { ...node.element.props } }
}

const renderDom = (dom) => {
  while (dom.children.some(i => i.type !== 0b00000010)) {
    dom.children = dom.children.map(i => i.type !== 0b00000010 ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => renderDom({ ...createDom(i), parent: dom }))

  dom.getDomById = (id) => ReactDomUtils.getDomById(dom, id)

  return dom
}

const relocation = (dom) => {
  if (ReactDomTag.pick(dom.element.alternate) !== undefined) {
    ReactDomTag.pick(dom.element.alternate).locationMount(dom)
    if (typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom)
  }

  if (dom.children) {
    dom.children.forEach(i => relocation(i))
  }

  if (ReactDomTag.pick(dom.element.alternate) !== undefined) {
    ReactDomTag.pick(dom.element.alternate).locationUnmount(dom)
    if (typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom)
  }
}

const rerender = (dom) => {
  if (ReactDomTag.pick(dom.element.alternate) !== undefined) {
    ReactDomTag.pick(dom.element.alternate).renderMount(dom)
    if (typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom)
  }

  if (dom.children) {
    dom.children.forEach(i => rerender(i))
  }

  if (ReactDomTag.pick(dom.element.alternate) !== undefined) {
    ReactDomTag.pick(dom.element.alternate).renderUnmount(dom)
    if (typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom)
  }
}


const ReactDom = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount, relocation }

export default ReactDom