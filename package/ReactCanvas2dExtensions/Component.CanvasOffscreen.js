import React from '../React'
import * as Canvas2dExtensions from '../Canvas2dExtensions'

function App(props) {
  const update = React.useRef(true)

  const offscreenCanvas = React.useRef()
  const offscreenContext = React.useRef()

  const onConstructMountedLayout = dom => {
    offscreenCanvas.current.width = dom.findParentCanvas().width
    offscreenCanvas.current.height = dom.findParentCanvas().height
    update.current = false
  }

  const onConstructMountedImage = dom => {
    dom.props.src = offscreenCanvas.current
    dom.props.w = offscreenCanvas.current.width
    dom.props.h = offscreenCanvas.current.height
  }

  React.useEffectImmediate(() => {
    offscreenCanvas.current = Canvas2dExtensions.createOffscreenCanvas(0, 0)
    offscreenContext.current = offscreenCanvas.current.getContext('2d')
  }, [])

  React.useEffectImmediate(() => {
    update.current = true
  }, [...props.dependence])

  return <>
    {
      update.current ? <canvas canvas={offscreenCanvas.current} context={offscreenContext.current} onConstructMounted={onConstructMountedLayout}>{props.children}</canvas> : null
    }
    <image gx={0} gy={0} onConstructMounted={onConstructMountedImage} />
  </>
}

export default App