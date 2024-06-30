import { React, ReactCanvas2d } from '../../package/index'

import App from './App'

const canvas = document.createElement('canvas')

const resize = () => {
  canvas.style.position = 'absolute'
  canvas.style.top = '0px'
  canvas.style.left = '0px'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.background = 'black'
  canvas.style.overflow = 'hidden'
}

resize()

window.addEventListener('resize', resize)
window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
window.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })

document.body.appendChild(canvas)

ReactCanvas2d.mount(<App />, canvas).render()