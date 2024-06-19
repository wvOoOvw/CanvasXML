import { React, Location } from './index'

const App = (props) => {
  return <>
    {
      new Array(props.repeat).fill().map((i, index) => {
        if (index === 0) {
          return <>
            <rect isolated beginPath fill x='extend' w='extend' h='0.1vmax' y='calc(extend + 50vh)' globalAlpha={0.5} fillStyle={props.color} />
            <rect isolated beginPath fill y='extend' h='extend' w='0.1vmax' x='calc(extend + 50vw)' globalAlpha={0.5} fillStyle={props.color} />
          </>
        }

        if (index !== 0) {
          return <>
            <rect isolated beginPath fill x='extend' w='extend' h='0.1vmax' y={`calc(extend + 50vh + ${props.gap * index})`} globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill x='extend' w='extend' H='0.1vmax' y={`calc(extend + 50vh - ${props.gap * index})`} globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill y='extend' h='extend' w='0.1vmax' x={`calc(extend + 50vw + ${props.gap * index})`} globalAlpha={0.25} fillStyle={props.color} />
            <rect isolated beginPath fill y='extend' h='extend' w='0.1vmax' x={`calc(extend + 50vw - ${props.gap * index})`} globalAlpha={0.25} fillStyle={props.color} />
          </>
        }
      })
    }
  </>
}

export default App