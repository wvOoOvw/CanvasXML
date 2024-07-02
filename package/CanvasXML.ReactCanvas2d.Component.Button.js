import React from './CanvasXML.React'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

function App(props) {
  const textColor = props.textColor || new Array([235, 255], [235, 255], [235, 255])
  const rectColor = props.rectColor || new Array([45, 60], [45, 60], [45, 60])
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

  const transitionCountFillStyleRect = rectColor.map(i => ReactCanvas2d.Plugin.useTransitionCount({play: true,defaultCount: i[0],destination: i[hover ? 1 : 0],rate: (i[1] - i[0]) / 15,postprocess: n => n.toFixed(0)}))
  const transitionCountFillStyleText = textColor.map(i => ReactCanvas2d.Plugin.useTransitionCount({play: true,defaultCount: i[0],destination: i[hover ? 1 : 0],rate: (i[1] - i[0]) / 15,postprocess: n => n.toFixed(0)}))

  const fillStyleRect = `rgba(${transitionCountFillStyleRect[0].transitionCount}, ${transitionCountFillStyleRect[1].transitionCount}, ${transitionCountFillStyleRect[2].transitionCount}, 1)`
  const fillStyleText = `rgba(${transitionCountFillStyleText[0].transitionCount}, ${transitionCountFillStyleText[1].transitionCount}, ${transitionCountFillStyleText[2].transitionCount}, 1)`

  const font = `${fontSize}px ${fontFamily}`
  const gap = fontSize / 2
  const lineHeight = 1

  const eventsHover = {onPointerDown: () => setHover(true),onPointMove: () => setHover(true),onPointMoveAway: () => setHover(false),onPointerUp: () => setHover(false)}

  const eventCompose = ReactCanvas2d.Plugin.useEventCompose([eventsProperty, eventsHover])

  return <ReactCanvas2d.Component.TextCaculateLine text={props.text} font={font} lineHeight={lineHeight} gap={gap} w={props.w} split=' '>
    {
      (line, location) => {
        const realW = w === 'fit-text' ? location.w : w
        const realH = h === 'fit-text' ? location.h : h
        return <layout x={x} y={y} w={realW} h={realH} container horizontalAlignCenter verticalAlignCenter>
          <rect beginPath radius={radius} fill {...eventCompose}>
            <fill fillStyle={fillStyleRect} />
          </rect>
          <rect beginPath radius={radius}>
            <clip>
              <layout h={location.h}  item>
                  <text fillText fillStyle={fillStyleText} align='center' text={props.text} font={font} lineHeight={lineHeight} gap={gap} w={props.w} split=' ' wrap line={line} />
              </layout>
            </clip>
          </rect>
        </layout>
      }
    }
  </ReactCanvas2d.Component.TextCaculateLine>
}

export default App