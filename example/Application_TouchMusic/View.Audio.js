import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  // React.useEffect(() => {
  //   if (context.gamePlay === true) context.audioStormsEye.loop = true
  //   if (context.gamePlay === true) context.audioStormsEye.play()
  //   if (context.gamePlay === true) return () => context.audioStormsEye.pause()
  // }, [context.gamePlay])

  return null
}

export default App