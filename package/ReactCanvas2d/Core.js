import React from '../React'
import Canvas2d from '../Canvas2d'

import { Canvas } from '../Canvas2d'

import CanvasLayout from '../ReactCanvas2dExtensions/Component.CanvasLayout'
import PoweredBy from '../ReactCanvas2dExtensions/Component.PoweredBy'

import findDom from './Util.FindDom'
import createDom from './Util.CreateDom'

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component

  if (Boolean(powered) === true) Component = <CanvasLayout><PoweredBy>{element}</PoweredBy></CanvasLayout>
  if (Boolean(powered) !== true) Component = <CanvasLayout>{element}</CanvasLayout>

  Canvas2d.mount(canvas, dpr)
  React.mount(Component, renderFrameTimeDiffMax, (node) => Canvas2d.render(createDom(findDom(node))))

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