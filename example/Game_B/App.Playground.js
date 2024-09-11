import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Playground.Background'
import Mask from './App.Playground.Mask'
import SettingPause from './App.Playground.Setting.Pause'

import Action from './App.Playground.Action'
import Status from './App.Playground.Status'

import CardLibrary from './App.Playground.CardLibrary'
import CardQueueOpponent from './App.Playground.CardQueue.Opponent'
import CardQueueSelf from './App.Playground.CardQueue.Self'
import CardReadyOpponent from './App.Playground.CardReady.Opponent'
import CardReadySelf from './App.Playground.CardReady.Self'

import Load from './App.Playground.Load'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gameLoadSelf, setGameLoadSelf] = React.useState(false)
  const [gameLoadOpponent, setGameLoadOpponent] = React.useState(false)

  const [gameContinue, setGameContinue] = React.useState(true)
  const [gameRound, setGameRound] = React.useState(0)

  const [gameSelfHitPoint, setGemeSelfHitPoint] = React.useState(0)
  const [gameSelfGoldPoint, setGemeSelfGoldPoint] = React.useState(0)
  const [gameSelfActionPoint, setGemeSelfActionPoint] = React.useState(0)
  const [gameOpponentHitPoint, setGameOpponentHitPoint] = React.useState(0)
  const [gameOpponentGoldPoint, setGameOpponentGoldPoint] = React.useState(0)
  const [gameOpponentActionPoint, setGameOpponentActionPoint] = React.useState(0)

  const [gameSelfCardReady, setGameSelfCardReady] = React.useState([])
  const [gameSelfCardLibrary, setGameSelfCardLibrary] = React.useState([])
  const [gameSelfCardQueue, setGameSelfCardQueue] = React.useState([])
  const [gameSelfCardBattle, setGameSelfCardBattle] = React.useState([])
  const [gameSelfCardDescription, setGameSelfCardDescription] = React.useState()
  const [gameSelfCardDrag, setGameSelfCardDrag] = React.useState()
  const [gameSelfCardControl, setGameSelfCardControl] = React.useState()

  const [gameOpponentCardReady, setGameOpponentCardReady] = React.useState([])
  const [gameOpponentCardLibrary, setGameOpponentCardLibrary] = React.useState([])
  const [gameOpponentCardQueue, setGameOpponentCardQueue] = React.useState([])
  const [gameOpponentCardBattle, setGameOpponentCardBattle] = React.useState([])
  const [gameOpponentCardDescription, setGameOpponentCardDescription] = React.useState()

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'Status',
      'Action',

      'SettingPauseButton',

      'CardLibrary',
      'CardLibraryAction',

      'CardQueueOpponent',
      'CardQueueSelf',

      'CardReadyOpponent',
      'CardReadySelf',

      'SettingPauseModal',

      'Mask',
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
    gameContinue,
    setGameContinue,
    gameRound,
    setGameRound,
    gameSelfHitPoint,
    setGemeSelfHitPoint,
    gameSelfGoldPoint,
    setGemeSelfGoldPoint,
    gameSelfActionPoint,
    setGemeSelfActionPoint,
    gameOpponentHitPoint,
    setGameOpponentHitPoint,
    gameOpponentGoldPoint,
    setGameOpponentGoldPoint,
    gameOpponentActionPoint,
    setGameOpponentActionPoint,
    gameSelfCardReady,
    setGameSelfCardReady,
    gameSelfCardLibrary,
    setGameSelfCardLibrary,
    gameSelfCardQueue,
    setGameSelfCardQueue,
    gameSelfCardBattle,
    setGameSelfCardBattle,
    gameSelfCardDescription,
    setGameSelfCardDescription,
    gameSelfCardDrag,
    setGameSelfCardDrag,
    gameSelfCardControl,
    setGameSelfCardControl,
    gameOpponentCardReady,
    setGameOpponentCardReady,
    gameOpponentCardLibrary,
    setGameOpponentCardLibrary,
    gameOpponentCardQueue,
    setGameOpponentCardQueue,
    gameOpponentCardBattle,
    setGameOpponentCardBattle,
    gameOpponentCardDescription,
    setGameOpponentCardDescription,
    informationJson,
    zIndex,
    load,
  }

  return <ContextPlayground.Provider value={context}>
    <layout>
      <Background />
      <Mask />
      <SettingPause />

      <Action />
      <Status />

      <CardLibrary />
      <CardQueueSelf />
      <CardReadyOpponent />
      <CardReadySelf />

      <Load />
    </layout>
  </ContextPlayground.Provider>
}

export default App