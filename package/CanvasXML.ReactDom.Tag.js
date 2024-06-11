import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'
import ReactDomEvent from './CanvasXML.ReactDom.Event'
import ReactDomEventDrag from './CanvasXML.ReactDom.Event.Drag'

import Arc from './CanvasXML.ReactDom.Tag.Component.Arc'
import Clip from './CanvasXML.ReactDom.Tag.Component.Clip'
import Image from './CanvasXML.ReactDom.Tag.Component.Image'
import Layout from './CanvasXML.ReactDom.Tag.Component.Layout'
import Rect from './CanvasXML.ReactDom.Tag.Component.Rect'
import Text from './CanvasXML.ReactDom.Tag.Component.Text'

const componentRunBefore = (props) => {
  if (Boolean(props.save) === true) ReactDom.context().save()

  if (props.globalAlpha !== undefined) ReactDom.context().globalAlpha = props.globalAlpha

  if (props.font !== undefined) ReactDom.context().font = props.font

  if (props.fillStyle !== undefined) ReactDom.context().fillStyle = props.fillStyle
  if (props.strokeStyle !== undefined) ReactDom.context().strokeStyle = props.strokeStyle
}

const componentRunAfter = (props) => {
  if (Boolean(props.fill) === true) ReactDom.context().fill()
  if (Boolean(props.stroke) === true) ReactDom.context().stroke()

  if (Boolean(props.save) === true) ReactDom.context().restore()

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
  if (tag === 'arc') return Arc
  if (tag === 'clip') return Clip
  if (tag === 'image') return Image
  if (tag === 'layout') return Layout
  if (tag === 'rect') return Rect
  if (tag === 'text') return Text
}

const ReactDomComponentTag = { render, componentRunBefore, componentRunAfter }

export default ReactDomComponentTag