import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [backgroundImage, setBackgroundImage] = React.useState()

  React.useEffect(() => {
    if (contextPlayground.information) setBackgroundImage(contextPlayground.information.gameBackground)
  }, [contextPlayground.information])

  if (backgroundImage === undefined) {
    return null
  }

  if (backgroundImage !== undefined) {
    return <image
      cx={'50%'}
      cy={'50%'}
      src={backgroundImage}
      size='auto-min'
      position='center'
    />
  }
}

export default App