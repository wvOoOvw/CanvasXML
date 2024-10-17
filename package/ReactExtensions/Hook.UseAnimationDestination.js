import React from '../React'

const useAnimationDestination = (props) => {
  const [animationCount, setAnimationCount] = React.useState(props.defaultCount)
  const [animationDestination, setAnimationDestination] = React.useState(props.defaultDestination)

  React.useEffect(() => {
    if (props.count !== undefined) {
      setAnimationCount(props.count)
    }
  }, [props.count])

  React.useEffect(() => {
    if (props.destination !== undefined) {
      setAnimationDestination(props.destination)
    }
  }, [props.destination])

  React.useEffect(() => {
    var next = animationCount

    if (props.play === true && animationCount !== animationDestination && animationCount > animationDestination) next = next - props.rate
    if (props.play === true && animationCount !== animationDestination && animationCount < animationDestination) next = next + props.rate

    if (props.play === true && animationCount > animationDestination && next < animationDestination) next = animationDestination
    if (props.play === true && animationCount < animationDestination && next > animationDestination) next = animationDestination

    setAnimationCount(next)
  })

  return { animationCount: props.postprocess ? props.postprocess(animationCount) : animationCount, setAnimationCount, animationDestination, setAnimationDestination }
}

export default useAnimationDestination