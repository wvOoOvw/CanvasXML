import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Action from './App.Playground.Infomation.Action'
import Duration from './App.Playground.Infomation.Duration'
import Expend from './App.Playground.Infomation.Expend'
import Point from './App.Playground.Infomation.Point'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return [<Action />, <Duration />, <Expend />]
}

export default App