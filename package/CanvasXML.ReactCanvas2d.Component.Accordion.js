import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

function App(props) {
  const titleH = props.titleH || 0
  const contentH = props.contentH || 0

  const x = props.x || undefined
  const y = props.y || undefined
  const w = props.w || undefined
  const h = props.h || undefined

  const [expand, setExpand] = React.useState(props.defaultExpand || false)

  const expandUse = props.expand === undefined ? expand : props.expand

  const { animationCount: animationCountContentH } = React.useAnimationDestination({ play: true, defaultCount: expandUse ? contentH : 0, destination: expandUse ? contentH : 0, rate: contentH / 5, postprocess: n => Number(n.toFixed(2)) })

  React.useEffectUpdate(() => {
    if (props.onChangeExpand) props.onChangeExpand(expandUse)
  }, [expandUse])

  React.useEffectUpdate(() => {
    if (props.onChangeHeight) props.onChangeHeight(animationCountContentH)
  }, [animationCountContentH])

  if (props.ref) props.ref({ expand, setExpand })

  return <layout x={x} y={y} w={w} h={titleH + animationCountContentH} container verticalForward>

    <rectradius save {...props.onAccordion}></rectradius>

    <layout h={titleH} item>
      <rectradius save {...props.onTitle}></rectradius>
      <rectradius save beginPath clip onClick={() => setExpand(!expand)}>{props.titleComponent}</rectradius>
    </layout>

    <layout h={animationCountContentH} item>
      <rectradius save {...props.onContent}></rectradius>
      <rectradius save beginPath clip>{props.contentComponent}</rectradius>
    </layout>

  </layout>
}

export default App