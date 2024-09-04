import React from '../React'
import Canvas2d from '../Canvas2d'

import CanvasLayout from '../ReactCanvas2dExtensions/Component.CanvasLayout'
import PoweredBy from '../ReactCanvas2dExtensions/Component.PoweredBy'

const translateNode = (node) => {
  const dom = { element: node.element, children: node.children }

  while (dom.children.some(i => i.type !== 0o00000100)) {
    dom.children = dom.children.map(i => i.type !== 0o00000100 ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => translateNode(i))
  dom.children.forEach(i => i.parent = dom)

  return dom
}

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component

  if (Boolean(powered) === true) Component = <root><CanvasLayout><PoweredBy>{element}</PoweredBy></CanvasLayout></root>
  if (Boolean(powered) !== true) Component = <root><CanvasLayout>{element}</CanvasLayout></root>

  Canvas2d.mount(canvas, dpr)
  React.mount(Component, renderFrameTimeDiffMax, (node) => Canvas2d.render(translateNode(node)))

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