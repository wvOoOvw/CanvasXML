import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const gameDuration = React.useMemo(() => contextPlayground.informationJson.gameDuration, [contextPlayground.informationJson])

  const { animationCount: animationCountTimeGameDuration } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: Math.min(contextPlayground.animationCountGameTime / gameDuration, 1), rate: 0.0001, postprocess: n => Number(n.toFixed(4)) })

  return <layout zIndex={contextPlayground.zIndex.InfomationPoint}>
    <rect
      fill
      w={`${animationCountTimeGameDuration * 100}%`}
      h={contextApp.unitpx * 0.01}
      fillStyle={'rgb(215, 215, 215)'}
    />
  </layout>
}

export default App