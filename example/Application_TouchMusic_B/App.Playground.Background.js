import { React, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Audio from './App.Playground.Background.Audio'
import Image from './App.Playground.Background.Image'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return [<Audio />]
}

export default App