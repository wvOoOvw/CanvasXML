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
          },
          onProcess: () => {
            iHit.inProcess = true
            context.setGameHit(i => [...i])
          },
          onSuccess: () => {
            iHit.inSuccess = true
            context.setGameHit(i => [...i])
          },
          onFail: () => {
            iHit.inFail = true
            context.setGameHit(i => [...i])
          },
          onHit: (event, score) => {
            iHit.event = event
            iHit.score = score
            context.setGameHit(i => [...i])
          },
        }

        context.setGameHit(i => [...i, iHit])
      })
    }
  }, [context.information])

  React.useEffect(() => {
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