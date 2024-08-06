import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useEventPointerDownAway = (props) => {
  return { onTouchStartAway: props.onPointerDownAway, onMouseDownAway: props.onPointerDownAway }
}

export default useEventPointerDownAway