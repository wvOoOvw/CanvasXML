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
  const unit = (value, property) => {
    if (typeof value === 'number') {
      return value
    }

    if (typeof value === 'string') {
      if (value === 'extend' && (property === 'x' || property === 'y' || property === 'w' || property === 'h')) {
        return dom.parent.props[property]
      }

      if (value.match(/^min\(.+\)$/)) {
        const splits = value.replace(/^min\(/, '').replace(/\)$/, '').split(/\s?,\s?/)

        splits.forEach((i, index) => {
          splits[index] = unit(i, property)
        })

        return Math.min(...splits)
      }

      if (value.match(/^max\(.+\)$/)) {
        const splits = value.replace(/^max\(/, '').replace(/\)$/, '').split(/(\s+)?,(\s+)?/)

        splits.forEach((i, index) => {
          splits[index] = unit(i, property)
        })

        return Math.max(...splits)
      }

      if (value.match(/^calc\(.+\)$/)) {
        const splits = value.replace(/^calc\(/, '').replace(/\)$/, '').split(' ')

        splits.forEach((i, index) => {
          if (i !== '+' && i !== '-' && i !== '*' && i !== '/') splits[index] = unit(i, property)
        })

        return (new Function('return ' + splits.join(' ')))()
      }

      if (value.match(/^.+%$/)) {
        if (property === 'w' || property === 'l' || property === 'r') return dom.parent.props.w * Number(value.replace(/%/, '')) / 100
        if (property === 'h' || property === 'r' || property === 'b') return dom.parent.props.h * Number(value.replace(/%/, '')) / 100
      }

      if (value.match(/^.+vmin$/)) {
        return dom.parent.props.vmin * Number(value.replace(/vmin/, ''))
      }

      if (value.match(/^.+vmax$/)) {
        return dom.parent.props.vmax * Number(value.replace(/vmax/, ''))
      }

      if (value.match(/^.+vw$/)) {
        return dom.parent.props.vw * Number(value.replace(/vw/, ''))
      }

      if (value.match(/^.+vh$/)) {
        return dom.parent.props.vh * Number(value.replace(/vh/, ''))
      }

      if (value.match(/^.+px$/)) {
        return Number(value.replace(/px/, ''))
      }

      if (value.match(/^\d+$/)) {
        return Number(value)
      }
    }

    if (typeof value === 'function') {
      return value(dom.parent.props)
    }
  }

  const parse = () => {
    if (dom.props && dom.parent && (typeof dom.props.x === 'string' || typeof dom.props.x === 'number')) {
      const n = unit(dom.props.x, 'x')
      if (isNaN(n) === false) dom.props.x = n
    }

    if (dom.props && dom.parent && (typeof dom.props.y === 'string' || typeof dom.props.y === 'number')) {
      const n = unit(dom.props.y, 'y')
      if (isNaN(n) === false) dom.props.y = n
    }

    if (dom.props && dom.parent && (typeof dom.props.w === 'string' || typeof dom.props.w === 'number')) {
      const n = unit(dom.props.w, 'w')
      if (isNaN(n) === false) dom.props.w = n
    }

    if (dom.props && dom.parent && (typeof dom.props.h === 'string' || typeof dom.props.h === 'number')) {
      const n = unit(dom.props.h, 'h')
      if (isNaN(n) === false) dom.props.h = n
    }

    if (dom.props && dom.parent && (typeof dom.props.l === 'string' || typeof dom.props.l === 'number') && dom.props.x === undefined) {
      const n = unit(dom.props.l, 'l')
      if (isNaN(n) === false) dom.props.x = dom.parent.props.x + n
    }

    if (dom.props && dom.parent && (typeof dom.props.r === 'string' || typeof dom.props.r === 'number') && dom.props.x === undefined) {
      const n = unit(dom.props.r, 'r')
      if (isNaN(n) === false) dom.props.x = dom.parent.props.x + dom.parent.props.w - n
    }

    if (dom.props && dom.parent && (typeof dom.props.t === 'string' || typeof dom.props.t === 'number') && dom.props.y === undefined) {
      const n = unit(dom.props.t, 't')
      if (isNaN(n) === false) dom.props.y = dom.parent.props.y + n
    }

    if (dom.props && dom.parent && (typeof dom.props.b === 'string' || typeof dom.props.b === 'number') && dom.props.y === undefined) {
      const n = unit(dom.props.b, 'b')
      if (isNaN(n) === false) dom.props.y = dom.parent.props.y + dom.parent.props.h - n
    }

    if (dom.props && dom.parent && (typeof dom.props.x === 'function')) {
      dom.props.x = unit(dom.props.x, 'x')
    }

    if (dom.props && dom.parent && (typeof dom.props.y === 'function')) {
      dom.props.y = unit(dom.props.y, 'y')
    }

    if (dom.props && dom.parent && (typeof dom.props.w === 'function')) {
      dom.props.w = unit(dom.props.w, 'w')
    }

    if (dom.props && dom.parent && (typeof dom.props.h === 'function')) {
      dom.props.h = unit(dom.props.h, 'h')
    }
  }

  parse()

  Object.assign(dom.props, Location.coordinate(dom.props))
}

const renderMount_1 = (dom) => {
  ReactDom.context().save()

  if (dom.props.globalAlpha !== undefined) ReactDom.context().globalAlpha = dom.props.globalAlpha
  if (dom.props.font !== undefined) ReactDom.context().font = dom.props.font
  if (dom.props.fillStyle !== undefined) ReactDom.context().fillStyle = dom.props.fillStyle
  if (dom.props.strokeStyle !== undefined) ReactDom.context().strokeStyle = dom.props.strokeStyle

  if (Boolean(dom.props.beginPath) === true) ReactDom.context().beginPath()
}

const renderMount_2 = (dom) => {
  if (Boolean(dom.props.clip) === true) ReactDom.context().clip()
  if (Boolean(dom.props.fill) === true) ReactDom.context().fill()
  if (Boolean(dom.props.stroke) === true) ReactDom.context().stroke()

  if (Boolean(dom.props.isolated) === true) ReactDom.context().restore()
}

const renderUnmount = (dom) => {
  if (Boolean(dom.props.isolated) !== true) ReactDom.context().restore()

  if (dom.props.onClick) ReactDomEvent.addEventListener('click', (e) => dom.props.onClick({ ...e, dom }))
  if (dom.props.onTouchStart) ReactDomEvent.addEventListener('touchstart', (e) => dom.props.onTouchStart({ ...e, dom }))
  if (dom.props.onTouchMove) ReactDomEvent.addEventListener('touchmove', (e) => dom.props.onTouchMove({ ...e, dom }))
  if (dom.props.onTouchEnd) ReactDomEvent.addEventListener('touchend', (e) => dom.props.onTouchEnd({ ...e, dom }))
  if (dom.props.onMouseDown) ReactDomEvent.addEventListener('mousedown', (e) => dom.props.onMouseDown({ ...e, dom }))
  if (dom.props.onMouseMove) ReactDomEvent.addEventListener('mousemove', (e) => dom.props.onMouseMove({ ...e, dom }))
  if (dom.props.onMouseUp) ReactDomEvent.addEventListener('mouseup', (e) => dom.props.onMouseUp({ ...e, dom }))

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

  if (alternate) console.warn('Unrecognized Tag' + ':' + alternate)
}

const ReactDomComponentTag = { pick, renderMount_0, renderMount_1, renderMount_2, renderUnmount, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default ReactDomComponentTag