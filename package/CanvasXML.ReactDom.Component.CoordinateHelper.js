import { React, ReactDom } from './index'

const App = (props) => {
  const ref = React.useRef()

  const [repeat, setRepeat] = React.useState([0, 0])

  React.useEffect(() => {
    setRepeat([
      Math.ceil(ref.props.w / props.gap / 2),
      Math.ceil(ref.props.h / props.gap / 2),
    ])
  }, [])

  return <layout x='extend' y='extend' w='extend' h='extend' ref={dom => ref.current = dom}>

    <rect isolated beginPath fill x='extend' w='extend' h='0.1vmax' y='calc(extend + 50vh)' globalAlpha={0.5} fillStyle={props.color} />
    <rect isolated beginPath fill y='extend' h='extend' w='0.1vmax' x='calc(extend + 50vw)' globalAlpha={0.5} fillStyle={props.color} />

    {
      new Array(repeat[0]).fill().map((i, index) => {
        return <>
          <rect isolated beginPath fill x='extend' w='extend' h='0.1vmax' y={`calc(extend + 50vh + ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
          <rect isolated beginPath fill x='extend' w='extend' H='0.1vmax' y={`calc(extend + 50vh - ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
        </>
      })
    }

    {
      new Array(repeat[1]).fill().map((i, index) => {
        return <>
          <rect isolated beginPath fill y='extend' h='extend' w='0.1vmax' x={`calc(extend + 50vw + ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
          <rect isolated beginPath fill y='extend' h='extend' w='0.1vmax' x={`calc(extend + 50vw - ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
        </>
      })
    }

  </layout>
}

export default App