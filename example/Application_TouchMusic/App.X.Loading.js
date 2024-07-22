import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

import Animation from './App.X.Loading.X.Animation'
import TextA from './App.X.Loading.X.TextA'
import TextB from './App.X.Loading.X.TextB'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory } = React.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDestory === 1) props.onDestory()
  }, [animationCountDestory])

  React.useEffect(() => {
    if (props.load === true) setDestory(true)
  }, [props.load])

  return <layout globalAlpha={animationCountIntersection - animationCountDestory}>
    
    <layout container verticalCenter horizontalAlignCenter>
      <TextA />
      <layout h={contextApp.unitpx * 0.06} item></layout>
      <TextB />
    </layout>

    <layout container verticalReverse horizontalAlignCenter>
      <layout h={contextApp.unitpx * 0.06} item></layout>
      <Animation />
    </layout>

  </layout>
}

export default App