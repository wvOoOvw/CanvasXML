import React from './utils.react'
import ReactPlugin from './utils.react.plugin'

import { drawImageCenter, drawImageFullHeight } from './utils.common'

import background from '../static/bg.97101e.jpg'

const App = () => {
  const context = React.useContext()

  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 600, height: 900 })

  const image = React.useMemo(() => new Image(), [])

  React.useEffectImmediate(() => image.src = background, [])

  drawImageCenter(context.context, image, position)

  const onChange = (params) => {
    if (params.status === 'afterMove') position.x = position.x + params.changedX * context.dpr
    if (params.status === 'afterMove') position.y = position.y + params.changedY * context.dpr
  }

  const { onStart, onMove, onEnd } = ReactPlugin.useDragControlMouse({ onChange: onChange, enable: true })

  context.event.useEventListener('mousedown', onStart, { area: position })
  context.event.useEventListener('mousemove', onMove)
  context.event.useEventListener('mouseup', onEnd)
  // context.event.useEventListener('click', () => console.log(1), { area: position })
}

export default React.component(App)
