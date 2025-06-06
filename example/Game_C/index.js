import React from '../../package/React'
import ReactCanvas2d from '../../package/ReactCanvas2d'

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
  ReactCanvas2d.mount(<App />, canvas, { renderFrameTimeDiffMax: 1000 / 72, powered: false }).render()
  mount = true
})

observer.observe(canvas)