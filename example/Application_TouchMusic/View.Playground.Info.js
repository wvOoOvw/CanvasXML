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
    <layout h={contextApp.unitpx * 0.04} item></layout>
    <Duration />
    <layout h={contextApp.unitpx * 0.08} item></layout>
    <Score />
    <layout h={contextApp.unitpx * 0.08} item></layout>
    {/* <Name/> */}
    {/* <layout h={contextApp.unitpx * 0.04} item></layout> */}
  </layout>
}

export default App