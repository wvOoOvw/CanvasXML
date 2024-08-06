import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useEventPointerMove = (props) => {
  return { onTouchMove: props.onPointerMove, onMouseMove: props.onPointerMove }
}

export default useEventPointerMove