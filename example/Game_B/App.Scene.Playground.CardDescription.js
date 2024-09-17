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

  const w = contextApp.unitpx * 0.42
  const h = contextApp.unitpx * 0.63
  const x = contextApp.unitpx * 0.12
  const y = contextApp.locationLayout.h / 2 - h / 2

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: card === contextPlayground.gameCardDescription ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  return <layout zIndex={contextPlayground.zIndex.CardDescription}>
    <rect fill fillStyle='rgb(0, 0, 0)' globalAlpha={animationCountAppear * 0.4} />
    {
      animationCountAppear > 0 ?
        <CardFrontDescription
          x={x}
          y={y}
          w={w}
          h={h}
          animationCountAppear={animationCountAppear}
          card={card}
        />
        : null
    }
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [card, setCard] = React.useState([undefined, undefined])

  React.useEffect(() => {
    if (contextPlayground.gameCardDescription) {
      setCard([card[1], contextPlayground.gameCardDescription])
    }
  }, [contextPlayground.gameCardDescription])

  return card.filter(i => i).map((i, index) => <Card key={i.key} card={i} index={index} />)
}

export default App