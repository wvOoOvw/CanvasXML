import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

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
    }
  }, [contextPlayground.information])

  const render = contextPlayground.gameWire
    .map((i) => {
      return <i.component
        unitpx={contextApp.unitpx}
        locationLayout={contextApp.locationLayout}
        animationCountGameTime={contextPlayground.animationCountGameTime}
        gameTimeRate={contextPlayground.gameTimeRate}
        gameHit={contextPlayground.gameHit}
        gameWire={contextPlayground.gameWire}
        {...i}
      />
    })

  return render
}

export default App