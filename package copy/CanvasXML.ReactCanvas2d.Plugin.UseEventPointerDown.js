import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useEventPointerDown = (props) => {
  return { onTouchStart: props.onPointerDown, onMouseDown: props.onPointerDown }
}

export default useEventPointerDown