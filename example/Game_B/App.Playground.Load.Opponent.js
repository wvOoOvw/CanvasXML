import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import initEnemy from './App.Model.Enemy'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.setGameEnemy(contextPlayground.informationJson.gameEnemy.map(i => Object({ key: Math.random(), ...initEnemy(i) })))
      contextPlayground.setGameLoadOpponent(true)
    }
  }, [contextPlayground.informationJson])
}

export default App