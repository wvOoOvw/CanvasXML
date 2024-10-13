import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function MonsterInWar() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.MonsterInWar}>
      {
        contextPlayground.monsterInWar.map((i) => <i.ComponentInWar key={i.key} monster={i} contextApp={contextApp} contextPlayground={contextPlayground} onDestory={() => contextPlayground.setMonsterInWar(n => n.filter(v => v !== i))} />)
      }
    </layout>

  return Component
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