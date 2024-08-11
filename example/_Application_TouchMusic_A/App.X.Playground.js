import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.X.Playground.X.Background'
import Hit from './App.X.Playground.X.Hit'
import Infomation from './App.X.Playground.X.Infomation'
import Music from './App.X.Playground.X.Music'
import Role from './App.X.Playground.X.Role'
import Wire from './App.X.Playground.X.Wire'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameHit, setGameHit] = React.useState([])
  const [gameHitSuccess, setGameHitSuccess] = React.useState([])
  const [gameHitFail, setGameHitFail] = React.useState([])
  const [gameWire, setGameWire] = React.useState([])
  const [gameRole, setGameRole] = React.useState([])
  const [gameRoleActive, setGameRoleActive] = React.useState()
  const [gameMusic, setGameMusic] = React.useState()
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { animationCount: animationCountIntersection } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountGameTime } = ReactExtensions.useAnimationCount({ play: gamePlay, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: gameTimeRate })

  const information = React.useMemo(() => jsonA(contextApp), [])

  const BackgroundMemo = React.useMemo(() => <Background />, [contextApp.locationLayout, gamePlay])
  const HitMemo = React.useMemo(() => <Hit />, [contextApp.locationLayout, gamePlay, gameHit, gameRoleActive, animationCountGameTime])
  const InfomationMemo = React.useMemo(() => <Infomation />, [contextApp.locationLayout, gamePlay, gameHit, gameHitSuccess, gameHitFail, animationCountGameTime])
  const MusicMemo = React.useMemo(() => <Music />, [contextApp.locationLayout, gamePlay, gameMusic])
  const RoleMemo = React.useMemo(() => <Role />, [contextApp.locationLayout, gamePlay, gameHit, gameRole, gameRoleActive, animationCountGameTime])
  const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gameWire, gameRoleActive, animationCountGameTime])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameHit, gameHitSuccess, setGameHitSuccess, gameHitFail, setGameHitFail, setGameHit, gameWire, setGameWire, gameRole, setGameRole, gameRoleActive, setGameRoleActive, gameMusic, setGameMusic, gameTimeRate, setGameTimeRate, animationCountGameTime, information }}>
    <layout globalAlpha={animationCountIntersection}>
      {/* {MusicMemo} */}
      {/* {BackgroundMemo} */}
      {RoleMemo}
      {WireMemo}
      {HitMemo}
      {InfomationMemo}
    </layout>
  </ContextPlayground.Provider>
}

export default App