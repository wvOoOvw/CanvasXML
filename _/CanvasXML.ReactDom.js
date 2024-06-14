import React from './CanvasXML.React'
import ReactDomTag from './CanvasXML.ReactDom.Tag'
import ReactDomEvent from './CanvasXML.ReactDom.Event'

import Position from './CanvasXML.Position'

var dpr
var canvas
var context

var tagQueueLast = []
var tagQueueCurrent = []

const mountPreprocessing =  (component, option) => {
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
}

const mount = (component, option) => {
  mountPreprocessing(component, option)

  React.mount((node) => renderTag(createDom(node)), option.frameTimeDiffMax)

  return { render: () => React.render(component) }
}

const createDom = (node) => {
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
    children: node.children.map(filterTree).filter(Boolean)
  }
}

const renderTag = (node) => {
  console.log(node)
  // if (node.alternate === 'root') context.clearRect(0, 0, canvas.width, canvas.height)
    
  // if (node.alternate === 'root') tagQueueCurrent = []

  // if (node.alternate !== 'root' && typeof node.alternate === 'string' && ReactDomTag.render(node.alternate)) {
  //   tagQueueCurrent.push(node)
  // }

  // if (node.alternate !== 'root' && typeof node.alternate === 'string' && ReactDomTag.render(node.alternate)) {
  //   ReactDomTag.render(node.alternate).mount(node.props)
  // }

  // if (node.children) {
  //   node.children.forEach(i => renderTag(i))
  // }

  // if (node.alternate !== 'root' && typeof node.alternate === 'string' && ReactDomTag.render(node.alternate)) {
  //   ReactDomTag.render(node.alternate).unmount(node.props)
  // }

  // if (node.alternate === 'root') {
  //   tagQueueLast.filter(i => tagQueueCurrent.includes(i)).forEach(i => ReactDomTag.render(i.alternate).destory(i.props))
  // }
}

const ReactDom = { dpr: () => dpr, canvas: () => canvas, context: () => context, mount }

export default ReactDom