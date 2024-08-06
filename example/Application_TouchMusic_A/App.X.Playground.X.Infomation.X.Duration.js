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

  const gameDuration = React.useMemo(() => contextPlayground.information.gameDuration, [contextPlayground.information])

  const { animationCount: animationCountTimeGameDuration } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Math.min(contextPlayground.animationCountGameTime / gameDuration, 1), rate: 0.0001, postprocess: n => Number(n.toFixed(4)) })

  return <layout w={`${contextApp.locationLayout.w}px`} h={contextApp.unitpx * 0.01}>
    <rect   fill w={`${animationCountTimeGameDuration * 100}%`} fillStyle={'rgb(255, 255, 255)'} />
  </layout>
}

export default App