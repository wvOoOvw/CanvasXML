import React from '../../package/React'
import ReactCanvasThreeJs from '../../package/ReactCanvasThreeJs'
import * as ReactCanvasThreeJsExtensions from '../../package/ReactCanvasThreeJsExtensions'

import App from './App'

const canvas = document.createElement('canvas')

canvas.style.position = 'absolute'
canvas.style.top = '0'
canvas.style.left = '0'
canvas.style.width = '100%'
canvas.style.height = '100%'
canvas.style.background = 'black'
canvas.style.overflow = 'hidden'

window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
window.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })

document.body.appendChild(canvas)

var mount = false

const observer = new ResizeObserver(() => {
  if (mount) ReactCanvasThreeJs.unMount()
  ReactCanvasThreeJs.mount(<App />, canvas).render()
  mount = true
})

observer.observe(canvas)