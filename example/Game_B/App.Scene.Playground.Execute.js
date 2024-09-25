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

  console.log(contextPlayground.gameCardExecute, contextPlayground.gameCardExecuteUnit)

  React.useEffect(() => {
    if (contextPlayground.gameCardExecuteUnit === undefined && contextPlayground.gameCardExecute.length > 0) {
      contextPlayground.setGameCardExecuteUnit(contextPlayground.gameCardExecute[0])
      contextPlayground.setGameCardExecute(i => i.filter((i, index) => index > 0))
    }
  }, [contextPlayground.gameCardExecute, contextPlayground.gameCardExecuteUnit])

  React.useEffect(() => {
    if (contextPlayground.gameCardExecuteUnit && typeof contextPlayground.gameCardExecuteUnit === 'function') {
      contextPlayground.setGameCardExecuteUnit(i => i())
    }
    if (contextPlayground.gameCardExecuteUnit && typeof contextPlayground.gameCardExecuteUnit === 'object') {
      contextPlayground.gameCardExecuteUnit.forEach(i => {
        if (i.belong === undefined) {
          const type = i.type
          const card = i.card

          if (type === 'employee') {
            if (contextPlayground.gameSelfCardRecord.includes(card)) contextPlayground.setGameSelfCardBattle(card)
            if (contextPlayground.gameOpponentCardRecord.includes(card)) contextPlayground.setGameOpponentCardBattle(card)
            contextPlayground.setGameCardExecuteUnit()
          }
        }
      })
    }
  }, [contextPlayground.gameCardExecuteUnit])
}

export default App