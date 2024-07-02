import React from './CanvasXML.React'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

function App(props) {
  const text = props.text || ''
  const textColor = props.textColor || new Array([215, 255], [215, 255], [215, 255], [1,1])
  const rectColor = props.rectColor || new Array([45, 85], [45, 85], [45, 85], [1,1])
  const radius = props.radius || 8
  const fontSize = props.fontSize || 24
  const fontFamily = props.fontFamily || 'monospace'

  const padding = props.padding ? (Array.isArray(props.padding) ? props.padding : [props.padding, props.padding, props.padding, props.padding]) : [0, 0, 0, 0]

  const x = props.x || undefined
  const y = props.y || undefined
  const w = props.w || undefined
  const h = props.h || undefined

  const events = ['onClick', 'onClickAway', 'onTouchStart', 'onTouchStartAway', 'onTouchMove', 'onTouchMoveAway', 'onTouchEnd', 'onTouchEndAway', 'onMouseDown', 'onMouseDownAway', 'onMouseMove', 'onMouseMoveAway', 'onMouseUp', 'onMouseUpAway', 'onPointerDown', 'onPointerDownAway', 'onPointerMove', 'onPointerMoveAway', 'onPointerUp', 'onPointerUpAway']

  const eventsProperty = events.map(i => Object({ [i]: props[i] }))

  const [hover, setHover] = React.useState(false)

  const transitionCountFillStyleRect = rectColor.map(i => ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: i[0], destination: i[hover ? 1 : 0], rate: (i[1] - i[0]) / 15, postprocess: n => n.toFixed(0) }))
  const transitionCountFillStyleText = textColor.map(i => ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: i[0], destination: i[hover ? 1 : 0], rate: (i[1] - i[0]) / 15, postprocess: n => n.toFixed(0) }))

  const fillStyleRect = `rgba(${transitionCountFillStyleRect[0].transitionCount}, ${transitionCountFillStyleRect[1].transitionCount}, ${transitionCountFillStyleRect[2].transitionCount}, ${transitionCountFillStyleRect[3].transitionCount})`
  const fillStyleText = `rgba(${transitionCountFillStyleText[0].transitionCount}, ${transitionCountFillStyleText[1].transitionCount}, ${transitionCountFillStyleText[2].transitionCount}, ${transitionCountFillStyleText[3].transitionCount})`

  const font = `${fontSize}px ${fontFamily}`
  const gap = fontSize / 2
  const lineHeight = 1

  const eventsHover = { onPointerDown: () => setHover(true), onPointerMove: () => setHover(true), onPointerMoveAway: () => setHover(false), onPointerUp: () => setHover(false) }

  const eventCompose = ReactCanvas2d.Plugin.useEventCompose({ event: [eventsProperty, eventsHover] })

  return <layout x={x} y={y} w={w} h={h}>
    <rect beginPath radius={radius} fill {...eventCompose}>
      <fill fillStyle={fillStyleRect} />
    </rect>
    <rect beginPath radius={radius}>
      <clip>
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
      </clip>
    </rect>
  </layout>
}

export default App