import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardDescription from './App.Playground.Opponent.CardDescription'
import CardLibrary from './App.Playground.Opponent.CardLibrary'
import CardReady from './App.Playground.Opponent.CardReady'
import Status from './App.Playground.Opponent.Status'
import Role from './App.Playground.Opponent.Role'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    {/* <CardControl /> */}
    {/* <CardDescription /> */}
    <CardLibrary />
    <CardReady />
    <Status />
    <Role/>
  </>
}


export default App