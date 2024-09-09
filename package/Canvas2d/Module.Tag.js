import Core from './Core'

import Event from './Module.Event'
import Location from './Module.Location'

import Arc from './Module.Tag.Component.Arc'
import Bezier from './Module.Tag.Component.Bezier'
import Circle from './Module.Tag.Component.Circle'
import Image from './Module.Tag.Component.Image'
import Layout from './Module.Tag.Component.Layout'
import Line from './Module.Tag.Component.Line'
import Quadratic from './Module.Tag.Component.Quadratic'
import Rect from './Module.Tag.Component.Rect'
import RectRadiusArc from './Module.Tag.Component.RectRadiusArc'
import RectRadiusRect from './Module.Tag.Component.RectRadiusRect'
import Text from './Module.Tag.Component.Text'


const pick = (tag) => {
  if (tag === 'arc') return Arc
  if (tag === 'bezier') return Bezier
  if (tag === 'circle') return Circle
  if (tag === 'image') return Image
  if (tag === 'layout') return Layout
  if (tag === 'line') return Line
  if (tag === 'quadratic') return Quadratic
  if (tag === 'rect') return Rect
  if (tag === 'rectradiusarc') return RectRadiusArc
  if (tag === 'rectradiusrect') return RectRadiusRect
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

  const recoordinate = () => {
    Object.assign(dom.props, Location.coordinate(dom.props))
  }

  const contextPaintMemoRecord = () => {
    dom.contextMemo.globalAlpha = dom.props.globalAlpha === undefined ? (dom.parent && dom.parent.contextMemo.globalAlpha) : dom.props.globalAlpha
    dom.contextMemo.font = dom.props.font === undefined ? (dom.parent && dom.parent.contextMemo.font) : dom.props.font
    dom.contextMemo.fillStyle = dom.props.fillStyle === undefined ? (dom.parent && dom.parent.contextMemo.fillStyle) : dom.props.fillStyle
    dom.contextMemo.strokeStyle = dom.props.strokeStyle === undefined ? (dom.parent && dom.parent.contextMemo.strokeStyle) : dom.props.strokeStyle
    dom.contextMemo.shadowBlur = dom.props.shadowBlur === undefined ? (dom.parent && dom.parent.contextMemo.shadowBlur) : dom.props.shadowBlur
    dom.contextMemo.shadowColor = dom.props.shadowColor === undefined ? (dom.parent && dom.parent.contextMemo.shadowColor) : dom.props.shadowColor
    dom.contextMemo.shadowOffsetX = dom.props.shadowOffsetX === undefined ? (dom.parent && dom.parent.contextMemo.shadowOffsetX) : dom.props.shadowOffsetX
    dom.contextMemo.shadowOffsetY = dom.props.shadowOffsetY === undefined ? (dom.parent && dom.parent.contextMemo.shadowOffsetY) : dom.props.shadowOffsetY
    dom.contextMemo.lineWidth = dom.props.lineWidth === undefined ? (dom.parent && dom.parent.contextMemo.lineWidth) : dom.props.lineWidth
    dom.contextMemo.lineDashOffset = dom.props.lineDashOffset === undefined ? (dom.parent && dom.parent.contextMemo.lineDashOffset) : dom.props.lineDashOffset
    dom.contextMemo.setLineDash = dom.props.setLineDash === undefined ? (dom.parent && dom.parent.contextMemo.setLineDash) : dom.props.setLineDash
  }

  const contextPaintMemo = (context) => {
    if (dom.contextMemo.globalAlpha !== undefined) context.globalAlpha = dom.contextMemo.globalAlpha
    if (dom.contextMemo.font !== undefined) context.font = dom.contextMemo.font
    if (dom.contextMemo.fillStyle !== undefined) context.fillStyle = dom.contextMemo.fillStyle
    if (dom.contextMemo.strokeStyle !== undefined) context.strokeStyle = dom.contextMemo.strokeStyle
    if (dom.contextMemo.shadowBlur !== undefined) context.shadowBlur = dom.contextMemo.shadowBlur
    if (dom.contextMemo.shadowColor !== undefined) context.shadowColor = dom.contextMemo.shadowColor
    if (dom.contextMemo.shadowOffsetX !== undefined) context.shadowOffsetX = dom.contextMemo.shadowOffsetX
    if (dom.contextMemo.shadowOffsetY !== undefined) context.shadowOffsetY = dom.contextMemo.shadowOffsetY
    if (dom.contextMemo.lineWidth !== undefined) context.lineWidth = dom.contextMemo.lineWidth
    if (dom.contextMemo.lineDashOffset !== undefined) context.lineDashOffset = dom.contextMemo.lineDashOffset
    if (dom.contextMemo.setLineDash !== undefined) context.setLineDash(dom.contextMemo.setLineDash)
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
    if (dom.props.lineDashOffset !== undefined) context.lineDashOffset = dom.props.lineDashOffset
    if (dom.props.setLineDash !== undefined) context.setLineDash(dom.props.setLineDash)

    contextPaintMemoRecord()
  }

  const contextTransformMemoRecord = () => {
    dom.contextMemo.transform = [...(dom.parent && dom.parent.contextMemo.transform) || [], ...(dom.props.transform) || []]
  }

  const contextTransformMemo = (context) => {
    const unit = (type, value) => {
      if (type === 'rotate') context.rotate(value.angle)
      if (type === 'scale') context.scale(value.w, value.h)
      if (type === 'translate') context.translate(value.x, value.y)
    }

    if (dom.contextMemo.transform) dom.contextMemo.transform.forEach(i => Object.keys(i).forEach(n => unit(n, i[n])))
  }

  const contextTransform = (context) => {
    const unit = (type, value) => {
      if (type === 'rotate') context.rotate(value.angle)
      if (type === 'scale') context.scale(value.w, value.h)
      if (type === 'translate') context.translate(value.x, value.y)
    }
    if (dom.props.transform) dom.props.transform.forEach(i => Object.keys(i).forEach(n => unit(n, i[n])))

    contextTransformMemoRecord()
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
      dom.props.lineWidth !== undefined ||
      dom.props.lineDashOffset !== undefined ||
      dom.props.setLineDash !== undefined ||
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
      dom.props.lineWidth !== undefined ||
      dom.props.lineDashOffset !== undefined ||
      dom.props.setLineDash !== undefined ||
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
    if (dom.props.clip) context.clip()
    if (dom.props.fill) context.fill()
    if (dom.props.stroke) context.stroke()
  }

  const addEventListener = () => {
    const type = [
      {
        type: 'pointerdown',
        event: dom.props.onPointerDown,
        eventAway: dom.props.onPointerDownAway,
        option: dom.props.onPointerDownOption,
      },
      {
        type: 'pointermove',
        event: dom.props.onPointerMove,
        eventAway: dom.props.onPointerMoveAway,
        option: dom.props.onPointerMoveOption,
      },
      {
        type: 'pointerup',
        event: dom.props.onPointerUp,
        eventAway: dom.props.onPointerUpAway,
        option: dom.props.onPointerUpOption,
      },
    ]

    const event = (e, i) => {
      const isPointIn = (x, y) => {
        Core.offscreenContextWithEvent().clearRect(0, 0, Core.offscreenCanvasWithEvent().width, Core.offscreenCanvasWithEvent().height)

        Core.offscreenContextWithEvent().save()

        if (dom.contextPaintMemo) dom.contextPaintMemo(Core.offscreenContextWithEvent())
        if (dom.contextTransformMemo) dom.contextTransformMemo(Core.offscreenContextWithEvent())
        if (dom.contextPath) dom.contextPath(Core.offscreenContextWithEvent())
        if (dom.contextDraw) dom.contextDraw(Core.offscreenContextWithEvent())

        const inPath = Core.offscreenContextWithEvent().isPointInPath(x, y)
        const inStroke = Core.offscreenContextWithEvent().isPointInStroke(x, y)

        Core.offscreenContextWithEvent().restore()

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

  dom.props = Object()

  dom.props.key = dom.element.props.key
  dom.props.zIndex = dom.element.props.zIndex

  dom.props.x = dom.element.props.x
  dom.props.y = dom.element.props.y
  dom.props.w = dom.element.props.w
  dom.props.h = dom.element.props.h
  dom.props.cx = dom.element.props.cx
  dom.props.cy = dom.element.props.cy
  dom.props.gx = dom.element.props.gx
  dom.props.gy = dom.element.props.gy
  dom.props.l = dom.element.props.l
  dom.props.r = dom.element.props.r
  dom.props.t = dom.element.props.t
  dom.props.b = dom.element.props.b
  
  dom.props.globalAlpha = dom.element.props.globalAlpha
  dom.props.font = dom.element.props.font
  dom.props.fillStyle = dom.element.props.fillStyle
  dom.props.strokeStyle = dom.element.props.strokeStyle
  dom.props.shadowBlur = dom.element.props.shadowBlur
  dom.props.shadowColor = dom.element.props.shadowColor
  dom.props.shadowOffsetX = dom.element.props.shadowOffsetX
  dom.props.shadowOffsetY = dom.element.props.shadowOffsetY
  dom.props.lineWidth = dom.element.props.lineWidth
  dom.props.setLineDash = dom.element.props.setLineDash
  dom.props.transform = dom.element.props.transform && JSON.parse(JSON.stringify(dom.element.props.transform))
  dom.props.clip = dom.element.props.clip
  dom.props.save = dom.element.props.save
  dom.props.fill = dom.element.props.fill
  dom.props.stroke = dom.element.props.stroke

  dom.props.onPointerDown = dom.element.props.onPointerDown
  dom.props.onPointerDownAway = dom.element.props.onPointerDownAway
  dom.props.onPointerDownOption = dom.element.props.onPointerDownOption
  dom.props.onPointerMove = dom.element.props.onPointerMove
  dom.props.onPointerMoveAway = dom.element.props.onPointerMoveAway
  dom.props.onPointerMoveOption = dom.element.props.onPointerMoveOption
  dom.props.onPointerUp = dom.element.props.onPointerUp
  dom.props.onPointerUpAway = dom.element.props.onPointerUpAway
  dom.props.onPointerUpOption = dom.element.props.onPointerUpOption

  dom.canvas = dom.props.canvas || (dom.parent && dom.parent.canvas) || Core.canvas()
  dom.context = dom.props.context || (dom.parent && dom.parent.context) || Core.context()

  dom.contextMemo = Object()

  dom.resize = resize
  dom.relocation = relocation
  dom.recoordinate = recoordinate
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
  if (dom.recoordinate) dom.recoordinate()
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

  if (typeof dom.element.props.onConstructMount === 'function') dom.element.props.onConstructMount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onConstructMount === 'function') tagComponent.onConstructMount(dom)
  constructMount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onConstructMounted === 'function') tagComponent.onConstructMounted(dom)
  if (typeof dom.element.props.onConstructMounted === 'function') dom.element.props.onConstructMounted(dom)

  if (dom.children) dom.children.forEach(i => onConstruct(i))

  if (typeof dom.element.props.onConstructUnmount === 'function') dom.element.props.onConstructUnmount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onConstructUnmount === 'function') tagComponent.onConstructUnmount(dom)
  constructUnmount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onConstructUnmounted === 'function') tagComponent.onConstructUnmounted(dom)
  if (typeof dom.element.props.onConstructUnmounted === 'function') dom.element.props.onConstructUnmounted(dom)
}

const onLocation = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (typeof dom.element.props.onLocationMount === 'function') dom.element.props.onLocationMount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onLocationMount === 'function') tagComponent.onLocationMount(dom)
  locationMount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onLocationMounted === 'function') tagComponent.onLocationMounted(dom)
  if (typeof dom.element.props.onLocationMounted === 'function') dom.element.props.onLocationMounted(dom)

  if (dom.children) dom.children.forEach(i => onLocation(i))

  if (typeof dom.element.props.onLocationUnmount === 'function') dom.element.props.onLocationUnmount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onLocationUnmount === 'function') tagComponent.onLocationUnmount(dom)
  locationUnmount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onLocationUnmounted === 'function') tagComponent.onLocationUnmounted(dom)
  if (typeof dom.element.props.onLocationUnmounted === 'function') dom.element.props.onLocationUnmounted(dom)
}

const onRender = (dom) => {
  const tagComponent = pick(dom.element.tag)

  if (typeof dom.element.props.onRenderMount === 'function') dom.element.props.onRenderMount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onRenderMount === 'function') tagComponent.onRenderMount(dom)
  renderMount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onRenderMounted === 'function') tagComponent.onRenderMounted(dom)
  if (typeof dom.element.props.onRenderMounted === 'function') dom.element.props.onRenderMounted(dom)

  if (dom.children) dom.children.sort((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => onRender(i))

  if (typeof dom.element.props.onRenderUnmount === 'function') dom.element.props.onRenderUnmount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onRenderUnmount === 'function') tagComponent.onRenderUnmount(dom)
  renderUnmount(dom)
  if (tagComponent !== undefined && typeof tagComponent.onRenderUnmounted === 'function') tagComponent.onRenderUnmounted(dom)
  if (typeof dom.element.props.onRenderUnmounted === 'function') dom.element.props.onRenderUnmounted(dom)
}


export default { onConstruct, onLocation, onRender }