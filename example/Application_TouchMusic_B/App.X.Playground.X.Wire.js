import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.informationJson.gameWire.forEach((i, index) => {
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
  }, [contextPlayground.informationJson])

  return contextPlayground.gameWire
    .map((i) => {
      return <i.component {...i} />
    })
}

export default App