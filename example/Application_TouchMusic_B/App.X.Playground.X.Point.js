import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.information.gamePoint.forEach(i => {
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
            contextPlayground.setGamePoint(i => [...i])
          },
        }

        iHit.option.image = contextApp[iHit.option.imageIndex]

        contextPlayground.setGamePoint(i => [...i, iHit])
      })
      setLoadHit(true)
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      contextPlayground.gamePoint.forEach(i => {
        if (i.inProcess === false && contextPlayground.animationCountGameTime > i.time) {
          i.onProcess()
          i.onUpdate()
        }
      })
    }
  }, [contextPlayground.animationCountGameTime, contextPlayground.gamePlay])

  return contextPlayground.gamePoint
    .filter((i) => {
      return i.inProcess === true && i.inDestory === false
    })
    .map((i) => {
      return <i.component {...i}/>
    })
}

export default App