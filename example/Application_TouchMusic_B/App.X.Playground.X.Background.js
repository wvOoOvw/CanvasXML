import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Audio from './App.X.Playground.X.Background.Audio'
import Image from './App.X.Playground.X.Background.Image'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return [<Audio />]
}

export default App