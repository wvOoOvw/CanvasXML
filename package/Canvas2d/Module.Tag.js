import Core from './Core'

import Canvas from './Module.Canvas'
import Event from './Module.Event'
import Location from './Module.Location'

import Arc from './Module.Tag.Component.Arc'
import Bezier from './Module.Tag.Component.Bezier'
import Circle from './Module.Tag.Component.Circle'
import Image from './Module.Tag.Component.Image'
import Layout from './Module.Tag.Component.Layout'
import Line from './Module.Tag.Component.Line'
import Path from './Module.Tag.Component.Path'
import Quadratic from './Module.Tag.Component.Quadratic'
import Rect from './Module.Tag.Component.Rect'
import RectRadius from './Module.Tag.Component.RectRadius'
import Text from './Module.Tag.Component.Text'


const pick = (tag) => {
  if (tag === 'arc') return Arc
  if (tag === 'bezier') return Bezier
  if (tag === 'circle') return Circle
  if (tag === 'image') return Image
  if (tag === 'layout') return Layout
  if (tag === 'line') return Line
  if (tag === 'path') return Path
  if (tag === 'quadratic') return Quadratic
  if (tag === 'rect') return Rect
  if (tag === 'rectradius') return RectRadius
  if (tag === 'text') return Text
}


const constructMount = (dom) => {
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

  const resize = () => {
    if (typeof dom.props.w !== 'undefined') dom.props.w = unit(dom.props.w, 'w')
    if (typeof dom.props.w === 'undefined') dom.props.w = dom.parent.props.w

    if (typeof dom.props.h !== 'undefined') dom.props.h = unit(dom.props.h, 'h')
    if (typeof dom.props.h === 'undefined') dom.props.h = dom.parent.props.h
  }

  const relocation = () => {
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
  }

  const contextPaint = (context) => {
    if (dom.props.globalAlpha !== undefined) context.globalAlpha = context.globalAlpha * dom.props.globalAlpha
    if (dom.props.font !== undefined) context.font = dom.props.font
    if (dom.props.fillStyle !== undefined) context.fillStyle = dom.props.fillStyle
    if (dom.props.strokeStyle !== undefined) context.strokeStyle = dom.props.strokeStyle
    if (dom.props.shadowBlur !== undefined) context.shadowBlur = dom.props.shadowBlur
    if (dom.props.shadowColor !== undefined) context.shadowColor = dom.props.shadowColor
    if (dom.props.shadowOffsetX !== undefined) context.shadowOffsetX = dom.props.shadowOffsetX
    if (dom.props.shadowOffsetY !== undefined) context.shadowOffsetY = dom.props.shadowOffsetY
    if (dom.props.lineWidth !== undefined) context.lineWidth = dom.props.lineWidth
  }

  const contextTransform = (context) => {
    const unit = (type, value) => {
      if (type === 'rotate') context.rotate(value.angle)
      if (type === 'scale') context.scale(value.w, value.h)
      if (type === 'translate') context.translate(value.x, value.y)
    }

    if (dom.props.transform) dom.props.transform.forEach(i => Object.keys(i).forEach(n => unit(n, i[n])))

    if (dom.props.clip) context.clip()
  }

  const contextSave = (context) => {
    if (
      dom.element.tag === 'clip' ||
      dom.element.tag === 'rotate' ||
      dom.element.tag === 'scale' ||
      dom.element.tag === 'translate' ||
      dom.props.globalAlpha !== undefined ||
      dom.props.font !== undefined ||
      dom.props.fillStyle !== undefined ||
      dom.props.strokeStyle !== undefined ||
      dom.props.shadowBlur !== undefined ||
      dom.props.shadowColor !== undefined ||
      dom.props.shadowOffsetX !== undefined ||
      dom.props.shadowOffsetY !== undefined ||
      dom.props.transform !== undefined ||
      dom.props.clip !== undefined
    ) {
      if (dom.props.save === undefined || dom.props.save) context.save()
    }
  }

  const contextRestore = (context) => {
    if (
      dom.element.tag === 'clip' ||
      dom.element.tag === 'rotate' ||
      dom.element.tag === 'scale' ||
      dom.element.tag === 'translate' ||
      dom.props.globalAlpha !== undefined ||
      dom.props.font !== undefined ||
      dom.props.fillStyle !== undefined ||
      dom.props.strokeStyle !== undefined ||
      dom.props.shadowBlur !== undefined ||
      dom.props.shadowColor !== undefined ||
      dom.props.shadowOffsetX !== undefined ||
      dom.props.shadowOffsetY !== undefined ||
      dom.props.transform !== undefined ||
      dom.props.clip !== undefined
    ) {
      if (dom.props.save === undefined || dom.props.save) context.restore()
    }
  }

  const contextPath = (context) => {
    if (dom.path) context.beginPath()
    if (dom.path) dom.path(context)
  }

  const contextDraw = (context) => {
    if (dom.props.fill) context.fill()
    if (dom.props.stroke) context.stroke()
  }

  const addEventListener = () => {
    const type = [
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
      if (dom.path !== undefined) {
        const covered = e.xs.some((i, index) => {
          const offscreenCanvas = Canvas.createOffscreenCanvas(Core.canvas().width, Core.canvas().height)
          const offscreenContext = offscreenCanvas.getContext('2d')
          if (dom.contextPaint) dom.contextPaint(offscreenContext)
          if (dom.contextTransform) dom.contextTransform(offscreenContext)
          if (dom.contextPath) dom.contextPath(offscreenContext)
          if (dom.contextDraw) dom.contextDraw(offscreenContext)
          return offscreenContext.isPointInPath(e.xs[index], e.ys[index])
        })

        if (covered === true && i.event) i.event({ ...e, dom })
        if (covered !== true && i.eventAway) i.eventAway({ ...e, dom })
      }

      if (dom.path === undefined) {
        if (i.event) i.event({ ...e, dom })
        if (i.eventAway) i.eventAway({ ...e, dom })
      }
    }

    type.forEach(i => {
      if (i.event || i.eventAway) Event.addEventListener(i.type, e => event(e, i), i.option)
    })
  }

  dom.canvas = dom.props.canvas || (dom.parent && dom.parent.props.canvas) || Core.canvas()
  dom.context = dom.props.context || (dom.parent && dom.parent.props.context) || Core.context()

  dom.resize = resize
  dom.relocation = relocation
  dom.contextPaint = contextPaint
  dom.contextTransform = contextTransform
  dom.contextSave = contextSave
  dom.contextRestore = contextRestore
  dom.contextPath = contextPath
  dom.contextDraw = contextDraw
  dom.addEventListener = addEventListener
}

const constructUnmount = (dom) => {
  if (dom) { }
}

const locationMount = (dom) => {
  if (dom.resize) dom.resize()
  if (dom.relocation) dom.relocation()
  Object.assign(dom.props, Location.coordinate(dom.props))
}

const locationUnmount = (dom) => {
  if (dom) { }
}

const renderMount = (dom) => {
  if (dom.contextSave) dom.contextSave(dom.context)
  if (dom.contextPaint) dom.contextPaint(dom.context)
  if (dom.contextTransform) dom.contextTransform(dom.context)
  if (dom.contextPath) dom.contextPath(dom.context)
  if (dom.contextDraw) dom.contextDraw(dom.context)
  if (dom.addEventListener) dom.addEventListener()
}

const renderUnmount = (dom) => {
  if (dom.contextRestore) dom.contextRestore(dom.context)
}


const onConstruct = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (tagComponent !== undefined && typeof dom.props.onConstructMount === 'function') dom.props.onConstructMount(dom)
  if (tagComponent !== undefined && tagComponent.onConstructMount) tagComponent.onConstructMount(dom)
  if (tagComponent !== undefined) constructMount(dom)
  if (tagComponent !== undefined && tagComponent.onConstructMounted) tagComponent.onConstructMounted(dom)
  if (tagComponent !== undefined && typeof dom.props.onConstructMounted === 'function') dom.props.onConstructMounted(dom)

  if (dom.children) dom.children.forEach(i => onConstruct(i))

  if (tagComponent !== undefined && typeof dom.props.onConstructUnmount === 'function') dom.props.onConstructUnmount(dom)
  if (tagComponent !== undefined && tagComponent.onConstructUnmount) tagComponent.onConstructUnmount(dom)
  if (tagComponent !== undefined) constructUnmount(dom)
  if (tagComponent !== undefined && tagComponent.onConstructUnmounted) tagComponent.onConstructUnmounted(dom)
  if (tagComponent !== undefined && typeof dom.props.onConstructUnmounted === 'function') dom.props.onConstructUnmounted(dom)
}

const onLocation = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (tagComponent !== undefined && typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom)
  if (tagComponent !== undefined && tagComponent.onLocationMount) tagComponent.onLocationMount(dom)
  if (tagComponent !== undefined) locationMount(dom)
  if (tagComponent !== undefined && tagComponent.onLocationMounted) tagComponent.onLocationMounted(dom)
  if (tagComponent !== undefined && typeof dom.props.onLocationMounted === 'function') dom.props.onLocationMounted(dom)

  if (dom.children) dom.children.forEach(i => onLocation(i))

  if (tagComponent !== undefined && typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom)
  if (tagComponent !== undefined && tagComponent.onLocationUnmount) tagComponent.onLocationUnmount(dom)
  if (tagComponent !== undefined) locationUnmount(dom)
  if (tagComponent !== undefined && tagComponent.onLocationUnmounted) tagComponent.onLocationUnmounted(dom)
  if (tagComponent !== undefined && typeof dom.props.onLocationUnmounted === 'function') dom.props.onLocationUnmounted(dom)
}

const onRender = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (tagComponent !== undefined && typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom)
  if (tagComponent !== undefined && tagComponent.onRenderMount) tagComponent.onRenderMount(dom)
  if (tagComponent !== undefined) renderMount(dom)
  if (tagComponent !== undefined && tagComponent.onRenderMounted) tagComponent.onRenderMounted(dom)
  if (tagComponent !== undefined && typeof dom.props.onRenderMounted === 'function') dom.props.onRenderMounted(dom)

  if (dom.children) dom.children.sort((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => onRender(i))

  if (tagComponent !== undefined && typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom)
  if (tagComponent !== undefined && tagComponent.onRenderUnmount) tagComponent.onRenderUnmount(dom)
  if (tagComponent !== undefined) renderUnmount(dom)
  if (tagComponent !== undefined && tagComponent.onRenderUnmounted) tagComponent.onRenderUnmounted(dom)
  if (tagComponent !== undefined && typeof dom.props.onRenderUnmounted === 'function') dom.props.onRenderUnmounted(dom)
}


export default { onConstruct, onLocation, onRender }