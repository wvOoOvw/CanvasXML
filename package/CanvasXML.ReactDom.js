import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
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
    ReactDomEvent.removeEventListenerWithCanvas(canvas)
    ReactDomEvent.addEventListenerWithCanvas(canvas)
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

  renderView(dom)
}

const createDom = (node) => {
  return { ...node, props: { ...node.element.props } }
}

const renderDom = (dom) => {
  while (dom.children.some(i => i.type !== 0b00000010)) {
    dom.children = dom.children.map(i => i.type !== 0b00000010 ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => renderDom({ ...createDom(i), parent: dom }))

  return dom
}

const renderView = (dom) => {
  if (dom.props.key === 'x') console.log(dom)

  if (ReactDomTag.pick(dom.element.alternate) !== undefined) {
    ReactDomTag.pick(dom.element.alternate).renderMount(dom)
  }

  if (dom.children) {
    dom.children.forEach(i => renderView(i))
  }

  if (typeof dom.props.ref === 'function') dom.props.ref(dom)

  if (ReactDomTag.pick(dom.element.alternate) !== undefined) {
    ReactDomTag.pick(dom.element.alternate).renderUnmount(dom)
  }
}


const ReactDom = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount, createDom, renderDom, renderView }

export default ReactDom