import { React, ReactCanvas2d } from '../../package/index'

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