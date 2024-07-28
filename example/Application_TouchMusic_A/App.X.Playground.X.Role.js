import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Card from './App.X.Playground.X.Role.X.Card'
import Panel from './App.X.Playground.X.Role.X.Panel'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.setGameRole(contextPlayground.information.gameRole)
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      contextPlayground.gameRole.forEach(i => i.skillWaitTime = Math.min(i.skillWaitTime + contextPlayground.gameTimeRate, i.skillWaitTimeEnough))
      contextPlayground.setGameRole(i => [...i])
    }
  }, [contextPlayground.animationCountGameTime, contextPlayground.gamePlay])

  const CardMemo = React.useMemo(() => {
    return <Card />
  }, [contextPlayground.animationCountGameTime, contextPlayground.gameHit, contextPlayground.gameRole, contextPlayground.gameRoleActive])

  const PanelMemo = React.useMemo(() => {
    return <Panel />
  }, [contextPlayground.animationCountGameTime, contextPlayground.gameHit, contextPlayground.gameRole, contextPlayground.gameRoleActive])

  return <>
    {CardMemo}
    {PanelMemo}
  </>
}

export default App