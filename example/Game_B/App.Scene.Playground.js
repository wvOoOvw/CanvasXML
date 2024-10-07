import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardBattle from './App.Scene.Playground.CardBattle'
import CardDescription from './App.Scene.Playground.CardDescription'
import CardReady from './App.Scene.Playground.CardReady'
import GlobalAnimation from './App.Scene.Playground.GlobalAnimation'
import GlobalBackground from './App.Scene.Playground.GlobalBackground'
import ProcessAnnounce from './App.Scene.Playground.ProcessAnnounce'
import ProcessPick from './App.Scene.Playground.ProcessPick'
import NavigationButtonAction from './App.Scene.Playground.NavigationButtonAction'
import NavigationStatus from './App.Scene.Playground.NavigationStatus'

import useExecute from './App.Scene.Playground.useExecute'
import useLoadInformation from './App.Scene.Playground.useLoadInformation'
import useOpponentAi from './App.Scene.Playground.useOpponentAi'
import useRound from './App.Scene.Playground.useRound'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gameProcess, setGameProcess] = React.useState(0)

  const [gameRound, setGameRound] = React.useState(0)

  const [gameAnimation, setGameAnimation] = React.useState([])

  const [gameSelfProperty, setGameSelfProperty] = React.useState({ hitPoint: 0, goldPoint: 0, actionPoint: 0 })
  const [gameOpponentProperty, setGameOpponentProperty] = React.useState({ hitPoint: 0, goldPoint: 0, actionPoint: 0 })

  const [gameSelfPickOver, setGemeSelfPickOver] = React.useState(false)
  const [gameOpponentPickOver, setGameOpponentPickOver] = React.useState(false)
  const [gameSelfRoundOver, setGemeSelfRoundOver] = React.useState(false)
  const [gameOpponentRoundOver, setGameOpponentRoundOver] = React.useState(false)

  const [gameSelfCardReady, setGameSelfCardReady] = React.useState([])
  const [gameSelfCardLibrary, setGameSelfCardLibrary] = React.useState([])
  const [gameSelfCardGraveyard, setGameSelfCardGraveyard] = React.useState([])
  const [gameSelfCardBattle, setGameSelfCardBattle] = React.useState()

  const [gameCardReadyDrag, setGameCardReadyDrag] = React.useState()
  const [gameCardReadyControl, setGameCardReadyControl] = React.useState()
  const [gameCardReadyControlUseable, setGameCardReadyControlUseable] = React.useState(false)

  const [gameOpponentCardReady, setGameOpponentCardReady] = React.useState([])
  const [gameOpponentCardLibrary, setGameOpponentCardLibrary] = React.useState([])
  const [gameOpponentCardGraveyard, setGameOpponentCardGraveyard] = React.useState([])
  const [gameOpponentCardBattle, setGameOpponentCardBattle] = React.useState()

  const [gameCardDescription, setGameCardDescription] = React.useState()
  const [gameExecute, setGameExecute] = React.useState([])

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'NavigationStatus',
      'NavigationInformation',
      'NavigationButtonAction',
      'CardBattle',
      'CardReady',
      'CardReadyControl',
      'ProcessPick',
      'Announce',
      'CardDescription',
      'GlobalAnimation',
      'NavigationButtonActionPauseModal',
    ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const contextPlayground = {
    gameProcess,
    setGameProcess,
    gameRound,
    setGameRound,
    gameSelfProperty,
    setGameSelfProperty,
    gameOpponentProperty,
    setGameOpponentProperty,
    gameSelfPickOver,
    setGemeSelfPickOver,
    gameOpponentPickOver,
    setGameOpponentPickOver,
    gameSelfRoundOver,
    setGemeSelfRoundOver,
    gameOpponentRoundOver,
    setGameOpponentRoundOver,
    gameSelfCardReady,
    setGameSelfCardReady,
    gameSelfCardLibrary,
    setGameSelfCardLibrary,
    gameSelfCardGraveyard,
    setGameSelfCardGraveyard,
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
    gameOpponentCardGraveyard,
    setGameOpponentCardGraveyard,
    gameOpponentCardBattle,
    setGameOpponentCardBattle,
    gameCardDescription,
    setGameCardDescription,
    gameExecute,
    setGameExecute,
    gameAnimation,
    setGameAnimation,
    informationJson,
    zIndex,
  }

  useLoadInformation({ contextApp, contextPlayground })
  useRound({ contextApp, contextPlayground })
  useExecute({ contextApp, contextPlayground })
  useOpponentAi({ contextApp, contextPlayground })

  const Component =
    <ContextPlayground.Provider value={contextPlayground}>
      <layout>
        {
          gameProcess > 0 ?
            <>
              <GlobalAnimation />
              <GlobalBackground />
              <CardDescription />
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
              <CardReady />
              <NavigationButtonAction />
              <NavigationStatus />
            </>
            : null
        }

        {
          gameProcess > 2 ?
            <>
              <CardBattle />
            </>
            : null
        }
      </layout>
    </ContextPlayground.Provider>

  return Component
}

export default App