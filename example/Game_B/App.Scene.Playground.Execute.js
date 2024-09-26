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
    if (contextPlayground.gameCardExecute.length > 0 && contextPlayground.gameCardExecuteIng.length === 0) {
      contextPlayground.setGameCardExecute(i => i.filter((i, index) => index > 0))
      contextPlayground.setgameCardExecuteIng(contextPlayground.gameCardExecute[0]({ contextApp, contextPlayground }))
    }
  }, [contextPlayground.gameCardExecute, contextPlayground.gameCardExecuteIng])

  React.useEffect(() => {
    contextPlayground.gameCardExecuteIng.forEach(i => {
      if (i.type === 'employee') {
        if (i.from === 0) contextPlayground.setGameSelfCardBattle(i.card)
        if (i.from === 1) contextPlayground.setGameOpponentCardBattle(i.card)
        contextPlayground.setGameCardExecute(n => n.filter(v => v !== i))
      }

      if (i.type === 'cost') {
        if (i.from === 0 && i.property === 'gold-point') contextPlayground.setGemeSelfGoldPoint(n => n - i.value)
        if (i.from === 0 && i.property === 'action-point') contextPlayground.setGemeSelfActionPoint(n => n - i.value)
        if (i.from === 0 && i.property === 'hit-point') contextPlayground.setGemeSelfHitPoint(n => n - i.value)
        if (i.from === 1 && i.property === 'gold-point') contextPlayground.setGameOpponentGoldPoint(n => n - i.value)
        if (i.from === 1 && i.property === 'action-point') contextPlayground.setGameOpponentActionPoint(n => n - i.value)
        if (i.from === 1 && i.property === 'hit-point') contextPlayground.setGameOpponentHitPoint(n => n - i.value)
        contextPlayground.setGameCardExecute(n => n.filter(v => v !== i))
      }
    })
  }, [contextPlayground.gameCardExecuteIng])
}

export default App