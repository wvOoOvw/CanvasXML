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

import LoadCard from './App.Playground.Load.Card'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)

  const [gameLoadCard, setGameLoadCard] = React.useState(false)

  const [gameCard, setGameCard] = React.useState([])
  const [gameCardLibrary, setGameCardLibrary] = React.useState([])
  const [gameCardDrag, setGameCardDrag] = React.useState()
  const [gameCardControl, setGameCardControl] = React.useState()

  const [gameEnemy, setGameEnemy] = React.useState([])

  const [gameBattleRole, setGameBattleRole] = React.useState()
  const [gameBattleEnemy, setGameBattleEnemy] = React.useState()

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'GameSetting',
      'CardLibrary',
      'CardPanel',
      'CardControl',
      ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const load = gameLoadCard

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameLoadCard, setGameLoadCard, gameCard, setGameCard, gameCardLibrary, setGameCardLibrary, gameCardDrag, setGameCardDrag, gameCardControl, setGameCardControl, informationJson, zIndex, load }}>
    <layout>
      <Background />
      <Card />
      <Setting />
      <LoadCard />
    </layout>
  </ContextPlayground.Provider>
}

export default App