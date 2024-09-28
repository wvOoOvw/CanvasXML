import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function CardReadyControl() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [movedX, setMovedX] = React.useState()
  const [movedY, setMovedY] = React.useState()

  const use = movedY !== undefined && movedY < contextApp.locationLayout.h - contextApp.unitpx * 0.42

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardReadyControl ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountUse } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: use ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerMove = e => {
    if (contextPlayground.gameSelfCardReadyDrag || contextPlayground.gameSelfCardReadyControl) {
      setMovedX(e.x)
      setMovedY(e.y)
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameSelfCardReadyDrag(undefined)
    contextPlayground.setGameSelfCardReadyControl(undefined)
    contextPlayground.setGameCardDescription(undefined)
    setMovedX()
    setMovedY()

    if (contextPlayground.gameSelfCardReadyControl && use) {
      contextPlayground.setGameSelfCardReady(i => i.filter(n => n !== contextPlayground.gameSelfCardReadyControl))
      contextPlayground.setGameSelfCardRecord(i => i.concat(contextPlayground.gameSelfCardReadyControl))
      contextPlayground.setGameCardExecute(i => i.concat({ card: contextPlayground.gameSelfCardReadyControl, side: 0 }))
    }
  }

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardReadyControl}>
      {
        contextPlayground.gameSelfCardReadyControl.cardIndex.startsWith('Role') ?
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[contextPlayground.gameSelfCardReadyControl, animationCountUse, movedX, movedY]}>
            <layout x={movedX - contextApp.unitpx * 0.28 / 2} y={movedY - contextApp.unitpx * 0.42 / 2} w={contextApp.unitpx * 0.28} h={contextApp.unitpx * 0.42}>
              <rectradiusarc fill radius={contextApp.unitpx * 0.024} shadowBlur={contextApp.unitpx * 0.04 + contextApp.unitpx * 0.04 * animationCountUse} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
              <rectradiusarc clip radius={contextApp.unitpx * 0.024}>
                <image w={contextApp.unitpx * 0.28 * (1 + animationCountUse * 0.25)} h={contextApp.unitpx * 0.42 * (1 + animationCountUse * 0.25)} src={contextApp[contextPlayground.gameSelfCardReadyControl.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusarc>
            </layout>
          </ReactCanvas2dExtensions.CanvasOffscreen>
          : null
      }
      <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
    </layout>

  return Component
}

function CardReady(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const rotateAngle = Math.PI * ((12 - contextPlayground.gameSelfCardReady.length + 1) * 0.0012 + 0.008) * (index - (contextPlayground.gameSelfCardReady.length - 1) / 2)

  const useable = card.caculateCostActionPoint(card) < contextPlayground.gameSelfActionPoint && card.caculateCostGoldPoint(card) < contextPlayground.gameSelfGoldPoint && card.caculateCostHitPoint(card) < contextPlayground.gameSelfHitPoint

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

    if (status === 'afterMove' && useable && continuedY <= 0 - contextApp.unitpx * 0.08) {
      contextPlayground.setGameSelfCardReadyControl(card)
      contextPlayground.setGameCardDescription(undefined)
    }

    if (status === 'afterEnd') {
      contextPlayground.setGameSelfCardReadyDrag(undefined)
      contextPlayground.setGameCardDescription(undefined)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    e.stopPropagation()

    if (contextPlayground.gameSelfCardReadyDrag === undefined && contextPlayground.gameSelfCardReadyControl === undefined) {
      onStart(e)
    }
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

  const onLocationMounted = dom => {
    dom.props.x = contextApp.locationLayout.w / 2 - dom.props.w / 2
    dom.props.y = contextApp.locationLayout.h - dom.props.h * 0.84 - animationCountDragIng * dom.props.h * 0.16 - (1 - animationCountAppear) * dom.props.h * 0.16

    dom.recoordinate()

    const translateX = contextApp.locationLayout.x + dom.props.x + dom.props.w / 2
    const translateY = contextApp.locationLayout.y + dom.props.y + dom.props.h * 12

    dom.props.transform = [
      { translate: { x: translateX, y: translateY } },
      { rotate: { angle: animationCountRotateAngle } },
      { translate: { x: 0 - translateX, y: 0 - translateY } },
    ]
  }

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardReady}>
      {
        card.cardIndex.startsWith('Role') ?
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[animationCountRotateAngle, animationCountAppear, animationCountDragIng, card]}>
            <layout w={contextApp.unitpx * 0.28} h={contextApp.unitpx * 0.42} onLocationMounted={onLocationMounted}>
              {
                useable === true ?
                  <rectradiusarc fill radius={contextApp.unitpx * 0.024} shadowBlur={contextApp.unitpx * 0.04} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
                  : null
              }
              {
                useable !== true ?
                  <rectradiusarc fill radius={contextApp.unitpx * 0.024} shadowBlur={contextApp.unitpx * 0.04} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 0, 0)' />
                  : null
              }
              <rectradiusarc clip radius={contextApp.unitpx * 0.024}>
                <image src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusarc>
            </layout>
          </ReactCanvas2dExtensions.CanvasOffscreen>
          : null
      }
      <layout w={contextApp.unitpx * 0.28} h={contextApp.unitpx * 0.42} onLocationMounted={onLocationMounted}>
        <rectradiusarc radius={contextApp.unitpx * 0.024} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onEnd} onPointerUpAway={onEnd} />
      </layout>
    </layout>

  if (contextPlayground.gameSelfCardReadyControl !== card) return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      {
        contextPlayground.gameSelfCardReady.map((i, index) => <CardReady key={i.key} card={i} index={index} />)
      }
      {
        contextPlayground.gameSelfCardReadyControl ? <CardReadyControl /> : null
      }
    </>

  return Component
}

export default App