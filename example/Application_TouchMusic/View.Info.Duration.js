import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const gameDuration = React.useMemo(() => context.information.gameDuration, [context.information])

  const { animationCount: animationCountTimeGameDuration } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: Math.min(context.animationCountGameTime / gameDuration, 1), rate: 1 / gameDuration, postprocess: n => Number(n.toFixed(3)) })

  return <layout w={`${context.locationLayout.w - context.unitpx * 0.08}px`} h={context.unitpx * 0.01} item>
    <rect
      beginPath
      fill
      cx={'50%'}
      cy={'50%'}
      w={`${animationCountTimeGameDuration * 100}%`}
      fillStyle={'rgb(255, 255, 255)'}
      radius={context.unitpx * 0.05}
      globalAlpha={1}
    />
  </layout>
}

export default App