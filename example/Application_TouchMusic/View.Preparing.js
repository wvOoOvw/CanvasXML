import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const [hover, setHover] = React.useState(false)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountHover } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: hover ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(3)) })

  const onClick = ReactCanvas2d.useEventClick({ onClick: () => context.setGamePlay(true) })

  return <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection * 1}>
    <ReactCanvas2d.Component.TextCaculateLine text={`PHIGROS`} font='72px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='72px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>

    <layout h='32px' item></layout>

    <ReactCanvas2d.Component.TextCaculateLine text={'START'} font='24px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle={`rgb(${130 + animationCountHover * 125}, ${130 + animationCountHover * 125}, ${130 + animationCountHover * 125})`} align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
            <rect onPointerDown={() => { setHover(true); onClick.onDown(); }} onPointerMove={() => setHover(true)} onPointerMoveAway={() => setHover(false)} onPointerUp={() => { setHover(false); onClick.onUp(); }} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>
  </layout>
}

export default App