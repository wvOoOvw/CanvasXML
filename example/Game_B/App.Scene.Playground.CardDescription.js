import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontDescription from './App.Scene.Playground.Component.CardFrontDescription'

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const active = props.active

  const w = contextApp.unitpx * 0.48
  const h = contextApp.unitpx * 0.72
  const x = contextApp.unitpx * 0.32
  const y = contextApp.locationLayout.h / 2 - h / 2

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: active ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardDescription}>
      <rect fill fillStyle='rgb(0, 0, 0)' globalAlpha={animationCountAppear * 0.8} />
      <CardFrontDescription
        x={x}
        y={y}
        w={w}
        h={h}
        animationCountAppear={animationCountAppear}
        card={card}
      />
    </layout>

  if (animationCountAppear > 0) return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [card, setCard] = React.useState([undefined, undefined])

  React.useEffect(() => {
    setCard([card[1], contextPlayground.gameCardDescription])
  }, [contextPlayground.gameCardDescription])

  return card.filter(i => i).map((i, index) => <Card key={i.key} card={i} index={index} active={i === card[1]} />)
}

export default App