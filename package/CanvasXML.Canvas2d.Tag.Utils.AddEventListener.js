import Canvas2d from './CanvasXML.Canvas2d'

const addEventListener = (dom, cover) => {
  const typeArray = [
    {
      type: 'click',
      event: dom.props.onClick,
      eventAway: dom.props.onClickAway,
      option: dom.props.onClickOption,
    },
    {
      type: 'touchstart',
      event: dom.props.onTouchStart || dom.props.onPointerDown,
      eventAway: dom.props.onTouchStartAway || dom.props.onPointerDownAway,
      option: dom.props.onTouchStartOption || dom.props.onPointerDownOption,
    },
    {
      type: 'touchmove',
      event: dom.props.onTouchMove || dom.props.onPointerMove,
      eventAway: dom.props.onTouchMoveAway || dom.props.onPointerMoveAway,
      option: dom.props.onTouchMoveOption || dom.props.onPointerMoveOption,
    },
    {
      type: 'touchend',
      event: dom.props.onTouchEnd || dom.props.onPointerUp,
      eventAway: dom.props.onTouchEndAway || dom.props.onPointerUpAway,
      option: dom.props.onTouchEndOption || dom.props.onPointerUpOption,
    },
    {
      type: 'mousedown',
      event: dom.props.onMouseDown || dom.props.onPointerDown,
      eventAway: dom.props.onMouseDownAway || dom.props.onPointerDownAway,
      option: dom.props.onMouseDownOption || dom.props.onPointerDownOption,
    },
    {
      type: 'mousemove',
      event: dom.props.onMouseMove || dom.props.onPointerMove,
      eventAway: dom.props.onMouseMoveAway || dom.props.onPointerMoveAway,
      option: dom.props.onMouseOption || dom.props.onPointerMoveOption,
    },
    {
      type: 'mouseup',
      event: dom.props.onMouseUp || dom.props.onPointerUp,
      eventAway: dom.props.onMouseUpAway || dom.props.onPointerUpAway,
      option: dom.props.onMouseUpOption || dom.props.onPointerUpOption,
    },
  ]

  const event = (e, i) => {
    const cr = e.xs.some((i, index) => cover(e.xs[index], e.ys[index]))

    if (cr === true && i.event) i.event({ ...e, dom })
    if (cr !== true && i.eventAway) i.eventAway({ ...e, dom })
  }

  typeArray.forEach(i => {
    if (i.event || i.eventAway) Canvas2d.Event.addEventListener(i.type, e => event(e, i), i.option)
  })
}

export default addEventListener