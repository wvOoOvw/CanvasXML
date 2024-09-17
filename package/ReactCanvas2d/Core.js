import React from '../React'
import Canvas2d from '../Canvas2d'
import * as ReactCanvas2dExtensions from '../ReactCanvas2dExtensions'

import findDom from './Util.FindDom'
import createDom from './Util.CreateDom'

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component =
    <ReactCanvas2dExtensions.CanvasContainer canvas={canvas} dpr={dpr}>
      <ReactCanvas2dExtensions.EventListenerContainer>
        {
          Boolean(powered) === true ? <ReactCanvas2dExtensions.PoweredBy>{element}</ReactCanvas2dExtensions.PoweredBy> : null
        }
        {
          Boolean(powered) !== true ? element : null
        }
      </ReactCanvas2dExtensions.EventListenerContainer>
    </ReactCanvas2dExtensions.CanvasContainer>

  React.mount(Component, renderFrameTimeDiffMax, (node) => Canvas2d.render(createDom(findDom(node))))

  return { render: React.render }
}

const unMount = () => {
  React.unmount()
}

const update = () => {
  React.shouldRender(React.renderQueueNode())
}

export default { mount, unMount, update }