import React from './CanvasXML.React'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'
import ReactCanvas2dEvent from './CanvasXML.ReactCanvas2d.Event'
import Location from './CanvasXML.Location'

import Arc from './CanvasXML.ReactCanvas2d.Tag.Component.Arc'
import Clip from './CanvasXML.ReactCanvas2d.Tag.Component.Clip'
import Fill from './CanvasXML.ReactCanvas2d.Tag.Component.Fill'
import Image from './CanvasXML.ReactCanvas2d.Tag.Component.Image'
import Layout from './CanvasXML.ReactCanvas2d.Tag.Component.Layout'
import Rect from './CanvasXML.ReactCanvas2d.Tag.Component.Rect'
import Stroke from './CanvasXML.ReactCanvas2d.Tag.Component.Stroke'
import Text from './CanvasXML.ReactCanvas2d.Tag.Component.Text'


const locationMount = (dom) => {
  const unit = (value, property) => {
    if (typeof value === 'number') {
      return value
    }

    if (typeof value === 'function') {
      return value(dom.parent.props)
    }

    if (typeof value === 'string') {
      if (value === 'extend' && (property === 'x' || property === 'y' || property === 'w' || property === 'h')) {
        return dom.parent.props[property]
      }

      if (value.match(/^fit-content\(.+\)$/) && (property === 'w' || property === 'h')) {
        return unit(value.replace(/^fit-content\(/, '').replace(/\)$/, ''), property)
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
  }

  const parse = () => {
    if (dom.props && dom.parent && (typeof dom.props.x === 'string' || typeof dom.props.x === 'number' || typeof dom.props.x === 'function')) {
      const n = unit(dom.props.x, 'x')
      if (isNaN(n) === false) dom.props.x = n
    }

    if (dom.props && dom.parent && (typeof dom.props.y === 'string' || typeof dom.props.y === 'number' || typeof dom.props.y === 'function')) {
      const n = unit(dom.props.y, 'y')
      if (isNaN(n) === false) dom.props.y = n
    }

    if (dom.props && dom.parent && (typeof dom.props.w === 'string' || typeof dom.props.w === 'number' || typeof dom.props.w === 'function')) {
      const n = unit(dom.props.w, 'w')
      if (isNaN(n) === false) dom.props.w = n
    }

    if (dom.props && dom.parent && (typeof dom.props.h === 'string' || typeof dom.props.h === 'number' || typeof dom.props.h === 'function')) {
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
  }

  parse()

  Object.assign(dom.props, Location.coordinate(dom.props))
}

const locationUnmount = (dom) => {
  if (typeof dom.element.props.w === 'string' && dom.element.props.w.match(/^fit-content\(.+\)$/)) {
    const w = Location.box(dom.children.map(i => i.props)).w
    if(isNaN(w) === false) dom.props.w = w
  }

  if (typeof dom.element.props.h === 'string' && dom.element.props.h.match(/^fit-content\(.+\)$/)) {
    const h = Location.box(dom.children.map(i => i.props)).h
    if(isNaN(h) === false) dom.props.h = h
  }

  Object.assign(dom.props, Location.coordinate(dom.props))
}

const renderMount_0 = (dom) => {
  ReactCanvas2d.context().save()

  if (dom.props.globalAlpha !== undefined) ReactCanvas2d.context().globalAlpha = dom.props.globalAlpha
  if (dom.props.font !== undefined) ReactCanvas2d.context().font = dom.props.font
  if (dom.props.fillStyle !== undefined) ReactCanvas2d.context().fillStyle = dom.props.fillStyle
  if (dom.props.strokeStyle !== undefined) ReactCanvas2d.context().strokeStyle = dom.props.strokeStyle

  if (Boolean(dom.props.beginPath) === true) ReactCanvas2d.context().beginPath()
}

const renderMount_1 = (dom) => {
  if (Boolean(dom.props.clip) === true) ReactCanvas2d.context().clip()
  if (Boolean(dom.props.fill) === true) ReactCanvas2d.context().fill()
  if (Boolean(dom.props.stroke) === true) ReactCanvas2d.context().stroke()

  if (Boolean(dom.props.isolated) === true) ReactCanvas2d.context().restore()
}

const renderUnmount = (dom) => {
  if (Boolean(dom.props.isolated) !== true) ReactCanvas2d.context().restore()

  if (dom.props.onClick) ReactCanvas2dEvent.addEventListener('click', (e) => dom.props.onClick({ ...e, dom }))
  if (dom.props.onTouchStart) ReactCanvas2dEvent.addEventListener('touchstart', (e) => dom.props.onTouchStart({ ...e, dom }))
  if (dom.props.onTouchMove) ReactCanvas2dEvent.addEventListener('touchmove', (e) => dom.props.onTouchMove({ ...e, dom }))
  if (dom.props.onTouchEnd) ReactCanvas2dEvent.addEventListener('touchend', (e) => dom.props.onTouchEnd({ ...e, dom }))
  if (dom.props.onMouseDown) ReactCanvas2dEvent.addEventListener('mousedown', (e) => dom.props.onMouseDown({ ...e, dom }))
  if (dom.props.onMouseMove) ReactCanvas2dEvent.addEventListener('mousemove', (e) => dom.props.onMouseMove({ ...e, dom }))
  if (dom.props.onMouseUp) ReactCanvas2dEvent.addEventListener('mouseup', (e) => dom.props.onMouseUp({ ...e, dom }))
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

const ReactCanvas2dComponentTag = { pick, locationMount, locationUnmount, renderMount_0, renderMount_1, renderUnmount, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default ReactCanvas2dComponentTag