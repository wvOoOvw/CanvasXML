import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

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
      image={backgroundImage}
      size='auto-min'
      position='center'
    />
  }
}

export default App