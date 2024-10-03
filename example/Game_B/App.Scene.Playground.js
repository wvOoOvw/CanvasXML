import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Scene.Playground.Background'
import Mask from './App.Scene.Playground.Mask'
import Animation from './App.Scene.Playground.Animation'

import Action from './App.Scene.Playground.Action'
import Status from './App.Scene.Playground.Status'
import Tip from './App.Scene.Playground.Tip'
import Pick from './App.Scene.Playground.Pick'
import Announce from './App.Scene.Playground.Announce'

import CardBattle from './App.Scene.Playground.CardBattle'
import CardDescription from './App.Scene.Playground.CardDescription'
import CardReady from './App.Scene.Playground.CardReady'

import Load from './App.Scene.Playground.Load'
import Execute from './App.Scene.Playground.Execute'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gameProcess, setGameProcess] = React.useState(0)
  const [gameContinue, setGameContinue] = React.useState(true)
  const [gameRound, setGameRound] = React.useState(0)
  const [gameRoundSide, setGameRoundSide] = React.useState()

  const [gameLoadSelfInformation, setGameLoadSelfInformation] = React.useState(false)
  const [gameLoadOpponentInformation, setGameLoadOpponentInformation] = React.useState(false)
  const [gameLoadSelfPick, setGameLoadSelfPick] = React.useState(false)
  const [gameLoadOpponentPick, setGameLoadOpponentPick] = React.useState(false)

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
  const [gameSelfCardRecord, setGameSelfCardRecord] = React.useState([])
  const [gameSelfCardBattle, setGameSelfCardBattle] = React.useState()

  const [gameCardReadyDrag, setGameCardReadyDrag] = React.useState()
  const [gameCardReadyControl, setGameCardReadyControl] = React.useState()
  const [gameCardReadyControlUseable, setGameCardReadyControlUseable] = React.useState(false)

  const [gameOpponentCardReady, setGameOpponentCardReady] = React.useState([])
  const [gameOpponentCardLibrary, setGameOpponentCardLibrary] = React.useState([])
  const [gameOpponentCardRecord, setGameOpponentCardRecord] = React.useState([])
  const [gameOpponentCardBattle, setGameOpponentCardBattle] = React.useState()

  const [gameCardExpand, setGameCardExpand] = React.useState(false)
  const [gameCardDescription, setGameCardDescription] = React.useState()
  const [gameCardExecute, setGameCardExecute] = React.useState([])
  const [gameCardExecuteIng, setGameCardExecuteIng] = React.useState([])

  const [gameAnimation, setGameAnimation] = React.useState([])

  const domRef = React.useRef({})

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'Status',
      'Action',
      'Tip',

      'CardBattle',
      'CardReady',
      'CardReadyControl',

      'Pick',
      'Announce',

      'CardDescription',

      'Navigation',
      'Animation',

      'ActionMask',
      'Mask',
    ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const context = {
    gameProcess,
    setGameProcess,
    gameContinue,
    setGameContinue,
    gameRound,
    setGameRound,
    gameRoundSide,
    setGameRoundSide,
    gameLoadSelfInformation,
    setGameLoadSelfInformation,
    gameLoadOpponentInformation,
    setGameLoadOpponentInformation,
    gameLoadSelfPick,
    setGameLoadSelfPick,
    gameLoadOpponentPick,
    setGameLoadOpponentPick,
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
    gameSelfCardRecord,
    setGameSelfCardRecord,
    gameSelfCardBattle,
    setGameSelfCardBattle,
    gameCardReadyDrag,
    setGameCardReadyDrag,
    gameCardReadyControl,
    setGameCardReadyControl,
    gameCardReadyControlUseable,
    setGameCardReadyControlUseable,
    gameOpponentCardReady,
    setGameOpponentCardReady,
    gameOpponentCardLibrary,
    setGameOpponentCardLibrary,
    gameOpponentCardRecord,
    setGameOpponentCardRecord,
    gameOpponentCardBattle,
    setGameOpponentCardBattle,
    gameCardExpand,
    setGameCardExpand,
    gameCardDescription,
    setGameCardDescription,
    gameCardExecute,
    setGameCardExecute,
    gameCardExecuteIng,
    setGameCardExecuteIng,
    gameAnimation,
    setGameAnimation,
    domRef,
    informationJson,
    zIndex,
  }

  const Component =
    <ContextPlayground.Provider value={context}>
      <layout>
        {
          gameLoadSelfInformation === true && gameLoadOpponentInformation === true ?
            <>
              <Background />
              {/* <Mask /> */}
              <Animation />
            </>
            : null
        }

        {
          gameLoadSelfInformation === true && gameLoadOpponentInformation === true && gameProcess === 0 ?
            <>
              <Announce />
            </>
            : null
        }
        {
          gameLoadSelfInformation === true && gameLoadOpponentInformation === true && gameProcess === 1 ?
            <>
              <Pick />
            </>
            : null
        }

        {
          gameLoadSelfInformation === true && gameLoadOpponentInformation === true && gameProcess > 0 ?
            <>
              <Action />
              <Status />
              <Tip />

              <CardDescription />
              <CardReady />
              <Execute />
            </>
            : null
        }

        {
          gameLoadSelfInformation === true && gameLoadOpponentInformation === true && gameProcess > 1 ?
            <>
              <CardBattle />
            </>
            : null
        }

        {
          gameLoadSelfInformation !== true || gameLoadOpponentInformation !== true ?
            <>
              <Load />
            </>
            : null
        }
      </layout>
    </ContextPlayground.Provider>

  return Component
}

export default App