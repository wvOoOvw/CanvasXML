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

  return <layout h='96px' item>
    <layout container horizontalCenter verticalAlignCenter gap={24} item>
      <layout container verticalForward horizontalAlignCenter item w={'50%'}>
        <ReactCanvas2d.Component.TextCaculateLine text={`HIT`} font='24px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>

        <layout h='24px' item></layout>

        <ReactCanvas2d.Component.TextCaculateLine text={animationCountGameScoreSuccess} font='48px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font='48px monospace' lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>
      </layout>

      <layout container verticalForward horizontalAlignCenter item w={'50%'}>
        <ReactCanvas2d.Component.TextCaculateLine text={`MISS`} font='24px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>

        <layout h='24px' item></layout>

        <ReactCanvas2d.Component.TextCaculateLine text={`${gameScoreFail}`} font='48px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font='48px monospace' lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>
      </layout>
    </layout>
  </layout>
}

export default App