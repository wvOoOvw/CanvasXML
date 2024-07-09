import Canvas2d from './CanvasXML.Canvas2d'

import Arc from './CanvasXML.Canvas2d.Tag.Component.Arc'
import Circle from './CanvasXML.Canvas2d.Tag.Component.Circle'
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

const locationAnalysis = (dom, property) => {
  const unit = (value, property) => {
    if (value.match(/^\d+$/)) {
      return Number(value)
    }

    if (value.match(/^w$/)) {
      return dom.parent.props.w
    }

    if (value.match(/^h$/)) {
      return dom.parent.props.h
    }

    if (value.match(/^x$/)) {
      return dom.parent.props.x
    }

    if (value.match(/^y$/)) {
      return dom.parent.props.y
    }

    if (value.match(/^cx$/)) {
      return dom.parent.props.cx
    }

    if (value.match(/^cy$/)) {
      return dom.parent.props.cy
    }

    if (value.match(/^l$/)) {
      return dom.parent.props.l
    }

    if (value.match(/^r$/)) {
      return dom.parent.props.r
    }

    if (value.match(/^t$/)) {
      return dom.parent.props.t
    }

    if (value.match(/^h$/)) {
      return dom.parent.props.h
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
      if (property === 'x' || property === 'cx' || property === 'w' || property === 'l' || property === 'r') return dom.parent.props.w * Number(value.replace(/%/, '')) / 100
      if (property === 'y' || property === 'cy' || property === 'h' || property === 'r' || property === 'b') return dom.parent.props.h * Number(value.replace(/%/, '')) / 100
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

  const analysis = () => {
    if (dom.props && dom.parent) {
      if (property === undefined || (typeof property === 'string' && property === 'w') || (typeof property === 'object' && property.includes('w'))) {
        if (typeof dom.props.w === 'number') {
          dom.props.w = dom.props.w
        }
        if (typeof dom.props.w === 'function') {
          dom.props.w = value(dom.parent.props)
        }
        if (typeof dom.props.w === 'string') {
          dom.props.w = unit(dom.props.w, 'w')
        }
        if (typeof dom.props.w === 'undefined') {
          dom.props.w = dom.parent.props.w
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'h') || (typeof property === 'object' && property.includes('h'))) {
        if (typeof dom.props.h === 'number') {
          dom.props.h = dom.props.h
        }
        if (typeof dom.props.h === 'function') {
          dom.props.h = value(dom.parent.props)
        }
        if (typeof dom.props.h === 'string') {
          dom.props.h = unit(dom.props.h, 'h')
        }
        if (typeof dom.props.h === 'undefined') {
          dom.props.h = dom.parent.props.h
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'x') || (typeof property === 'object' && property.includes('x'))) {
        if (typeof dom.props.x === 'number') {
          dom.props.x = dom.parent.props.x + dom.props.x
        }
        if (typeof dom.props.x === 'function') {
          dom.props.x = dom.parent.props.x + value(dom.parent.props)
        }
        if (typeof dom.props.x === 'string') {
          dom.props.x = dom.parent.props.x + unit(dom.props.x, 'x')
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined') {
          dom.props.x = dom.parent.props.x
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'y') || (typeof property === 'object' && property.includes('y'))) {
        if (typeof dom.props.y === 'number') {
          dom.props.y = dom.parent.props.y + dom.props.y
        }
        if (typeof dom.props.y === 'function') {
          dom.props.y = dom.parent.props.y + value(dom.parent.props)
        }
        if (typeof dom.props.y === 'string') {
          dom.props.y = dom.parent.props.y + unit(dom.props.y, 'y')
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined') {
          dom.props.y = dom.parent.props.y
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'cx') || (typeof property === 'object' && property.includes('cx'))) {
        if (typeof dom.props.x === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.cx === 'number') {
          dom.props.x = dom.parent.props.x - dom.props.w / 2 + dom.props.cx
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.cx === 'function') {
          dom.props.x = dom.parent.props.x - dom.props.w / 2 + value(dom.parent.props)
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.cx === 'string') {
          dom.props.x = dom.parent.props.x - dom.props.w / 2 + unit(dom.props.cx, 'cx')
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'cy') || (typeof property === 'object' && property.includes('cy'))) {
        if (typeof dom.props.y === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.cy === 'number') {
          dom.props.y = dom.parent.props.y - dom.props.h / 2 + dom.props.cy
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.cy === 'function') {
          dom.props.y = dom.parent.props.y - dom.props.h / 2 + value(dom.parent.props)
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.cy === 'string') {
          dom.props.y = dom.parent.props.y - dom.props.h / 2 + unit(dom.props.cy, 'cy')
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'l') || (typeof property === 'object' && property.includes('l'))) {
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.l === 'number') {
          dom.props.x = dom.parent.props.x + dom.props.l
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.l === 'function') {
          dom.props.x = dom.parent.props.x + value(dom.parent.props)
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.l === 'string') {
          dom.props.x = dom.parent.props.x + unit(dom.props.l, 'l')
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'r') || (typeof property === 'object' && property.includes('r'))) {
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'number') {
          dom.props.x = dom.parent.props.x + dom.parent.props.w - dom.props.r
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'function') {
          dom.props.x = dom.parent.props.x + dom.parent.props.w - value(dom.parent.props)
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'string') {
          dom.props.x = dom.parent.props.x + dom.parent.props.w - unit(dom.props.r, 'r')
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 't') || (typeof property === 'object' && property.includes('t'))) {
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.t === 'number') {
          dom.props.y = dom.parent.props.y + dom.props.t
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.t === 'function') {
          dom.props.y = dom.parent.props.y + value(dom.parent.props)
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.t === 'string') {
          dom.props.y = dom.parent.props.y + unit(dom.props.t, 't')
        }
      }

      if (property === undefined || (typeof property === 'string' && property === 'b') || (typeof property === 'object' && property.includes('b'))) {
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'number') {
          dom.props.y = dom.parent.props.y + dom.parent.props.h - dom.props.b
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'function') {
          dom.props.y = dom.parent.props.y + dom.parent.props.h - value(dom.parent.props)
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'string') {
          dom.props.y = dom.parent.props.y + dom.parent.props.h - unit(dom.props.b, 'b')
        }
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
    const cr = cover(e)
    if (cr === true && i.event) i.event({ ...e, dom })
    if (cr !== true && i.eventAway) i.eventAway({ ...e, dom })
  }

  typeArray.forEach(i => {
    if (i.event || i.eventAway) Canvas2d.Event.addEventListener(i.type, e => event(e, i))
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

  if (dom.children) dom.children.toSorted((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i))

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
  if (tag === 'rotate') return Rotate
  if (tag === 'scale') return Scale
  if (tag === 'stroke') return Stroke
  if (tag === 'text') return Text
  if (tag === 'translate') return Translate
}

const Canvas2dTag = { pick, relocation, rerender, locationAnalysis, locationMount, locationUnmount, renderMount_0, renderMount_1, renderUnmount_0, renderUnmount_1, Arc, Clip, Fill, Image, Layout, Rect, Stroke, Text }

export default Canvas2dTag