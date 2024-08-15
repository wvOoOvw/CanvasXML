import Core from './Core'

import Location from './Module.Location'
import Event from './Module.Event'

import Arc from './Module.Tag.Component.Arc'
import Circle from './Module.Tag.Component.Circle'
import Clip from './Module.Tag.Component.Clip'
import Fill from './Module.Tag.Component.Fill'
import Image from './Module.Tag.Component.Image'
import Layout from './Module.Tag.Component.Layout'
import Line from './Module.Tag.Component.Line'
import Path from './Module.Tag.Component.Path'
import Rect from './Module.Tag.Component.Rect'
import RectRadius from './Module.Tag.Component.RectRadius'
import Rotate from './Module.Tag.Component.Rotate'
import Scale from './Module.Tag.Component.Scale'
import Stroke from './Module.Tag.Component.Stroke'
import Text from './Module.Tag.Component.Text'
import Translate from './Module.Tag.Component.Translate'


const pick = (tag) => {
  if (tag === 'arc') return Arc
  if (tag === 'circle') return Circle
  if (tag === 'clip') return Clip
  if (tag === 'fill') return Fill
  if (tag === 'image') return Image
  if (tag === 'layout') return Layout
  if (tag === 'line') return Line
  if (tag === 'path') return Path
  if (tag === 'rect') return Rect
  if (tag === 'rectradius') return RectRadius
  if (tag === 'rotate') return Rotate
  if (tag === 'scale') return Scale
  if (tag === 'stroke') return Stroke
  if (tag === 'text') return Text
  if (tag === 'translate') return Translate
}

const locationMount = (dom) => {
  const undefineds = (property) => {
    return property.every(i => typeof dom.props[i] === 'undefined')
  }

  const unit = (value, property) => {
    if (typeof value === 'number') {
      return value
    }
    if (typeof value === 'string') {
      if (value.match(/^[\d\.-]+$/) && isNaN(value) === false) {
        return Number(value)
      }

      if (value.match(/^.+px$/)) {
        return Number(value.replace(/px/, ''))
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

      if (value.match(/^.+%$/)) {
        if (property === 'x' || property === 'cx' || property === 'gx' || property === 'w' || property === 'l' || property === 'r') return dom.parent.props.w * Number(value.replace(/%/, '')) / 100
        if (property === 'y' || property === 'cy' || property === 'gy' || property === 'h' || property === 'r' || property === 'b') return dom.parent.props.h * Number(value.replace(/%/, '')) / 100
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

      if (value.match(/^calc\(.+\)$/)) {
        return value
          .replace(/^calc\(/, '')
          .replace(/\)$/, '')
          .split(/\s+/)
          .reduce(
            (t, i) => {
              if (i === '+' || i === '-' || i === '*' || i === '/') t.operator = i
              if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '+') t.value = t.value + unit(i, property)
              if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '-') t.value = t.value - unit(i, property)
              if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '*') t.value = t.value * unit(i, property)
              if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '/') t.value = t.value / unit(i, property)
              if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === undefined) t.value = unit(i, property)
              return t
            },
            { value: undefined, operator: undefined }
          ).value
      }
    }
  }

  if (typeof dom.props.w !== 'undefined') dom.props.w = unit(dom.props.w, 'w')
  if (typeof dom.props.w === 'undefined') dom.props.w = dom.parent.props.w

  if (typeof dom.props.h !== 'undefined') dom.props.h = unit(dom.props.h, 'h')
  if (typeof dom.props.h === 'undefined') dom.props.h = dom.parent.props.h

  if (typeof dom.props.x !== 'undefined') dom.props.x = dom.parent.props.x + unit(dom.props.x, 'x')
  if (typeof dom.props.x === 'undefined' && undefineds(['cx', 'gx', 'l', 'r'])) dom.props.x = dom.parent.props.x

  if (typeof dom.props.y !== 'undefined') dom.props.y = dom.parent.props.y + unit(dom.props.y, 'y')
  if (typeof dom.props.y === 'undefined' && undefineds(['cy', 'gy', 't', 'b'])) dom.props.y = dom.parent.props.y

  if (typeof dom.props.cx !== 'undefined' && undefineds(['x', 'gx', 'l', 'r'])) dom.props.x = dom.parent.props.x - dom.props.w / 2 + unit(dom.props.cx, 'cx')
  if (typeof dom.props.cy !== 'undefined' && undefineds(['y', 'gy', 't', 'b'])) dom.props.y = dom.parent.props.y - dom.props.h / 2 + unit(dom.props.cy, 'cy')

  if (typeof dom.props.gx !== 'undefined' && undefineds(['x', 'cx', 'l', 'r'])) dom.props.x = unit(dom.props.gx, 'gx')
  if (typeof dom.props.gy !== 'undefined' && undefineds(['y', 'cy', 't', 'b'])) dom.props.y = unit(dom.props.gy, 'gy')

  if (typeof dom.props.l !== 'undefined' && undefineds(['x', 'cx', 'gx', 'r'])) dom.props.x = dom.parent.props.x + unit(dom.props.l, 'l')
  if (typeof dom.props.r !== 'undefined' && undefineds(['x', 'cx', 'gx', 'l'])) dom.props.x = dom.parent.props.x + dom.parent.props.w - dom.props.w - unit(dom.props.r, 'r')
  if (typeof dom.props.t !== 'undefined' && undefineds(['y', 'cy', 'gy', 'b'])) dom.props.y = dom.parent.props.y + unit(dom.props.t, 't')
  if (typeof dom.props.b !== 'undefined' && undefineds(['y', 'cy', 'gy', 't'])) dom.props.y = dom.parent.props.y + dom.parent.props.h - dom.props.h - unit(dom.props.b, 'b')

  Object.assign(dom.props, Location.coordinate(dom.props))
}

const locationUnmount = (dom) => {
  Object.assign(dom.props, Location.coordinate(dom.props))
}

const renderMount_0 = (dom) => {
  dom._save = dom.props.save === undefined || Boolean(dom.props.save) === true
  dom._beginPath = dom.props.beginPath === undefined || Boolean(dom.props.beginPath) === true

  if (
    dom.element.tag !== 'clip' &&
    dom.element.tag !== 'rotate' &&
    dom.element.tag !== 'scale' &&
    dom.element.tag !== 'translate' &&
    dom.props.globalAlpha === undefined &&
    dom.props.font === undefined &&
    dom.props.fillStyle === undefined &&
    dom.props.strokeStyle === undefined &&
    dom.props.shadowBlur === undefined &&
    dom.props.shadowColor === undefined &&
    dom.props.shadowOffsetX === undefined &&
    dom.props.shadowOffsetY === undefined &&
    dom.props.transform === undefined &&
    dom.props.clip === undefined
  ) {
    dom._save = Boolean(dom.props.save) === true
  }

  if (
    dom.element.tag !== 'arc' &&
    dom.element.tag !== 'circle' &&
    dom.element.tag !== 'line' &&
    dom.element.tag !== 'rect' &&
    dom.element.tag !== 'rectradius'
  ) {
    dom._beginPath = Boolean(dom.props.beginPath) === true
  }

  if (dom._save === true) Core.context().save()
  if (dom._beginPath === true) Core.context().beginPath()

  if (dom.props.globalAlpha !== undefined) Core.context().globalAlpha = Core.context().globalAlpha * dom.props.globalAlpha
  if (dom.props.font !== undefined) Core.context().font = dom.props.font
  if (dom.props.fillStyle !== undefined) Core.context().fillStyle = dom.props.fillStyle
  if (dom.props.strokeStyle !== undefined) Core.context().strokeStyle = dom.props.strokeStyle
  if (dom.props.shadowBlur !== undefined) Core.context().shadowBlur = dom.props.shadowBlur
  if (dom.props.shadowColor !== undefined) Core.context().shadowColor = dom.props.shadowColor
  if (dom.props.shadowOffsetX !== undefined) Core.context().shadowOffsetX = dom.props.shadowOffsetX
  if (dom.props.shadowOffsetY !== undefined) Core.context().shadowOffsetY = dom.props.shadowOffsetY
  if (dom.props.lineWidth !== undefined) Core.context().lineWidth = dom.props.lineWidth

  if (dom.props.transform !== undefined) {
    const transformUnit = (type, value) => {
      if (type === 'rotate') Core.context().rotate(value.angle)
      if (type === 'scale') Core.context().scale(value.w, value.h)
      if (type === 'translate') Core.context().translate(value.x, value.y)
    }
    dom.props.transform.forEach(i => Object.keys(i).forEach(n => transformUnit(n, i[n])))
  }
}

const renderMount_1 = (dom) => {
  if (Boolean(dom.props.clip) === true) Core.context().clip()
  if (Boolean(dom.props.fill) === true) Core.context().fill()
  if (Boolean(dom.props.stroke) === true) Core.context().stroke()

  if (Boolean(dom.props.isolated) === true && dom._save === true) Core.context().restore()
}

const renderUnmount_0 = (dom) => {
  if (Boolean(dom.props.isolated) !== true && dom._save === true) Core.context().restore()
}

const renderUnmount_1 = (dom, cover) => {
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
    const covered = e.xs.some((i, index) => cover(e.xs[index], e.ys[index]) === true)
    const coveredAway = e.xs.some((i, index) => cover(e.xs[index], e.ys[index]) === false)

    if (covered === true && i.event) i.event({ ...e, dom, cover })
    if (coveredAway === true && i.eventAway) i.eventAway({ ...e, dom, cover })
  }

  typeArray.forEach(i => {
    if (i.event || i.eventAway) Event.addEventListener(i.type, e => event(e, i), i.option)
  })
}

const relocation = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (tagComponent !== undefined && typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom)
  if (tagComponent !== undefined) tagComponent.locationMount(dom)
  if (tagComponent !== undefined && typeof dom.props.onLocationMounted === 'function') dom.props.onLocationMounted(dom)

  if (dom.children) dom.children.forEach(i => relocation(i))

  if (tagComponent !== undefined && typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom)
  if (tagComponent !== undefined) tagComponent.locationUnmount(dom)
  if (tagComponent !== undefined && typeof dom.props.onLocationUnmounted === 'function') dom.props.onLocationUnmounted(dom)
}

const rerender = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (tagComponent !== undefined && typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom)
  if (tagComponent !== undefined) tagComponent.renderMount(dom)
  if (tagComponent !== undefined && typeof dom.props.onRenderMounted === 'function') dom.props.onRenderMounted(dom)

  if (dom.children) dom.children.sort((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i))

  if (tagComponent !== undefined && typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom)
  if (tagComponent !== undefined) tagComponent.renderUnmount(dom)
  if (tagComponent !== undefined && typeof dom.props.onRenderUnmounted === 'function') dom.props.onRenderUnmounted(dom)
}


export default { pick, relocation, rerender, locationMount, locationUnmount, renderMount_0, renderMount_1, renderUnmount_0, renderUnmount_1, Arc, Circle, Clip, Fill, Image, Layout, Line, Path, Rect, RectRadius, Scale, Rotate, Stroke, Text, Translate }