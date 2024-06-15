import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

import Position from './CanvasXML.Position'

var dpr
var canvas
var context

var tagQueueLast = []
var tagQueueCurrent = []

const mount = (component, option) => {
  const style = document.createElement('style')

  style.innerHTML =
    [
      `::-webkit-scrollbar { width: 0; height: 0; }`,
      `body { padding: 0; margin: 0; }`,
      `body, body * { overscroll-behavior: none; }`
    ]
      .join(' ')

  document.head.appendChild(style)

  window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
  window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
  window.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })

  dpr = 2
  canvas = document.createElement('canvas')
  context = canvas.getContext('2d')

  const flex = () => {
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    canvas.coordinate = Position.coordinate({ x: 0, y: 0, w: canvas.width, h: canvas.height })
  }

  const resize = () => {
    flex()
    React.shouldRender()
  }

  canvas.style.position = 'absolute'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.background = 'black'
  canvas.style.overflow = 'hidden'
  flex()
  window.addEventListener('resize', resize)
  document.body.appendChild(canvas)

  ReactDomEvent.addEventListenerWithCanvas(canvas)

  React.mount((node) => renderTag(createTagQueue(node)), option.frameTimeDiffMax)

  return { render: () => React.render(component) }
}

const createTagQueue = (node) => {
  if (!node.alternate) return

  while (node.children.some((i) => i && typeof i.alternate !== "string")) {
    node.children.forEach((i, index) => {
      if (typeof i.alternate !== "string") {
        node.children[index] = i.children
      }
    })

    node.children = node.children.flat().filter(Boolean)
  }

  return {
    ...node,
    node: node,
    children: node.children.map(createTagQueue).filter(Boolean).map(i => Object({ ...i, parent: node }))
  }
}

const renderTag = (node) => {

  if (node.alternate === 'root') context.clearRect(0, 0, canvas.width, canvas.height)

  if (node.alternate === 'root') tagQueueCurrent = []

  if (node.alternate !== 'root' && typeof node.alternate === 'string' && ReactDomTag.render(node.alternate)) {
    if (tagQueueLast.every(i => i.node !== node.node) === true) ReactDomTag.mount({ ...node.props, children: node.children, parent: node.parent })

    tagQueueCurrent.push(node)

    ReactDomTag.renderBefore({ ...node.props, children: node.children, parent: node.parent })

    ReactDomTag.render(node.alternate)({ ...node.props, children: node.children, parent: node.parent })

    ReactDomTag.renderAfter({ ...node.props, children: node.children, parent: node.parent })
  }

  if (node.children) {
    node.children.forEach(i => renderTag(i))
  }

  if (node.alternate !== 'root' && typeof node.alternate === 'string' && ReactDomTag.render(node.alternate)) {
    ReactDomTag.renderEnd({ ...node.props, children: node.children, parent: node.parent })
  }

  if (node.alternate === 'root') {
    tagQueueLast.filter(i => tagQueueCurrent.every(e => e.node !== i.node)).forEach(i => ReactDomTag.destory({ ...i.props, children: i.children, parent: i.parent }))

    tagQueueLast = tagQueueCurrent
  }
}

const ReactDom = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount }

export default ReactDom