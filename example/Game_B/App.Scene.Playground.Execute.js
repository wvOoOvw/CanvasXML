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
    const i = contextPlayground.gameCardExecute[0]

    if (i.type === 'employee') {
      if (i.from === 0) contextPlayground.setGameSelfCardBattle(i.card)
      if (i.from === 1) contextPlayground.setGameOpponentCardBattle(i.card)
    }

    if (i.type === 'cost') {
      if (i.from === 0) {
        contextPlayground.setGemeSelfActionPoint(n => n - i.caculateCostActionPoint(i.card))
        contextPlayground.setGemeSelfGoldPoint(n => n - i.caculateCostGoldPoint(i.card))
        contextPlayground.setGemeSelfHitPoint(n => n - i.caculateCostHitPoint(i.card))
      }
      if (i.from === 0 && i.property === 'gold-point') {
        contextPlayground.setGemeSelfActionPoint(n => n - i.caculateCostActionPoint(i.card))
        contextPlayground.setGemeSelfGoldPoint(n => n - i.caculateCostGoldPoint(i.card))
        contextPlayground.setGemeSelfHitPoint(n => n - i.caculateCostHitPoint(i.card))
      }
    }

    if (i.type === 'employee' || i.type === 'cost') {
      contextPlayground.setGameCardExecute(n => n.filter(v => v !== i))
    }
  }, [contextPlayground.gameCardExecuteIng])
}

export default App