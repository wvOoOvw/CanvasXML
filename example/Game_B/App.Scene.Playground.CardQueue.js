import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontQueue from './App.Scene.Playground.Component.CardFrontQueue'

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const w = contextApp.unitpx * 0.08
  const h = contextApp.unitpx * 0.08
  const x = contextApp.unitpx * 0.22
  const y = contextApp.locationLayout.h / 2 - h / 2 + (h + contextApp.unitpx * 0.02) * (index - 3 / 2)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = e => {
    contextPlayground.setGameCardDescription(card)
  }

  const onPointerMove = e => {
    contextPlayground.setGameCardDescription(card)
  }

  const onPointerUp = e => {
    if (contextPlayground.gameCardDescription === card) {
      contextPlayground.setGameCardDescription(undefined)
    }
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
      onPointerMoveAway={onPointerUp}
      onPointerUp={onPointerUp}
      onPointerUpAway={onPointerUp}
    />
  </layout>
}

function Stroke() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.locationLayout.h - contextApp.unitpx * 0.92
  const x = contextApp.unitpx * 0.2
  const y = contextApp.locationLayout.h / 2 - h / 2

  return <rectradiusarc x={x} y={y} w={w} h={h} stroke strokeStyle='rgb(255, 255, 255)' radius={w / 2} lineWidth={w / 36} />
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    <Stroke />

    {
      [...contextPlayground.gameSelfCardQueue, ...contextPlayground.gameOpponentCardQueue].reverse().filter((i, index) => index < 4).map((i, index) => <Card key={i.key} card={i} index={index} />)
    }
  </>
}

export default App