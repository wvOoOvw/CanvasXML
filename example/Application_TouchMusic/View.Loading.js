import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const [hover, setHover] = React.useState(false)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountHover } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: hover ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(3)) })

  return <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection * 1}>
    <ReactCanvas2d.Component.TextCaculateLine text={`PHIGROS`} font={`${context.unitpx * 0.12}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font={`${context.unitpx * 0.12}px courier`} lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>

    <layout h={context.unitpx * 0.06} item></layout>

    <ReactCanvas2d.Component.TextCaculateLine text={'LOADING...'} font={`${context.unitpx * 0.04}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle={`rgb(${130 + animationCountHover * 125}, ${130 + animationCountHover * 125}, ${130 + animationCountHover * 125})`} align='center' font={`${context.unitpx * 0.04}px courier`} lineHeight={1} gap={0} line={line} />
            <rect onPointerDown={() => setHover(true)} onPointerMove={() => setHover(true)} onPointerMoveAway={() => setHover(false)} onPointerUp={() => setHover(false)} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>
  </layout>
}

export default App