import React from './CanvasXML.React'
import ReactCanvas2dTag from './CanvasXML.ReactCanvas2d.Tag'
import ReactCanvas2dUtils from './CanvasXML.ReactCanvas2d.Utils'
import ReactCanvas2dEvent from './CanvasXML.ReactCanvas2d.Event'

import Location from './CanvasXML.Location'

var dpr
var canvas
var context

const mount = (element, option) => {
  dpr = option.drp || 2
  canvas = option.canvas

  context = canvas.getContext('2d')

  const flex = () => {
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    canvas.coordinate = Location.coordinate({ x: 0, y: 0, w: canvas.width, h: canvas.height })
  }

  flex()

  const resizeObserver = new window.ResizeObserver(en => {
    flex()
    React.shouldRender(React.renderQueueNode())
  })

  resizeObserver.observe(canvas)

  ReactCanvas2dEvent.removeEventListenerWithCanvas(canvas)
  ReactCanvas2dEvent.addEventListenerWithCanvas(canvas)

  React.mount(renderListener, element, option.renderFrameTimeDiffMax)

  return { render: React.render }
}

const renderListener = (node) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  ReactCanvas2dEvent.clearEventListener()

  const root = createDom({ element: { props: canvas.coordinate }, children: [node] })

  const dom = renderDom(root)

  relocation(dom)
  rerender(dom)
}

const createDom = (node) => {
  return { ...node, props: { ...node.element.props } }
}

const renderDom = (dom) => {
  while (dom.children.some(i => i.type !== 2)) {
    dom.children = dom.children.map(i => i.type !== 2 ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => renderDom({ ...createDom(i), parent: dom }))

  dom.getDomById = (id) => ReactCanvas2dUtils.getDomById(dom, id)

  return dom
}

const relocation = (dom) => {
  if (ReactCanvas2dTag.pick(dom.element.tag) !== undefined) {
    ReactCanvas2dTag.pick(dom.element.tag).locationMount(dom)
    if (typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom)
  }

  if (dom.children) {
    dom.children.forEach(i => relocation(i))
  }

  if (ReactCanvas2dTag.pick(dom.element.tag) !== undefined) {
    ReactCanvas2dTag.pick(dom.element.tag).locationUnmount(dom)
    if (typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom)
  }
}

const rerender = (dom) => {
  if (ReactCanvas2dTag.pick(dom.element.tag) !== undefined) {
    ReactCanvas2dTag.pick(dom.element.tag).renderMount(dom)
    if (typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom)
  }

  if (dom.children) {
    dom.children.toSorted((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i))
  }

  if (ReactCanvas2dTag.pick(dom.element.tag) !== undefined) {
    ReactCanvas2dTag.pick(dom.element.tag).renderUnmount(dom)
    if (typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom)
  }
}


const ReactCanvas2d = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount, relocation }

export default ReactCanvas2d