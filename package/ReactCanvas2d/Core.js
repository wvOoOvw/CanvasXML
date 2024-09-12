import React from '../React'
import Canvas2d from '../Canvas2d'

import { Canvas } from '../Canvas2d'

import CanvasLayout from '../ReactCanvas2dExtensions/Component.CanvasLayout'
import PoweredBy from '../ReactCanvas2dExtensions/Component.PoweredBy'

const findRootDom = (node) => {
  var dom
  var nodes = [node]

  while (dom === undefined || dom.type !== 'string') {
    dom = nodes.find(i => i.type === 'string')
    nodes = nodes.map(i => i.children).flat()
  }

  return dom
}

const renderDom = (node) => {
  const dom = { element: node.element, children: node.children }

  while (dom.children.some(i => i.type !== 'string')) {
    dom.children = dom.children.map(i => i.type !== 'string' ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => renderDom(i))
  dom.children.forEach(i => i.parent = dom)

  return dom
}

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component

  if (Boolean(powered) === true) Component = <CanvasLayout><PoweredBy>{element}</PoweredBy></CanvasLayout>
  if (Boolean(powered) !== true) Component = <CanvasLayout>{element}</CanvasLayout>

  Canvas2d.mount(canvas, dpr)
  React.mount(Component, renderFrameTimeDiffMax, (node) => Canvas2d.render(renderDom(findRootDom(node))))

  return { render: React.render }
}

const unMount = () => {
  Canvas2d.unMount()
  React.unmount()
}

const update = () => {
  Canvas2d.update()
  React.shouldRender(React.renderQueueNode())
}

export default { mount, unMount, update }