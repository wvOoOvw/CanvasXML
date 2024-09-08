import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardControl from './App.Playground.Self.CardControl'
import CardDescription from './App.Playground.Self.CardDescription'
import CardLibrary from './App.Playground.Self.CardLibrary'
import CardReady from './App.Playground.Self.CardReady'
import Role from './App.Playground.Self.Role'
import Status from './App.Playground.Self.Status'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    <CardControl />
    {/* <CardDescription /> */}
    <CardLibrary />
    <CardReady />
    {/* <Role/> */}
    <Status/>
  </>
}


export default App