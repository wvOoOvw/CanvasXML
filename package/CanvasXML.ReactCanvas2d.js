import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

import Component from './CanvasXML.ReactCanvas2d.Component'
import Plugin from './CanvasXML.ReactCanvas2d.Plugin'
import Utils from './CanvasXML.ReactCanvas2d.Utils'


var canvas
var context
var dpr
var rect
var renderFrameTimeDiffMax

const resizeObserver = () => {
  const flex = () => {
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    canvas.coordinate = Canvas2d.Location.coordinate({ x: 0, y: 0, w: canvas.width, h: canvas.height })
  }

  flex()

  const resizeObserver = new window.ResizeObserver(() => {
    if (canvas.width !== canvas.offsetWidth * dpr || canvas.height !== canvas.offsetHeight * dpr) {
      flex()
      React.shouldRender(React.renderQueueNode())
    }
  })

  resizeObserver.observe(canvas)
}

const createDom = (node) => {
  return { ...node, props: { ...node.element.props } }
}

const renderDom = (dom) => {
  while (dom.children.some(i => i.type !== 2)) {
    dom.children = dom.children.map(i => i.type !== 2 ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => renderDom({ ...createDom(i), parent: dom }))

  dom.getDomById = (id) => Utils.getDomById(dom, id)

  return dom
}

const renderCanvas = (node) => {
  const dom = createDom({ element: { props: canvas.coordinate }, children: [node] })
  const domCanvas2d = renderDom(dom)
  Canvas2d.render(domCanvas2d)
}

const mount = (element, canvas_0, option) => {
  canvas = canvas_0
  context = canvas.getContext('2d')
  rect = canvas.getBoundingClientRect()
  dpr = option && option.dpr || 2
  renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 12

  resizeObserver()

  Canvas2d.mount(canvas, context, dpr, rect)

  React.mount(element, renderFrameTimeDiffMax, renderCanvas)

  return { render: React.render }
}

const updateRect = (value) => {
  rect = value
}

const ReactCanvas2d = { updateRect, mount, Component, Plugin, Utils }

export default ReactCanvas2d