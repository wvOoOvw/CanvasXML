import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardBack from './App.Scene.Playground.Component.CardBack'
import CardFrontReady from './App.Scene.Playground.Component.CardFrontReady'
import CardFrontReadyControl from './App.Scene.Playground.Component.CardFrontReadyControl'

function CardReadyControl() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  const [movedX, setMovedX] = React.useState()
  const [movedY, setMovedY] = React.useState()

  const x = movedX - w / 2
  const y = movedY - h / 2

  const use = movedY !== undefined && movedY < contextApp.locationLayout.h - h

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardReadyControl ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountUse } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: use ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerMove = e => {
    if (contextPlayground.gameSelfCardReadyDrag || contextPlayground.gameSelfCardReadyControl) {
      setMovedX(e.x)
      setMovedY(e.y)
    }

    if (contextPlayground.gameSelfCardReadyControl && use === true) {
      contextPlayground.setGameCardDescription(undefined)
    }

    if (contextPlayground.gameSelfCardReadyControl && use !== true) {
      contextPlayground.setGameCardDescription(contextPlayground.gameSelfCardReadyControl)
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameSelfCardReadyDrag(undefined)
    contextPlayground.setGameSelfCardReadyControl(undefined)
    contextPlayground.setGameCardDescription(undefined)
    setMovedX()
    setMovedY()

    if (use) {
      contextPlayground.setGameSelfCardReady(i => i.filter(n => n !== contextPlayground.gameSelfCardReadyControl))
      contextPlayground.setGameSelfCardQueue(i => i.concat(contextPlayground.gameSelfCardReadyControl))
    }
  }

  return <layout zIndex={contextPlayground.zIndex.CardReadyControl}>
    {
      contextPlayground.gameSelfCardReadyControl ?
        <>
          <CardFrontReadyControl
            x={x}
            y={y}
            w={w}
            h={h}
            animationCountAppear={animationCountAppear}
            animationCountUse={animationCountUse}
            card={contextPlayground.gameSelfCardReadyControl}
          />
        </>
        : null
    }
    <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
  </layout>
}

function CardSelf(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameSelfCardReady.length

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.w / 2 - w / 2
  const y = contextApp.locationLayout.h - h + h * 0.12

  const rotateTranslateX = contextApp.locationLayout.x + x + w / 2
  const rotateTranslateY = contextApp.locationLayout.y + y + h * 12
  const rotateAngle = Math.PI * ((lengthMax - lengthGameCard + 1) * 0.0012 + 0.008) * (index - (lengthGameCard - 1) / 2)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDragIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardReadyDrag === card ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountControlIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardReadyControl === card ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountRotateAngle } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: rotateAngle, destination: rotateAngle, rateTime: 12, postprocess: n => Number(n.toFixed(4)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      contextPlayground.setGameSelfCardReadyDrag(card)
      contextPlayground.setGameCardDescription(card)
    }

    if (status === 'afterMove') {
      if (continuedY <= 0 - h * 0.2) {
        contextPlayground.setGameSelfCardReadyControl(card)
      }
    }

    if (status === 'afterEnd') {
      contextPlayground.setGameSelfCardReadyDrag(undefined)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    e.stopPropagation()

    onStart(e)
  }

  const onPointerMove = e => {
    e.stopPropagation()

    if (contextPlayground.gameSelfCardReadyDrag !== undefined && contextPlayground.gameSelfCardReadyDrag !== card && contextPlayground.gameSelfCardReadyControl === undefined) {
      onStart(e)
    }
    if (contextPlayground.gameSelfCardReadyDrag === card && contextPlayground.gameSelfCardReadyControl === undefined) {
      onMove(e)
    }
  }

  const onPointerMoveAway = e => {
    if (contextPlayground.gameSelfCardReadyDrag === card && contextPlayground.gameSelfCardReadyControl === undefined) {
      onMove(e)
    }
  }

  return <layout zIndex={contextPlayground.zIndex.CardReady}>
    {
      contextPlayground.gameSelfCardReadyControl !== card ?
        <CardFrontReady
          x={x}
          y={y - animationCountDragIng * h * 0.24 / 2 - (1 - animationCountAppear) * h * 0.24}
          w={w}
          h={h}
          translateX={rotateTranslateX}
          translateY={rotateTranslateY}
          rotateAngle={animationCountRotateAngle}
          animationCountDragIng={animationCountDragIng}
          card={card}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerMoveAway={onPointerMoveAway}
          onPointerUp={onEnd}
          onPointerUpAway={onEnd}
        />
        : null
    }
  </layout>
}

function CardOpponent(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameOpponentCardReady.length

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.24
  const x = contextApp.locationLayout.w - w * 4 + ((lengthMax - lengthGameCard + 1) * w * 0.048 + w * 0.36) * (index - (lengthGameCard - 1) / 2)
  const y = 0 - h * 0.36

  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2
  const rotateAngle = Math.PI

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: card.animation ? 0 : 1, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountX } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: x, destination: x, rateTime: 10, postprocess: n => Number(n.toFixed(4)) })

  return <layout zIndex={contextPlayground.zIndex.CardReady}>
    <CardBack
      x={animationCountX}
      y={y + (animationCountAppear - 1) * h * 0.24}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={rotateAngle}
      imageIndex={contextPlayground.informationJson.gameOpponent.cardBackImageIndex}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    {
      contextPlayground.gameSelfCardReady.map((i, index) => <CardSelf key={i.key} card={i} index={index} />)
    }
    {
      contextPlayground.gameOpponentCardReady.map((i, index) => <CardOpponent key={i.key} card={i} index={index} />)
    }
    <CardReadyControl />
  </>
}

export default App