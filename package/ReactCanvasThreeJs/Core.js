import React from '../React'

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component = { ...element, props: { canvas, dpr } }

  React.mount(Component, renderFrameTimeDiffMax, () => undefined)

  return { render: React.render }
}

const unMount = () => {
  React.unmount()
}

const update = () => {
  React.shouldRender(React.renderQueueNode())
}

export default { mount, unMount, update }