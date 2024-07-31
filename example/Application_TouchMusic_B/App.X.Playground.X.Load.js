import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [loadHit, setLoadHit] = React.useState(false)
  const [loadWire, setLoadWire] = React.useState(false)

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
      setLoadHit(true)
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.information.gameWire.forEach((i, index) => {
        const iWire = {
          key: i.key,
          component: i.component,
          option: i.option,
          onUpdate: () => {
            contextPlayground.setGameWire(i => [...i])
          }
        }

        iWire.option.image = contextApp[iWire.option.imageIndex]

        contextPlayground.setGameWire(i => [...i, iWire])
      })
      setLoadWire(true)
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    contextPlayground.setGameLoad(true)
  } ,[loadHit, loadWire])

  return <layout></layout>
}

export default App