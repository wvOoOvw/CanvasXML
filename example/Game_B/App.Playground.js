import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Playground.Background'
import Opponent from './App.Playground.Opponent'
import Self from './App.Playground.Self'
import Setting from './App.Playground.Setting'

import LoadOpponent from './App.Playground.Load.Opponent'
import LoadSelf from './App.Playground.Load.Self'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gameLoadSelf, setGameLoadSelf] = React.useState(false)
  const [gameLoadOpponent, setGameLoadOpponent] = React.useState(false)

  const [gameRound, setGameRound] = React.useState(0)

  const [gameSelfHitPoint, setGemeSelfHitPoint] = React.useState(0)
  const [gameSelfActionPoint, setGemeSelfActionPoint] = React.useState(0)
  const [gameOpponentHitPoint, setGameOpponentHitPoint] = React.useState(0)
  const [gameOpponentActionPoint, setGameOpponentActionPoint] = React.useState(0)

  const [gameSelfRole, setGameSelfRole] = React.useState([])
  const [gameSelfCardReady, setGameSelfCardReady] = React.useState([])
  const [gameSelfCardLibrary, setGameSelfCardLibrary] = React.useState([])
  const [gameSelfCardDescription, setGameSelfCardDescription] = React.useState()
  const [gameSelfCardDrag, setGameSelfCardDrag] = React.useState()
  const [gameSelfCardControl, setGameSelfCardControl] = React.useState()

  const [gameOpponentRole, setGameOpponentRole] = React.useState([])
  const [gameOpponentCardReady, setGameOpponentCardReady] = React.useState([])
  const [gameOpponentCardLibrary, setGameOpponentCardLibrary] = React.useState([])
  const [gameOpponentCardDescription, setGameOpponentCardDescription] = React.useState()

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'EnemyPanel',
      'SelfCardReady',
      'SelfCardControl',
      'SelfCardLibrary',
      'SelfCardDescription',
      'SelfStatus',
      'OpponentCardReady',
      'OpponentCardControl',
      'OpponentCardLibrary',
      'OpponentCardDescription',
      'OpponentStatus',
      'GameSettingContinue',
      'GameSettingPause',
    ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const load = gameLoadSelf && gameLoadOpponent

  const context = {
    gameLoadSelf,
    setGameLoadSelf,
    gameLoadOpponent,
    setGameLoadOpponent,
    gameRound,
    setGameRound,
    gameSelfHitPoint,
    setGemeSelfHitPoint,
    gameSelfActionPoint,
    setGemeSelfActionPoint,
    gameOpponentHitPoint,
    setGameOpponentHitPoint,
    gameOpponentActionPoint,
    setGameOpponentActionPoint,
    gameSelfRole,
    setGameSelfRole,
    gameSelfCardReady,
    setGameSelfCardReady,
    gameSelfCardLibrary,
    setGameSelfCardLibrary,
    gameSelfCardDescription,
    setGameSelfCardDescription,
    gameSelfCardDrag,
    setGameSelfCardDrag,
    gameSelfCardControl,
    setGameSelfCardControl,
    gameOpponentRole,
    setGameOpponentRole,
    gameOpponentCardReady,
    setGameOpponentCardReady,
    gameOpponentCardLibrary,
    setGameOpponentCardLibrary,
    gameOpponentCardDescription,
    setGameOpponentCardDescription,
    informationJson,
    zIndex,
    load,
  }

  return <ContextPlayground.Provider value={context}>

    <layout>
      <Background />
      <Opponent />
      <Self />
      <Setting />
    </layout>

    <LoadOpponent />
    <LoadSelf />

  </ContextPlayground.Provider>
}

export default App