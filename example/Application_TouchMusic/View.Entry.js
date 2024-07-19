import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestory } = React.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  React.useEffect(() => {
    if (animationCountDestory === 1) contextApp.setRouter('Playground')
  }, [animationCountDestory])

  return <>
    <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection - animationCountDestory}>
      <ReactCanvas2d.TextCaculateLine text={`PHIGROS`} font={`${contextApp.unitpx * 0.12}px courier`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${contextApp.unitpx * 0.12}px courier`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>

      <layout h={contextApp.unitpx * 0.06} item></layout>

      <ReactCanvas2d.TextCaculateLine text={'点击任意处开始'} font={`${contextApp.unitpx * 0.04}px courier`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle={`rgb(130, 130, 130)`} align='center' font={`${contextApp.unitpx * 0.04}px courier`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>

    <rect onPointerDown={() => setDestory(true)} />
  </>
}

export default App