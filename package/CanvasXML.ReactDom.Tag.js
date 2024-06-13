import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'
import ReactDomEvent from './CanvasXML.ReactDom.Event'
import ReactDomEventDrag from './CanvasXML.ReactDom.Event.Drag'

import Arc from './CanvasXML.ReactDom.Tag.Component.Arc'
import Clip from './CanvasXML.ReactDom.Tag.Component.Clip'
import Fill from './CanvasXML.ReactDom.Tag.Component.Fill'
import Image from './CanvasXML.ReactDom.Tag.Component.Image'
import Layout from './CanvasXML.ReactDom.Tag.Component.Layout'
import Rect from './CanvasXML.ReactDom.Tag.Component.Rect'
import Stroke from './CanvasXML.ReactDom.Tag.Component.Stroke'
import Text from './CanvasXML.ReactDom.Tag.Component.Text'

const preprocessing = (props) => {
  ReactDom.context().save()

  if (props.globalAlpha !== undefined) ReactDom.context().globalAlpha = props.globalAlpha

  if (props.font !== undefined) ReactDom.context().font = props.font

  if (props.fillStyle !== undefined) ReactDom.context().fillStyle = props.fillStyle

  if (props.strokeStyle !== undefined) ReactDom.context().strokeStyle = props.strokeStyle

  if (Boolean(props.beginPath) === true) ReactDom.context().beginPath()
}

const postprocessing = (props) => {
  if (Boolean(props.fill) === true) ReactDom.context().fill()
  if (Boolean(props.stroke) === true) ReactDom.context().stroke()

  ReactDomEvent.useEventListener('click', props.onClick)
  ReactDomEvent.useEventListener('touchstart', props.onTouchStart)
  ReactDomEvent.useEventListener('touchmove', props.onTouchMove)
  ReactDomEvent.useEventListener('touchend', props.onTouchEnd)
  ReactDomEvent.useEventListener('mousedown', props.onMouseUp)
  ReactDomEvent.useEventListener('mousemove', props.onMouseMove)
  ReactDomEvent.useEventListener('mouseup', props.onMouseUp)

  ReactDomEventDrag.useDragControl(props.onDragEnable, props.onDrag)

  if (Boolean(props.isolated) === true) ReactDom.context().restore()

  React.useEffectLoopEnd(() => { if (Boolean(props.isolated) !== true) ReactDom.context().restore() } , [])
}

const render = (alternate) => {
  if (alternate === 'arc') return Arc
  if (alternate === 'clip') return Clip
  if (alternate === 'fill') return Fill
  if (alternate === 'image') return Image
  if (alternate === 'layout') return Layout
  if (alternate === 'rect') return Rect
  if (alternate === 'stroke') return Stroke
  if (alternate === 'text') return Text
}

const ReactDomComponentTag = { render, preprocessing, postprocessing, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default ReactDomComponentTag