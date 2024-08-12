import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { App as AppHitBaseA, init as initHitBaseA } from './App.Playground.Hit.Component.BaseA'

const initComponent = (props) => {
  if (props.type === 'HitBaseA') return initHitBaseA(props.option)
}

function RenderComponent(props) {
  if (props.type === 'HitBaseA') return <AppHitBaseA {...props} />
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.informationJson.gameHit.forEach((i, index) => {
        const n = initComponent(i)
        const v = {
          key: Math.random(),
          type: i.type,
          time: i.time,
          option: n.option,
          ifCollisions: n.ifCollisions,
          ifHit: n.ifHit,
          onHit: n.onHit,
          onDestory: () => contextPlayground.setGameHit(i => i.filter(n => n !== v)),
          onUpdate: () => contextPlayground.setGameHit(i => [...i]),
        }
        v.self = v
        contextPlayground.setGameHitReady(i => [...i, v])
      })
      contextPlayground.setGameLoadHit(true)
    }
  }, [contextPlayground.informationJson])

  React.useEffect(() => {
    contextPlayground.gameHitReady.every(i => {
      const ready = contextPlayground.animationCountGameTime > i.time
      if (ready) {
        contextPlayground.setGameHitReady(n => n.filter(v => v !== i))
        contextPlayground.setGameHit(n => [...n, i])
      }
      return ready
    })
  }, [contextPlayground.animationCountGameTime])

  return contextPlayground.gameHit.map((i) => <RenderComponent {...i} />)
}

export default App