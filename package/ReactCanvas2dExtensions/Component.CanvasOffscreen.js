import React from '../React'

import { Canvas } from '../Canvas2d'

function App(props) {
  const update = React.useRef(true)

  const offscreenCanvas = React.useRef()
  const offscreenContext = React.useRef()

  const onConstructMountedLayout = dom => {
    offscreenCanvas.current.width = dom.canvas.width
    offscreenCanvas.current.height = dom.canvas.height
    offscreenContext.current.clearRect(0, 0, offscreenCanvas.current.width, offscreenCanvas.current.height)
    dom.canvas = offscreenCanvas.current
    dom.context = offscreenContext.current

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
      update.current ? <layout onConstructMounted={onConstructMountedLayout}>{props.children}</layout> : null
    }
    <image gx={0} gy={0} onConstructMounted={onConstructMountedImage} />
  </>
}

export default App