import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Combo from './View.Playground.Infomation.Module.Combo'
import Duration from './View.Playground.Infomation.Module.Duration'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const ComboMemo = React.useMemo(() => <Combo />, [contextApp.locationLayout, contextPlayground.gameHit, contextPlayground.gameHitSuccess, contextPlayground.gameHitFail])
  const DurationMemo = React.useMemo(() => <Duration />, [contextApp.locationLayout, contextPlayground.animationCountGameTime])

  return <>
    {ComboMemo}
    {DurationMemo}
  </>
}

export default App