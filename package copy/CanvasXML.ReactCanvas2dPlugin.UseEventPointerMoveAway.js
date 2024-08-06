import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useEventPointerMoveAway = (props) => {
  return { onTouchMoveAway: props.onPointerMoveAway, onMouseMoveAway: props.onPointerMoveAway }
}

export default useEventPointerMoveAway