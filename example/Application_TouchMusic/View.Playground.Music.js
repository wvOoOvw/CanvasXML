import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

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
    }
    if (contextPlayground.gamePlay !== true && contextPlayground.gameMusic !== undefined) {
      contextApp.audioStormsEye.pause()
    }
  }, [contextPlayground.gamePlay, contextPlayground.gameMusic])

  return null
}

export default App