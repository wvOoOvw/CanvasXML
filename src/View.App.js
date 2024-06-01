import React from './utils.react'
import ReactPlugin from './utils.react.plugin'

import ExampleI from './View.Page.Example.I'

function App() {
  const canvas = React.useMemo(() => document.createElement('canvas'), [])
  const context = React.useMemo(() => canvas.getContext('2d'), [])

  const dpr = React.useRef(2)
  
  const event = ReactPlugin.useEventRoot({ canvas: canvas, dpr: dpr.current })

  const resize = () => {
    canvas.width = window.innerWidth * dpr.current
    canvas.height = window.innerHeight * dpr.current
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    React.shouldRender()
  }

  React.useEffectImmediate(() => canvas.style.position = 'absolute', [])
  React.useEffectImmediate(() => canvas.style.width = '100%', [])
  React.useEffectImmediate(() => canvas.style.height = '100%', [])
  React.useEffectImmediate(() => canvas.style.background = 'black', [])
  React.useEffectImmediate(() => canvas.style.overflow = 'hidden', [])
  React.useEffectImmediate(() => resize(), [])
  React.useEffectImmediate(() => window.addEventListener('resize', resize), [])
  React.useEffectImmediate(() => document.body.appendChild(canvas), [])

  React.contextProvider({ canvas, context, dpr, event })

  context.clearRect(0, 0, canvas.width, canvas.height)

  ExampleI()
}

export default React.component(App)