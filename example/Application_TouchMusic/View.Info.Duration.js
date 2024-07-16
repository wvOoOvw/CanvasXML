import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const gameDuration = React.useMemo(() => context.information.gameDuration, [context.information])

  const { animationCount: animationCountTimeGameDuration } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: context.animationCountGameTime / gameDuration, rate: 1 / gameDuration, postprocess: n => n.toFixed(3) })

  return <layout w={`${context.locationLayout.w - 64}px`} h='4px' item>
    <rect
      beginPath
      fill
      cx={'50%'}
      cy={'50%'}
      w={`${animationCountTimeGameDuration * 100}%`}
      fillStyle={'rgb(255, 255, 255)'}
      radius={2}
      globalAlpha={1}
    />
  </layout>
}

export default App