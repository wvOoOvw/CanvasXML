import { React, ReactDom } from './index'

const App = (props) => {
  const [repeat, setRepeat] = React.useState([0, 0])

  const caculateRepeat = (dom) => {
    const w = Math.ceil(dom.props.w / props.gap / 2)
    const h = Math.ceil(dom.props.h / props.gap / 2)
    if (h !== repeat[0] || w !== repeat[1]) setRepeat([Math.ceil(dom.props.h / props.gap / 2), Math.ceil(dom.props.w / props.gap / 2)])
  }

  console.log(repeat[0])

  return 
  
  <layout x='extend' y='extend' w='extend' h='extend' ref={dom => caculateRepeat(dom)}>

    <rect isolated beginPath fill x='extend' w='extend' h='0.1vmax' y='calc(extend + 50vh)' globalAlpha={0.5} fillStyle={props.color} />
    <rect isolated beginPath fill y='extend' h='extend' w='0.1vmax' x='calc(extend + 50vw)' globalAlpha={0.5} fillStyle={props.color} />

    {
      new Array(repeat[0]).fill().map((i, index) => {
        return <>
          <rect isolated beginPath fill x='extend' w='extend' h='0.1vmax' y={`calc(extend + 50vh + ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
          <rect isolated beginPath fill x='extend' w='extend' h='0.1vmax' y={`calc(extend + 50vh - ${props.gap * (index + 1)})`} globalAlpha={0.25} fillStyle={props.color} />
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

const AppLazy = (props) => {
  return <lazy x='extend' y='extend' w='extend' h='extend'>
    {
      (dom) => App({ ...dom.props, ...props })
    }
  </lazy>
}

export default AppLazy