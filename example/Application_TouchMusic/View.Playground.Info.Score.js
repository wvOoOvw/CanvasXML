import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [gameScoreSuccess, setGameScoreSuccess] = React.useState(0)
  const [gameScoreFail, setGameScoreFail] = React.useState(0)

  const { animationCount: animationCountGameScoreSuccess } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: gameScoreSuccess, rate: 8, postprocess: n => Number(n.toFixed()) })
  const { animationCount: animationCountGameScoreSuccessLength } = React.useAnimationDestination({ play: animationCountGameScoreSuccess > 0, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  React.useEffect(() => {
    setGameScoreSuccess(contextPlayground.gameHitSuccess.reduce((t, i) => t + i.successInformation.score * 100, 0))
  }, [contextPlayground.gameHitSuccess])

  React.useEffect(() => {
    setGameScoreFail(contextPlayground.gameHitFail.length)
  }, [contextPlayground.gameHitFail])

  return <layout h={`${contextApp.unitpx * 0.12}px`} item>
    <layout container verticalCenter horizontalAlignCenter>
      <ReactCanvas2d.TextCaculateLine text={String(contextPlayground.gameHitSuccess.length)} font={`${contextApp.unitpx * 0.08}px monospace`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${contextApp.unitpx * 0.08}px monospace`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>

      <layout h={contextApp.unitpx * 0.01} item></layout>

      <ReactCanvas2d.TextCaculateLine text={`COMBO`} font={`${contextApp.unitpx * 0.025}px monospace`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${contextApp.unitpx * 0.025}px monospace`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>

    <layout w={`calc(100% - ${contextApp.unitpx * 0.08}px)`} container verticalCenter horizontalAlignReverse>
      <ReactCanvas2d.TextCaculateLine text={String(animationCountGameScoreSuccess).padStart(7, '0')} font={`${contextApp.unitpx * 0.065}px monospace`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${contextApp.unitpx * 0.065}px monospace`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>

  </layout>
}

export default App