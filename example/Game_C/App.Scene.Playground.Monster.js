import React from '../../package/React'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function MonsterInWar() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.MonsterInWar}>
      {
        contextPlayground.monsterInWar.map((i) => <i.ComponentInPlaygroundWar key={i.key} monster={i} onDestory={() => contextPlayground.setMonsterInWar(n => n.filter(v => v !== i))} />)
      }
    </layout>

  return React.useMemo(() => Component, [contextPlayground.monsterInWar])
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <MonsterInWar />
    </>

  return Component
}

export default App