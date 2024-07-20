import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Duration from './View.Playground.Info.Duration'
import Name from './View.Playground.Info.Name'
import Score from './View.Playground.Info.Score'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  return <layout container verticalForward horizontalAlignCenter globalAlpha={animationCountIntersection}>
    <Duration />
    <layout h={contextApp.unitpx * 0.04} item></layout>
    <Score />
  </layout>
}

export default App