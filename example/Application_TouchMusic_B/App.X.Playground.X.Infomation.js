import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Duration from './App.X.Playground.X.Infomation.X.Duration'
import Expend from './App.X.Playground.X.Infomation.X.Expend'
import Point from './App.X.Playground.X.Infomation.X.Point'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return [<Duration />, <Expend />]
}

export default App