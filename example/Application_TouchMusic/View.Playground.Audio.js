import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.gamePlay === true) contextApp.audioStormsEye.loop = true
    if (contextPlayground.gamePlay === true) contextApp.audioStormsEye.play()
    if (contextPlayground.gamePlay === true) return () => contextApp.audioStormsEye.pause()
  }, [contextPlayground.gamePlay])

  return null
}

export default App