import React from '../React'
import * as ReactCanvasThreeJsExtensions from '../ReactCanvasThreeJsExtensions'

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component =
    <ReactCanvasThreeJsExtensions.CanvasContainer canvas={canvas} dpr={dpr}>
      {
        (props) => {
          return { ...element, props: props }
        }
      }
    </ReactCanvasThreeJsExtensions.CanvasContainer>

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