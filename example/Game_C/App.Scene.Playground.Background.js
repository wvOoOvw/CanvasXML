import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.Background}>
      
    </layout>

  return Component
}

export default App