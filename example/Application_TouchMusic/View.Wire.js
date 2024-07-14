import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import { App as AppWireLineHorizontalForward } from './View.Wire.Component.LineHorizontalForward'
import { App as AppWireLineVerticalForward } from './View.Wire.Component.LineVerticalForward'

import { App as AppHitPointDropCircle } from './View.Hit.Component.PointDropCircle'

function App() {
  const context = React.useContext(Context)

  // const WireMemo = React.useMemo(() => {
  //   const wire = []

  //   new Array(AppWireLineHorizontalForward, AppWireLineVerticalForward).forEach(i => {
  //     wire.push(...i.init(context.gameHit))
  //   })

  //   return wire
  // }, [context.gameHit])

  return null

  return <layout>{WireMemo}</layout>
}

export default App