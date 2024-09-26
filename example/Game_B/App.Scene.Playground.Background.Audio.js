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
    // if (contextPlayground.informationJson) {
    //   contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].loop = true
    //   contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].play()
    //   return () => contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].pause()
    // }
  }, [contextPlayground.informationJson])

  return null
}

export default App