import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import init from './Model.Card'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.gameCardExecuteIng === undefined && contextPlayground.gameCardExecute.length > 0) {
      contextPlayground.gameCardExecuteIng = contextPlayground.gameCardExecute[0]
      contextPlayground.gameCardExecute = contextPlayground.gameCardExecute.filter((i, index) => index > 0)
    }
  }, [contextPlayground.gameCardExecute, contextPlayground.gameCardExecuteIng])
}

export default App