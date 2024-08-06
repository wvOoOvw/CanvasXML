import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

import TextA from './App.X.Entry.X.TextA'
import TextB from './App.X.Entry.X.TextB'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountIntersection } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory } = ReactExtensions.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDestory === 1) props.onDestory()
  }, [animationCountDestory])

  return <layout globalAlpha={animationCountIntersection - animationCountDestory}>

    <layout container verticalCenter horizontalAlignCenter>
      <TextA />
      <layout h={contextApp.unitpx * 0.06} item></layout>
      <TextB />
    </layout>

    <rectradius onPointerDown={() => setDestory(true)} />

  </layout>
}

export default App