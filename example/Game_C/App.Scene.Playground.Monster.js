import React from '../../package/React'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function MonsterInWar() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [monster, setMonster] = React.useState([])

  React.useEffect(() => {
    contextPlayground.monsterInWar.forEach(i => {
      if (monster.includes(i) === false) setMonster(n => [...n, i])
    })
  }, [contextPlayground.monsterInWar])

  const Component =
    <layout zIndex={contextPlayground.zIndex.MonsterInWar}>
      {
        monster.map((i) => <i.ComponentInWar key={i.key} monster={i} onDestory={() => setMonster(n => n.filter(v => v !== i))} />)
      }
    </layout>

  return React.useMemo(() => Component, [monster])
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