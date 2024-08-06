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

export default useEventCompose