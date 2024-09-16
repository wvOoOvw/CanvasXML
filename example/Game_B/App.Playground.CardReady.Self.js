import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontReady from './App.Playground.Component.CardFrontReady'
import CardFrontReadyControl from './App.Playground.Component.CardFrontReadyControl'

function CardReadyControl() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  const [x, setX] = React.useState()
  const [y, setY] = React.useState()

  const use = y !== undefined && y < contextApp.locationLayout.y + contextApp.locationLayout.h - h

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardReadyControl ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountUse } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: use ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerMove = e => {
    if (contextPlayground.gameSelfCardReadyDrag || contextPlayground.gameSelfCardReadyControl) {
      setX(e.x)
      setY(e.y)
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameSelfCardReadyDrag(undefined)
    contextPlayground.setGameSelfCardReadyControl(undefined)
    contextPlayground.setGameCardDescription(undefined)
    setX()
    setY()

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
            x={x - w / 2}
            y={y - h / 2}
            w={w}
            h={h}
            translateX={x + w / 2}
            translateY={y + h / 2}
            rotateAngle={0}
            animationCountAppear={animationCountAppear}
            animationCountUse={animationCountUse}
            globalAlphaLayout={1}
            globalAlphaSimpleDescription={0}
            globalAlphaBackground={animationCountAppear * 0.4}
            scaleImage={1 + animationCountUse * 0.25}
            card={contextPlayground.gameSelfCardReadyControl}
          />
        </>
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

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h + h * 0.12

  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h * 12
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

  return <layout zIndex={contextPlayground.zIndex.CardReadySelf}>
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

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <>
    {
      contextPlayground.gameSelfCardReady.map((i, index) => <Card key={i.key} card={i} index={index} />)
    }
    <CardReadyControl />
  </>
}

export default App