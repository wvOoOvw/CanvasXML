import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Scene.Playground.Background'
import Mask from './App.Scene.Playground.Mask'

import Action from './App.Scene.Playground.Action'
import Animation from './App.Scene.Playground.Animation'
import Status from './App.Scene.Playground.Status'

import CardBattle from './App.Scene.Playground.CardBattle'
import CardDescription from './App.Scene.Playground.CardDescription'
import CardLibrary from './App.Scene.Playground.CardLibrary'
import CardQueue from './App.Scene.Playground.CardQueue'
import CardReady from './App.Scene.Playground.CardReady'

import Load from './App.Scene.Playground.Load'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gameLoadSelf, setGameLoadSelf] = React.useState(false)
  const [gameLoadOpponent, setGameLoadOpponent] = React.useState(false)

  const [gameContinue, setGameContinue] = React.useState(true)
  const [gameRound, setGameRound] = React.useState(0)
  const [gameRoundSide, setGameRoundSide] = React.useState()


  const [gameSelfHitPoint, setGemeSelfHitPoint] = React.useState(0)
  const [gameSelfGoldPoint, setGemeSelfGoldPoint] = React.useState(0)
  const [gameSelfActionPoint, setGemeSelfActionPoint] = React.useState(0)
  const [gameOpponentHitPoint, setGameOpponentHitPoint] = React.useState(0)
  const [gameOpponentGoldPoint, setGameOpponentGoldPoint] = React.useState(0)
  const [gameOpponentActionPoint, setGameOpponentActionPoint] = React.useState(0)

  const [gameSelfRoundOver, setGemeSelfRoundOver] = React.useState(false)
  const [gameOpponentRoundOver, setGameOpponentRoundOver] = React.useState(false)

  const [gameSelfCardReady, setGameSelfCardReady] = React.useState([])
  const [gameSelfCardLibrary, setGameSelfCardLibrary] = React.useState([])
  const [gameSelfCardQueue, setGameSelfCardQueue] = React.useState([])
  const [gameSelfCardBattle, setGameSelfCardBattle] = React.useState([])
  const [gameSelfCardBattleIng, setGameSelfCardBattleIng] = React.useState()

  const [gameSelfCardReadyDrag, setGameSelfCardReadyDrag] = React.useState()
  const [gameSelfCardReadyControl, setGameSelfCardReadyControl] = React.useState()

  const [gameOpponentCardReady, setGameOpponentCardReady] = React.useState([])
  const [gameOpponentCardLibrary, setGameOpponentCardLibrary] = React.useState([])
  const [gameOpponentCardQueue, setGameOpponentCardQueue] = React.useState([])
  const [gameOpponentCardBattle, setGameOpponentCardBattle] = React.useState([])
  const [gameOpponentCardBattleIng, setGameOpponentCardBattleIng] = React.useState()

  const [gameCardDescription, setGameCardDescription] = React.useState()
  const [gameCardAction, setGameCardAction] = React.useState([])

  const [gameAnimation, setGameAnimation] = React.useState([])

  const domRef = React.useRef({})

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'Status',
      'Action',

      'CardBattle',
      'CardLibrary',
      'CardLibraryAction',
      'CardQueue',
      'CardReady',
      'CardDescription',
      'CardReadyControl',

      'ActionMask',

      'Animation',

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
    gameRoundSide,
    setGameRoundSide,
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
    gameSelfRoundOver,
    setGemeSelfRoundOver,
    gameOpponentRoundOver,
    setGameOpponentRoundOver,
    gameSelfCardReady,
    setGameSelfCardReady,
    gameSelfCardLibrary,
    setGameSelfCardLibrary,
    gameSelfCardQueue,
    setGameSelfCardQueue,
    gameSelfCardBattle,
    setGameSelfCardBattle,
    gameSelfCardBattleIng,
    setGameSelfCardBattleIng,
    gameSelfCardReadyDrag,
    setGameSelfCardReadyDrag,
    gameSelfCardReadyControl,
    setGameSelfCardReadyControl,
    gameOpponentCardReady,
    setGameOpponentCardReady,
    gameOpponentCardLibrary,
    setGameOpponentCardLibrary,
    gameOpponentCardQueue,
    setGameOpponentCardQueue,
    gameOpponentCardBattle,
    setGameOpponentCardBattle,
    gameOpponentCardBattleIng,
    setGameOpponentCardBattleIng,
    gameCardDescription,
    setGameCardDescription,
    gameCardAction,
    setGameCardAction,
    gameAnimation,
    setGameAnimation,
    domRef,
    informationJson,
    zIndex,
    load,
  }

  const Component =
    <ContextPlayground.Provider value={context}>
      <layout>
        <Background />
        <Mask />
        <Animation />

        <Action />
        <Status />

        <CardBattle />
        <CardDescription />
        <CardLibrary />
        <CardQueue />
        <CardReady />

        <Load />
      </layout>
    </ContextPlayground.Provider>

  return Component
}

export default App