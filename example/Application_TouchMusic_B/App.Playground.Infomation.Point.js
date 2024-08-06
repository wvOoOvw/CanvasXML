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

  const { animationCount: animationCountGamePoint } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gamePoint, rate: 8, postprocess: n => Number(n.toFixed()) })

  return <layout zIndex={contextPlayground.zIndex.InfomationPoint}>

    <layout y={contextApp.unitpx * 0.04}>
      <ReactCanvas2dExtensions.TextCaculateLine text={String(animationCountGamePoint).padStart(7, '0')} font={`${contextApp.unitpx * 0.06}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
        {
          (line, location) => {
            return <text fillText fillStyle='rgb(12, 255, 255)' align='center' font={`${contextApp.unitpx * 0.06}px sans-serif`} lineHeight={1} gap={0} line={line} />
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>
    </layout>

  </layout>
}

export default App