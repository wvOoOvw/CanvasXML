import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'
import ReactDomEvent from './CanvasXML.ReactDom.Event'
import ReactDomEventDrag from './CanvasXML.ReactDom.Event.Drag'

import Draw from './CanvasXML.Draw'

const process = (props, callback) => {
  if (props.save) ReactDom.context().save()

  callback()

  if (props.globalAlpha) ReactDom.context().globalAlpha = props.globalAlpha

  if (props.fillStyle) ReactDom.context().fillStyle = props.fillStyle

  if (props.fill) ReactDom.context().fill()

  if (props.save) ReactDom.context().restore()

  if (props && typeof props.onClick === 'function') ReactDomEvent.useEventListener('click', props.onClick)
  if (props && typeof props.onTouchStart === 'function') ReactDomEvent.useEventListener('touchstart', props.onTouchStart)
  if (props && typeof props.onTouchMove === 'function') ReactDomEvent.useEventListener('touchmove', props.onTouchMove)
  if (props && typeof props.onTouchEnd === 'function') ReactDomEvent.useEventListener('touchend', props.onTouchEnd)
  if (props && typeof props.onMouseUp === 'function') ReactDomEvent.useEventListener('mousedown', props.onMouseUp)
  if (props && typeof props.onMouseMove === 'function') ReactDomEvent.useEventListener('mousemove', props.onMouseMove)
  if (props && typeof props.onMouseUp === 'function') ReactDomEvent.useEventListener('mouseup', props.onMouseUp)
  if (props && typeof props.onDrag === 'object') ReactDomEventDrag.useDragControl(props.onDragOption)
}

const Layout = (props) => {
  // const node = React.renderNode()

  // if (Boolean(props.container)) {
  //   node.layoutContainer
  // }

  // if (Boolean(props.item) === true) {
  //   return props.children(node.layoutPostion)
  // }

  // console.log(React.renderNode().parent.props)

  console.log(props)

  return props.children
}

const Rect = (props) => {
  const callback = () => {
    Draw.drawRect(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h })
  }

  process(props, callback)

  return props.children
}

const Arc = (props) => {
  const callback = () => {
    Draw.drawArc(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.radius, props.sAngle, props.eAngle, props.counterclockwise)
  }

  process(props, callback)

  return props.children
}

const Image = (props) => {
  const callback = () => {
    if (Boolean(props.clipmin) !== true && Boolean(props.clipmax) === true) Draw.drawImageClipMaxCenter(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
    if (Boolean(props.clipmin) === true && Boolean(props.clipmax) !== true) Draw.drawImageClipMinCenter(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
    if (Boolean(props.clipmin) !== true && Boolean(props.clipmax) !== true) Draw.drawImage(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
  }

  process(props, callback)

  return props.children
}

const render = (tag) => {
  if (tag === 'layout') return Layout
  if (tag === 'rect') return Rect
  if (tag === 'arc') return Arc
  if (tag === 'image') return Image
}

const ReactDomComponentTag = { render }

export default ReactDomComponentTag