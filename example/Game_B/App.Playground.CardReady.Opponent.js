import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardBack from './App.Playground.Component.CardBack'

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameOpponentCardReady.length

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.24
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w * 4 + ((lengthMax - lengthGameCard + 1) * w * 0.048 + w * 0.36) * (index - (lengthGameCard - 1) / 2)
  const y = 0 - h * 0.36

  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2
  const rotateAngle = Math.PI

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: card.animation ? 0 : 1, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountX } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: x, destination: x, rateTime: 10, postprocess: n => Number(n.toFixed(4)) })

  return <layout zIndex={contextPlayground.zIndex.CardReadyOpponent}>
    <CardBack
      x={animationCountX}
      y={y + (animationCountAppear - 1) * h * 0.24}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={rotateAngle}
      imageIndex={contextPlayground.informationJson.gameOpponent.cardBackImageIndex}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return contextPlayground.gameOpponentCardReady.map((i, index) => <Card key={i.key} card={i} index={index} />)
}

export default App