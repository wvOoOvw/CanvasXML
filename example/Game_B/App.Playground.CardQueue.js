import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontQueue from './App.Playground.Component.CardFrontQueue'

function CardSelf(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = contextPlayground.gameSelfCardQueue.length + 4
  const lengthGameCard = contextPlayground.gameSelfCardQueue.length

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 + contextApp.unitpx * 0.24 + w * 0.8 * index
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  return <layout zIndex={contextPlayground.zIndex.CardQueue}>
    <CardFrontQueue
      x={x}
      y={y}
      w={w}
      h={h}
      globalAlpha={animationCountAppear}
      card={card}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    {
      [...contextPlayground.gameSelfCardQueue, ...contextPlayground.gameOpponentCardQueue].map((i, index) => <CardSelf key={i.key} card={i} index={index} />)
    }
  </>
}

export default App