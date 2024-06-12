import React from './CanvasXML.React'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

const useDragControlMouse = (props) => {
  const positionOrigin = React.useRef()
  const positionTarget = React.useRef()

  const onChange = React.useCallback((params) => {
    if (props.onChange) props.onChange(params)
  }, [props.onChange])

  const onStart = React.useCallback((e) => {
    if (props.enable === false) return

    const x = e.pageX
    const y = e.pageY

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

    const x = e.pageX
    const y = e.pageY

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

    const x = e.pageX
    const y = e.pageY

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

const useDragControlTouch = (props) => {
  const positionOrigin = React.useRef()
  const positionTarget = React.useRef()

  const onChange = React.useCallback((params) => {
    if (props.onChange) props.onChange(params)
    if (props.onChangeMemo) props.onChangeMemo(params)
  }, [props.onChange])

  const onStart = React.useCallback((e) => {
    if (props.enable === false) return

    const x = [...e.changedTouches].map(i => i.pageX)
    const y = [...e.changedTouches].map(i => i.pageY)

    positionOrigin.current = { x, y }
    positionTarget.current = { x, y }

    const changedX = []
    const changedY = []
    const continuedX = []
    const continuedY = []

    x.forEach((x, index) => {
      changedX[index] = 0
      continuedX[index] = 0
    })

    y.forEach((y, index) => {
      changedY[index] = 0
      continuedY[index] = 0
    })

    onChange({ type: 'touch', status: 'afterStart', e, x, y, changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onMove = React.useCallback((e) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const x = [...e.changedTouches].map(i => i.pageX)
    const y = [...e.changedTouches].map(i => i.pageY)

    const changedX = []
    const changedY = []
    const continuedX = []
    const continuedY = []

    x.forEach((x, index) => {
      changedX[index] = x - positionTarget.current.x[index]
      continuedX[index] = positionTarget.current.x[index] - positionOrigin.current.x[index]
    })

    y.forEach((y, index) => {
      changedY[index] = y - positionTarget.current.y[index]
      continuedY[index] = positionTarget.current.y[index] - positionOrigin.current.y[index]
    })

    positionTarget.current = { x, y }

    onChange({ type: 'touch', status: 'afterMove', e, x, y, changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onEnd = React.useCallback((e) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

    const x = [...e.changedTouches].map(i => i.pageX)
    const y = [...e.changedTouches].map(i => i.pageY)

    const changedX = []
    const changedY = []
    const continuedX = []
    const continuedY = []

    x.forEach((x, index) => {
      changedX[index] = x - positionTarget.current.x[index]
      continuedX[index] = positionTarget.current.x[index] - positionOrigin.current.x[index]
    })

    y.forEach((y, index) => {
      changedY[index] = y - positionTarget.current.y[index]
      continuedY[index] = positionTarget.current.y[index] - positionOrigin.current.y[index]
    })

    onChange({ type: 'touch', status: 'beforeEnd', e, x, y, changedX, changedY, continuedX, continuedY })

    positionOrigin.current = undefined
    positionTarget.current = undefined

    onChange({ type: 'touch', status: 'afterEnd', e, x, y, changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const r = { onStart, onMove, onEnd }

  return r
}

const useDragControl = (enable, onChange) => {
  if (window.ontouchstart === undefined) {
    var { onStart, onMove, onEnd } = useDragControlMouse({ enable: enable, onChange: onChange })
    ReactDomEvent.useEventListener('mousedown', onStart)
    ReactDomEvent.useEventListener('mousemove', onMove)
    ReactDomEvent.useEventListener('mouseup', onEnd)
  }
  if (window.ontouchstart !== undefined) {
    var { onStart, onMove, onEnd } = useDragControlTouch({ enable: enable, onChange: onChange })
    ReactDomEvent.useEventListener('touchstart', onStart)
    ReactDomEvent.useEventListener('touchmove', onMove)
    ReactDomEvent.useEventListener('touchend', onEnd)
  }
}

const ReactDomEventDrag = { useDragControl }

export default ReactDomEventDrag