import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

const getDomById = (dom, id) => {
  if (dom.props.id === id) return dom
  if (dom.props.id !== id && dom.children !== undefined) return  dom.children.find((i) => getDomById(i, id))
  if (dom.props.id !== id && dom.children === undefined) return  undefined
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

const update = () => {
  Canvas2d.update()
  React.shouldRender(React.renderQueueNode())
}

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component

  if (Boolean(powered) === true) Component = <PoweredBy>{element}</PoweredBy>
  if (Boolean(powered) !== true) Component = element

  Canvas2d.mount(canvas, dpr)
  React.mount(Component, renderFrameTimeDiffMax, (node) => Canvas2d.render(renderDom(createDom(node))))

  return { render: React.render }
}

const unMount = () => {
  Canvas2d.unMount()
  React.unmount()
}

const ReactCanvas2d = { update, mount, unMount }

export default ReactCanvas2d