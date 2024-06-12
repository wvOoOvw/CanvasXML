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

const preprocessing = (props) => {
  ReactDom.context().save()

  if (props.globalAlpha !== undefined) ReactDom.context().globalAlpha = props.globalAlpha

  if (props.font !== undefined) ReactDom.context().font = props.font

  if (props.fillStyle !== undefined) ReactDom.context().fillStyle = props.fillStyle

  if (props.strokeStyle !== undefined) ReactDom.context().strokeStyle = props.strokeStyle
}

const postprocessing = (props) => {
  ReactDomEvent.useEventListener('click', props.onClick)
  ReactDomEvent.useEventListener('touchstart', props.onTouchStart)
  ReactDomEvent.useEventListener('touchmove', props.onTouchMove)
  ReactDomEvent.useEventListener('touchend', props.onTouchEnd)
  ReactDomEvent.useEventListener('mousedown', props.onMouseUp)
  ReactDomEvent.useEventListener('mousemove', props.onMouseMove)
  ReactDomEvent.useEventListener('mouseup', props.onMouseUp)

  ReactDomEventDrag.useDragControl(props.onDragOption)

  if (Boolean(props.isolated) === true) ReactDom.context().restore()

  React.useEffectLoopEnd(() => { if (Boolean(props.isolated) !== true) ReactDom.context().restore() } , [])
}

const render = (tag) => {
  if (tag === 'arc') return Arc
  if (tag === 'clip') return Clip
  if (tag === 'image') return Image
  if (tag === 'layout') return Layout
  if (tag === 'rect') return Rect
  if (tag === 'text') return Text
}

const ReactDomComponentTag = { render, preprocessing, postprocessing }

export default ReactDomComponentTag