import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Template(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const animationCountDragIng = props.animationCountDragIng
  const animationCountControlIng = props.animationCountControlIng

  const onPointerDown = props.onPointerDown
  const onPointerMove = props.onPointerMove
  const onPointerUp = props.onPointerUp

  const min = Math.min(w, h)

  return <layout x={x} y={y} w={w} h={h}>
    <rectradius fill fillStyle='rgb(255, 255, 255)' radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' onPointerDown={onPointerDown} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
    </rectradius>
  </layout>
}

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.24 * 1.5
  var x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2
  var y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2

  if (index === 0) x = x - w * 3
  if (index === 1) x = x - w * 1.5
  if (index === 2) x = x + w * 1.5
  if (index === 3) x = x + w * 3

  if (index === 0) y = y + h * 1
  if (index === 1) y = y + h * 1.25
  if (index === 2) y = y + h * 1.25
  if (index === 3) y = y + h * 1

  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const { animationCount: animationCountDragIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardDrag === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountControlIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardControl === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountActiveIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardDrag === card || contextPlayground.gameSelfCardControl === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveX } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveX, destination: moveX, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveY } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveY, destination: moveY, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart' && contextPlayground.gameSelfCardDrag === undefined && contextPlayground.gameSelfCardControl === undefined) {
      contextPlayground.setGameSelfCardDrag(card)
      contextPlayground.setGameSelfCardDescription(card)
    }

    if (status === 'afterMove') {
      setMoveX(i => i + changedX)
      setMoveY(i => i + changedY)
    }

    if (status === 'afterEnd') {
      setMoveX(0)
      setMoveY(0)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    e.stopPropagation()

    onStart(e)
  }

  return <layout zIndex={contextPlayground.zIndex.SelfRole}>
    <Template
      x={x + moveX}
      y={y + moveY}
      w={w}
      h={h}
      animationCountDragIng={animationCountDragIng}
      animationCountControlIng={animationCountControlIng}
      animationCountActiveIng={animationCountActiveIng}
      card={card}
      onPointerDown={onPointerDown}
      onPointerMove={onMove}
      onPointerUp={onEnd}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return contextPlayground.gameSelfRole.map((i, index) => <Card key={i.key} card={i} index={index} />)
}

export default App