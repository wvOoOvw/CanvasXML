import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontQueue from './App.Scene.Playground.Component.CardFrontQueue'

function CardSelf(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card

  const x = props.x
  const y = props.y
  const w = props.w
  const h = props.h

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = e => {
    contextPlayground.setGameCardDescription(card)
  }

  const onPointerMove = e => {
    contextPlayground.setGameCardDescription(undefined)
  }

  const onPointerUp = e => {
    contextPlayground.setGameCardDescription(undefined)
  }

  return <layout w={w} h={h} item>
    <CardFrontQueue
      x={x}
      y={y}
      w={w}
      h={h}
      animationCountAppear={animationCountAppear}
      card={card}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerMoveAway={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerUpAway={onPointerUp}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.locationLayout.h - contextApp.unitpx * 0.92
  const x = contextApp.unitpx * 0.2
  const y = contextApp.locationLayout.h / 2 - h / 2

  const gap = contextApp.unitpx * 0.02

  const cardW = contextApp.unitpx * 0.08
  const cardH = contextApp.unitpx * 0.08

  const array = [...contextPlayground.gameSelfCardQueue, ...contextPlayground.gameOpponentCardQueue]

  const limitY = [
    0,
    0 - array.length * cardW - (array.length > 0 ? (array.length - 1) * gap : 0)
  ]

  const { dragIng, moveX, moveY, onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventScroll({ enableY: true, limitY: limitY })

  return <>
    <rectradiusarc x={x} y={y} w={w} h={h} clip radius={w / 2} lineWidth={w / 36} onPointerDown={onStart} onPointerMove={onMove} onPointerMoveAway={onMove} onPointerUp={onEnd} onPointerUpAway={onEnd}>
      <layout cx='50%' cy='50%' w={cardW} h={h - cardW} container verticalForward gap={gap} zIndex={contextPlayground.zIndex.CardQueue}>
        {
          array.map((i, index) => <CardSelf key={i.key} x={moveX} y={moveY} w={cardW} h={cardH} card={i} index={index} />)
        }
      </layout>
    </rectradiusarc>
    <rectradiusarc x={x} y={y} w={w} h={h} stroke strokeStyle='rgb(255, 255, 255)' radius={w / 2} lineWidth={w / 36} />
  </>
}

export default App