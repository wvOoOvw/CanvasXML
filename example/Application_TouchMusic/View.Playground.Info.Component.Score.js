import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Combo(props) {
  const [combo, setCombo] = React.useState([])

  return
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [gameScoreSuccess, setGameScoreSuccess] = React.useState(0)

  const { animationCount: animationCountGameScoreSuccess } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: gameScoreSuccess, rate: 8, postprocess: n => Number(n.toFixed()) })
  const { animationCount: animationCountGameScoreSuccessGlobalAlpha } = React.useAnimationDestination({ play: gameScoreSuccess > 0, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    setGameScoreSuccess(contextPlayground.gameHitSuccess.reduce((t, i) => t + i.successInformation.score * 100, 0))
  }, [contextPlayground.gameHitSuccess])

  const fontSize_0 = contextApp.unitpx * 0.1
  const fontSize_1 = contextApp.unitpx * 0.04
  const fontSize_2 = contextApp.unitpx * 0.06

  const gap_0 = contextApp.unitpx * 0.01

  return <layout cx='50%' w={contextApp.locationLayout.w - contextApp.unitpx * 0.16} h={`${fontSize_0 + fontSize_1 + gap_0}px`} item>
    <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountGameScoreSuccessGlobalAlpha}>
      <ReactCanvas2d.TextCaculateLine text={String(contextPlayground.gameHitSuccess.length)} font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>

      <layout h={gap_0} item></layout>

      <ReactCanvas2d.TextCaculateLine text={`COMBO`} font={`${fontSize_1}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${fontSize_1}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>

    <layout container verticalForward horizontalAlignForward>
      <ReactCanvas2d.TextCaculateLine text={String(animationCountGameScoreSuccess).padStart(7, '0')} font={`${fontSize_2}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${fontSize_2}px sans-serif`} lineHeight={1} gap={0} line={line} onLocationUnmount={dom => console.log(dom.props.x)}/>
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>
  </layout>
}

export default App