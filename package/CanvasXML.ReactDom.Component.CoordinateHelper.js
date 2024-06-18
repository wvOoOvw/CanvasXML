import { React, Location } from './index'

const App = (props) => {
  const coordinate = Location.coordinate({ x: props.x, y: props.y, w: props.w, h: props.h })

  return <>
    {
      new Array(Math.ceil(coordinate.vmax * 100 / props.gap / 2)).fill().map((i, index) => {
        if (index === 0) {
          return <>
            <rect isolated beginPath fill l='0' y={coordinate.cy} w='100%' h='0.1vmax' globalAlpha={0.5} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.cx} y={coordinate.y} w='0.1vmax' h='100%' globalAlpha={0.5} fillStyle={props.color} />
          </>
        }

        if (index !== 0) {
          return <>
            <rect isolated beginPath fill x={coordinate.x} y={coordinate.cy + props.gap * index} w='100%' h='0.1vmax' globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.x} y={coordinate.cy - props.gap * index} w='100%' h='0.1vmax' globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.cx + props.gap * index} y={coordinate.y} w='0.1vmax' h='100%' globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.cx - props.gap * index} y={coordinate.y} w='0.1vmax' h='100%' globalAlpha={0.25} fillStyle={props.color} />
          </>
        }
      })
    }
  </>
}

export default App