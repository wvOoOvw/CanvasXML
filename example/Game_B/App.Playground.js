import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Playground.Background'
import Card from './App.Playground.Card'
// import Enemy from './App.Playground.Enemy'
import Role from './App.Playground.Role'
import Setting from './App.Playground.Setting'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)

  const [gameLoadRole, setGameLoadRole] = React.useState(false)

  const [gameRole, setGameRole] = React.useState([])
  const [gameRoleDrag, setGameRoleDrag] = React.useState()
  const [gameRoleControl, setGameRoleControl] = React.useState()

  const informationJson = React.useMemo(() => jsonA(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'GameSetting',
      'CardControl',
      'CardLibrary',
      'CardPanel',
      ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameLoadRole, setGameLoadRole, gameRole, setGameRole, gameRoleDrag, setGameRoleDrag, gameRoleControl, setGameRoleControl, informationJson, zIndex }}>
    <layout>
      <Background />
      <Card />
      <Role />
      <Setting />
    </layout>
  </ContextPlayground.Provider>
}

export default App