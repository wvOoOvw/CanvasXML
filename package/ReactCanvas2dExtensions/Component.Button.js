import React from '../React'
import * as ReactExtensions from '../ReactExtensions'
import Text from './Component.Text'

function App(props) {
  const text = props.text || ''
  const textColor = props.textColor || new Array([215, 255], [215, 255], [215, 255], [1, 1])
  const rectColor = props.rectColor || new Array([45, 85], [45, 85], [45, 85], [1, 1])
  const radius = props.radius || 0
  const fontSize = props.fontSize || 24
  const fontFamily = props.fontFamily || 'monospace'
  const mode = props.mode || 'fill'
  const lineWidth = props.lineWidth || 1

  const padding = props.padding || 24

  const x = props.x || undefined
  const y = props.y || undefined
  const w = props.w || undefined
  const h = props.h || undefined

  const [hover, setHover] = React.useState(false)

  const animationCountTextRGBA = textColor.map((i, index) => ReactExtensions.useAnimationDestination({ play: true, defaultCount: i[0], destination: i[hover ? 1 : 0], rate: Math.abs(i[1] - i[0]) / 15, postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0)) }))
  const animationCountRectRGBA = rectColor.map((i, index) => ReactExtensions.useAnimationDestination({ play: true, defaultCount: i[0], destination: i[hover ? 1 : 0], rate: Math.abs(i[1] - i[0]) / 15, postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0)) }))

  const textRGBA = `rgba(${animationCountTextRGBA[0].animationCount}, ${animationCountTextRGBA[1].animationCount}, ${animationCountTextRGBA[2].animationCount}, ${animationCountTextRGBA[3].animationCount})`
  const rectRGBA = `rgba(${animationCountRectRGBA[0].animationCount}, ${animationCountRectRGBA[1].animationCount}, ${animationCountRectRGBA[2].animationCount}, ${animationCountRectRGBA[3].animationCount})`

  const font = `${fontSize}px ${fontFamily}`
  const gap = fontSize / 2
  const lineHeight = 1

  return <layout x={x} y={y} w={w} h={h}>

    <rectradius beginPath radius={radius} {...props.onButton}></rectradius>

    <rectradius beginPath fill={mode === 'fill'} stroke={mode === 'stroke'} clip fillStyle={mode === 'fill' ? rectRGBA : undefined} strokeStyle={mode === 'stroke' ? rectRGBA : undefined} lineWidth={lineWidth} radius={radius} onPointerDown={() => setHover(true)} onPointerMove={() => setHover(true)} onPointerMoveAway={() => setHover(false)} onPointerUp={() => setHover(false)}>
      <layout container horizontalAlignCenter verticalAlignCenter>
        <layout w={`calc(100% - ${padding})`} h={`calc(100% - ${padding})`} item container horizontalAlignCenter verticalAlignCenter>
          <Text text={text} font={font} lineHeight={lineHeight} gap={gap} w={w - padding} split=' '>
            {
              (line, location) => {
                return <layout w={location.w} h={location.h} item>
                  {
                    line.map((n) => {
                      return <text fillText fillStyle={textRGBA} w={n.w} y={n.y} text={n.text} font={n.font} />
                    })
                  }
                </layout>
              }
            }
          </Text>
        </layout>
      </layout>
    </rectradius>

  </layout>
}

export default App