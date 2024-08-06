import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useEventPointerUp = (props) => {
  return { onTouchEnd: props.onPointerUp, onMouseUp: props.onPointerUp }
}

export default useEventPointerUp