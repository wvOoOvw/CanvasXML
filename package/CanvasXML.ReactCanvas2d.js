import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

import Plugin from './CanvasXML.ReactCanvas2d.Plugin'
import Utils from './CanvasXML.ReactCanvas2d.Utils'

import Accordion from './CanvasXML.ReactCanvas2d.Component.Accordion'
import Button from './CanvasXML.ReactCanvas2d.Component.Button'
import CanvasLayout from './CanvasXML.ReactCanvas2d.Component.CanvasLayout'
import CoordinateHelper from './CanvasXML.ReactCanvas2d.Component.CoordinateHelper'
import PoweredBy from './CanvasXML.ReactCanvas2d.Component.PoweredBy'
import TextCaculateLine from './CanvasXML.ReactCanvas2d.Component.TextCaculateLine'

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

const renderCanvas = (node) => {
  const dom = createDom(node)
  const domCanvas2d = renderDom(dom)
  Canvas2d.render(domCanvas2d)
}

const update = () => {
  Canvas2d.update()
  React.shouldRender(React.renderQueueNode())
}

const mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0
  const powered = option && option.powered !== undefined ? option.powered : true

  Canvas2d.mount(canvas, dpr)

  if (Boolean(powered) === true) {
    React.mount(<Component.PoweredBy>{element}</Component.PoweredBy>, renderFrameTimeDiffMax, renderCanvas)
  }

  if (Boolean(powered) !== true) {
    React.mount(element, renderFrameTimeDiffMax, renderCanvas)
  }

  return { render: React.render }
}

const unMount = () => {
  Canvas2d.unMount()
  React.unmount()
}

const ReactCanvas2d = { update, mount, unMount, ...Plugin, ...Utils }

const ReactCanvas2dComponent = { Accordion, Button, CanvasLayout, CoordinateHelper, PoweredBy, TextCaculateLine }

Object.assign(ReactCanvas2d, ReactCanvas2dComponent)

export default ReactCanvas2d