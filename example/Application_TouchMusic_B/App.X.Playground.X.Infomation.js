import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Combo from './App.X.Playground.X.Infomation.X.Combo'
import Duration from './App.X.Playground.X.Infomation.X.Duration'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  // const ComboMemo = React.useMemo(() => <Combo />, [contextApp.locationLayout, contextPlayground.gamePoint])
  const DurationMemo = React.useMemo(() => <Duration />, [contextApp.locationLayout, contextPlayground.animationCountGameTime])

  return <>
    {/* {ComboMemo} */}
    {DurationMemo}
  </>
}

export default App