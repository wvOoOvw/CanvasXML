import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  return null

  React.useEffect(() => {
    if (context.information) {
      context.information.gameWire.forEach(i => {
        const iWire = {
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
            iWire.inDestory = true
            context.setGameWire(i => [...i])
          },
          onProcess: () => {
            iWire.inProcess = true
            context.setGameWire(i => [...i])
          },
          onSuccess: () => {
            iWire.inSuccess = true
            context.setGameWire(i => [...i])
          },
          onFail: () => {
            iWire.inFail = true
            context.setGameWire(i => [...i])
          },
          onWire: (event, score) => {
            iWire.event = event
            iWire.score = score
            context.setGameWire(i => [...i])
          },
        }

        context.setGameWire(i => [...i, iWire])
      })
    }
  }, [context.information])

  React.useEffect(() => {
    if (context.gamePlay) {
      context.gameWire
        .filter((i) => {
          return i.inProcess === false
        })
        .forEach(i => {
          if (context.animationCountGameTime > i.time) i.onProcess()
        })
    }
  }, [context.gamePlay, context.animationCountGameTime])

  const WireMemo = React.useMemo(() => {
    if (context.gamePlay) {
      return context.gameWire
        .filter((i) => {
          return i.inProcess === true && i.inDestory === false
        })
        .map((i) => {
          return <i.component gameTimeRate={context.gameTimeRate} {...i} />
        })
    }
  }, [context.gamePlay, context.animationCountGameTime, context.gameWire, context.gameTimeRate])

  return <layout>{WireMemo}</layout>
}

export default App