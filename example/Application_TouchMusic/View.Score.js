import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const { animationCount: animationCountGameScore } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gameScore, rate: 8, postprocess: n => n.toFixed() })
  const { animationCount: animationCountGamePlay } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gamePlay ? 1 : 0, rate: 1 / 30, postprocess: n => n.toFixed(3) })

  React.useEffect(() => {
    if (context.gameHitSuccess.length > 0) {
      const score = context.gameHitSuccess[context.gameHitSuccess.length - 1].score
      context.setGameScore(i => i + score * 100)
    }
  }, [context.gameHitSuccess, context.locationLayout])

  return <layout container verticalForward horizontalAlignCenter globalAlpha={animationCountGamePlay}>
    <layout h='64px' item></layout>

    <ReactCanvas2d.Component.TextCaculateLine text={`HIT`} font='24px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>

    <layout h='32px' item></layout>

    <ReactCanvas2d.Component.TextCaculateLine text={animationCountGameScore} font='48px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='48px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>
  </layout>
}

export default App