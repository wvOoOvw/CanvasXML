import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function Role(props) {
  const context = React.useContext(Context)

  const { animationCount: animationCountGlobalAlpha } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 1, destination: props.activeIndex !== undefined && props.index !== props.activeIndex ? 0.25 : 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountOffsetY, setAnimationCount: setAnimationCountOffsetY } = React.Plugin.useAnimationDestination({ play: props.index !== props.activeIndex, defaultCount: 0, destination: 0, rate: context.locationLayout.h / 45, postprocess: n => Number(n.toFixed(3)) })

  const onChange = (params) => {
    const { type, status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      props.setActiveIndex(props.index)
      context.setGameTimeRate(i => i * 0.1)
    }

    if (status === 'afterMove') {
      setAnimationCountOffsetY(animationCountOffsetY + changedY)
    }

    if (status === 'afterEnd') {
      props.setActiveIndex()
      context.setGameTimeRate(i => i * 10)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2d.Plugin.useEventDragControl({ enable: true, onChange: onChange })

  return <>
    <rect gx={0} gy={0} w={context.locationLayout.w} h={context.locationLayout.h} onPointerMove={onMove} onPointerUp={onEnd} />

    <rect beginPath clip y={`calc(0% - ${props.index * 24 * 3 - animationCountOffsetY}px)`} radius={12} globalAlpha={animationCountGlobalAlpha * 1} onPointerDown={onStart}>
      <image image={props.image} size='auto-max' position='center'></image>
    </rect>
  </>


}

function App() {
  const context = React.useContext(Context)

  const role = [
    context.imagePngA,
    context.imagePngB,
    context.imagePngC,
    context.imagePngD,
  ]

  const [activeIndex, setActiveIndex] = React.useState()

  const { animationCount: animationCountGamePlay } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gamePlay ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  const gap = 24
  const w = Math.min(context.locationLayout.h, context.locationLayout.w - gap * 2)
  const iw = (w - 4 + 1 * gap) / 4
  const h = iw * 2.75

  return <layout container verticalReverse horizontalAlignCenter globalAlpha={animationCountGamePlay * 1}>
    <layout w={`${w}px`} h={`${h}px`} container horizontalBetween verticalAlignCenter gap={gap} item>
      {
        role.map((i, index) => {
          return <layout w='0px' item grow={1}>
            <layout h={`calc(100% - ${gap}px)`}>
              <Role image={i} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            </layout>
          </layout>
        })
      }
    </layout>
  </layout>
}

export default App