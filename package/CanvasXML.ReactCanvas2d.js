import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

import Accordion from './CanvasXML.ReactCanvas2d.Component.Accordion'
import Button from './CanvasXML.ReactCanvas2d.Component.Button'
import CanvasLayout from './CanvasXML.ReactCanvas2d.Component.CanvasLayout'
import CoordinateHelper from './CanvasXML.ReactCanvas2d.Component.CoordinateHelper'
import PoweredBy from './CanvasXML.ReactCanvas2d.Component.PoweredBy'
import TextCaculateLine from './CanvasXML.ReactCanvas2d.Component.TextCaculateLine'

import useAudio from './CanvasXML.ReactCanvas2d.Plugin.useAudio'
import useImage from './CanvasXML.ReactCanvas2d.Plugin.useImage'
import useResourceReload from './CanvasXML.ReactCanvas2d.Plugin.useResourceReload'
import useLocationProperty from './CanvasXML.ReactCanvas2d.Plugin.useLocationProperty'
import useLocationPropertyRef from './CanvasXML.ReactCanvas2d.Plugin.useLocationPropertyRef'
import useLocationBox from './CanvasXML.ReactCanvas2d.Plugin.useLocationBox'
import useEventDragControl from './CanvasXML.ReactCanvas2d.Plugin.useEventDragControl'
import useEventCompose from './CanvasXML.ReactCanvas2d.Plugin.useEventCompose'
import useEventClick from './CanvasXML.ReactCanvas2d.Plugin.useEventClick'
import useEventPointerDown from './CanvasXML.ReactCanvas2d.Plugin.useEventPointerDown'
import useEventPointerDownAway from './CanvasXML.ReactCanvas2d.Plugin.useEventPointerDownAway'
import useEventPointerMove from './CanvasXML.ReactCanvas2d.Plugin.useEventPointerMove'
import useEventPointerMoveAway from './CanvasXML.ReactCanvas2d.Plugin.useEventPointerMoveAway'
import useEventPointerUp from './CanvasXML.ReactCanvas2d.Plugin.useEventPointerUp'
import useEventPointerUpAway from './CanvasXML.ReactCanvas2d.Plugin.useEventPointerUpAway'

import flatDom from './CanvasXML.ReactCanvas2d.Utils.flatDom'
import getDomById from './CanvasXML.ReactCanvas2d.Utils.getDomById'

const createDom = (node) => {
  return { ...node, props: { ...node.element.props } }
}

const renderDom = (dom) => {
  while (dom.children.some(i => i.type !== 2)) {
    dom.children = dom.children.map(i => i.type !== 2 ? i.children : i).flat()
  }

  dom.children = dom.children.map(i => renderDom({ ...createDom(i), parent: dom }))

  dom.getDomById = (id) => Utils.getDomById(dom, id)

  return dom
}

const update = () => {
  Canvas2d.update()
  React.shouldRender(React.renderQueueNode())
}

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  var Component

  if (Boolean(powered) === true) Component = <PoweredBy>{element}</PoweredBy>
  if (Boolean(powered) !== true) Component = element

  Canvas2d.mount(canvas, dpr)
  React.mount(Component, renderFrameTimeDiffMax, (node) => Canvas2d.render(renderDom(createDom(node))))

  return { render: React.render }
}

const unMount = () => {
  Canvas2d.unMount()
  React.unmount()
}

const ReactCanvas2d = { update, mount, unMount }

const ReactCanvas2dComponent = { Accordion, Button, CanvasLayout, CoordinateHelper, PoweredBy, TextCaculateLine }

const ReactCanvas2dPlugin = { useAudio, useImage, useResourceReload, useLocationProperty, useLocationPropertyRef, useLocationBox, useEventDragControl, useEventCompose, useEventClick, useEventPointerDown, useEventPointerDownAway, useEventPointerMove, useEventPointerMoveAway, useEventPointerUp, useEventPointerUpAway }

const ReactCanvas2dUtils = { flatDom, getDomById }

Object.assign(ReactCanvas2d, ReactCanvas2dComponent, ReactCanvas2dPlugin, ReactCanvas2dUtils)

export default ReactCanvas2d