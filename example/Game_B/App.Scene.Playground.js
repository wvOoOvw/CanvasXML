import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardInBattle from './App.Scene.Playground.Module.CardInBattle'
import CardInDescription from './App.Scene.Playground.Module.CardInDescription'
import CardInReady from './App.Scene.Playground.Module.CardInReady'
import GlobalAnimation from './App.Scene.Playground.Module.GlobalAnimation'
import GlobalBackground from './App.Scene.Playground.Module.GlobalBackground'
import ProcessAnnounce from './App.Scene.Playground.Module.ProcessAnnounce'
import ProcessPick from './App.Scene.Playground.Module.ProcessPick'
import ViewActionButton from './App.Scene.Playground.Module.ViewActionButton'
import ViewStatus from './App.Scene.Playground.Module.ViewStatus'

import init from './Model.Card'

import { jsonA } from './json'

const useLoadInformation = (props) => {
  const contextPlayground = props.contextPlayground

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.setGemeSelfHitPoint(30)
      contextPlayground.setGemeSelfActionPoint(0)
      contextPlayground.setGemeSelfGoldPoint(10)
      contextPlayground.setGameSelfCardLibrary(contextPlayground.informationJson.gameSelf.card.map(i => Object({ key: Math.random(), ...init(i) })))

      contextPlayground.setGameOpponentHitPoint(30)
      contextPlayground.setGameOpponentActionPoint(0)
      contextPlayground.setGameOpponentGoldPoint(10)
      contextPlayground.setGameOpponentCardLibrary(contextPlayground.informationJson.gameOpponent.card.map(i => Object({ key: Math.random(), ...init(i) })))

      contextPlayground.setGameProcess(i => i + 1)
    }
  }, [contextPlayground.informationJson])
}

const useExecute = (props) => {
  const contextPlayground = props.contextPlayground

  React.useEffect(() => {
    if (contextPlayground.gameCardExecute.length > 0) {
      const gameCardExecute = contextPlayground.gameCardExecute[0]

      const card = gameCardExecute.card
      const side = gameCardExecute.side

      if (side === 0) {
        contextPlayground.setGemeSelfActionPoint(n => n - card.caculateCostActionPoint(card))
        contextPlayground.setGemeSelfGoldPoint(n => n - card.caculateCostGoldPoint(card))
        contextPlayground.setGemeSelfHitPoint(n => n - card.caculateCostHitPoint(card))
      }
      if (side === 1) {
        contextPlayground.setGemeSelfActionPoint(n => n - card.caculateCostActionPoint(card))
        contextPlayground.setGemeSelfGoldPoint(n => n - card.caculateCostGoldPoint(card))
        contextPlayground.setGemeSelfHitPoint(n => n - card.caculateCostHitPoint(card))
      }

      if (card.cardIndex.startsWith('Role')) {
        if (side === 0) {
          contextPlayground.setGameSelfCardBattle(card)
        }
        if (side === 1) {
          contextPlayground.setGameOpponentCardBattle(card)
        }
      }

      contextPlayground.setGameCardExecute(i => i.filter(n => n !== gameCardExecute))
    }
  }, [contextPlayground.gameCardExecute])
}

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
      'ViewStatus',
      'ViewActionButton',
      'CardInBattle',
      'CardInReady',
      'CardInReadyControl',
      'ProcessPick',
      'Announce',
      'CardInDescription',
      'GlobalAnimation',
      'ViewActionButton',
    ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const contextPlayground = {
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

  useLoadInformation({ contextApp, contextPlayground })
  useExecute({ contextApp, contextPlayground })

  const Component =
    <ContextPlayground.Provider value={contextPlayground}>
      <layout>
        {
          gameProcess > 0 ?
            <>
              <GlobalAnimation />
              <GlobalBackground />
              <CardInDescription />
            </>
            : null
        }

        {
          gameProcess === 1 ?
            <>
              <ProcessAnnounce />
            </>
            : null
        }

        {
          gameProcess === 2 ?
            <>
              <ProcessPick />
            </>
            : null
        }

        {
          gameProcess === 2 || gameProcess > 2 ?
            <>
              <CardInReady />
              <ViewActionButton />
              <ViewStatus />
            </>
            : null
        }

        {
          gameProcess > 2 ?
            <>
              <CardInBattle />
            </>
            : null
        }
      </layout>
    </ContextPlayground.Provider>

  return Component
}

export default App