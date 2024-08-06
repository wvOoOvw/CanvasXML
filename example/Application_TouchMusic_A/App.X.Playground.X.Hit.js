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

  const { animationCount: animationCountGameRoleActive } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: contextPlayground.gameRoleActive ? 0 : 1, destination: contextPlayground.gameRoleActive ? 0 : 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

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
  }, [contextPlayground.animationCountGameTime, contextPlayground.gamePlay])

  const HitMemo = React.useMemo(() => {
    return contextPlayground.gameHit
      .filter((i) => {
        return i.inProcess === true && i.inDestory === false
      })
      .map((i) => {
        return <i.component gameTimeRate={contextPlayground.gameTimeRate} {...i} />
      })
  }, [contextPlayground.animationCountGameTime, contextPlayground.gameHit])

  return <layout  globalAlpha={0.5 + animationCountGameRoleActive * 0.5}>{HitMemo}</layout>
}

export default App