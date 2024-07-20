import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const { animationCount: animationCountInfinity } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  return <layout w={contextApp.unitpx * 0.5} h={contextApp.unitpx * 0.2} item>
    <circle
      beginPath
      fill
      cx={`${Math.sin(animationCountInfinity + Math.PI * 1.5) * 50 + 50}%`}
      cy={'50%'}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={contextApp.unitpx * 0.065}
      fillStyle={'rgb(255, 255, 255)'}
    />

    <rect
      beginPath
      fill
      w={contextApp.unitpx * 0.004}
      cx={'50%'}
      cy={'50%'}
      radius={contextApp.unitpx * 0.02}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={Math.sin(animationCountInfinity * 2 + Math.PI * 2.5) * 0.5 + 0.5}
    />
  </layout>
}

export default App