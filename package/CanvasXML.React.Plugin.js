import React from './CanvasXML.React'

const useStateFlow = (props) => {
  const ref = React.useRef([])

  const getState = (index) => {
    return ref.current[index === undefined ? (ref.current.length - 1) : index]
  }

  const useState = (state) => {
    React.useEffectImmediate(() => ref.current = [...ref.current, state], [state])
    React.useEffectImmediate(() => () => ref.current = ref.current.filter((i) => i !== state), [state])
  }

  return { getState, useState }
}

const useAnimationCount = (props) => {
  const [animationCount, setAnimationCount] = React.useState(props.count)
  const [animationDelay, setAnimationDelay] = React.useState(props.delay)
  const [animationFlow, setAnimationFlow] = React.useState(props.flow)

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

const ReactPlugin = { useStateFlow, useAnimationCount, useImage, useResourceReload }

export default ReactPlugin