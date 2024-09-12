import React from '../React'

import { Canvas } from '../Canvas2d'

function App(props) {
  const update = React.useRef(true)

  const offscreenCanvas = React.useRef()
  const offscreenContext = React.useRef()

  const onConstructMountedLayout = dom => {
    offscreenCanvas.current.width = dom.findCanvas().width
    offscreenCanvas.current.height = dom.findCanvas().height
    update.current = false
  }

  const onConstructMountedImage = dom => {
    dom.props.src = offscreenCanvas.current
    dom.props.w = offscreenCanvas.current.width
    dom.props.h = offscreenCanvas.current.height
  }

  React.useEffectImmediate(() => {
    offscreenCanvas.current = Canvas.createOffscreenCanvas(0, 0)
    offscreenContext.current = offscreenCanvas.current.getContext('2d')
  }, [])

  React.useEffectImmediate(() => {
    update.current = true
  }, [...props.dependent])

  return <>
    {
      update.current ? <canvas canvas={offscreenCanvas.current} context={offscreenContext.current} onConstructMounted={onConstructMountedLayout}>{props.children}</canvas> : null
    }
    <image gx={0} gy={0} onConstructMounted={onConstructMountedImage} />
  </>
}

export default App