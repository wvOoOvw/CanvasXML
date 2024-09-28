import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.gameCardExecute.length > 0) {
      const gameCardExecute = contextPlayground.gameCardExecute[0]

      const card = gameCardExecute.card
      const side = gameCardExecute.side

      if (side === 0) {
        contextPlayground.setGemeSelfActionPoint(n => n - card.caculateCostActionPoint(card))
        contextPlayground.setGemeSelfGoldPoint(n => n - card.caculateCostGoldPoint(card))
        contextPlayground.setGemeSelfHitPoint(n => n - card.caculateCostHitPoint(card))
      }
      if (side === 1) {
        contextPlayground.setGemeSelfActionPoint(n => n - card.caculateCostActionPoint(card))
        contextPlayground.setGemeSelfGoldPoint(n => n - card.caculateCostGoldPoint(card))
        contextPlayground.setGemeSelfHitPoint(n => n - card.caculateCostHitPoint(card))
      }

      if (card.cardIndex.startsWith('Role')) {
        if (side === 0) {
          contextPlayground.setGameSelfCardBattle(card)
        }
        if (side === 1) {
          contextPlayground.setGameOpponentCardBattle(card)
        }
      }

      contextPlayground.setGameCardExecute(i => i.filter(n => n !== gameCardExecute))
    }
  }, [contextPlayground.gameCardExecute])
}

export default App