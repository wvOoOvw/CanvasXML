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

  return <>
    {
      contextPlayground.informationJson && contextPlayground.informationJson.gameBackgroundImageIndex ?
        <image cx={'50%'} cy={'50%'} src={contextApp[contextPlayground.informationJson.gameBackgroundImageIndex]} globalAlpha={0.2} clipHorizontalCenter clipVerticalCenter />
        : null
    }
  </>
}

export default App