import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

function App(props) {
  const text = props.text || ''
  const textColor = props.textColor || new Array([215, 255], [215, 255], [215, 255], [1, 1])
  const rectColor = props.rectColor || new Array([45, 85], [45, 85], [45, 85], [1, 1])
  const radius = props.radius || 8
  const fontSize = props.fontSize || 24
  const fontFamily = props.fontFamily || 'monospace'

  const x = props.x || undefined
  const y = props.y || undefined
  const w = props.w || undefined
  const h = props.h || undefined

  const [hover, setHover] = React.useState(false)

  const transitionCountFillStyleRect = rectColor.map((i, index) => ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: i[0], destination: i[hover ? 1 : 0], rate: Math.abs(i[1] - i[0]) / 15, postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0)) }))
  const transitionCountFillStyleText = textColor.map((i, index) => ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: i[0], destination: i[hover ? 1 : 0], rate: Math.abs(i[1] - i[0]) / 15, postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0)) }))

  const fillStyleRect = `rgba(${transitionCountFillStyleRect[0].transitionCount}, ${transitionCountFillStyleRect[1].transitionCount}, ${transitionCountFillStyleRect[2].transitionCount}, ${transitionCountFillStyleRect[3].transitionCount})`
  const fillStyleText = `rgba(${transitionCountFillStyleText[0].transitionCount}, ${transitionCountFillStyleText[1].transitionCount}, ${transitionCountFillStyleText[2].transitionCount}, ${transitionCountFillStyleText[3].transitionCount})`

  const font = `${fontSize}px ${fontFamily}`
  const gap = fontSize / 2
  const lineHeight = 1

  const event_0 = Canvas2d.Tag.event.reduce((t, i) => props[i] ? Object({ ...t, [i]: props[i] }) : t, Object())

  const event_1 = {
    onPointerDown: () => setHover(true),
    onPointerMove: () => setHover(true),
    onPointerMoveAway: () => setHover(false),
    onPointerUp: () => setHover(false),
  }

  const eventCompose = ReactCanvas2d.Plugin.useEventCompose({ event: [event_0, event_1] })

  return <layout x={x} y={y} w={w} h={h}>
    <rect beginPath fill clip radius={radius} fillStyle={fillStyleRect} {...eventCompose}>
      <layout container horizontalAlignCenter verticalAlignCenter>
        <ReactCanvas2d.Component.TextCaculateLine text={text} font={font} lineHeight={lineHeight} gap={gap} w={w} split=' '>
          {
            (line, location) => {
              return <layout h={location.h} item>
                <text fillText fillStyle={fillStyleText} align='center' text={text} font={font} lineHeight={lineHeight} gap={gap} w={w} split=' ' wrap line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.Component.TextCaculateLine>
      </layout>
    </rect>
  </layout>
}

export default App