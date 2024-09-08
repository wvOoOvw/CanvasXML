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
      contextPlayground.setGemeSelfHitPoint(30)
      contextPlayground.setGemeSelfActionPoint(4)
      contextPlayground.setGameSelfRole(contextPlayground.informationJson.gameSelf.role.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameSelfCardLibrary(contextPlayground.informationJson.gameSelf.card.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameLoadSelf(true)
    }
  }, [contextPlayground.informationJson])


  React.useEffect(() => {
    if (contextPlayground.gameSelfCardLibrary) {
      contextPlayground.setGameSelfCardReady(contextPlayground.gameSelfCardLibrary.filter((i,index) => index < 12))
    }
  }, [contextPlayground.gameSelfCardLibrary])
}

export default App