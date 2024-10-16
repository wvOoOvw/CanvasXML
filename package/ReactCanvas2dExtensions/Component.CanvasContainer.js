import React from '../React'

function App(props) {
  const canvas = React.useRef()
  const context = React.useRef()
  const dpr = React.useRef()
  const rect = React.useRef()

  React.useEffectImmediate(() => {
    canvas.current = props.canvas

    dpr.current = props.dpr

    context.current = canvas.current.getContext('2d')

    rect.current = canvas.current.getBoundingClientRect()

    canvas.current.width = rect.current.width * dpr.current
    canvas.current.height = rect.current.height * dpr.current

    rect.current.x = rect.current.x
    rect.current.y = rect.current.y
  
    if (rect.current.x === undefined) rect.current.x = rect.current.left
    if (rect.current.y === undefined) rect.current.y = rect.current.top
  }, [props.canvas, props.dpr])

  return <canvas canvas={canvas.current} context={context.current} dpr={dpr.current} rect={rect.current} x={canvas.current.width / 2} y={canvas.current.height / 2} w={canvas.current.width} h={canvas.current.height}>{props.children}</canvas>
}

export default App