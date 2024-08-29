import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import App from './App'

var canvas

canvas = document.createElement('canvas')
canvas.style.position = 'absolute'
canvas.style.top = '0'
canvas.style.left = '0'
canvas.style.width = '100%'
canvas.style.height = '100%'
canvas.style.background = 'black'
canvas.style.overflow = 'hidden'
canvas.style.userSelect = 'none'
window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
window.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })
document.body.appendChild(canvas)

var mount = false

const observer = new ResizeObserver(() => {
  if (mount) ReactCanvas2d.unMount()
  ReactCanvas2d.mount(<ReactCanvas2dExtensions.CanvasLayout><App /></ReactCanvas2dExtensions.CanvasLayout>, canvas, { renderFrameTimeDiffMax: 0, powered: false }).render()
  mount = true
})

observer.observe(canvas)