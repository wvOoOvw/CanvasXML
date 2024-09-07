import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [open, setOpen] = React.useState(false)

  const { animationCount: animationCountPause, setAnimationCount: setAnimationCountPause } = ReactExtensions.useAnimationDestination({ play: open === true, defaultCount: 0, destination: 1, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountPauseOver, setAnimationCount: setAnimationCountPauseOver } = ReactExtensions.useAnimationDestination({ play: animationCountPause > 0 && open !== true, defaultCount: 0, destination: 1, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDownPause = (e) => {
    e.stopPropagation()
    setOpen(true)
  }

  const onPointerDownPlay = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  React.useEffect(() => {
    if (animationCountPauseOver === 1) {
      setAnimationCountPause(0)
      setAnimationCountPauseOver(0)
    }
  }, [animationCountPauseOver])

  return <>
    <rect x={contextApp.locationLayout.x + contextApp.locationLayout.w - contextApp.unitpx * 0.16} y={ + contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} zIndex={contextPlayground.zIndex.GameSettingPause} onPointerDown={onPointerDownPause}>
      <image cx='50%' cy='50%' w='80%' h='80%' src={contextApp.imagePngPauseButtonWhite} />
    </rect>

    {
      animationCountPause > 0 ?
        <>
          <rect zIndex={contextPlayground.zIndex.GameSettingPause} onPointerDown={e => e.stopPropagation()} />
          <layout cx={contextApp.locationLayout.x + contextApp.locationLayout.w / 2 + contextApp.unitpx * 0.64 * (animationCountPause + animationCountPauseOver - 1)} cy='50%' w={contextApp.unitpx * 0.64} h={contextApp.unitpx * 0.24} globalAlpha={animationCountPause - animationCountPauseOver} zIndex={contextPlayground.zIndex.GameSettingPause}>
            <rectradius fill fillStyle='rgb(75, 75, 75)' radius={contextApp.unitpx * 0.04} />
            <image cx='35%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} src={contextApp.imagePngPlayButtonWhite} />
            <image cx='65%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} src={contextApp.imagePngClockwiseRotationWhite} />
            <rect cx='35%' cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} onPointerDown={onPointerDownPlay} />
          </layout>
        </>
        : null
    }
  </>
}

export default App