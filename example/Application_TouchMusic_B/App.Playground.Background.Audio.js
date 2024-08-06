import { React, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.gamePlay === true && contextPlayground.informationJson !== undefined) {
      contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].play()
      return () => contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].pause()
    }
  }, [contextPlayground.gamePlay, contextPlayground.informationJson])

  return null
}

export default App