import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const [gameScoreSuccess, setGameScoreSuccess] = React.useState(0)
  const [gameScoreFail, setGameScoreFail] = React.useState(0)

  const { animationCount: animationCountGameScoreSuccess } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: gameScoreSuccess, rate: 8, postprocess: n => Number(n.toFixed()) })
  const { animationCount: animationCountGlobalAlpha } = React.useAnimationDestination({ play: animationCountGameScoreSuccess > 0, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  React.useEffect(() => {
    setGameScoreSuccess(context.gameHitSuccess.reduce((t, i) => t + i.successInformation.score * 100, 0))
  }, [context.gameHitSuccess])

  React.useEffect(() => {
    setGameScoreFail(context.gameHitFail.length)
  }, [context.gameHitFail])

  return <layout h={`${context.unitpx * 0.04 + context.unitpx * 0.08 + context.unitpx * 0.04}px`} item>
    <layout container verticalForward horizontalAlignCenter item globalAlpha={animationCountGlobalAlpha * 1}>
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

      <ReactCanvas2d.Component.TextCaculateLine text={String(animationCountGameScoreSuccess)} font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.Component.TextCaculateLine>
    </layout>

    {/* <layout container horizontalCenter verticalAlignCenter gap={24} item>
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

        <ReactCanvas2d.Component.TextCaculateLine text={String(animationCountGameScoreSuccess)} font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
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
    </layout> */}
  </layout>
}

export default App