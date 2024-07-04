import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

function App(props) {
  const titleH = props.titleH || 0
  const contentH = props.contentH || 0

  const backgroundColor = props.backgroundColor || new Array([45, 85], [45, 85], [45, 85], [1, 1])

  const radius = props.radius || 16

  const x = props.x || undefined
  const y = props.y || undefined
  const w = props.w || undefined
  const h = props.h || undefined

  const [expandState, setExpandState] = React.useState(props.defaultExpand || false)
  const [hover, setHover] = React.useState(false)

  const expand = props.expand === undefined ? expandState : props.expand

  const { transitionCount: transitionCountContentH } = ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: expand ? contentH : 0, destination: expand ? contentH : 0, rate: contentH / 15, postprocess: n => Number(n.toFixed(2)) })

  const transitionCountFillStyleBackground = backgroundColor.map((i, index) => ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: i[0], destination: i[hover ? 1 : 0], rate: Math.abs(i[1] - i[0]) / 15, postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0)) }))

  const fillStyleBackground = `rgba(${transitionCountFillStyleBackground[0].transitionCount}, ${transitionCountFillStyleBackground[1].transitionCount}, ${transitionCountFillStyleBackground[2].transitionCount}, ${transitionCountFillStyleBackground[3].transitionCount})`

  React.useEffect(() => {
    if (props.onChange) props.onChange(expand)
  }, [expand])

  const event = Canvas2d.Tag.event.reduce((t, i) => props[i] ? Object({ ...t, [i]: props[i] }) : t, Object())

  const event_1 = {
    onClick: () => setExpand(!expand),
    onPointerDown: () => setHover(true),
    onPointerMove: () => setHover(true),
    onPointerMoveAway: () => setHover(false),
    onPointerUp: () => setHover(false),
  }

  const eventCompose = ReactCanvas2d.Plugin.useEventCompose({ event: [event_0, event_1] })

  return <layout x={x} y={y} w={w} h={titleH + transitionCountContentH} container verticalForward>
    <rect radius={radius} event_0></rect>

    <layout h={titleH} item>
      <rect beginPath fill clip fillStyle={fillStyleBackground} radius={radius} {...eventCompose}>
        {
          props.children
        }
      </rect>
    </layout>

    <layout h={transitionCountContentH} item>
      <rect beginPath fill clip fillStyle={fillStyleBackground} radius={radius} {...eventCompose}>
        {
          props.children
        }
      </rect>
    </layout>
  </layout>
}

export default App