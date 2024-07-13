import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function Role(props) {
  const context = React.useContext(Context)

  const inDown = React.useRef(false)

  const onChange = (params) => {
    const { type, status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      inDown.current = true

      context.setGameTimeRate(i => i * 0.1)
    }

    if (status === 'afterEnd' && inDown.current === true) {
      inDown.current = false

      context.setGameTimeRate(i => i * 10)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2d.Plugin.useEventDragControl({ enable: true, onChange: onChange })

  return <rect beginPath clip y={`calc(0% - ${props.index * 24 * 3}px)`} radius={12} onPointerDown={onStart} onPointerMove={onMove} onPointerUp={onEnd}>
    <image image={props.image} size='auto-max' position='center'></image>
  </rect>
}

function App() {
  const context = React.useContext(Context)

  const role = [
    context.imagePngA,
    context.imagePngB,
    context.imagePngC,
    context.imagePngD,
  ]

  const { animationCount: animationCountGamePlay } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gamePlay ? 1 : 0, rate: 1 / 30, postprocess: n => n.toFixed(3) })

  const gap = 24

  const w = context.locationLayout.w - gap * 2
  const iw = (w - role.length + 1 * gap) / role.length

  const h = Math.min(iw * 2.75, context.locationLayout.h - gap * 8)

  return <layout container verticalReverse horizontalAlignCenter globalAlpha={animationCountGamePlay * 1}>
    <layout h={gap} item />

    <layout w={`${w}px`} h={`${h}px`} container horizontalBetween verticalAlignCenter gap={gap} item>
      {
        role.map((i, index) => {
          return <layout w='0px' item grow={1}>
            <Role image={i} index={index} />
          </layout>
        })
      }
    </layout>
  </layout>
}

export default App