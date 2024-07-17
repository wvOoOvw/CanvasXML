import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  React.useEffect(() => {
    if (context.information) {
      context.information.gameHit.forEach(i => {
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
            context.setGameHit(i => [...i])
            if (i.onDestory) i.onDestory(iHit)
          },
          onProcess: () => {
            iHit.inProcess = true
            context.setGameHit(i => [...i])
            if (i.onProcess) i.onProcess(iHit)
          },
          onSuccess: () => {
            iHit.inSuccess = true
            context.setGameHit(i => [...i])
            context.setGameHitSuccess(i => [...i, iHit])
            if (i.onSuccess) i.onSuccess(iHit)
          },
          onFail: () => {
            iHit.inFail = true
            context.setGameHit(i => [...i])
            context.setGameHitFail(i => [...i, iHit])
            if (i.onFail) i.onFail(iHit)
          },
          onHitManual: (event, score) => {
            iHit.successInformation = { type: 'manual', event, score }
            context.setGameHit(i => [...i])
            if (i.onHit) i.onHit(iHit)
          },
          onHitAuto: (score) => {
            iHit.successInformation = { type: 'auto', score }
            context.setGameHit(i => [...i])
            if (i.onHit) i.onHit(iHit)
          },
        }

        context.setGameHit(i => [...i, iHit])
      })
    }
  }, [context.information])

  React.useEffect(() => {
    console.log(1)
    if (context.gamePlay) {
      context.gameHit
        .filter((i) => {
          return i.inProcess === false
        })
        .forEach(i => {
          if (context.animationCountGameTime > i.time) i.onProcess()
        })
    }
  }, [context.gamePlay, context.animationCountGameTime])

  const HitMemo = React.useMemo(() => {
    if (context.gamePlay) {
      return context.gameHit
        .filter((i) => {
          return i.inProcess === true && i.inDestory === false
        })
        .map((i) => {
          return <i.component gameTimeRate={context.gameTimeRate} {...i} />
        })
    }
  }, [context.gamePlay, context.animationCountGameTime, context.gameHit, context.gameTimeRate])

  return <layout>{HitMemo}</layout>
}

export default App