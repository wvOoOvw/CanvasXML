import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [gameScoreSuccess, setGameScoreSuccess] = React.useState(0)

  const { animationCount: animationCountGameScoreSuccess } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: gameScoreSuccess, rate: 8, postprocess: n => Number(n.toFixed()) })

  React.useEffect(() => {
    setGameScoreSuccess(contextPlayground.gameHitSuccess.reduce((t, i) => t + i.successInformation.score * 100, 0))
  }, [contextPlayground.gameHitSuccess])

  const fontSize_0 = contextApp.unitpx * 0.05
  const fontSize_1 = contextApp.unitpx * 0.025
  const fontGap_1 = contextApp.unitpx * 0.01
  const fontWidth_1 = contextApp.unitpx * 0.24

  return <layout x={contextApp.unitpx * 0.08} y={contextApp.unitpx * 0.04} w={contextApp.locationLayout.w - contextApp.unitpx * 0.16} h={fontSize_0 + fontSize_1 + fontGap_1} container horizontalCenter item>
    <layout w={fontWidth_1} container verticalCenter horizontalAlignCenter gap={fontGap_1} item>
      <ReactCanvas2d.TextCaculateLine text={String(contextPlayground.gameHitSuccess.length)} font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} w={fontWidth_1} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${fontSize_0}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>

      <ReactCanvas2d.TextCaculateLine text={`COMBO`} font={`${fontSize_1}px sans-serif`} lineHeight={1} gap={0} w={fontWidth_1} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${fontSize_1}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>

    <layout w={fontWidth_1} container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.01} item>
      <ReactCanvas2d.TextCaculateLine text={String(animationCountGameScoreSuccess)} font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} w={fontWidth_1} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${fontSize_0}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>

      <ReactCanvas2d.TextCaculateLine text={`POINT`} font={`${fontSize_1}px sans-serif`} lineHeight={1} gap={0} w={fontWidth_1} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${fontSize_1}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>

    <layout w={fontWidth_1} container verticalCenter horizontalAlignCenter gap={fontGap_1} item>
      <ReactCanvas2d.TextCaculateLine text={String(contextPlayground.gameHitFail.length)} font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} w={fontWidth_1} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${fontSize_0}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>

      <ReactCanvas2d.TextCaculateLine text={`MISS`} font={`${fontSize_1}px sans-serif`} lineHeight={1} gap={0} w={fontWidth_1} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`bolder ${fontSize_1}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>
  </layout>
}

export default App