import React from './CanvasXML.React'

const useAnimationDestination = (props) => {
  const [animationCount, setAnimationCount] = React.useState(props.defaultCount)

  React.useEffect(() => {
    var next = animationCount

    if (props.play === true && animationCount !== props.destination && animationCount > props.destination) next = next - props.rate
    if (props.play === true && animationCount !== props.destination && animationCount < props.destination) next = next + props.rate

    if (props.play === true && animationCount > props.destination && next < props.destination) next = props.destination
    if (props.play === true && animationCount < props.destination && next > props.destination) next = props.destination

    setAnimationCount(next)
  })

  return { animationCount: props.postprocess ? props.postprocess(animationCount) : animationCount, setAnimationCount }
}

export default useAnimationDestination