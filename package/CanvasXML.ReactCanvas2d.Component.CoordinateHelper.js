import React from './CanvasXML.React'

const App = (props) => {
  const [repeatX, setRepeatX] = React.useState()
  const [repeatY, setRepeatY] = React.useState()

  const caculateRepeat = (dom) => {
    setRepeatX(Math.ceil(dom.props.w / props.gap / 2))
    setRepeatY(Math.ceil(dom.props.h / props.gap / 2))
  }

  return <layout onRenderUnmount={dom => caculateRepeat(dom)}>

    {
      repeatX !== undefined && repeatY !== undefined ?
        <>
          <rect beginPath fill w='0.1vmax' cx='calc(50%)' globalAlpha={0.5} fillStyle={props.color} />
          <rect beginPath fill h='0.1vmax' cy='calc(50%)' globalAlpha={0.5} fillStyle={props.color} />

          {
            new Array(repeatX).fill().map((i, index) => {
              return <>
                <rect beginPath fill w='0.1vmax' cx={`calc(50% + ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
                <rect beginPath fill w='0.1vmax' cx={`calc(50% - ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
              </>
            })
          }

          {
            new Array(repeatY).fill().map((i, index) => {
              return <>
                <rect beginPath fill h='0.1vmax' cy={`calc(50% + ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
                <rect beginPath fill h='0.1vmax' cy={`calc(50% - ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
              </>
            })
          }
        </>
        : null
    }

  </layout>
}

export default App