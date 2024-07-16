import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const [gameScoreSuccess, setGameScoreSuccess] = React.useState(0)
  const [gameScoreFail, setGameScoreFail] = React.useState(0)

  const { animationCount: animationCountGameScoreSuccess } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: gameScoreSuccess, rate: 8, postprocess: n => n.toFixed() })

  React.useEffect(() => {
    setGameScoreSuccess(context.gameHit.filter(i => i.inSuccess === true).reduce((t, i) => t + i.score * 100, 0))
    setGameScoreFail(context.gameHit.filter(i => i.inFail === true).length)
  }, [context.gameHit])

  const fontSize_0 = Math.min(context.locationLayout.w, context.locationLayout.h) * 0.2
  const fontSize_1 = Math.min(context.locationLayout.w, context.locationLayout.h) * 0.1

  return <layout h={`${48 + fontSize_0 + fontSize_1}px`} item>
    <layout container horizontalCenter verticalAlignCenter gap={24} item>
      <layout container verticalForward horizontalAlignCenter item w={'min(50%, 600px)'}>
        <ReactCanvas2d.Component.TextCaculateLine text={`HIT`} font={`${fontSize_1}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${fontSize_1}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>

        <layout h='24px' item></layout>

        <ReactCanvas2d.Component.TextCaculateLine text={animationCountGameScoreSuccess} font={`${fontSize_0}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${fontSize_0}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>
      </layout>

      <layout container verticalForward horizontalAlignCenter item w={'min(50%, 600px)'}>
        <ReactCanvas2d.Component.TextCaculateLine text={`MISS`} font={`${fontSize_1}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${fontSize_1}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>

        <layout h='24px' item></layout>

        <ReactCanvas2d.Component.TextCaculateLine text={`${gameScoreFail}`} font={`${fontSize_0}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${fontSize_0}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>
      </layout>
    </layout>
  </layout>
}

export default App