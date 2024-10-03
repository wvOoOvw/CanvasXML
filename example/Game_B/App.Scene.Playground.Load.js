import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import init from './Model.Card'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.setGemeSelfHitPoint(30)
      contextPlayground.setGemeSelfActionPoint(0)
      contextPlayground.setGemeSelfGoldPoint(10)
      contextPlayground.setGameSelfCardLibrary(contextPlayground.informationJson.gameSelf.card.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameLoadSelfInformation(true)
    }
  }, [contextPlayground.informationJson])

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.setGameOpponentHitPoint(30)
      contextPlayground.setGameOpponentActionPoint(0)
      contextPlayground.setGameOpponentGoldPoint(10)
      contextPlayground.setGameOpponentCardLibrary(contextPlayground.informationJson.gameOpponent.card.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameLoadOpponentInformation(true)
    }
  }, [contextPlayground.informationJson])

  // React.useEffect(() => {
  //   if (contextPlayground.gameSelfCardLibrary) {
  //     contextPlayground.setGameSelfCardReady(contextPlayground.gameSelfCardLibrary.filter((i,index) => index < 12))
  //   }
  // }, [contextPlayground.gameSelfCardLibrary])

  // React.useEffect(() => {
  //   if (contextPlayground.gameOpponentCardLibrary) {
  //     contextPlayground.setGameOpponentCardReady(contextPlayground.gameOpponentCardLibrary.filter((i, index) => index < 12))
  //   }
  // }, [contextPlayground.gameOpponentCardLibrary])
}

export default App