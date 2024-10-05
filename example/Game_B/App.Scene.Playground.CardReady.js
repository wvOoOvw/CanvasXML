import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentInSelfCardReadyControl() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [movedX, setMovedX] = React.useState()
  const [movedY, setMovedY] = React.useState()

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardReadyControl ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountUseable } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardReadyControlUseable ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerMove = e => {
    if (contextPlayground.gameCardReadyDrag || contextPlayground.gameCardReadyControl) {
      setMovedX(e.x)
      setMovedY(e.y)
    }

    contextPlayground.setGameCardReadyControlUseable(movedY !== undefined && movedY < contextApp.locationLayout.h - contextApp.unitpx * 0.42)
  }

  const onPointerUp = e => {
    contextPlayground.setGameCardReadyDrag(undefined)
    contextPlayground.setGameCardReadyControl(undefined)
    contextPlayground.setGameCardDescription(undefined)
    setMovedX()
    setMovedY()

    if (contextPlayground.gameCardReadyControl && contextPlayground.gameCardReadyControlUseable) {
      contextPlayground.setGameSelfCardReady(i => i.filter(n => n !== contextPlayground.gameCardReadyControl))
      contextPlayground.setGameExecute(i => i.concat({ executeIndex: 'use', card: contextPlayground.gameCardReadyControl, side: 0 }))
    }
  }

  const Component =
    <>
      {
        contextPlayground.gameCardReadyControl.cardIndex.startsWith('Role') ?
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[contextPlayground.gameCardReadyControl, animationCountUseable, movedX, movedY]}>
            <layout x={movedX - contextApp.unitpx * 0.28 / 2} y={movedY - contextApp.unitpx * 0.42 / 2} w={contextApp.unitpx * 0.28} h={contextApp.unitpx * 0.42}>
              <rectradiusrect fill radius={contextApp.unitpx * 0.024} shadowBlur={contextApp.unitpx * 0.02 + contextApp.unitpx * 0.04 * animationCountUseable} lineWidth={contextApp.unitpx * 0.0064} fillStyle='rgb(0, 0, 0)' shadowColor='rgb(255, 255, 255)' />
              <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
              <rectradiusrect clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[contextPlayground.gameCardReadyControl.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
              <rectradiusrect cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[contextPlayground.gameCardReadyControl.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
            </layout>
          </ReactCanvas2dExtensions.CanvasOffscreen>
          : null
      }
      <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
    </>

  return Component
}

function ComponentInSelfCardReady(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const rotateAngle = Math.PI * ((12 - contextPlayground.gameSelfCardReady.length + 1) * 0.0012 + 0.008) * (index - (contextPlayground.gameSelfCardReady.length - 1) / 2)

  const useable = card.caculateCostActionPoint(card) <= contextPlayground.gameSelfProperty.actionPoint && card.caculateCostGoldPoint(card) <= contextPlayground.gameSelfProperty.goldPoint && card.caculateCostHitPoint(card) <= contextPlayground.gameSelfProperty.hitPoint

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDragIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardReadyDrag === card ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountControlIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardReadyControl === card ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountRotateAngle } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: rotateAngle, destination: rotateAngle, rateTime: 12, postprocess: n => Number(n.toFixed(4)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      contextPlayground.setGameCardReadyDrag(card)
      contextPlayground.setGameCardDescription(card)
    }

    if (status === 'afterMove' && useable === true && continuedY <= 0 - contextApp.unitpx * 0.08) {
      contextPlayground.setGameCardReadyControl(card)
      contextPlayground.setGameCardDescription(undefined)
    }

    if (status === 'afterMove' && useable !== true && continuedY <= 0 - contextApp.unitpx * 0.08) {
      contextApp.addMessage('无法支付使用代价')
    }

    if (status === 'afterEnd') {
      contextPlayground.setGameCardReadyDrag(undefined)
      contextPlayground.setGameCardDescription(undefined)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    e.stopPropagation()

    if (contextPlayground.gameCardReadyDrag === undefined && contextPlayground.gameCardReadyControl === undefined) {
      onStart(e)
    }
  }

  const onPointerMove = e => {
    e.stopPropagation()

    if (contextPlayground.gameCardReadyDrag !== undefined && contextPlayground.gameCardReadyDrag !== card && contextPlayground.gameCardReadyControl === undefined) {
      onStart(e)
    }
    if (contextPlayground.gameCardReadyDrag === card && contextPlayground.gameCardReadyControl === undefined) {
      onMove(e)
    }
  }

  const onPointerMoveAway = e => {
    if (contextPlayground.gameCardReadyDrag === card && contextPlayground.gameCardReadyControl === undefined) {
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
    <>
      {
        card.cardIndex.startsWith('Role') ?
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[animationCountRotateAngle, animationCountAppear, animationCountDragIng, card]}>
            <layout w={contextApp.unitpx * 0.28} h={contextApp.unitpx * 0.42} onLocationMounted={onLocationMounted}>
              {
                useable === true ?
                  <>
                    <rectradiusrect fill radius={contextApp.unitpx * 0.024} shadowBlur={contextApp.unitpx * 0.02} fillStyle='rgb(0, 0, 0)' shadowColor='rgb(255, 255, 255)' />
                  </>
                  : null
              }
              <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
              <rectradiusrect clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
              <rectradiusrect cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
            </layout>
          </ReactCanvas2dExtensions.CanvasOffscreen>
          : null
      }
      <layout w={contextApp.unitpx * 0.28} h={contextApp.unitpx * 0.42} onLocationMounted={onLocationMounted}>
        <rectradiusarc radius={contextApp.unitpx * 0.024} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onEnd} onPointerUpAway={onEnd} />
      </layout>
    </>

  if (contextPlayground.gameCardReadyControl !== card) return Component
}

function ModuleInSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <layout zIndex={contextPlayground.zIndex.CardReady}>
        {
          contextPlayground.gameSelfCardReady.map((i, index) => <ComponentInSelfCardReady key={i.key} card={i} index={index} />)
        }
      </layout>
      <layout zIndex={contextPlayground.zIndex.CardReadyControl}>
        {
          contextPlayground.gameCardReadyControl ? <ComponentInSelfCardReadyControl /> : null
        }
      </layout>
    </>

  return Component
}

function ComponentInOpponentCardReady(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const x = contextApp.unitpx * 0.24 * ((16 - contextPlayground.gameOpponentCardReady.length + 1) * 0.06 + 0.02) * (index - (contextPlayground.gameOpponentCardReady.length - 1) / 2)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountX } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: x, destination: x, rateTime: 12, postprocess: n => Number(n.toFixed(4)) })

  const onLocationMounted = dom => {
    dom.props.x = contextApp.locationLayout.w - dom.props.w * 3.2 + animationCountX
    dom.props.y = 0 - dom.props.h * 0.32 + (1 - animationCountAppear) * dom.props.h * 0.16

    dom.recoordinate()

    const translateX = contextApp.locationLayout.x + dom.props.x + dom.props.w / 2
    const translateY = contextApp.locationLayout.y + dom.props.y + dom.props.h / 2

    dom.props.transform = [
      { translate: { x: translateX, y: translateY } },
      { rotate: { angle: Math.PI } },
      { translate: { x: 0 - translateX, y: 0 - translateY } },
    ]
  }

  const Component =
    <>
      {
        card.cardIndex.startsWith('Role') ?
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[card, index, animationCountAppear, animationCountX]}>
            <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.36} onLocationMounted={onLocationMounted}>
              <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
              <rectradiusrect clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[contextPlayground.informationJson.gameOpponent.cardBackImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
              <rectradiusrect cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[contextPlayground.informationJson.gameOpponent.cardBackImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
            </layout>
          </ReactCanvas2dExtensions.CanvasOffscreen>
          : null
      }
    </>

  return Component
}

function ModuleInOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardReady}>
      {
        contextPlayground.gameOpponentCardReady.map((i, index) => <ComponentInOpponentCardReady key={i.key} card={i} index={index} />)
      }
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <ModuleInSelf />
      <ModuleInOpponent />
    </>

  return Component
}

export default App