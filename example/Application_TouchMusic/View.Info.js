import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import Duration from './View.Info.Duration'
import Name from './View.Info.Name'
import Score from './View.Info.Score'

function App() {
  const context = React.useContext(Context)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  return <layout container verticalForward horizontalAlignCenter globalAlpha={animationCountIntersection}>
    <layout h={context.unitpx * 0.04} item></layout>
    <Duration />
    <layout h={context.unitpx * 0.08} item></layout>
    <Score />
    <layout h={context.unitpx * 0.08} item></layout>
    {/* <Name/> */}
    {/* <layout h={context.unitpx * 0.04} item></layout> */}
  </layout>
}

export default App