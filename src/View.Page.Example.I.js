import React from './utils.react'
import ReactPlugin from './utils.react.plugin'

import { drawImageCenter } from './utils.common'

import background from '../static/bg.97101e.jpg'

const App = () => {
  const context = React.useContext()

  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 600, height: 900 })

  const { image } = ReactPlugin.useImage({ src: background, onload: React.shouldRender })

  const onChange = (params) => {
    if (params.status === 'afterMove') position.x = position.x + params.changedX * context.dpr
    if (params.status === 'afterMove') position.y = position.y + params.changedY * context.dpr
    setPosition(position)
  }

  ReactPlugin.useDragControlMouse({ onChangeMemo: onChange, enable: true, useEventListener: context.useEventListener, mousedownOption: { area: position } })

  drawImageCenter(context.context, image, position)
}

export default React.component(App)
