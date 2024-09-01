import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import initEnemyBaseA from './App.Model.Enemy.BaseA'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.gameLoadCard && contextPlayground.gameLoadEnemy) {
      contextPlayground.setGameBattleEnemy(contextPlayground.gameEnemy[0])
      contextPlayground.setGameLoadBattle(true)
    }
  }, [contextPlayground.gameLoadCard, contextPlayground.gameLoadEnemy])
}

export default App