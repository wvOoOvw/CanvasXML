import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ModuleAudio() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].loop = true
      contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].play()
      return () => contextApp[contextPlayground.informationJson.gameBackgroundAudioIndex].pause()
    }
  }, [contextPlayground.informationJson])

  return null
}

function ModuleImage() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      {
        contextPlayground.informationJson && contextPlayground.informationJson.gameBackgroundImageIndex ?
          <image cx={'50%'} cy={'50%'} src={contextApp[contextPlayground.informationJson.gameBackgroundImageIndex]} globalAlpha={0.2} clipHorizontalCenter clipVerticalCenter />
          : null
      }
    </>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      {/* <ModuleAudio /> */}
      <ModuleImage />
    </>

  return Component
}

export default App