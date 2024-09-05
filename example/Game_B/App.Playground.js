import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Playground.Background'
import Card from './App.Playground.Card'
import Setting from './App.Playground.Setting'

import LoadBattle from './App.Playground.Load.Battle'
import LoadCard from './App.Playground.Load.Card'
import LoadEnemy from './App.Playground.Load.Enemy'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)

  const [gameLoadBattle, setGameLoadBattle] = React.useState(false)
  const [gameLoadCard, setGameLoadCard] = React.useState(false)
  const [gameLoadEnemy, setGameLoadEnemy] = React.useState(false)

  const [gameCardReady, setGameCardReady] = React.useState([])
  const [gameCardLibrary, setGameCardLibrary] = React.useState([])
  const [gameCardDrag, setGameCardDrag] = React.useState()
  const [gameCardControl, setGameCardControl] = React.useState()
  const [gameCardDescription, setGameCardDescription] = React.useState()

  const [gameEnemy, setGameEnemy] = React.useState([])

  const [gameBattleRole, setGameBattleRole] = React.useState()
  const [gameBattleEnemy, setGameBattleEnemy] = React.useState()

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'EnemyPanel',
      'CardReady',
      'CardControl',
      'CardLibrary',
      'CardDescription',
      'GameSetting',
      ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const load = gameLoadCard && gameLoadEnemy && gameLoadBattle

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameLoadBattle, setGameLoadBattle, gameLoadCard, setGameLoadCard, gameLoadEnemy, setGameLoadEnemy, gameCardReady, setGameCardReady, gameCardLibrary, setGameCardLibrary, gameCardDrag, setGameCardDrag, gameCardControl, gameEnemy, setGameEnemy, gameBattleRole, setGameBattleRole, gameBattleEnemy, setGameBattleEnemy, setGameCardControl, gameCardDescription, setGameCardDescription, informationJson, zIndex, load }}>

    <layout>
      <Background />
      <Setting />
      <Card />
    </layout>

    <LoadBattle />
    <LoadCard />
    <LoadEnemy />

  </ContextPlayground.Provider>
}

export default App