import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import init from './App.Model.Role'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.setGameOpponentHitPoint(30)
      contextPlayground.setGameOpponentActionPoint(0)
      contextPlayground.setGameOpponentRole(contextPlayground.informationJson.gameOpponent.role.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameOpponentCardLibrary(contextPlayground.informationJson.gameOpponent.card.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameLoadOpponent(true)
    }
  }, [contextPlayground.informationJson])

  React.useEffect(() => {
    if (contextPlayground.gameOpponentCardLibrary) {
      contextPlayground.setGameOpponentCardReady(contextPlayground.gameOpponentCardLibrary.filter((i, index) => index < 11))
    }
  }, [contextPlayground.gameOpponentCardLibrary])
}

export default App