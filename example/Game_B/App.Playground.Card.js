import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardControl from './App.Playground.Card.Control'
import CardDrag from './App.Playground.Card.Drag'
import CardLibrary from './App.Playground.Card.Library'
import CardReady from './App.Playground.Card.Own'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    <CardControl />
    <CardDrag />
    <CardLibrary />
    <CardReady />
  </>
}


export default App