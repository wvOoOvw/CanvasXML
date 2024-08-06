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

  const [gameScoreSuccess, setGameScoreSuccess] = React.useState(0)

  const { animationCount: animationCountGameScoreSuccess } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: gameScoreSuccess, rate: 8, postprocess: n => Number(n.toFixed()) })

  React.useEffect(() => {
    setGameScoreSuccess(contextPlayground.gameHitSuccess.reduce((t, i) => t + i.successInformation.score * 100, 0))
  }, [contextPlayground.gameHitSuccess])

  return <layout x={contextApp.unitpx * 0.08} y={contextApp.unitpx * 0.04} w={contextApp.locationLayout.w - contextApp.unitpx * 0.16} container verticalForward horizontalAlignCenter gap={contextApp.unitpx * 0.01} item>

    <layout h={contextApp.unitpx * 0.07} container horizontalCenter item>
      <layout w={contextApp.unitpx * 0.24} container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.01} item>
        <ReactCanvas2dExtensions.TextCaculateLine text={String(contextPlayground.gameHitSuccess.length)} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.TextCaculateLine>

        <ReactCanvas2dExtensions.TextCaculateLine text={`COMBO`} font={`bolder ${contextApp.unitpx * 0.02}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${contextApp.unitpx * 0.02}px sans-serif`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.TextCaculateLine>
      </layout>

      <layout w={contextApp.unitpx * 0.24} container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.01} item>
        <ReactCanvas2dExtensions.TextCaculateLine text={String(animationCountGameScoreSuccess)} font={`bolder ${contextApp.unitpx * 0.06}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${contextApp.unitpx * 0.06}px sans-serif`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.TextCaculateLine>
      </layout>

      <layout w={contextApp.unitpx * 0.24} container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.01} item>
        <ReactCanvas2dExtensions.TextCaculateLine text={String(contextPlayground.gameHitFail.length)} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.TextCaculateLine>

        <ReactCanvas2dExtensions.TextCaculateLine text={`MISS`} font={`bolder ${contextApp.unitpx * 0.02}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${contextApp.unitpx * 0.02}px sans-serif`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.TextCaculateLine>
      </layout>
    </layout>

    <layout h={contextApp.unitpx * 0.004} item>
      <rect fill cx={'50%'} w={contextApp.unitpx * 0.72} fillStyle={'rgb(255, 255, 255)'} />
    </layout>

    <ReactCanvas2dExtensions.TextCaculateLine text={'POINT'} font={`bolder ${contextApp.unitpx * 0.02}px sans-serif`} lineHeight={1} gap={0} w={contextApp.unitpx * 0.24} split=' '>
      {
        (line, location) => {
          return <layout cx={'50%'} w={location.w} h={location.h} item>
            <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${contextApp.unitpx * 0.02}px sans-serif`} lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2dExtensions.TextCaculateLine>

  </layout>
}

export default App