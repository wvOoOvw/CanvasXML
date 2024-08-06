import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.setGameMusic(contextPlayground.information.gameMusic)
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    if (contextPlayground.gamePlay === true && contextPlayground.gameMusic !== undefined) {
      contextApp.audioStormsEye.play()
      return () => contextApp.audioStormsEye.pause()
    }
  }, [contextPlayground.gamePlay, contextPlayground.gameMusic])

  return null
}

export default App