import React from './utils.react'

import { ifPointCover } from './utils.common'

const useEventRoot = (props) => {
  const events = React.useRef([])

  const addEventListener = (type, callback, option) => {
    events.current.push({ type, callback, option })
  }

  const removeEventListener = (type, callback) => {
    events.current = events.current.filter(i => i.type !== type && i.callback !== callback)
  }

  const useEventListener = (type, callback, option) => {
    React.useEffectImmediate(() => addEventListener(type, callback, option), [])
    React.useEffectImmediate(() => () => removeEventListener(type, callback, option), [])
  }

  const clearEventListener = () => {
    events.current = []
  }

  const execute = (e, type) => {
    const exe = events.current
      .filter(i => i.type === type)
      .sort((a, b) => {
        const a_ = a.option === undefined || a.option.priority === undefined ? 0 : a.option.priority
        const b_ = b.option === undefined || b.option.priority === undefined ? 0 : b.option.priority
        return b_ - a_
      })

    var stopPropagation = false

    exe.forEach(i => {
      var x
      var y

      if (window.ontouchstart === undefined) x = e.pageX
      if (window.ontouchstart === undefined) y = e.pageY
      if (window.ontouchstart !== undefined) x = e.changedTouches[0].pageX
      if (window.ontouchstart !== undefined) y = e.changedTouches[0].pageY

      x = x * props.dpr
      y = y * props.dpr

      const point = { x, y }

      var ifCallback

      if (stopPropagation === false && Boolean(i.option) === true && Boolean(i.option.area) === true && ifPointCover(point, i.option.area) === true) ifCallback = true
      if (stopPropagation === false && Boolean(i.option) !== true || Boolean(i.option.area) !== true) ifCallback = true

      if (ifCallback) i.callback(e)
      if (ifCallback && Boolean(i.option) === true && Boolean(i.option.stopPropagation) === true) stopPropagation = true
    })
  }

  React.useEffectImmediate(() => {
    new Array('click', 'touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup').forEach(type => {
      props.canvas.addEventListener(type, e => execute(e, type), { passive: true })
    })
  }, [])

  return { addEventListener, removeEventListener, clearEventListener, useEventListener }
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

const useDragControlMouse = (props) => {
  const positionOrigin = React.useRef()
  const positionTarget = React.useRef()

  const onChange = React.useCallback((params) => {
    if (props.onChange) props.onChange(params)
    if (props.onChangeMemo) props.onChangeMemo(params)
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

    onChange({ e, x, y, status: 'afterStart', changedX, changedY, continuedX, continuedY })
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

    onChange({ e, x, y, status: 'afterMove', changedX, changedY, continuedX, continuedY })
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

    onChange({ e, x, y, status: 'beforeEnd', changedX, changedY, continuedX, continuedY })

    positionOrigin.current = undefined
    positionTarget.current = undefined

    onChange({ e, x, y, status: 'afterEnd', changedX, changedY, continuedX, continuedY })
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

    onChange({ e, x, y, status: 'afterStart', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onMove = React.useCallback((e) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

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

    onChange({ e, x, y, status: 'afterMove', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const onEnd = React.useCallback((e) => {
    if (props.enable === false) return

    if (positionTarget.current === undefined) return

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

    onChange({ e, x, y, status: 'beforeEnd', changedX, changedY, continuedX, continuedY })

    positionOrigin.current = undefined
    positionTarget.current = undefined

    onChange({ e, x, y, status: 'afterEnd', changedX, changedY, continuedX, continuedY })
  }, [props.enable, props.onChange])

  const r = { onStart, onMove, onEnd }

  return r
}

const useImage = (props) => {
  const image = React.useMemo(() => new Image(), [])

  React.useEffectImmediate(() => image.src = props.src, [props.src])
  React.useEffectImmediate(() => image.onload = () => props.onload ? props.onload() : undefined, [props.onload])

  return { image }
}

const ReactPlugin = { useEventRoot, useAnimationCount, useDragControlMouse, useDragControlTouch, useImage }

export default ReactPlugin