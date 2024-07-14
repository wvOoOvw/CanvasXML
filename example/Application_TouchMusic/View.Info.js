import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import Duration from './View.Info.Duration'
import Name from './View.Info.Name'
import Score from './View.Info.Score'

function App() {
  const { animationCount: animationCountIntersection } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  return <layout container verticalForward horizontalAlignCenter globalAlpha={animationCountIntersection}>
    <layout h='32px' item></layout>
    <Duration />
    <layout h='48px' item></layout>
    <Score />
    <layout h='48px' item></layout>
    <Name/>
  </layout>
}

export default App