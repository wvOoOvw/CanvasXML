import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

import Component from './CanvasXML.ReactCanvas2d.Component'
import Plugin from './CanvasXML.ReactCanvas2d.Plugin'
import Utils from './CanvasXML.ReactCanvas2d.Utils'


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
  const dom = createDom({ element: { props: Canvas2d.canvas().coordinate }, children: [node] })
  const domCanvas2d = renderDom(dom)
  Canvas2d.render(domCanvas2d)
}

const update = () => {
  Canvas2d.update()
  React.shouldRender(React.renderQueueNode())
}

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 12

  Canvas2d.mount(canvas, dpr)
  React.mount(element, renderFrameTimeDiffMax, renderCanvas)

  return { render: React.render }
}

const ReactCanvas2d = { update, mount, Component, Plugin, Utils }

export default ReactCanvas2d