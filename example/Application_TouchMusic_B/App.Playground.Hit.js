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
          inProcess: false,
          inDestory: false,
          ifCollisions: i.ifCollisions,
          ifHit: i.ifHit,
          ifSuccess: i.ifSuccess,
          ifFail: i.ifFail,
          onHit: i.onHit,
          onMove: i.onMove,
          onStatus: i.onStatus,
          onProcess: () => {
            iHit.inProcess = true
          },
          onDestory: () => {
            iHit.inDestory = true
          },
          onUpdate: () => {
            contextPlayground.setGameHit(i => [...i])
          },
        }

        iHit.option.image = contextApp[iHit.option.imageIndex]

        contextPlayground.setGameHit(i => [...i, iHit])
      })
    }
  }, [contextPlayground.informationJson])

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
      return <i.component {...i} />
    })
}

export default App