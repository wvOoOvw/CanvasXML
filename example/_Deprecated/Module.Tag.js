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
import Root from './Module.Tag.Component.Root'
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
  if (tag === 'rectradiusarc') return RectRadius
  if (tag === 'root') return Root
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
    if (dom.parent) {
      if (typeof dom.props.w !== 'undefined') dom.props.w = unit(dom.props.w, 'w')
      if (typeof dom.props.w === 'undefined') dom.props.w = dom.parent.props.w

      if (typeof dom.props.h !== 'undefined') dom.props.h = unit(dom.props.h, 'h')
      if (typeof dom.props.h === 'undefined') dom.props.h = dom.parent.props.h
    }
  }

  const relocation = () => {
    if (dom.parent) {
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
  }

  const contextPaint = (context) => {
    if (dom.props.globalAlpha !== undefined) context.globalAlpha = dom.props.globalAlpha
    if (dom.props.font !== undefined) context.font = dom.props.font
    if (dom.props.fillStyle !== undefined) context.fillStyle = dom.props.fillStyle
    if (dom.props.strokeStyle !== undefined) context.strokeStyle = dom.props.strokeStyle
    if (dom.props.shadowBlur !== undefined) context.shadowBlur = dom.props.shadowBlur
    if (dom.props.shadowColor !== undefined) context.shadowColor = dom.props.shadowColor
    if (dom.props.shadowOffsetX !== undefined) context.shadowOffsetX = dom.props.shadowOffsetX
    if (dom.props.shadowOffsetY !== undefined) context.shadowOffsetY = dom.props.shadowOffsetY
    if (dom.props.lineWidth !== undefined) context.lineWidth = dom.props.lineWidth
  }

  const contextPaintMemo = (context) => {
    if (dom.memo.globalAlpha !== undefined) context.globalAlpha = dom.memo.globalAlpha
    if (dom.memo.font !== undefined) context.font = dom.memo.font
    if (dom.memo.fillStyle !== undefined) context.fillStyle = dom.memo.fillStyle
    if (dom.memo.strokeStyle !== undefined) context.strokeStyle = dom.memo.strokeStyle
    if (dom.memo.shadowBlur !== undefined) context.shadowBlur = dom.memo.shadowBlur
    if (dom.memo.shadowColor !== undefined) context.shadowColor = dom.memo.shadowColor
    if (dom.memo.shadowOffsetX !== undefined) context.shadowOffsetX = dom.memo.shadowOffsetX
    if (dom.memo.shadowOffsetY !== undefined) context.shadowOffsetY = dom.memo.shadowOffsetY
    if (dom.memo.lineWidth !== undefined) context.lineWidth = dom.memo.lineWidth
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

  const contextTransformMemo = (context) => {
    const unit = (type, value) => {
      if (type === 'rotate') context.rotate(value.angle)
      if (type === 'scale') context.scale(value.w, value.h)
      if (type === 'translate') context.translate(value.x, value.y)
    }

    if (dom.props.transformMemo) context.resetTransform()
    if (dom.props.transformMemo) dom.props.transformMemo.forEach(i => Object.keys(i).forEach(n => unit(n, i[n])))

    if (dom.props.clip) context.clip()
  }

  const contextSave = (context) => {
    if (
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
        type: 'pointerdown',
        event: dom.props.onPointerDown,
        eventAway:  dom.props.onPointerDownAway,
        option:  dom.props.onPointerDownOption,
      },
      {
        type: 'pointermove',
        event: dom.props.onPointerMove,
        eventAway:  dom.props.onPointerMoveAway,
        option: dom.props.onPointerMoveOption,
      },
      {
        type: 'pointerup',
        event:  dom.props.onPointerUp,
        eventAway: dom.props.onPointerUpAway,
        option:  dom.props.onPointerUpOption,
      },
    ]

    const event = (e, i) => {
      const isPointIn = (x,y) => {
        const offscreenCanvas = Canvas.createOffscreenCanvas(Core.canvas().width, Core.canvas().height)
        const offscreenContext = offscreenCanvas.getContext('2d')

        if (dom.contextPaintMemo) dom.contextPaintMemo(offscreenContext)
        if (dom.contextTransformMemo) dom.contextTransformMemo(offscreenContext)
        if (dom.contextPath) dom.contextPath(offscreenContext)
        if (dom.contextDraw) dom.contextDraw(offscreenContext)

        const inPath = offscreenContext.isPointInPath(x, y)
        const inStroke = offscreenContext.isPointInStroke(x, y)

        return { inPath, inStroke }
      }

      var inPath = false
      var inStroke = false

      var index = 0

      while (inPath !== true && inStroke !== true && e.xs[index] !== undefined && e.ys[index] !== undefined) {
        const pointIn = isPointIn(e.xs[index], e.ys[index])

        inPath = pointIn.inPath || inPath
        inStroke = pointIn.inStroke || inStroke

        index = index + 1
      }

      if ((inPath === true || inStroke === true) && i.event) i.event({ ...e, dom, inPath, inStroke })
      if ((inPath !== true && inStroke !== true) && i.eventAway) i.eventAway({ ...e, dom, inPath, inStroke })
    }

    type.forEach(i => {
      if (i.event || i.eventAway) Event.addEventListener(i.type, e => event(e, i), i.option)
    })
  }

  dom.canvas = dom.props.canvas || (dom.parent && dom.parent.props.canvas) || Core.canvas()
  dom.context = dom.props.context || (dom.parent && dom.parent.props.context) || Core.context()

  dom.memo = {
    globalAlpha: dom.props.globalAlpha === undefined ? (dom.parent && dom.parent.props.globalAlpha) : dom.props.globalAlpha,
    font: dom.props.font === undefined ? (dom.parent && dom.parent.props.font) : dom.props.font,
    fillStyle: dom.props.fillStyle === undefined ? (dom.parent && dom.parent.props.fillStyle) : dom.props.fillStyle,
    strokeStyle: dom.props.strokeStyle === undefined ? (dom.parent && dom.parent.props.strokeStyle) : dom.props.strokeStyle,
    shadowBlur: dom.props.shadowBlur === undefined ? (dom.parent && dom.parent.props.shadowBlur) : dom.props.shadowBlur,
    shadowColor: dom.props.shadowColor === undefined ? (dom.parent && dom.parent.props.shadowColor) : dom.props.shadowColor,
    shadowOffsetX: dom.props.shadowOffsetX === undefined ? (dom.parent && dom.parent.props.shadowOffsetX) : dom.props.shadowOffsetX,
    shadowOffsetY: dom.props.shadowOffsetY === undefined ? (dom.parent && dom.parent.props.shadowOffsetY) : dom.props.shadowOffsetY,
    lineWidth: dom.props.lineWidth === undefined ? (dom.parent && dom.parent.props.lineWidth) : dom.props.lineWidth,
    transform: [
      ...(dom.parent && dom.parent.memo && dom.parent.memo.transform) || [],
      ...(dom.props.transform) || [],
    ]
  }

  dom.resize = resize
  dom.relocation = relocation
  dom.contextPaint = contextPaint
  dom.contextPaintMemo = contextPaintMemo
  dom.contextTransform = contextTransform
  dom.contextTransformMemo = contextTransformMemo
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