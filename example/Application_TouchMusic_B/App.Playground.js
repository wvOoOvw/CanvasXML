import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Playground.Background'
import Enemy from './App.Playground.Enemy'
import Infomation from './App.Playground.Infomation'
import Map from './App.Playground.Map'
import Setting from './App.Playground.Setting'
import Role from './App.Playground.Role'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gameLoadMap, setGameLoadMap] = React.useState(false)
  const [gameLoadEnemy, setGameLoadEnemy] = React.useState(false)
  const [gameLoadRole, setGameLoadRole] = React.useState(false)
  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameMap, setGameMap] = React.useState([])
  const [gameEnemy, setGameEnemy] = React.useState([])
  const [gameEnemyReady, setGameEnemyReady] = React.useState([])
  const [gameRole, setGameRole] = React.useState([])
  const [gameRoleActive, setGameRoleActive] = React.useState()
  const [gamePoint, setGamePoint] = React.useState(0)
  const [gameTimeRate, setGameTimeRate] = React.useState(1)
  const [gameCombo, setGameCombo] = React.useState(0)

  const load = gameLoadMap && gameLoadEnemy && gameLoadRole

  const { animationCount: animationCountGameTime } = ReactExtensions.useAnimationDestination({ play: gamePlay && load, defaultCount: 0, destination: Infinity, rate: gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const informationJson = React.useMemo(() => jsonA(contextApp), [])

  const zIndex = React.useMemo(() => {
    const array = new Array(
      'RoleBackground',
      'MapMeth',
      'EnemyMeth',
      'RoleMeth',
      'RolePanel',
      'GameSetting',
      'GameInfomation',
    )
    return array.reduce((t, i, index) => Object({ ...t, [i]: 1000 + index }), Object())
  }, [])

  const priority = React.useMemo(() => {
    const array = new Array(
      'RoleAction',
      'RolePanel',
      'GameSettingPauseButton',
      'GameSettingPausePoper',
      'GameSettingPausePoperButton',
    )
    return array.reduce((t, i, index) => Object({ ...t, [i]: 1000 + index }), Object())
  }, [])

  return <ContextPlayground.Provider value={{ gameLoadMap, setGameLoadMap, gameLoadEnemy, setGameLoadEnemy, gameLoadRole, setGameLoadRole, gamePlay, setGamePlay, gameMap, setGameMap, gameEnemy, setGameEnemy, gameEnemyReady, setGameEnemyReady, gameRole, setGameRole, gameRoleActive, setGameRoleActive, gameTimeRate, setGameTimeRate, gamePoint, setGamePoint, gameCombo, setGameCombo, animationCountGameTime, informationJson, zIndex, priority }}>
    <layout>
      <Background />
      <Enemy />
      <Infomation />
      <Map />
      <Setting />
      <Role />
    </layout>
  </ContextPlayground.Provider>
}

export default App