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

  const gameDuration = React.useMemo(() => contextPlayground.informationJson.gameDuration, [contextPlayground.informationJson])

  return <layout zIndex={contextPlayground.zIndex.InfomationPoint}>
    <rect
      fill
      w={`${Math.min(contextPlayground.animationCountGameTime / gameDuration, 100) * 100}%`}
      h={contextApp.unitpx * 0.01}
      fillStyle={'rgb(255, 255, 255)'}
    />
  </layout>
}

export default App