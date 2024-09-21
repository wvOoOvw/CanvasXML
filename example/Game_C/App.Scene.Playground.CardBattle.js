import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontBattle from './App.Scene.Playground.Component.CardFrontBattle'
import CardFrontBattleEmpty from './App.Scene.Playground.Component.CardFrontBattleEmpty'

function BattleIngSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattleIng

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.36

  var x = contextApp.locationLayout.w / 2 - w / 2
  var y = contextApp.locationLayout.h / 2 - h / 2 + h * 0.6

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

function BattleIngOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattleIng

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.36

  var x = contextApp.locationLayout.w / 2 - w / 2
  var y = contextApp.locationLayout.h / 2 - h / 2 - h * 0.6

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

function BattleSelf(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const card = contextPlayground.gameSelfCardBattle[index]

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameSelfCardBattle.length

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.36

  var x = contextApp.locationLayout.w / 2 - w / 2 - w * 2 + ((lengthMax - lengthGameCard + 1) * w * 0.048 + w * 0.36) * (index - (lengthGameCard - 1) / 2)
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
            text={['待部署区', '休整']}
            image={contextApp.imagePngMushroomHouseWhite}
          />
          : null
      }
    </layout>

  return Component
}

function BattleOpponent(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const card = contextPlayground.gameOpponentCardBattle[index]

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameSelfCardBattle.length

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.36

  var x = contextApp.locationLayout.w / 2 - w / 2 + w * 2 + ((lengthMax - lengthGameCard + 1) * w * 0.048 + w * 0.36) * (index - (lengthGameCard - 1) / 2)
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
            text={['待部署区', '休整']}
            image={contextApp.imagePngMushroomHouseWhite}
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
      {
        new Array(4).fill().map((i, index) => <BattleSelf index={index} />)
      }

      {
        new Array(4).fill().map((i, index) => <BattleOpponent index={index} />)
      }
    </>

  return Component
}

export default App