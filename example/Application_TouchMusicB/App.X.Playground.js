import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.X.Playground.X.Background'
import Hit from './App.X.Playground.X.Hit'
import Infomation from './App.X.Playground.X.Infomation'
import Map from './App.X.Playground.X.Map'
import Music from './App.X.Playground.X.Music'
import Role from './App.X.Playground.X.Role'
import RoleBackground from './App.X.Playground.X.RoleBackground'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameHit, setGameHit] = React.useState([])
  const [gameRole, setGameRole] = React.useState([])
  const [gameRoleUse, setGameRoleUse] = React.useState()
  const [gameMusic, setGameMusic] = React.useState()
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountGameTime } = React.useAnimationCount({ play: gamePlay, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: gameTimeRate })

  const information = React.useMemo(() => jsonA(contextApp), [])

  const BackgroundMemo = React.useMemo(() => <Background />, [contextApp.locationLayout, gamePlay])
  const HitMemo = React.useMemo(() => <Hit />, [contextApp.locationLayout, gamePlay, gameHit, gameRoleUse, animationCountGameTime])
  const InfomationMemo = React.useMemo(() => <Infomation />, [contextApp.locationLayout, gamePlay, gameHit, animationCountGameTime])
  const MusicMemo = React.useMemo(() => <Music />, [contextApp.locationLayout, gamePlay, gameMusic])
  const RoleMemo = React.useMemo(() => <Role />, [contextApp.locationLayout, gamePlay, gameHit, gameRole, gameRoleUse, animationCountGameTime])
  const RoleBackgroundMemo = React.useMemo(() => <RoleBackground />, [contextApp.locationLayout, gamePlay, gameHit, gameRole, gameRoleUse, animationCountGameTime])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameHit, setGameHit, gameRole, setGameRole, gameRoleUse, setGameRoleUse, gameMusic, setGameMusic, gameTimeRate, setGameTimeRate, animationCountGameTime, information }}>
    <layout globalAlpha={animationCountIntersection}>
      {/* {MusicMemo} */}
      {/* {BackgroundMemo} */}
      <Map/>
      {/* {RoleBackgroundMemo} */}
      {HitMemo}
      {RoleMemo}
      {/* {InfomationMemo} */}
    </layout>
  </ContextPlayground.Provider>
}

export default App