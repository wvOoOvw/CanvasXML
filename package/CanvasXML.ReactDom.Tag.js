import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'
import ReactDomEvent from './CanvasXML.ReactDom.Event'
import ReactDomEventDrag from './CanvasXML.ReactDom.Event.Drag'

import Arc from './CanvasXML.ReactDom.Tag.Component.Arc'
import Clip from './CanvasXML.ReactDom.Tag.Component.Clip'
import Fill from './CanvasXML.ReactDom.Tag.Component.Fill'
import Image from './CanvasXML.ReactDom.Tag.Component.Image'
import Layout from './CanvasXML.ReactDom.Tag.Component.Layout'
import Lazy from './CanvasXML.ReactDom.Tag.Component.Lazy'
import Rect from './CanvasXML.ReactDom.Tag.Component.Rect'
import Stroke from './CanvasXML.ReactDom.Tag.Component.Stroke'
import Text from './CanvasXML.ReactDom.Tag.Component.Text'

const renderBefore = (props) => {
  ReactDom.context().save()

  if (props.globalAlpha !== undefined) ReactDom.context().globalAlpha = props.globalAlpha

  if (props.font !== undefined) ReactDom.context().font = props.font

  if (props.fillStyle !== undefined) ReactDom.context().fillStyle = props.fillStyle

  if (props.strokeStyle !== undefined) ReactDom.context().strokeStyle = props.strokeStyle

  if (Boolean(props.beginPath) === true) ReactDom.context().beginPath()
}

const renderAfter = (props) => {
  if (Boolean(props.fill) === true) ReactDom.context().fill()
  if (Boolean(props.stroke) === true) ReactDom.context().stroke()

  if (Boolean(props.isolated) === true) ReactDom.context().restore()
}

const renderEnd = (props) => {
  if (Boolean(props.isolated) !== true) ReactDom.context().restore()

  if (props.onClick) ReactDomEvent.addEventListener('click', (e) => props.onClick({ ...e, props: props }))
  if (props.onTouchStart) ReactDomEvent.addEventListener('touchstart', (e) => props.onTouchStart({ ...e, props: props }))
  if (props.onTouchMove) ReactDomEvent.addEventListener('touchmove', (e) => props.onTouchMove({ ...e, props: props }))
  if (props.onTouchEnd) ReactDomEvent.addEventListener('touchend', (e) => props.onTouchEnd({ ...e, props: props }))
  if (props.onMouseUp) ReactDomEvent.addEventListener('mousedown', (e) => props.onMouseUp({ ...e, props: props }))
  if (props.onMouseMove) ReactDomEvent.addEventListener('mousemove', (e) => props.onMouseMove({ ...e, props: props }))
  if (props.onMouseUp) ReactDomEvent.addEventListener('mouseup', (e) => props.onMouseUp({ ...e, props: props }))
}

const render = (alternate) => {
  if (alternate === 'arc') return Arc
  if (alternate === 'clip') return Clip
  if (alternate === 'fill') return Fill
  if (alternate === 'image') return Image
  if (alternate === 'layout') return Layout
  if (alternate === 'lazy') return Lazy
  if (alternate === 'rect') return Rect
  if (alternate === 'stroke') return Stroke
  if (alternate === 'text') return Text
}

const ReactDomComponentTag = { render, renderBefore, renderAfter, renderEnd, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default ReactDomComponentTag