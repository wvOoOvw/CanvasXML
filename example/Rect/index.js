import { React, ReactCanvas2d } from '../../package/index'

import App from './App'

const canvas = document.createElement('canvas')

canvas.style.position = 'absolute'
canvas.style.top = '10%'
canvas.style.left = '10%'
canvas.style.width = '80%'
canvas.style.height = '80%'
canvas.style.background = 'black'
canvas.style.overflow = 'hidden'

const resize = () =>{
  ReactCanvas2d.updateRect()
}

window.addEventListener('resize', resize)
window.addEventListener('wheel', e => e.preventDefault(), { passive: false })
window.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
window.addEventListener('contextmenu', e => e.preventDefault(), { passive: false })

document.body.appendChild(canvas)

ReactCanvas2d.mount(<App />, canvas).render()