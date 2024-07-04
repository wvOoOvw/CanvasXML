import Canvas2d from './CanvasXML.Canvas2d'

import Arc from './CanvasXML.Canvas2d.Tag.Component.Arc'
import Clip from './CanvasXML.Canvas2d.Tag.Component.Clip'
import Fill from './CanvasXML.Canvas2d.Tag.Component.Fill'
import Image from './CanvasXML.Canvas2d.Tag.Component.Image'
import Layout from './CanvasXML.Canvas2d.Tag.Component.Layout'
import Line from './CanvasXML.Canvas2d.Tag.Component.Line'
import Rect from './CanvasXML.Canvas2d.Tag.Component.Rect'
import Rotate from './CanvasXML.Canvas2d.Tag.Component.Rotate'
import Scale from './CanvasXML.Canvas2d.Tag.Component.Scale'
import Stroke from './CanvasXML.Canvas2d.Tag.Component.Stroke'
import Text from './CanvasXML.Canvas2d.Tag.Component.Text'
import Translate from './CanvasXML.Canvas2d.Tag.Component.Translate'

const event = ['onClick', 'onClickAway', 'onTouchStart', 'onTouchStartAway', 'onTouchMove', 'onTouchMoveAway', 'onTouchEnd', 'onTouchEndAway', 'onMouseDown', 'onMouseDownAway', 'onMouseMove', 'onMouseMoveAway', 'onMouseUp', 'onMouseUpAway', 'onPointerDown', 'onPointerDownAway', 'onPointerMove', 'onPointerMoveAway', 'onPointerUp', 'onPointerUpAway']

const locationMount = (dom) => {
  const unit = (value, property) => {
    if (typeof value === 'number') {
      return value
    }

    if (typeof value === 'function') {
      return value(dom.parent.props)
    }

    if (typeof value === 'undefined') {
      return dom.parent.props[property]
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
    if (dom.props && dom.parent && (typeof dom.props.x === 'string' || typeof dom.props.x === 'number' || typeof dom.props.x === 'function' || typeof dom.props.x === 'undefined')) {
      const n = unit(dom.props.x, 'x')
      if (isNaN(n) === false) dom.props.x = n
    }

    if (dom.props && dom.parent && (typeof dom.props.y === 'string' || typeof dom.props.y === 'number' || typeof dom.props.y === 'function' || typeof dom.props.y === 'undefined')) {
      const n = unit(dom.props.y, 'y')
      if (isNaN(n) === false) dom.props.y = n
    }

    if (dom.props && dom.parent && (typeof dom.props.w === 'string' || typeof dom.props.w === 'number' || typeof dom.props.w === 'function' || typeof dom.props.w === 'undefined')) {
      const n = unit(dom.props.w, 'w')
      if (isNaN(n) === false) dom.props.w = n
    }

    if (dom.props && dom.parent && (typeof dom.props.h === 'string' || typeof dom.props.h === 'number' || typeof dom.props.h === 'function' || typeof dom.props.h === 'undefined')) {
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

  Object.assign(dom.props, Canvas2d.Location.coordinate(dom.props))
}

const locationUnmount = (dom) => {
  if (typeof dom.element.props.w === 'string' && dom.element.props.w.match(/^fit-content\(.+\)$/)) {
    const w = Canvas2d.Location.box(dom.children.map(i => i.props)).w
    if (isNaN(w) === false) dom.props.w = w
  }

  if (typeof dom.element.props.h === 'string' && dom.element.props.h.match(/^fit-content\(.+\)$/)) {
    const h = Canvas2d.Location.box(dom.children.map(i => i.props)).h
    if (isNaN(h) === false) dom.props.h = h
  }

  Object.assign(dom.props, Canvas2d.Location.coordinate(dom.props))
}

const renderMount_0 = (dom) => {
  Canvas2d.context().save()

  const transformUnit = (type, value) => {
    if (type === 'rotate') Canvas2d.context().rotate(...value)
    if (type === 'scale') Canvas2d.context().scale(...value)
    if (type === 'translate') Canvas2d.context().translate(...value)
  }

  if (dom.props.globalAlpha !== undefined) Canvas2d.context().globalAlpha = dom.props.globalAlpha
  if (dom.props.font !== undefined) Canvas2d.context().font = dom.props.font
  if (dom.props.fillStyle !== undefined) Canvas2d.context().fillStyle = dom.props.fillStyle
  if (dom.props.strokeStyle !== undefined) Canvas2d.context().strokeStyle = dom.props.strokeStyle
  if (dom.props.lineWidth !== undefined) Canvas2d.context().lineWidth = dom.props.lineWidth

  if (dom.props.transform !== undefined) dom.props.transform.forEach(i => Object.keys(i).forEach(n => transformUnit(n, i[n])))

  if (Boolean(dom.props.beginPath) === true) Canvas2d.context().beginPath()
}

const renderMount_1 = (dom) => {
  if (Boolean(dom.props.clip) === true) Canvas2d.context().clip()
  if (Boolean(dom.props.fill) === true) Canvas2d.context().fill()
  if (Boolean(dom.props.stroke) === true) Canvas2d.context().stroke()

  if (Boolean(dom.props.isolated) === true) Canvas2d.context().restore()
}

const renderUnmount_0 = (dom) => {
  if (Boolean(dom.props.isolated) !== true) Canvas2d.context().restore()
}

const renderUnmount_1 = (dom, cover) => {
  const typeArray = [
    {
      type: 'click',
      event: dom.props.onClick,
      eventAway: dom.props.onClickAway,
    },
    {
      type: 'touchstart',
      event: dom.props.onTouchStart,
      eventAway: dom.props.onTouchStartAway,
    },
    {
      type: 'touchmove',
      event: dom.props.onTouchMove,
      eventAway: dom.props.onTouchMoveAway,
    },
    {
      type: 'touchend',
      event: dom.props.onTouchEnd,
      eventAway: dom.props.onTouchEndAway,
    },
    {
      type: 'mousedown',
      event: dom.props.onMouseDown,
      eventAway: dom.props.onMouseDownAway,
    },
    {
      type: 'mousemove',
      event: dom.props.onMouseMove,
      eventAway: dom.props.onMouseMoveAway,
    },
    {
      type: 'mouseup',
      event: dom.props.onMouseUp,
      eventAway: dom.props.onMouseUpAway,
    },
    {
      type: 'pointerdown',
      event: dom.props.onPointerDown,
      eventAway: dom.props.onPointerDownAway,
    },
    {
      type: 'pointermove',
      event: dom.props.onPointerMove,
      eventAway: dom.props.onPointerMoveAway,
    },
    {
      type: 'pointerup',
      event: dom.props.onPointerUp,
      eventAway: dom.props.onPointerUpAway,
    }
  ]

  const event = (e, i) => {
    if (cover(e) === true && i.event) i.event({ ...e, dom })
    if (cover(e) !== true && i.eventAway) i.eventAway({ ...e, dom })
  }

  typeArray.forEach(i => {
    if (i.event || i.eventAway) Canvas2d.Event.addEventListener(i.type, e => event(e, i))
  })
}

const relocation = (dom) => {
  if (Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    Canvas2d.Tag.pick(dom.element.tag).locationMount(dom)
    if (typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom)
  }

  if (dom.children) {
    dom.children.forEach(i => relocation(i))
  }

  if (Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    Canvas2d.Tag.pick(dom.element.tag).locationUnmount(dom)
    if (typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom)
  }
}

const rerender = (dom) => {
  if (Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    Canvas2d.Tag.pick(dom.element.tag).renderMount(dom)
    if (typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom)
  }

  if (dom.children) {
    dom.children.toSorted((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i))
  }

  if (Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    Canvas2d.Tag.pick(dom.element.tag).renderUnmount(dom)
    if (typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom)
  }
}

const pick = (tag) => {
  if (tag === 'arc') return Arc
  if (tag === 'clip') return Clip
  if (tag === 'fill') return Fill
  if (tag === 'image') return Image
  if (tag === 'layout') return Layout
  if (tag === 'line') return Line
  if (tag === 'rect') return Rect
  if (tag === 'rotate') return Rotate
  if (tag === 'scale') return Scale
  if (tag === 'stroke') return Stroke
  if (tag === 'text') return Text
  if (tag === 'translate') return Translate
}

const Canvas2dTag = { pick, relocation, rerender, locationMount, locationUnmount, renderMount_0, renderMount_1, renderUnmount_0, renderUnmount_1, event, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default Canvas2dTag