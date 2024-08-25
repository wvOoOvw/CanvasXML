import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function PauseOut() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const onPointerDown = (e) => {
    contextPlayground.setGamePlay(false)
    e.stopPropagation()
  }

  return <layout x={contextApp.unitpx * 0.08} y={contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} zIndex={contextPlayground.zIndex.GameSetting}>
    <image cx='50%' cy='50%' w='80%' h='80%' src={contextApp.imagePngPauseButtonWhite} />
    <rect onPointerDown={onPointerDown} onPointerDownOption={{ priority: contextPlayground.priority.GameSettingPauseButton }} />
  </layout>
}

function PauseIn() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountPause, setAnimationCount: setAnimationCountPause } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay === false, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountPauseOver, setAnimationCount: setAnimationCountPauseOver } = ReactExtensions.useAnimationDestination({ play: animationCountPause > 0 && contextPlayground.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const x = contextApp.locationLayout.w / 2 + contextApp.unitpx * 0.64 * (animationCountPause + animationCountPauseOver - 1)
  const w = contextApp.unitpx * 0.64
  const h = contextApp.unitpx * 0.24
  const radius = contextApp.unitpx * 0.04
  const globalAlpha = animationCountPause - animationCountPauseOver

  const onPointerDown = (e) => {
    contextPlayground.setGamePlay(true)
    e.stopPropagation()
  }

  React.useEffect(() => {
    if (animationCountPauseOver === 1) {
      setAnimationCountPause(0)
      setAnimationCountPauseOver(0)
    }
  }, [animationCountPauseOver])

  if (animationCountPause > 0) {
    return <>
      <rect onPointerDown={e => e.stopPropagation()} onPointerDownOption={{ priority: contextPlayground.priority.GameSettingPausePoper }} />
      <layout cx={x} cy='50%' w={w} h={h} globalAlpha={globalAlpha} zIndex={contextPlayground.zIndex.GameSetting}>
        <rectradius fill fillStyle='rgb(75, 75, 75)' radius={radius} globalAlpha={1} />
        <image cx='35%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} src={contextApp.imagePngPlayButtonWhite} />
        <image cx='65%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} src={contextApp.imagePngClockwiseRotationWhite} />
        <rect cx='35%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} onPointerDown={onPointerDown} onPointerDownOption={{ priority: contextPlayground.priority.GameSettingPausePoperButton }} />
      </layout>
    </>
  }
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    <PauseOut />
    <PauseIn />
  </>
}

export default App