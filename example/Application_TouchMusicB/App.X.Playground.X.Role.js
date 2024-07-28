import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.information.gameRole.forEach((i, index) => {
        const iRole = {
          key: i.key,
          component: i.component,
          option: i.option,
          onTouch: i.onTouch,
          onHit: i.onHit,
          onUpdate: () => {
            contextPlayground.setGameHit(i => [...i])
          }
        }

        iRole.option.image = contextApp[iRole.option.imageIndex]

        contextPlayground.setGameRole(i => [...i, iRole])

        if (index === 0) contextPlayground.setGameRoleUse(i => iRole)
      })
    }
  }, [contextPlayground.information])

  return contextPlayground.gameRole
    .map((i) => {
      return <i.component ceilpx={contextPlayground.information.ceilpx} gameTimeRate={contextPlayground.gameTimeRate} gameHit={contextPlayground.gameHit} inUse={contextPlayground.gameRoleUse === i} {...i} />
    })
}

export default App