import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.information.gameHit.forEach(i => {
        const iHit = {
          key: i.key,
          component: i.component,
          option: i.option,
          time: i.time,
          inProcess: false,
          inDestory: false,
          ifDestination: i.ifDestination,
          ifDie: i.ifDie,
          ifCollision: i.ifCollision,
          onHit: i.onHit,
          onStatus: i.onStatus,
          onDestination: i.onDestination,
          onMove: i.onMove,
          onProcess: () => {
            iHit.inProcess = true
          },
          onDestory: () => {
            iHit.inDestory = true
          },
          onUpdate: () => {
            contextPlayground.setGameHit(i => [...i])
          }
        }

        iHit.option.image = contextApp[iHit.option.imageIndex]

        contextPlayground.setGameHit(i => [...i, iHit])
      })
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      contextPlayground.gameHit.forEach(i => {
        if (i.inProcess === false && contextPlayground.animationCountGameTime > i.time) {
          i.onProcess()
          i.onUpdate()
        }
      })
    }
  }, [contextPlayground.animationCountGameTime, contextPlayground.gamePlay])

  return contextPlayground.gameHit
    .filter((i) => {
      return i.inProcess === true && i.inDestory === false
    })
    .map((i) => {
      return <i.component
        ceilpx={contextPlayground.information.ceilpx}
        gameTimeRate={contextPlayground.gameTimeRate}
        gameHit={contextPlayground.gameHit}
        gameRole={contextPlayground.gameRole}
        gameRoleUse={contextPlayground.gameRoleUse}
        {...i}
      />
    })
}

export default App