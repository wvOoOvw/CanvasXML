import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { convertToRoman } from './utils'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const Component =
    <layout zIndex={contextPlayground.zIndex.NavigationInformation} globalAlpha={animationCountAppear}>
      <layout x={contextApp.unitpx * 0.42} y={contextApp.unitpx * 0.12} w={contextApp.unitpx * 0.48} container verticalForward horizontalAlignCenter gap={contextApp.unitpx * 0.04}>

        <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.08} item>
          <rectradiusarc fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.016} />
          <ReactCanvas2dExtensions.Text text={'回合 ' + String(contextPlayground.gameRound)} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
              }
            }
          </ReactCanvas2dExtensions.Text>
        </layout>

      </layout>

    </layout>

  return Component
}

export default App