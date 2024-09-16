import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function NextRound() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w - contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2

  const onPointerDown = (e) => {
    
  }

  return <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.Action}>
    <image cx='50%' cy='50%' w='65%' h='65%' src={contextApp.imagePngCardExchangeWhite} />
    <rect onPointerDown={onPointerDown} />
  </layout>
}

function RefreshQueue() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w - contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2

  const onPointerDown = (e) => {
    contextPlayground.setGameSelfCardReady(i => i.concat(...contextPlayground.gameSelfCardQueue))
    contextPlayground.setGameSelfCardQueue([])
  }

  return <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.Action}>
    <image cx='50%' cy='50%' w='65%' h='65%' src={contextApp.imagePngCardDrawWhite} />
    <rect onPointerDown={onPointerDown} />
  </layout>
}

function App() {
  return [<NextRound />]
}

export default App