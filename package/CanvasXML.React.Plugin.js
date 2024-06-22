import React from './CanvasXML.React'

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

  return { animationCount, setAnimationCount, animationDelay, setAnimationDelay, animationFlow, setAnimationFlow }
}

const useTransitionCount = (props) => {
  const [transitionCount, setTransitionCount] = React.useState(props.defaultCount)

  React.useEffect(() => {
    var next = transitionCount

    if (transitionCount !== props.destination && transitionCount > props.destination) next = next - props.rate
    if (transitionCount !== props.destination && transitionCount < props.destination) next = next + props.rate

    if (transitionCount > props.destination && next < props.destination) next = props.destination
    if (transitionCount < props.destination && next > props.destination) next = props.destination

    setTransitionCount(next)
  })

  return { transitionCount: props.postprocess ? props.postprocess(transitionCount) : transitionCount, setTransitionCount }
}

const useImage = (props) => {
  const image = React.useMemo(() => new Image(), [])

  React.useEffectImmediate(() => image.src = props.src, [props.src])
  React.useEffectImmediate(() => image.onload = () => props.onload ? props.onload() : undefined, [props.onload])

  return { image }
}

const useResourceReload = (props) => {
  const [resourceCount, setResourceCount] = React.useState(0)
  const [resourceLoading, setResourceLoading] = React.useState(true)

  React.useEffectImmediate(() => {
    setResourceCount(0)
    setResourceLoading(true)

    props.resource.forEach(i => fetch(i).then(() => setResourceCount(pre => pre + 1)))
  }, [...props.resource])

  React.useEffectImmediate(() => setResourceLoading(resourceCount < props.resource.length), [resourceCount])

  return { resourceCount, resourceLoading }
}

const useDrag = () => {
  
}

const ReactPlugin = { useAnimationCount, useTransitionCount, useImage, useResourceReload }

export default ReactPlugin