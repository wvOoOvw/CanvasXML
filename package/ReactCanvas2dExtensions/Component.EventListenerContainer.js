import React from '../React'
import * as Canvas2dExtensions from '../Canvas2dExtensions'

function App(props) {
  const eventListener = React.useRef()
  const offscreenCanvas = React.useRef()
  const offscreenContext = React.useRef()

  React.useEffectImmediate(() => {
    eventListener.current = Canvas2dExtensions.createEventLinstener()
    offscreenCanvas.current = Canvas2dExtensions.createOffscreenCanvas(0, 0)
    offscreenContext.current = offscreenCanvas.current.getContext('2d')
  }, [])

  return <eventlistener offscreenCanvas={offscreenCanvas.current} offscreenContext={offscreenContext.current} {...eventListener.current}>{props.children}</eventlistener>
}

export default App