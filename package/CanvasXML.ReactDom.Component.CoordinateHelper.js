import { React, ReactDom } from './index'

const App = (props) => {
  const [repeatX, setRepeatX] = React.useState()
  const [repeatY, setRepeatY] = React.useState()

  const caculateRepeat = (dom) => {
    setRepeatY(Math.ceil(dom.props.w / props.gap / 2))
    setRepeatX(Math.ceil(dom.props.h / props.gap / 2))
  }

  console.log(repeatX, repeatY)

  return <layout x='extend' y='extend' w='extend' h='extend' ref={dom => caculateRepeat(dom)}>

    {
      repeatX !== undefined && repeatY !== undefined ?
        <>
          <rect beginPath fill x='extend' w='extend' h='0.1vmax' y='calc(extend + 50vh)' globalAlpha={0.5} fillStyle={props.color} />
          <rect beginPath fill y='extend' h='extend' w='0.1vmax' x='calc(extend + 50vw)' globalAlpha={0.5} fillStyle={props.color} />

          {
            new Array(repeatY).fill().map((i, index) => {
              return <>
                <rect beginPath fill x='extend' w='extend' h='0.1vmax' y={`calc(extend + 50vh + ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
                <rect beginPath fill x='extend' w='extend' h='0.1vmax' y={`calc(extend + 50vh - ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
              </>
            })
          }

          {
            new Array(repeatX).fill().map((i, index) => {
              return <>
                <rect beginPath fill y='extend' h='extend' w='0.1vmax' x={`calc(extend + 50vw + ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
                <rect beginPath fill y='extend' h='extend' w='0.1vmax' x={`calc(extend + 50vw - ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
              </>
            })
          }
        </>
        : null
    }

  </layout>
}

const AppLazy = (props) => {
  return <lazy x='extend' y='extend' w='extend' h='extend'>
    {
      (dom) => App({ ...dom.props, ...props })
    }
  </lazy>
}

export default App