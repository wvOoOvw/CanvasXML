import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'
import ReactCanvas2dUtils from './CanvasXML.ReactCanvas2d.Utils'

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

const useTransitionCount = (props) => {
  const [transitionCount, setTransitionCount] = React.useState(props.defaultCount)

  React.useEffect(() => {
    var next = transitionCount

    if (props.play === true && transitionCount !== props.destination && transitionCount > props.destination) next = next - props.rate
    if (props.play === true && transitionCount !== props.destination && transitionCount < props.destination) next = next + props.rate

    if (props.play === true && transitionCount > props.destination && next < props.destination) next = props.destination
    if (props.play === true && transitionCount < props.destination && next > props.destination) next = props.destination

    setTransitionCount(next)
  })

  return { transitionCount: props.postprocess ? props.postprocess(transitionCount) : transitionCount, setTransitionCount }
}

const useImage = (props) => {
  const image = React.useMemo(() => new Image(), [])

  React.useEffectImmediate(() => image.src = props.src, [props.src])
  React.useEffectImmediate(() => image.onload = () => props.onload ? props.onload() : undefined, [props.src])

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
      const box = Canvas2d.Location.box(ReactCanvas2dUtils.flatDom(ref.current).filter(i => i !== ref.current).map(i => i.props))
      if (key.some(i => location[i] !== box[i])) {
        setLocation(key.reduce((t, i) => Object({ ...t, [i]: box[i] }), Object))
      }
    }
  })

  return { ref, location, setLocation }
}

const useEventDragControl = (props) => {
  const positionOrigin = React.useRef()
  const positionTarget = React.useRef()

  const onChange = React.useCallback((params) => {
    if (props.onChange) props.onChange(params)
  }, [props.onChange])

  const onStart = React.useCallback((e) => {
    if (props.enable === false) return

    const x = e.x
    const y = e.y

    positionOrigin.current = { x, y }
    positionTarget.current = { x, y }

    const changedX = 0
    const changedY = 0
    const continuedX = 0
    const continuedY = 0

    onChange({ type: 'mouse', status: 'afterStart', e, x, y, changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onMove = React.useCallback((e) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const x = e.x
    const y = e.y

    const changedX = x - positionTarget.current.x
    const changedY = y - positionTarget.current.y
    const continuedX = positionTarget.current.x - positionOrigin.current.x
    const continuedY = positionTarget.current.y - positionOrigin.current.y

    positionTarget.current = { x, y }

    onChange({ type: 'mouse', status: 'afterMove', e, x, y, changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onEnd = React.useCallback((e) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const x = e.x
    const y = e.y

    const changedX = x - positionTarget.current.x
    const changedY = y - positionTarget.current.y
    const continuedX = positionTarget.current.x - positionOrigin.current.x
    const continuedY = positionTarget.current.y - positionOrigin.current.y

    onChange({ type: 'mouse', status: 'beforeEnd', e, x, y, changedX, changedY, continuedX, continuedY })

    positionOrigin.current = undefined
    positionTarget.current = undefined

    onChange({ type: 'mouse', status: 'afterEnd', e, x, y, changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  return { onStart, onMove, onEnd }
}

const useEventEnter = (props) => {
  const [enter, setEnter] = React.useState(false)

  const onStart = React.useCallback((e, entered) => {
    setEnter(entered)
  }, [props.enable])

  const onMove = React.useCallback((e, entered) => {
    setEnter(entered)
  }, [props.enable])

  const onEnd = React.useCallback((e, entered) => {
    setEnter(entered)
  }, [props.enableq])

}

const useEventCompose = (props) => {
  return {
    onClick: (e) => { if (props.onClick) props.onClick.forEach(i => i(e)) },
    onTouchStart: (e) => { if (props.onTouchStart) props.onTouchStart.forEach(i => i(e)) },
    onTouchMove: (e) => { if (props.onTouchMove) props.onTouchMove.forEach(i => i(e)) },
    onTouchEnd: (e) => { if (props.onTouchEnd) props.onTouchEnd.forEach(i => i(e)) },
    onMouseDown: (e) => { if (props.onMouseDown) props.onMouseDown.forEach(i => i(e)) },
    onMouseMove: (e) => { if (props.onMouseMove) props.onMouseMove.forEach(i => i(e)) },
    onMouseUp: (e) => { if (props.onMouseUp) props.onMouseUp.forEach(i => i(e)) }
  }
}

const ReactCanvas2dPlugin = { useAnimationCount, useTransitionCount, useImage, useResourceReload, useLocationPropertyImmediate, useLocationPropertyLazy, useLocationBox, useEventDragControl, useEventCompose }

export default ReactCanvas2dPlugin