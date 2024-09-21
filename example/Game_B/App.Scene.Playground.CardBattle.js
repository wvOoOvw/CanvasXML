import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontBattle from './App.Scene.Playground.Component.CardFrontBattle'
import CardFrontBattleEmpty from './App.Scene.Playground.Component.CardFrontBattleEmpty'

function BattleSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x = contextApp.locationLayout.w / 2 - w / 2 - w * 1.75
  var y = contextApp.locationLayout.h / 2 - h / 2

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card !== undefined ?
          <CardFrontBattle
            x={x}
            y={y}
            w={w}
            h={h}
            card={card}
          />
          : null
      }
      {
        card === undefined ?
          <CardFrontBattleEmpty
            x={x}
            y={y}
            w={w}
            h={h}
            card={card}
            text={['待部署区', '战斗']}
            image={contextApp.imagePngSwordmanWhite}
          />
          : null
      }
    </layout>

  return Component
}

function BattleOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x = contextApp.locationLayout.w / 2 - w / 2 + w * 1.75
  var y = contextApp.locationLayout.h / 2 - h / 2

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card !== undefined ?
          <CardFrontBattle
            x={x}
            y={y}
            w={w}
            h={h}
            card={card}
          />
          : null
      }
      {
        card === undefined ?
          <CardFrontBattleEmpty
            x={x}
            y={y}
            w={w}
            h={h}
            card={card}
            text={['待部署区', '战斗']}
            image={contextApp.imagePngSwordmanWhite}
          />
          : null
      }
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <BattleSelf />
      <BattleOpponent />
    </>

  return Component
}

export default App