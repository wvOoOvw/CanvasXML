import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.informationJson.gameHit.forEach(i => {
        const iHit = {
          key: i.key,
          component: i.component,
          option: i.option,
          time: i.time,
          ifCollisions: i.ifCollisions, 
          ifHit: i.ifHit, 
          onHit: i.onHit,
          onDestory: () => {
            contextPlayground.setGameHit(i => i.filter(n => n !== iHit))
          },
          onUpdate: () => {
            contextPlayground.setGameHit(i => [...i])
          },
        }

        contextPlayground.setGameHitReady(i => [...i, iHit])
      })
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

  return contextPlayground.gameHit.map((i) => <i.component self={i} {...i} />)
}

export default App