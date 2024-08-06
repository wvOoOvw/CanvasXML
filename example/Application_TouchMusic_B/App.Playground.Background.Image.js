import { React, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    {
      contextPlayground.informationJson && contextPlayground.informationJson.gameBackgroundImageIndex ?
        <image
          cx={'50%'}
          cy={'50%'}
          src={contextApp[contextPlayground.informationJson.gameBackgroundImageIndex]}
          size='auto-min'
          position='center'
        />
        : null
    }
  </>
}

export default App