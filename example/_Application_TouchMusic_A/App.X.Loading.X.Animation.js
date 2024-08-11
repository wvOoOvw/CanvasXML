import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  return <layout w={contextApp.unitpx * 0.5} h={contextApp.unitpx * 0.2} item>
    <circle
      fill
      cx={`${Math.sin(animationCountInfinity + Math.PI * 1.5) * 50 + 50}%`}
      cy={'50%'}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={contextApp.unitpx * 0.065}
      fillStyle={'rgb(255, 255, 255)'}
    />

    <rectradius
      fill
      cx={'50%'}
      cy={'50%'}
      w={contextApp.unitpx * 0.01}
      radius={contextApp.unitpx * 0.02}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={Math.sin(animationCountInfinity * 2 + Math.PI * 2.5) * 0.5 + 0.5}
    />
  </layout>
}

export default App