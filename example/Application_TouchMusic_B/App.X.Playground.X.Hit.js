import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      contextPlayground.gameHit.forEach(i => {
        if (i.inProcess === false && contextPlayground.animationCountGameTime > i.time) {
          i.onProcess()
          i.onUpdate()
        }
      })
    }
  }, [contextPlayground.animationCountGameTime, contextPlayground.gamePlay])

  return contextPlayground.gameHit
    .filter((i) => {
      return i.inProcess === true && i.inDestory === false
    })
    .map((i) => {
      return <i.component {...i}/>
    })
}

export default App