import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFront from './App.Playground.Component.CardFront'

function CardControl() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  const [x, setX] = React.useState()
  const [y, setY] = React.useState()

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardControl ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const onPointerMove = e => {
    if (contextPlayground.gameSelfCardDrag || contextPlayground.gameSelfCardControl) {
      setX(e.x)
      setY(e.y)
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameSelfCardDrag(undefined)
    contextPlayground.setGameSelfCardControl(undefined)
    contextPlayground.setGameSelfCardDescription(undefined)
    setX()
    setY()
  }

  return <layout zIndex={contextPlayground.zIndex.CardReadySelf}>
    {
      contextPlayground.gameSelfCardControl ?
        <CardFront
          x={x - w / 2}
          y={y - h / 2}
          w={w}
          h={h}
          card={contextPlayground.gameSelfCardControl}
          animationCountAppear={animationCountAppear}
          animationCountDragIng={0}
          animationCountControlIng={0}
        />
        : null
    }
    <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
  </layout>
}

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameSelfCardReady.length

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.24 * 1.5
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h + h * 0.12

  const rotateAngle = Math.PI * ((lengthMax - lengthGameCard + 1) * 0.0012 + 0.008) * (index - (lengthGameCard - 1) / 2)
  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h * 12

  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDragIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardDrag === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountControlIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardControl === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountRotateAngle } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: rotateAngle, destination: rotateAngle, rateTime: 10, postprocess: n => Number(n.toFixed(4)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      contextPlayground.setGameSelfCardDrag(card)
    }

    if (status === 'afterMove') {
      if (moveY > 0 - h * 0.35) {
        setMoveY(i => i + changedY)
        setMoveY(i => Math.min(i, 0))
        setMoveY(i => Math.max(i, 0 - h * 0.35))
      }

      if (moveY <= 0 - h * 0.35) {
        contextPlayground.setGameSelfCardControl(card)
      }
    }

    if (status === 'afterEnd') {
      contextPlayground.setGameSelfCardDrag(undefined)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    e.stopPropagation()

    onStart(e)
  }

  const onPointerMove = e => {
    e.stopPropagation()

    if (contextPlayground.gameSelfCardDrag !== undefined && contextPlayground.gameSelfCardDrag !== card && contextPlayground.gameSelfCardControl === undefined) {
      onStart(e)
    }
    if (contextPlayground.gameSelfCardDrag === card && contextPlayground.gameSelfCardControl === undefined) {
      onMove(e)
    }
  }

  const onPointerMoveAway = e => {
    if (contextPlayground.gameSelfCardDrag === card && contextPlayground.gameSelfCardControl === undefined) {
      onMove(e)
    }
  }

  React.useEffect(() => {
    if (contextPlayground.gameSelfCardDrag !== card) {
      setMoveX(0)
      setMoveY(0)
    }
  }, [contextPlayground.gameSelfCardDrag])

  return <layout zIndex={contextPlayground.zIndex.CardReadySelf}>
    <CardFront
      x={x + moveX - animationCountDragIng * w * 0.24 / 2}
      y={y + moveY - animationCountDragIng * h * 0.24 / 2 + (animationCountAppear - 1) * h * 0.24}
      w={w + animationCountDragIng * w * 0.24}
      h={h + animationCountDragIng * h * 0.24}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={animationCountRotateAngle}
      animationCountDragIng={animationCountDragIng}
      animationCountControlIng={animationCountControlIng}
      card={card}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerMoveAway={onPointerMoveAway}
      onPointerUp={onEnd}
      onPointerUpAway={onEnd}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    {
      contextPlayground.gameSelfCardReady.map((i, index) => <Card key={i.key} card={i} index={index} />)
    }
    <CardControl />
  </>
}

export default App