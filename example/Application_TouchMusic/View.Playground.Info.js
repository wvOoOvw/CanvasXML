import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Desciption from './View.Playground.Info.Desciption'
import Duration from './View.Playground.Info.Duration'
import Score from './View.Playground.Info.Score'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  return <layout globalAlpha={animationCountIntersection}>

    <layout container verticalForward horizontalAlignCenter>
      <Duration />
      <layout h={contextApp.unitpx * 0.08} item></layout>
      <Score />
    </layout>

    <layout container verticalReverse horizontalAlignCenter>
      <layout h={contextApp.unitpx * 0.04} item></layout>
      <Desciption />
    </layout>
    
  </layout>


}

export default App