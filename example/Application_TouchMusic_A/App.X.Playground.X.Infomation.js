import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Combo from './App.X.Playground.X.Infomation.X.Combo'
import Duration from './App.X.Playground.X.Infomation.X.Duration'

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