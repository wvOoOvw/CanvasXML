import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Entry() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 120, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })

  const Component =
    <>
      <rect cx='50%' w={contextApp.locationLayout.w + contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} y={0 - contextApp.unitpx * 0.08} fill fillStyle='rgb(0, 0, 0)' shadowColor='rgb(125, 125, 125)' shadowBlur={contextApp.unitpx * 0.04 + contextApp.unitpx * 0.02 * animationCountInfinity} globalAlpha={animationCountAppear} />
    </>

  return Component
}

function Exit() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 120, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })

  const Component =
    <>
      <rect cx='50%' w={contextApp.locationLayout.w + contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} y={contextApp.locationLayout.h} fill fillStyle='rgb(0, 0, 0)' shadowColor='rgb(125, 125, 125)' shadowBlur={contextApp.unitpx * 0.04 + contextApp.unitpx * 0.02 * animationCountInfinity} globalAlpha={animationCountAppear} />
    </>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.Decoration}>
      <Entry />
      <Exit />
    </layout>

  return Component
}

export default App