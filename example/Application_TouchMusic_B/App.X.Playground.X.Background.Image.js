import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <image
    cx={'50%'}
    cy={'50%'}
    image={contextPlayground.informationJson ? contextApp[contextPlayground.informationJson.gameBackgroundImageIndex] : undefined}
    size='auto-min'
    position='center'
  />
}

export default App