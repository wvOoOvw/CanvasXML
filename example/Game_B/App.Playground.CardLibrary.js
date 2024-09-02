import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import { Graph } from '../../package/Canvas2d'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Template(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const imageIndex = props.imageIndex

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const color = props.color

  const imageGlobalAlpha = props.imageGlobalAlpha

  const onPointerDown = props.onPointerDown
  const onPointerUp = props.onPointerUp

  const min = Math.min(w, h)

  return <layout x={x} y={y} w={w} h={h} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>

    <rectradius fill fillStyle={color} radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='white' />

    <rectradius cx='50%' cy='50%' w={w - min * 0.08} h={h - min * 0.08} fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />

    <rectradius cx='50%' cy='50%' w={w - min * 0.08} h={h - min * 0.08} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' src={contextApp[imageIndex]} globalAlpha={imageGlobalAlpha} />
    </rectradius>

  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [pointerDown, setPointerDown] = React.useState(false)

  const { animationCount: animationCountPointerDown } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: pointerDown ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w - contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h - contextApp.unitpx * 0.08

  const onPointerDown = e => {
    if (Graph.intersectionPointPolygon(e, Graph.conversionRectPoint({ x, y, w, h }))) {
      setPointerDown(true)

      if (contextPlayground.gameCard.length === 12) {
        contextApp.addMessage('手牌到达上限')
      }

      if (contextPlayground.gameCard.length < 12) {
        contextPlayground.setGameCard(i => [...i, contextPlayground.gameCardLibrary[0]])
        contextPlayground.setGameCardLibrary(i => i.filter(n => n !== contextPlayground.gameCardLibrary[0]))
      }

      e.stopPropagation()
    }
  }

  const onPointerUp = e => {
    setPointerDown(false)
  }

  return <layout zIndex={contextPlayground.zIndex.CardLibrary}>
    <Template
      x={x}
      y={y}
      w={w}
      h={h}
      imageIndex='imagePngVileFluidWhite'
      color='rgb(255, 255, 255)'
      imageGlobalAlpha={1 - animationCountPointerDown * 0.75}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  </layout>
}

export default App