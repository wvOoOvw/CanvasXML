import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'
import ReactDomEvent from './CanvasXML.ReactDom.Event'
import ReactDomEventDrag from './CanvasXML.ReactDom.Event.Drag'

import Arc from './CanvasXML.ReactDom.Tag.Component.Arc'
import Image from './CanvasXML.ReactDom.Tag.Component.Image'
import Layout from './CanvasXML.ReactDom.Tag.Component.Layout'
import Rect from './CanvasXML.ReactDom.Tag.Component.Rect'

const componentRunBefore = (props) => {
  if (props.save) ReactDom.context().save()
}

const componentRunAfter = (props) => {
  if (props.globalAlpha) ReactDom.context().globalAlpha = props.globalAlpha

  if (props.font) ReactDom.context().font = props.font

  if (props.fillStyle) ReactDom.context().fillStyle = props.fillStyle
  if (props.strokeStyle) ReactDom.context().strokeStyle = props.strokeStyle

  if (props.fill) ReactDom.context().fill()
  if (props.stroke) ReactDom.context().stroke()

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

const render = (tag) => {
  if (tag === 'layout') return Layout
  if (tag === 'rect') return Rect
  if (tag === 'arc') return Arc
  if (tag === 'image') return Image
}

const ReactDomComponentTag = { render, componentRunBefore, componentRunAfter }

export default ReactDomComponentTag