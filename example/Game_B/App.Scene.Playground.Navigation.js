import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Background() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const h = contextApp.unitpx * 0.1

  const Component =
    <layout h={h} zIndex={contextPlayground.zIndex.Navigation}>
      <rectradiusarc fill radius={[0, 0, h * 0.12, h * 0.12]} shadowBlur={h * 0.24} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
    </layout>

  return Component
}


function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <Background />
    </>

  return Component
}

export default App