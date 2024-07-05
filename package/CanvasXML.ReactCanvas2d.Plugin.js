import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'
import ReactCanvas2dUtils from './CanvasXML.ReactCanvas2d.Utils'

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

const useEventCompose = (props) => {
  const onClick = []
  const onClickAway = []
  const onTouchStart = []
  const onTouchStartAway = []
  const onTouchMove = []
  const onTouchMoveAway = []
  const onTouchEnd = []
  const onTouchEndAway = []
  const onMouseDown = []
  const onMouseDownAway = []
  const onMouseMove = []
  const onMouseMoveAway = []
  const onMouseUp = []
  const onMouseUpAway = []
  const onPointerDown = []
  const onPointerDownAway = []
  const onPointerMove = []
  const onPointerMoveAway = []
  const onPointerUp = []
  const onPointerUpAway = []

  props.event.forEach(i => {
    if (i.onClick) onClick.push(i)
    if (i.onClickAway) onClickAway.push(i)
    if (i.onTouchStart) onTouchStart.push(i)
    if (i.onTouchStartAway) onTouchStartAway.push(i)
    if (i.onTouchMove) onTouchMove.push(i)
    if (i.onTouchMoveAway) onTouchMoveAway.push(i)
    if (i.onTouchEnd) onTouchEnd.push(i)
    if (i.onTouchEndAway) onTouchEndAway.push(i)
    if (i.onMouseDown) onMouseDown.push(i)
    if (i.onMouseDownAway) onMouseDownAway.push(i)
    if (i.onMouseMove) onMouseMove.push(i)
    if (i.onMouseMoveAway) onMouseMoveAway.push(i)
    if (i.onMouseUp) onMouseUp.push(i)
    if (i.onMouseUpAway) onMouseUpAway.push(i)
    if (i.onPointerDown) onPointerDown.push(i)
    if (i.onPointerDownAway) onPointerDownAway.push(i)
    if (i.onPointerMove) onPointerMove.push(i)
    if (i.onPointerMoveAway) onPointerMoveAway.push(i)
    if (i.onPointerUp) onPointerUp.push(i)
    if (i.onPointerUpAway) onPointerUpAway.push(i)
  })

  return {
    onClick: onClick.length === 0 ? undefined : () => onClick.forEach(i => i.onClick()),
    onClickAway: onClickAway.length === 0 ? undefined : () => onClickAway.forEach(i => i.onClickAway()),
    onTouchStart: onTouchStart.length === 0 ? undefined : () => onTouchStart.forEach(i => i.onTouchStart()),
    onTouchStartAway: onTouchStartAway.length === 0 ? undefined : () => onTouchStartAway.forEach(i => i.onTouchStartAway()),
    onTouchMove: onTouchMove.length === 0 ? undefined : () => onTouchMove.forEach(i => i.onTouchMove()),
    onTouchMoveAway: onTouchMoveAway.length === 0 ? undefined : () => onTouchMoveAway.forEach(i => i.onTouchMoveAway()),
    onTouchEnd: onTouchEnd.length === 0 ? undefined : () => onTouchEnd.forEach(i => i.onTouchEnd()),
    onTouchEndAway: onTouchEndAway.length === 0 ? undefined : () => onTouchEndAway.forEach(i => i.onTouchEndAway()),
    onMouseDown: onMouseDown.length === 0 ? undefined : () => onMouseDown.forEach(i => i.onMouseDown()),
    onMouseDownAway: onMouseDownAway.length === 0 ? undefined : () => onMouseDownAway.forEach(i => i.onMouseDownAway()),
    onMouseMove: onMouseMove.length === 0 ? undefined : () => onMouseMove.forEach(i => i.onMouseMove()),
    onMouseMoveAway: onMouseMoveAway.length === 0 ? undefined : () => onMouseMoveAway.forEach(i => i.onMouseMoveAway()),
    onMouseUp: onMouseUp.length === 0 ? undefined : () => onMouseUp.forEach(i => i.onMouseUp()),
    onMouseUpAway: onMouseUpAway.length === 0 ? undefined : () => onMouseUpAway.forEach(i => i.onMouseUpAway()),
    onPointerDown: onPointerDown.length === 0 ? undefined : () => onPointerDown.forEach(i => i.onPointerDown()),
    onPointerDownAway: onPointerDownAway.length === 0 ? undefined : () => onPointerDownAway.forEach(i => i.onPointerDownAway()),
    onPointerMove: onPointerMove.length === 0 ? undefined : () => onPointerMove.forEach(i => i.onPointerMove()),
    onPointerMoveAway: onPointerMoveAway.length === 0 ? undefined : () => onPointerMoveAway.forEach(i => i.onPointerMoveAway()),
    onPointerUp: onPointerUp.length === 0 ? undefined : () => onPointerUp.forEach(i => i.onPointerUp()),
    onPointerUpAway: onPointerUpAway.length === 0 ? undefined : () => onPointerUpAway.forEach(i => i.onPointerUpAway())
  } 
}

const ReactCanvas2dPlugin = { useImage, useResourceReload, useLocationPropertyImmediate, useLocationPropertyLazy, useLocationBox, useEventDragControl, useEventCompose }

export default ReactCanvas2dPlugin