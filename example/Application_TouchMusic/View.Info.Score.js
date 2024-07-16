import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const [gameScoreSuccess, setGameScoreSuccess] = React.useState(0)
  const [gameScoreFail, setGameScoreFail] = React.useState(0)

  const { animationCount: animationCountGameScoreSuccess } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: gameScoreSuccess, rate: 8, postprocess: n => n.toFixed() })

  React.useEffect(() => {
    setGameScoreSuccess(context.gameHit.filter(i => i.inSuccess === true).reduce((t, i) => t + i.successInformation.score * 100, 0))
    setGameScoreFail(context.gameHit.filter(i => i.inFail === true).length)
  }, [context.gameHit])

  return <layout h={`${context.unitpx * 0.04 + context.unitpx * 0.08 + context.unitpx * 0.04}px`} item>
    <layout container horizontalCenter verticalAlignCenter gap={24} item>
      <layout container verticalForward horizontalAlignCenter item w={'min(50%, 600px)'}>
        <ReactCanvas2d.Component.TextCaculateLine text={`HIT`} font={`${context.unitpx * 0.04}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${context.unitpx * 0.04}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>

        <layout h={context.unitpx * 0.04} item></layout>

        <ReactCanvas2d.Component.TextCaculateLine text={animationCountGameScoreSuccess} font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>
      </layout>

      <layout container verticalForward horizontalAlignCenter item w={'min(50%, 600px)'}>
        <ReactCanvas2d.Component.TextCaculateLine text={`MISS`} font={`${context.unitpx * 0.04}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${context.unitpx * 0.04}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>

        <layout h={context.unitpx * 0.04} item></layout>

        <ReactCanvas2d.Component.TextCaculateLine text={`${gameScoreFail}`} font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>
      </layout>
    </layout>
  </layout>
}

export default App