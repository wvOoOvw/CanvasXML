import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

import Animation from './View.Loading.Animation'
import TextA from './View.Loading.TextA'
import TextB from './View.Loading.TextB'

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

  return <>
    <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection - animationCountDestory}>
      <TextA />
      <layout h={contextApp.unitpx * 0.06} item></layout>
      <TextB />
    </layout>

    <layout container verticalReverse horizontalAlignCenter globalAlpha={animationCountIntersection - animationCountDestory}>
      <layout h={contextApp.unitpx * 0.06} item></layout>
      <Animation />
    </layout>
  </>
}

export default App