import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'
import ReactDomEvent from './CanvasXML.ReactDom.Event'
import ReactDomEventDrag from './CanvasXML.ReactDom.Event.Drag'
import Location from './CanvasXML.Location'

import Arc from './CanvasXML.ReactDom.Tag.Component.Arc'
import Clip from './CanvasXML.ReactDom.Tag.Component.Clip'
import Fill from './CanvasXML.ReactDom.Tag.Component.Fill'
import Image from './CanvasXML.ReactDom.Tag.Component.Image'
import Layout from './CanvasXML.ReactDom.Tag.Component.Layout'
import Rect from './CanvasXML.ReactDom.Tag.Component.Rect'
import Stroke from './CanvasXML.ReactDom.Tag.Component.Stroke'
import Text from './CanvasXML.ReactDom.Tag.Component.Text'

const renderMount_0 = (dom) => {
  // new Array('x', 'y').forEach(i => {

  //   if (typeof props[i] === 'string' && props[i].includes(/%/) && isNaN(props[i].replace(/%/, '')) === false) {
  //     dom.props[i] = dom.props[i](dom.parent.element.props)
  //     props[i] = dom.props[i]
  //   }

  //   if (typeof props[i] === 'string') {
  //     if (props[i] === 'extend') dom.props[i] = dom.parent.element.props[i]
  //     props[i] = dom.props[i]
  //   }

  // })

  Object.assign(dom.props, Location.coordinate(dom.props))

  ReactDom.context().save()

  if (dom.props.globalAlpha !== undefined) ReactDom.context().globalAlpha = dom.props.globalAlpha

  if (dom.props.font !== undefined) ReactDom.context().font = dom.props.font

  if (dom.props.fillStyle !== undefined) ReactDom.context().fillStyle = dom.props.fillStyle

  if (dom.props.strokeStyle !== undefined) ReactDom.context().strokeStyle = dom.props.strokeStyle

  if (Boolean(dom.props.beginPath) === true) ReactDom.context().beginPath()
}

const renderMount_1 = (dom) => {
  if (Boolean(dom.props.fill) === true) ReactDom.context().fill()

  if (Boolean(dom.props.stroke) === true) ReactDom.context().stroke()

  if (Boolean(dom.props.isolated) === true) ReactDom.context().restore()

  // Object.assign(dom.props, Location.coordinate(dom.props))
}

const renderUnmount = (dom) => {
  if (Boolean(dom.props.isolated) !== true) ReactDom.context().restore()

  if (dom.props.onClick) ReactDomEvent.addEventListener('click', (e) => dom.props.onClick({ ...e, props: props }))
  if (dom.props.onTouchStart) ReactDomEvent.addEventListener('touchstart', (e) => dom.props.onTouchStart({ ...e, props: props }))
  if (dom.props.onTouchMove) ReactDomEvent.addEventListener('touchmove', (e) => dom.props.onTouchMove({ ...e, props: props }))
  if (dom.props.onTouchEnd) ReactDomEvent.addEventListener('touchend', (e) => dom.props.onTouchEnd({ ...e, props: props }))
  if (dom.props.onMouseUp) ReactDomEvent.addEventListener('mousedown', (e) => dom.props.onMouseUp({ ...e, props: props }))
  if (dom.props.onMouseMove) ReactDomEvent.addEventListener('mousemove', (e) => dom.props.onMouseMove({ ...e, props: props }))
  if (dom.props.onMouseUp) ReactDomEvent.addEventListener('mouseup', (e) => dom.props.onMouseUp({ ...e, props: props }))

  if (typeof dom.props.ref === 'function') dom.props.ref(dom)
}

const pick = (alternate) => {
  if (alternate === 'arc') return Arc
  if (alternate === 'clip') return Clip
  if (alternate === 'fill') return Fill
  if (alternate === 'image') return Image
  if (alternate === 'layout') return Layout
  if (alternate === 'rect') return Rect
  if (alternate === 'stroke') return Stroke
  if (alternate === 'text') return Text
}

const ReactDomComponentTag = { pick, renderMount_0, renderMount_1, renderUnmount, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default ReactDomComponentTag