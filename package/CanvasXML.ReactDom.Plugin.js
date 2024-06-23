import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomUtils from './CanvasXML.ReactDom.Utils'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

import Location from './CanvasXML.Location'

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

const useLocationPropertyImmediate = (props) => {
  const ref = React.useRef()

  const refLocation = React.useRef(props.default)

  React.useEffectImmediate(() => {
    if (ref.current) {
      const key = Object.keys(refLocation.current)

      if (key.some(i => refLocation.current[i] !== ref.current.props[i])) {
        refLocation.current = key.reduce((t, i) => Object({ ...t, [i]: ref.current.props[i] }), Object)
      }
    }
  })

  return { ref, location: refLocation.current }
}

const useLocationPropertyLazy = (props) => {
  const ref = React.useRef()

  const [location, setLocation] = React.useState(props.default)

  React.useEffect(() => {
    if (ref.current) {
      const key = Object.keys(location)

      if (key.some(i => location[i] !== ref.current.props[i])) {
        setLocation(key.reduce((t, i) => Object({ ...t, [i]: ref.current.props[i] }), Object))
      }
    }
  })

  return { ref, location, setLocation }
}

const useLocationBox = (props) => {
  const ref = React.useRef()

  const [location, setLocation] = React.useState(props.default)

  React.useEffect(() => {
    if (ref.current) {
      const key = Object.keys(location)
      const box = Location.box(ReactDomUtils.flatDom(ref.current).filter(i => i !== ref.current).map(i => i.props))

      if (key.some(i => location[i] !== box[i])) {
        setLocation(key.reduce((t, i) => Object({ ...t, [i]: box[i] }), Object))
      }
    }
  })

  return { ref, location, setLocation }
}

const ReactDomPlugin = { useAnimationCount, useTransitionCount, useImage, useResourceReload, useLocationPropertyImmediate, useLocationPropertyLazy, useLocationBox }

export default ReactDomPlugin