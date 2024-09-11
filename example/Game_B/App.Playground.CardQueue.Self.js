import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFront from './App.Playground.Component.CardFront'

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = contextPlayground.gameSelfCardQueue.length + 4
  const lengthGameCard = contextPlayground.gameSelfCardQueue.length

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.24
  const x = contextApp.locationLayout.x + contextApp.unitpx * 0.04 + ((lengthMax - lengthGameCard + 1) * w * 0.048 + w * 0.36) * index
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - contextApp.unitpx * 0.6

  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2
  const rotateAngle = 0

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  return <layout zIndex={contextPlayground.zIndex.CardQueueSelf}>
    <CardFront
      x={x}
      y={y}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={rotateAngle}
      globalAlphaLayout={animationCountAppear}
      globalAlphaSimpleDescription={0}
      card={card}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return contextPlayground.gameSelfCardQueue.map((i, index) => <Card key={i.key} card={i} index={index} />)
}

export default App