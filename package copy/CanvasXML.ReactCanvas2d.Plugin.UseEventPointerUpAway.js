import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useEventPointerUpAway = (props) => {
  return { onTouchEndAway: props.onPointerUpAway, onMouseUpAway: props.onPointerUpAway }
}

export default useEventPointerUpAway