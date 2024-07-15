import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  React.useEffect(() => {
    if (context.information) {
      context.information.gameWire.forEach(i => {
        const iWire = {
          key: i.key,
          time: i.time,
          component: i.component,
          option: i.option,
          toHide: i.toHide,
          toHit: i.toHit,
          inShow: false,
          inHide: false,
          inDestory: false,
          onDestory: () => {
            iWire.inDestory = true
            context.setGameWire(i => [...i])
            if (i.onDestory) i.onDestory(iWire)
          },
          onShow: () => {
            iWire.inShow = true
            context.setGameWire(i => [...i])
            if (i.onShow) i.onShow(iWire)
          },
          onHide: () => {
            iWire.inHide = true
            context.setGameWire(i => [...i])
            if (i.onHide) i.onHide(iWire)
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
          return i.inShow === false
        })
        .forEach(i => {
          if (context.animationCountGameTime > i.time) i.onShow()
        })
    }
  }, [context.gamePlay, context.animationCountGameTime])

  const WireMemo = React.useMemo(() => {
    if (context.gamePlay) {
      return context.gameWire
        .filter((i) => {
          return i.inShow === true && i.inDestory === false
        })
        .map((i) => {
          return <i.component gameTimeRate={context.gameTimeRate} {...i} />
        })
    }
  }, [context.gamePlay, context.animationCountGameTime, context.gameWire, context.gameTimeRate])

  return <layout>{WireMemo}</layout>
}

export default App