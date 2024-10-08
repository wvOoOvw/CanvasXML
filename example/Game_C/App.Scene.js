import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

import Entry from './App.Scene.Entry'
import Playground from './App.Scene.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)

  React.useEffect(() => {
    if (contextApp.loadLayout) contextApp.setScene(['Entry'])
  }, [contextApp.loadLayout])

  // React.useEffect(() => {
  //   if (contextApp.loadLayout && contextApp.load) contextApp.setScene(['Playground'])
  // }, [contextApp.loadLayout, contextApp.load])

  const Component =
    <>
      {
        contextApp.scene[contextApp.scene.length - 1] === 'Entry' ? <Entry /> : null
      }
      {
        contextApp.scene[contextApp.scene.length - 1] === 'Playground' ? <Playground /> : null
      }
    </>

  return Component
}

export default App