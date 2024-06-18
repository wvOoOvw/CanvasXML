import { React, Location } from './index'

const App = (props) => {
  const coordinate = Location.coordinate({ x: props.x, y: props.y, w: props.w, h: props.h })

  return <>
    {
      new Array(Math.ceil(coordinate.vmax * 100 / props.gap / 2)).fill().map((i, index) => {
        if (index === 0) {
          return <>
            <rect isolated beginPath fill x={coordinate.x} y={coordinate.cy} location={{ w: '100%', h: '1%' }} globalAlpha={0.5} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.cx} y={coordinate.y} location={{ w: '1%', h: '100%' }} globalAlpha={0.5} fillStyle={props.color} />
          </>
        }

        if (index !== 0) {
          return <>
            <rect isolated beginPath fill x={coordinate.x} y={coordinate.cy + props.gap * index} location={{ w: '100%', h: '1%' }} globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.x} y={coordinate.cy - props.gap * index} location={{ w: '100%', h: '1%' }} globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.cx + props.gap * index} y={coordinate.y} location={{ w: '1%', h: '100%' }} globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill x={coordinate.cx - props.gap * index} y={coordinate.y} location={{ w: '1%', h: '100%' }} globalAlpha={0.25} fillStyle={props.color} />
          </>
        }
      })
    }
  </>
}

export default App