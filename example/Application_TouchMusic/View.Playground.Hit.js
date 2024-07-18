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
          time: i.time,
          component: i.component,
          option: i.option,
          toSuccess: i.toSuccess,
          toFail: i.toFail,
          inProcess: false,
          inSuccess: false,
          inFail: false,
          inDestory: false,
          onDestory: () => {
            iHit.inDestory = true
            contextPlayground.setGameHit(i => [...i])
            if (i.onDestory) i.onDestory(iHit)
          },
          onProcess: () => {
            iHit.inProcess = true
            contextPlayground.setGameHit(i => [...i])
            if (i.onProcess) i.onProcess(iHit)
          },
          onSuccess: () => {
            iHit.inSuccess = true
            contextPlayground.setGameHit(i => [...i])
            contextPlayground.setGameHitSuccess(i => [...i, iHit])
            if (i.onSuccess) i.onSuccess(iHit)
          },
          onFail: () => {
            iHit.inFail = true
            contextPlayground.setGameHit(i => [...i])
            contextPlayground.setGameHitFail(i => [...i, iHit])
            if (i.onFail) i.onFail(iHit)
          },
          onHitManual: (event, score) => {
            iHit.successInformation = { type: 'manual', event, score }
            contextPlayground.setGameHit(i => [...i])
            if (i.onHit) i.onHit(iHit)
          },
          onHitAuto: (score) => {
            iHit.successInformation = { type: 'auto', score }
            contextPlayground.setGameHit(i => [...i])
            if (i.onHit) i.onHit(iHit)
          },
        }

        contextPlayground.setGameHit(i => [...i, iHit])
      })
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      contextPlayground.gameHit
        .filter((i) => {
          return i.inProcess === false
        })
        .forEach(i => {
          if (contextPlayground.animationCountGameTime > i.time) i.onProcess()
        })
    }
  }, [contextPlayground.gamePlay, contextPlayground.animationCountGameTime])

  const HitMemo = React.useMemo(() => {
    if (contextPlayground.gamePlay) {
      return contextPlayground.gameHit
        .filter((i) => {
          return i.inProcess === true && i.inDestory === false
        })
        .map((i) => {
          return <i.component gameTimeRate={contextPlayground.gameTimeRate} {...i} />
        })
    }
  }, [contextPlayground.gamePlay, contextPlayground.animationCountGameTime, contextPlayground.gameHit, contextPlayground.gameTimeRate])

  return <layout>{HitMemo}</layout>
}

export default App