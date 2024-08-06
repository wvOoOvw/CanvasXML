import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useEventClick = (props) => {
  const downRef = React.useRef(false)

  const onDown = () => {
    downRef.current = true
  }

  const onUp = () => {
    if (downRef.current === true) props.onClick()
    downRef.current = false
  }

  const onUpAway = () => {
    downRef.current = false
  }

  return { onDown, onUp, onUpAway }
}

export default useEventClick