import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

import Component from './CanvasXML.ReactCanvas2d.Component'
import Plugin from './CanvasXML.ReactCanvas2d.Plugin'
import Utils from './CanvasXML.ReactCanvas2d.Utils'

var canvas
var context
var dpr

const mount = (element, canvas_Prop, option) => {
  var dpr_Prop = option && option.dpr || 2
  var renderFrameTimeDiffMax_Prop = option && option.renderFrameTimeDiffMax || 12

  canvas = canvas_Prop
  dpr = dpr_Prop

  context = canvas.getContext('2d')

  const flex = () => {
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    canvas.coordinate = Canvas2d.Location.coordinate({ x: 0, y: 0, w: canvas.width, h: canvas.height })
  }

  flex()

  const resizeObserver = new window.ResizeObserver(en => {
    flex()
    React.shouldRender(React.renderQueueNode())
  })

  resizeObserver.observe(canvas)

  Canvas2d.mount(canvas, context, dpr)

  Canvas2d.Event.removeEventListenerWithCanvas(canvas)
  Canvas2d.Event.addEventListenerWithCanvas(canvas)

  React.mount(element, renderFrameTimeDiffMax_Prop, renderListener)

  return { render: React.render }
}

const renderListener = (node) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  Canvas2d.Event.clearEventListener()

  const dom = renderDom(createDom({ element: { props: canvas.coordinate }, children: [node] }))

  Canvas2d.Tag.render(dom)
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


const ReactCanvas2d = { mount, Component, Plugin, Utils }

export default ReactCanvas2d