import Canvas2d from './CanvasXML.Canvas2d'

import Arc from './CanvasXML.Canvas2d.Tag.Component.Arc'
import Circle from './CanvasXML.Canvas2d.Tag.Component.Circle'
import Clip from './CanvasXML.Canvas2d.Tag.Component.Clip'
import Fill from './CanvasXML.Canvas2d.Tag.Component.Fill'
import Image from './CanvasXML.Canvas2d.Tag.Component.Image'
import Layout from './CanvasXML.Canvas2d.Tag.Component.Layout'
import Line from './CanvasXML.Canvas2d.Tag.Component.Line'
import Rect from './CanvasXML.Canvas2d.Tag.Component.Rect'
import RectRadius from './CanvasXML.Canvas2d.Tag.Component.RectRadius'
import Rotate from './CanvasXML.Canvas2d.Tag.Component.Rotate'
import Scale from './CanvasXML.Canvas2d.Tag.Component.Scale'
import Stroke from './CanvasXML.Canvas2d.Tag.Component.Stroke'
import Text from './CanvasXML.Canvas2d.Tag.Component.Text'
import Translate from './CanvasXML.Canvas2d.Tag.Component.Translate'

const locationAnalysis = (dom, limit) => {
  const limits = (property) => {
    return limit === undefined || (typeof limit === 'string' && limit === property) || (typeof limit === 'object' && limit.includes(property))
  }

  const undefineds = (property) => {
    return property.every(i => typeof dom.props[i] === 'undefined')
  }

  const unit = (value, property) => {
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

  const caculate = (property) => {
    var r

    if (typeof dom.props[property] === 'number') {
      r = dom.props[property]
    }
    if (typeof dom.props[property] === 'function') {
      r = value(dom.parent.props)
    }
    if (typeof dom.props[property] === 'string') {
      r = unit(dom.props[property], property)
    }
    if (typeof dom.props[property] === 'undefined') {
      r = dom.parent.props[property]
    }

    return r
  }

  const analysis = () => {
    if (dom.props && dom.parent) {
      if (limits('w')) {
        dom.props.w = caculate('w')
      }

      if (limits('h')) {
        dom.props.h = caculate('h')
      }

      if (limits('x') && (typeof dom.props.x !== 'undefined' || undefineds(['x', 'cx', 'gx', 'l', 'r']))) {
        if (typeof dom.props.x !== 'undefined') dom.props.x = dom.parent.props.x + caculate('x')
        if (typeof dom.props.x === 'undefined') dom.props.x = dom.parent.props.x
      }

      if (limits('y') && (typeof dom.props.y !== 'undefined' || undefineds(['y', 'cy', 'gy', 't', 'b']))) {
        if (typeof dom.props.y !== 'undefined') dom.props.y = dom.parent.props.y + caculate('y')
        if (typeof dom.props.y === 'undefined') dom.props.y = dom.parent.props.y
      }

      if (limits('cx') && (typeof dom.props.cx !== 'undefined' && undefineds(['x', 'gx', 'l', 'r']))) {
        dom.props.x = dom.parent.props.x - dom.props.w / 2 + caculate('cx')
      }

      if (limits('cy') && (typeof dom.props.cy !== 'undefined' && undefineds(['y', 'gy', 't', 'b']))) {
        dom.props.y = dom.parent.props.y - dom.props.h / 2 + caculate('cy')
      }

      if (limits('gx') && (typeof dom.props.gx !== 'undefined' && undefineds(['x', 'cx', 'l', 'r']))) {
        dom.props.x = caculate('gx')
      }

      if (limits('gy') && (typeof dom.props.gy !== 'undefined' && undefineds(['y', 'cy', 't', 'b']))) {
        dom.props.y = caculate('gy')
      }

      if (limits('l') && (typeof dom.props.l !== 'undefined' && undefineds(['x', 'cx', 'gx', 'r']))) {
        dom.props.x = dom.parent.props.x + caculate('l')
      }

      if (limits('r') && (typeof dom.props.r !== 'undefined' && undefineds(['x', 'cx', 'gx', 'l']))) {
        dom.props.x = dom.parent.props.x + dom.parent.props.w - caculate('r')
      }

      if (limits('t') && (typeof dom.props.t !== 'undefined' && undefineds(['y', 'cy', 'gy', 'b']))) {
        dom.props.y = dom.parent.props.y + caculate('t')
      }

      if (limits('b') && (typeof dom.props.b !== 'undefined' && undefineds(['y', 'cy', 'gy', 't']))) {
        dom.props.y = dom.parent.props.y + dom.parent.props.h - caculate('b')
      }
    }
  }

  analysis()
}

const locationMount = (dom) => {
  locationAnalysis(dom)
  Object.assign(dom.props, Canvas2d.Location.coordinate(dom.props))
}

const locationUnmount = (dom) => {
  Object.assign(dom.props, Canvas2d.Location.coordinate(dom.props))
}

const renderMount_0 = (dom) => {
  Canvas2d.context().save()

  const transformUnit = (type, value) => {
    if (type === 'rotate') Canvas2d.context().rotate(value.angle)
    if (type === 'scale') Canvas2d.context().scale(value.w, value.h)
    if (type === 'translate') Canvas2d.context().translate(value.x, value.y)
  }

  if (dom.props.globalAlpha !== undefined) Canvas2d.context().globalAlpha = Canvas2d.context().globalAlpha * dom.props.globalAlpha
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
    // {
    //   type: 'pointerdown',
    //   event: dom.props.onPointerDown,
    //   eventAway: dom.props.onPointerDownAway,
    //   option: dom.props.onPointerDownOption,
    // },
    // {
    //   type: 'pointermove',
    //   event: dom.props.onPointerMove,
    //   eventAway: dom.props.onPointerMoveAway,
    //   option: dom.props.onPointerMoveOption,
    // },
    // {
    //   type: 'pointerup',
    //   event: dom.props.onPointerUp,
    //   eventAway: dom.props.onPointerUpAway,
    //   option: dom.props.onPointerUpOption,
    // }
  ]

  const event = (e, i) => {
    const cr = e.xs.some((i, index) => cover(e.xs[index], e.ys[index]))

    if (cr === true && i.event) i.event({ ...e, dom })
    if (cr !== true && i.eventAway) i.eventAway({ ...e, dom })
  }

  typeArray.forEach(i => {
    if (i.event || i.eventAway) Canvas2d.Event.addEventListener(i.type, e => event(e, i), i.option)
  })
}

const relocation = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (tagComponent !== undefined) tagComponent.locationMount(dom)
  if (tagComponent !== undefined && typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom)

  if (dom.children) dom.children.forEach(i => relocation(i))

  if (tagComponent !== undefined) tagComponent.locationUnmount(dom)
  if (tagComponent !== undefined && typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom)
}

const rerender = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (tagComponent !== undefined) tagComponent.renderMount(dom)
  if (tagComponent !== undefined && typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom)

  if (dom.children) dom.children.sort((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i))

  if (tagComponent !== undefined) tagComponent.renderUnmount(dom)
  if (tagComponent !== undefined && typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom)
}

const pick = (tag) => {
  if (tag === 'arc') return Arc
  if (tag === 'circle') return Circle
  if (tag === 'clip') return Clip
  if (tag === 'fill') return Fill
  if (tag === 'image') return Image
  if (tag === 'layout') return Layout
  if (tag === 'line') return Line
  if (tag === 'rect') return Rect
  if (tag === 'rectradius') return RectRadius
  if (tag === 'rotate') return Rotate
  if (tag === 'scale') return Scale
  if (tag === 'stroke') return Stroke
  if (tag === 'text') return Text
  if (tag === 'translate') return Translate
}

const Canvas2dTag = { pick, relocation, rerender, locationAnalysis, locationMount, locationUnmount, renderMount_0, renderMount_1, renderUnmount_0, renderUnmount_1, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default Canvas2dTag