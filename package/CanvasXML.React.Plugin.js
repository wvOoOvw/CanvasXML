import React from './CanvasXML.React'

const useEffectUpdate = (callback, dep) => {
  const ref = React.useRef(false)

  React.useEffect(() => {
    if (ref.current === true) callback()
    if (ref.current === false) ref.current = true
  }, dep)
}

const useAnimationCount = (props) => {
  const [animationCount, setAnimationCount] = React.useState(props.defaultCount)
  const [animationDelay, setAnimationDelay] = React.useState(props.defaultDelay)
  const [animationFlow, setAnimationFlow] = React.useState(props.defaultFlow)

  React.useEffect(() => {
    if (animationDelay !== 0) setAnimationDelay(animationDelay - 1)
  })

  React.useEffect(() => {
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.min || animationCount < props.min)) setAnimationFlow(0)
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.max || animationCount > props.max)) setAnimationFlow(1)
  })

  React.useEffect(() => {
    if (props.play === true && animationDelay === 0 && (animationFlow === 0 && animationCount < props.max)) setAnimationCount(animationCount + props.rate)
    if (props.play === true && animationDelay === 0 && (animationFlow === 1 && animationCount > props.min)) setAnimationCount(animationCount - props.rate)
  })

  return { animationCount: props.postprocess ? props.postprocess(animationCount) : animationCount, setAnimationCount, animationDelay, setAnimationDelay, animationFlow, setAnimationFlow }
}

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

const ReactPlugin = { useEffectUpdate, useAnimationCount, useAnimationDestination }

export default ReactPlugin