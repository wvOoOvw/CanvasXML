import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Playground.Background'
import Self from './App.Playground.Self'
import Setting from './App.Playground.Setting'

import LoadBattle from './App.Playground.Load.Battle'
import LoadOpponent from './App.Playground.Load.Opponent'
import LoadSelf from './App.Playground.Load.Self'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)

  const [gameLoadBattle, setGameLoadBattle] = React.useState(false)
  const [gameLoadSelf, setGameLoadSelf] = React.useState(false)
  const [gameLoadOpponent, setGameLoadOpponent] = React.useState(false)

  const [gemeSelfHitPoint, setGemeSelfHitPoint] = React.useState(0)
  const [gemeSelfMagicPoint, setGemeSelfMagicPoint] = React.useState(0)
  const [gameOpponentHitPoint, setGameOpponentHitPoint] = React.useState(0)
  const [gameOpponentMagicPoint, setGameOpponentMagicPoint] = React.useState(0)

  const [gameSelfCardReady, setGameSelfCardReady] = React.useState([])
  const [gameSelfCardLibrary, setGameSelfCardLibrary] = React.useState([])
  const [gameSelfCardDrag, setGameSelfCardDrag] = React.useState()
  const [gameSelfCardControl, setGameSelfCardControl] = React.useState()
  const [gameSelfCardDescription, setGameSelfCardDescription] = React.useState()

  const [gameOpponentCardReady, setGameOpponentCardReady] = React.useState([])
  const [gameOpponentCardLibrary, setGameOpponentCardLibrary] = React.useState([])
  const [gameOpponentCardDescription, setGameOpponentCardDescription] = React.useState()

  const [gameBattleSelfRole, setGameBattleSelfRole] = React.useState([])
  const [gameBattleOpponentRole, setGameBattleOpponentRole] = React.useState([])

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'EnemyPanel',
      'SelfCardReady',
      'SelfCardControl',
      'SelfCardLibrary',
      'SelfCardDescription',
      'GameSetting',
      ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const load = gameLoadSelf && gameLoadOpponent && gameLoadBattle

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameLoadBattle, setGameLoadBattle, gameLoadSelf, setGameLoadSelf, gameLoadOpponent, setGameLoadOpponent, gemeSelfHitPoint, setGemeSelfHitPoint, gemeSelfMagicPoint, setGemeSelfMagicPoint, gameOpponentHitPoint, setGameOpponentHitPoint, gameOpponentMagicPoint, setGameOpponentMagicPoint, gameSelfCardReady, setGameSelfCardReady, gameSelfCardLibrary, setGameSelfCardLibrary, gameSelfCardDrag, setGameSelfCardDrag, gameSelfCardControl, gameEnemy, setGameEnemy, gameBattleSelfRole, setGameBattleSelfRole, gameBattleOpponentRole, setGameBattleOpponentRole, setGameSelfCardControl, gameSelfCardDescription, setGameSelfCardDescription, gameOpponentCardReady, setGameOpponentCardReady, gameOpponentCardLibrary, setGameOpponentCardLibrary, gameOpponentCardDescription, setGameOpponentCardDescription, informationJson, zIndex, load }}>

    <layout>
      <Background />
      <Self />
      <Setting />
    </layout>

    <LoadBattle />
    <LoadOpponent />
    <LoadSelf />

  </ContextPlayground.Provider>
}

export default App