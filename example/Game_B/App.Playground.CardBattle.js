import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardFrontBattle from './App.Playground.Component.CardFrontBattle'
import CardFrontBattleEmpty from './App.Playground.Component.CardFrontBattleEmpty'

function RoleSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattleRole

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2
  var y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 + h * 0.6

  return <layout zIndex={contextPlayground.zIndex.CardBattle}>
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
}

function RoleOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattleRole

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2
  var y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 - h * 0.6

  return <layout zIndex={contextPlayground.zIndex.CardBattle}>
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
}

function BuildingSelf(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const card = contextPlayground.gameSelfCardBattleBuilding[index]

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x
  var y

  if (index === 0) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 - w * 1.5 * 1.35 - w
  if (index === 1) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 - w * 1.5 * 1
  if (index === 2) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 + w * 1.5 * 1
  if (index === 3) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 + w * 1.5 * 1.35 + w

  if (index === 0) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 + h * 0.8
  if (index === 1) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 + h * 1
  if (index === 2) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 + h * 1
  if (index === 3) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 + h * 0.8

  return <layout zIndex={contextPlayground.zIndex.CardBattle}>
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
          text={['待部署区', '建筑']}
          image={contextApp.imagePngMushroomHouseWhite}
        />
        : null
    }
  </layout>
}

function BuildingOpponent(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const card = contextPlayground.gameOpponentCardBattleBuilding[index]

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x
  var y

  if (index === 0) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 - w * 1.5 * 1.35 - w
  if (index === 1) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 - w * 1.5 * 1
  if (index === 2) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 + w * 1.5 * 1
  if (index === 3) x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 + w * 1.5 * 1.35 + w

  if (index === 0) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 - h * 0.8
  if (index === 1) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 - h * 1
  if (index === 2) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 - h * 1
  if (index === 3) y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 - h * 0.8

  return <layout zIndex={contextPlayground.zIndex.CardBattle}>
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
          text={['待部署区', '建筑']}
          image={contextApp.imagePngMushroomHouseWhite}
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
      new Array(4).fill().map((i, index) => <BuildingSelf index={index} />)
    }

    {
      new Array(4).fill().map((i, index) => <BuildingOpponent index={index} />)
    }

    <RoleSelf />
    <RoleOpponent />
  </>
}

export default App