import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Animation from './App.Playground.Animation'
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
  const [gameAnimation, setGameAnimation] = React.useState([])
  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameTimeRate, setGameTimeRate] = React.useState(1)
  const [gameMap, setGameMap] = React.useState([])
  const [gameEnemy, setGameEnemy] = React.useState([])
  const [gameEnemyReady, setGameEnemyReady] = React.useState([])
  const [gameRole, setGameRole] = React.useState([])
  const [gameRoleActive, setGameRoleActive] = React.useState()

  const load = gameLoadMap && gameLoadEnemy && gameLoadRole

  const { animationCount: animationCountGameTime } = ReactExtensions.useAnimationDestination({ play: gamePlay && load, defaultCount: 0, destination: Infinity, rate: gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const informationJson = React.useMemo(() => jsonA(contextApp), [])

  const unitpx = React.useMemo(() => {
    var r = Infinity

    gameMap.forEach(i => {
      const containerW = contextApp.locationLayout.w - contextApp.unitpx * 0.5
      const containerH = contextApp.locationLayout.h - contextApp.unitpx * 0.5

      const dimensionW = containerW / i.onDimension()[0]
      const dimensionH = containerH / i.onDimension()[1]

      const dimensionMin = Math.min(dimensionW, dimensionH)

      r = Math.min(r, dimensionMin)
    })

    return r
  }, [gameMap])

  const zIndex = React.useMemo(() => {
    const positive = new Array(
      'RoleBackground',
      'MapMeth',
      'EnemyMeth',
      'RoleMeth',
      'RoleAnimation',
      'RolePanel',
      'GameSetting',
      'GameInfomation',
    ).reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())

    const negative = new Array(

    ).reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  return <ContextPlayground.Provider value={{ gameLoadMap, setGameLoadMap, gameLoadEnemy, setGameLoadEnemy, gameLoadRole, setGameLoadRole, gameAnimation, setGameAnimation, gamePlay, setGamePlay, gameTimeRate, setGameTimeRate, gameMap, setGameMap, gameEnemy, setGameEnemy, gameEnemyReady, setGameEnemyReady, gameRole, setGameRole, gameRoleActive, setGameRoleActive, load, animationCountGameTime, informationJson, unitpx, zIndex }}>
    <layout>
      <Animation />
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