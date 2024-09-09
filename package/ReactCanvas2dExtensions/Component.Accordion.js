import React from '../React'
import * as ReactExtensions from '../ReactExtensions'

function App(props) {
  const titleH = props.titleH || 0
  const contentH = props.contentH || 0

  const x = props.x || undefined
  const y = props.y || undefined
  const w = props.w || undefined
  const h = props.h || undefined

  const [expand, setExpand] = React.useState(props.defaultExpand || false)

  const expandUse = props.expand === undefined ? expand : props.expand

  const { animationCount: animationCountContentH } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: expandUse ? contentH : 0, destination: expandUse ? contentH : 0, rate: contentH / 5, postprocess: n => Number(n.toFixed(2)) })

  ReactExtensions.useEffectUpdate(() => {
    if (props.onChangeExpand) props.onChangeExpand(expandUse)
  }, [expandUse])

  ReactExtensions.useEffectUpdate(() => {
    if (props.onChangeHeight) props.onChangeHeight(animationCountContentH)
  }, [animationCountContentH])

  if (props.ref) props.ref({ expand, setExpand })

  return <layout x={x} y={y} w={w} h={titleH + animationCountContentH} container verticalForward>

    <rectradiusarc {...props.onAccordion}></rectradiusarc>

    <layout h={titleH} item>
      <rectradiusarc {...props.onTitle}></rectradiusarc>
      <rectradiusarc beginPath clip onClick={() => setExpand(!expand)}>{props.titleComponent}</rectradiusarc>
    </layout>

    <layout h={animationCountContentH} item>
      <rectradiusarc {...props.onContent}></rectradiusarc>
      <rectradiusarc beginPath clip>{props.contentComponent}</rectradiusarc>
    </layout>

  </layout>
}

export default App