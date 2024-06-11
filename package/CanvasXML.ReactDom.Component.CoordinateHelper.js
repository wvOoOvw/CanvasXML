import { React, Position } from '../package/index'

const App = (props) => {
  const coordinate = Position.coordinate({ x: props.x, y: props.y, w: props.w, h: props.h })

  return new Array(Math.ceil(coordinate.vmax * 100 / props.gap / 2)).fill().map((i, index) => {
    if (index === 0) {
      return <>
        <rect save fill x={coordinate.x} y={coordinate.cy} w={coordinate.vmax * 100} h={coordinate.vmax * 0.1} globalAlpha={0.5} fillStyle={props.color} />
        <rect save fill x={coordinate.cx} y={coordinate.y} w={coordinate.vmax * 0.1} h={coordinate.vmax * 100} globalAlpha={0.5} fillStyle={props.color} />
      </>
    }

    if (index !== 0) {
      return <>
        <rect save fill x={coordinate.x} y={coordinate.cy + props.gap * index} w={coordinate.vmax * 100} h={coordinate.vmax * 0.1} globalAlpha={0.25} fillStyle={props.color} />
        <rect save fill x={coordinate.x} y={coordinate.cy - props.gap * index} w={coordinate.vmax * 100} h={coordinate.vmax * 0.1} globalAlpha={0.25} fillStyle={props.color} />
        <rect save fill x={coordinate.cx + props.gap * index} y={coordinate.y} w={coordinate.vmax * 0.1} h={coordinate.vmax * 100} globalAlpha={0.25} fillStyle={props.color} />
        <rect save fill x={coordinate.cx - props.gap * index} y={coordinate.y} w={coordinate.vmax * 0.1} h={coordinate.vmax * 100} globalAlpha={0.25} fillStyle={props.color} />
      </>
    }
  })
}

export default App