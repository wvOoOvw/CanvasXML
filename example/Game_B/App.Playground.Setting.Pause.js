import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Button() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w - contextApp.unitpx * 0.08
  const y = contextApp.unitpx * 0.04

  const onPointerDown = (e) => {
    e.stopPropagation()
    contextPlayground.setGameContinue(false)
  }

  return <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.SettingPauseButton}>
    <rectradiusarc fill fillStyle='rgb(0, 0, 0)' radius={contextApp.unitpx * 0.02} globalAlpha={0.4} onPointerDown={onPointerDown} />
    <image cx='50%' cy='50%' w='65%' h='65%' src={contextApp.imagePngPauseButtonWhite} globalAlpha={1} />
  </layout>
}

function Modal() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameContinue ? 0 : 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = (e) => {
    e.stopPropagation()
    contextPlayground.setGameContinue(true)
  }

  if (animationCountAppear > 0) {
    return <>
      <rect fill fillStyle='rgb(0, 0, 0)' globalAlpha={animationCountAppear * 0.8} zIndex={contextPlayground.zIndex.SettingPauseModal} onPointerDown={e => e.stopPropagation()} />
      <layout cx={contextApp.locationLayout.x + contextApp.locationLayout.w / 2} cy='50%' w={contextApp.unitpx * 0.64} h={contextApp.unitpx * 0.24} zIndex={contextPlayground.zIndex.SettingPauseModal}>
        <rect cx='35%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} onPointerDown={onPointerDown} >
          <image src={contextApp.imagePngPlayButtonWhite} />
        </rect>
        <rect cx='65%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} onPointerDown={onPointerDown}>
          <image src={contextApp.imagePngClockwiseRotationWhite} />
        </rect>
      </layout>
    </>
  }
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return [<Button />, <Modal />]
}

export default App