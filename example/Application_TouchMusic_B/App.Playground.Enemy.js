import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { App as AppEnemyBaseA, init as initEnemyBaseA } from './App.Playground.Enemy.Component.BaseA'

const initComponent = (props) => {
  if (props.type === 'EnemyBaseA') return initEnemyBaseA(props.option)
}

function RenderComponent(props) {
  if (props.type === 'EnemyBaseA') return <AppEnemyBaseA {...props} />
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.informationJson.gameEnemy.forEach((i, index) => {
        const n = initComponent(i)
        const v = {
          key: Math.random(),
          type: i.type,
          time: i.time,
          option: n.option,
          onDomCollisions: n.onDomCollisions,
          onDestory: () => contextPlayground.setGameEnemy(i => i.filter(n => n !== v)),
          onUpdate: () => contextPlayground.setGameEnemy(i => [...i]),
        }
        v.self = v
        contextPlayground.setGameEnemyReady(i => [...i, v])
      })
      contextPlayground.setGameLoadEnemy(true)
    }
  }, [contextPlayground.informationJson])

  React.useEffect(() => {
    contextPlayground.gameEnemyReady.every(i => {
      const ready = contextPlayground.animationCountGameTime > i.time
      if (ready) {
        contextPlayground.setGameEnemyReady(n => n.filter(v => v !== i))
        contextPlayground.setGameEnemy(n => [...n, i])
      }
      return ready
    })
  }, [contextPlayground.animationCountGameTime])

  return contextPlayground.gameEnemy.map((i) => <RenderComponent {...i} />)
}

export default App