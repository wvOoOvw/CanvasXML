import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentEmpty(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const side = props.side

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  if (side === 0) {
    var x = contextApp.locationLayout.w / 2 - w / 2 - contextApp.unitpx * 0.42
    var y = contextApp.locationLayout.h / 2 - h / 2
  }
  if (side === 1) {
    var x = contextApp.locationLayout.w / 2 - w / 2 + contextApp.unitpx * 0.42
    var y = contextApp.locationLayout.h / 2 - h / 2
  }

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[]}>
      <layout x={x} y={y} w={w} h={h}>
        <rectradiusarc stroke radius={contextApp.unitpx * 0.04} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.008} />
        <image cx='50%' cy='35%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} src={contextApp.imagePngSwordmanWhite} />
        <ReactCanvas2dExtensions.Text text='待部署区' font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='60%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
        <ReactCanvas2dExtensions.Text text='战斗' font={`bolder ${contextApp.unitpx * 0.024}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='70%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return Component
}

function ComponentCardContent(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const card = props.card

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card.attributeHitPoint, card.attributeHitPointMax]}>
      <layout x={x} y={h + w * 0.12} w={w} h={w * 0.12} globalAlpha={animationCountAppear}>
        <rectradiusarc fill radius={w * 0.024} fillStyle='rgb(125, 125, 125)' />
        <rectradiusarc w={`${card.attributeHitPoint / card.attributeHitPointMax * 100}%`} fill radius={w * 0.024} fillStyle='rgb(125, 15, 25)' />
        <rectradiusarc stroke radius={w * 0.024} strokeStyle='rgb(255, 255, 255)' />
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return Component
}

function InSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.w / 2 - contextApp.unitpx * 0.28 / 2 - contextApp.unitpx * 42
  const y = contextApp.locationLayout.h / 2 - contextApp.unitpx * 0.42 / 2

  const ComponentCharacter = card ? card.ComponentCharacter : undefined

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card !== undefined ?
          <>
            <ComponentCharacter x={x} y={y} w={w} h={h} card={card} contextApp={contextApp} contextPlayground={contextPlayground} />
            <ComponentCardContent x={x} y={y} w={w} h={h} card={card} />
          </>
          : null
      }
      {
        card === undefined ? <ComponentEmpty side={0} /> : null
      }
    </layout>

  return Component
}

function InOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameOpponentCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.w / 2 - w / 2 + w * 1.75
  const y = contextApp.locationLayout.h / 2 - h / 2

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card === undefined ? <ComponentEmpty side={1} /> : null
      }
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <InSelf />
      <InOpponent />
    </>

  return Component
}

export default App