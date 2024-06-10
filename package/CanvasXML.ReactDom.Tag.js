import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import Draw from './CanvasXML.Draw'

const contextset = (props, callback) => {
  if (props.save) ReactDom.context().save()

  callback()

  if (props.globalAlpha) ReactDom.context().globalAlpha = props.globalAlpha

  if (props.fillStyle) ReactDom.context().fillStyle = props.fillStyle

  if (props.fill) ReactDom.context().fill()

  if (props.save) ReactDom.context().restore()
}

const Rect = (props) => {
  const callback = () => {
    Draw.drawRect(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h })
  }

  contextset(props, callback)
}

const Arc = (props) => {
  const callback = () => {
    Draw.drawArc(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.radius, props.sAngle, props.eAngle, props.counterclockwise)
  }

  contextset(props, callback)
}

const Image = (props) => {
  const callback = () => {
    if (Boolean(props.clipmin) !== true && Boolean(props.clipmax) === true) Draw.drawImageClipMaxCenter(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
    if (Boolean(props.clipmin) === true && Boolean(props.clipmax) !== true) Draw.drawImageClipMinCenter(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
    if (Boolean(props.clipmin) !== true && Boolean(props.clipmax) !== true) Draw.drawImage(ReactDom.context(), { x: props.x, y: props.y, w: props.w, h: props.h }, props.image)
  }

  contextset(props, callback)
}

const render = (tag) => {
  if (tag === 'rect') return Rect
  if (tag === 'arc') return Arc
  if (tag === 'image') return Image
}

const ReactDomComponentTag = { render }

export default ReactDomComponentTag