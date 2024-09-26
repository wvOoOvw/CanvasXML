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
    const gameCardExecute = contextPlayground.gameCardExecute[0]

    if (gameCardExecute.type === 'employee') {
      if (gameCardExecute.from === 0) contextPlayground.setGameSelfCardBattle(gameCardExecute.card)
      if (gameCardExecute.from === 1) contextPlayground.setGameOpponentCardBattle(gameCardExecute.card)
    }

    if (gameCardExecute.type === 'cost') {
      if (gameCardExecute.from === 0) {
        contextPlayground.setGemeSelfActionPoint(n => n - gameCardExecute.caculateCostActionPoint(gameCardExecute.card))
        contextPlayground.setGemeSelfGoldPoint(n => n - gameCardExecute.caculateCostGoldPoint(gameCardExecute.card))
        contextPlayground.setGemeSelfHitPoint(n => n - gameCardExecute.caculateCostHitPoint(gameCardExecute.card))
      }
      if (gameCardExecute.from === 0 && gameCardExecute.property === 'gold-point') {
        contextPlayground.setGemeSelfActionPoint(n => n - gameCardExecute.caculateCostActionPoint(gameCardExecute.card))
        contextPlayground.setGemeSelfGoldPoint(n => n - gameCardExecute.caculateCostGoldPoint(gameCardExecute.card))
        contextPlayground.setGemeSelfHitPoint(n => n - gameCardExecute.caculateCostHitPoint(gameCardExecute.card))
      }
    }

    if (gameCardExecute.type === 'employee' || gameCardExecute.type === 'cost') {
      contextPlayground.setGameCardExecute(i => i.filter((i, index) => index !== 0))
    }
  }, [contextPlayground.gameCardExecuteIng])
}

export default App