import React from '../React'
import Canvas2d from '../Canvas2d'

function App(props) {
  const canvas = React.useRef()
  const context = React.useRef()
  const dpr = React.useRef()
  const rect = React.useRef()

  React.useEffectImmediate(() => {
    canvas.current = props.canvas

    dpr.current = props.dpr

    context.current = canvas.current.getContext('2d')

    canvas.current.width = rect.current.width * dpr.current
    canvas.current.height = rect.current.height * dpr.current

    rect.current = canvas.current.getBoundingClientRect()

    rect.current.x = rect.current.x
    rect.current.y = rect.current.y
  
    if (rect.current.x === undefined) rect.current.x = rect.current.left
    if (rect.current.y === undefined) rect.current.y = rect.current.top
  }, [props.canvas, props.dpr])

  return <canvas canvas={canvas.current} context={context.current} dpr={dpr.current} rect={rect.current} w={canvas.current.width} h={canvas.current.height}>{props.children}</canvas>
}

export default App