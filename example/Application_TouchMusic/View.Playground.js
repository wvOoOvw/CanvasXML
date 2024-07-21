import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Audio from './View.Playground.Audio'
import Hit from './View.Playground.Hit'
import Info from './View.Playground.Info'
import Role from './View.Playground.Role'
import TransformDecorator from './View.Playground.TransformDecorator'
import Wire from './View.Playground.Wire'

import { jsonA, jsonB } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameHit, setGameHit] = React.useState([])
  const [gameHitSuccess, setGameHitSuccess] = React.useState([])
  const [gameHitFail, setGameHitFail] = React.useState([])
  const [gameWire, setGameWire] = React.useState([])
  const [gameRole, setGameRole] = React.useState([])
  const [gameRoleActive, setGameRoleActive] = React.useState()
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { animationCount: animationCountGameTime } = React.useAnimationCount({ play: gamePlay, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: gameTimeRate })

  const information = React.useMemo(() => jsonA(contextApp), [])

  const AudioMemo = React.useMemo(() => <Audio />, [contextApp.locationLayout, gamePlay])
  const HitMemo = React.useMemo(() => <Hit />, [contextApp.locationLayout, gamePlay, gameHit, gameRoleActive, gameTimeRate, animationCountGameTime])
  const InfoMemo = React.useMemo(() => <Info />, [contextApp.locationLayout, gamePlay, gameHit, gameHitSuccess, gameHitFail, animationCountGameTime])
  const RoleMemo = React.useMemo(() => <Role />, [contextApp.locationLayout, gamePlay, gameHit, gameRole, gameRoleActive, animationCountGameTime])
  const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gameWire, gameRoleActive, gameTimeRate, animationCountGameTime])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameHit, gameHitSuccess, setGameHitSuccess, gameHitFail, setGameHitFail, setGameHit, gameWire, setGameWire, gameRole, setGameRole, gameRoleActive, setGameRoleActive, gameTimeRate, setGameTimeRate, information, animationCountGameTime }}>
    <TransformDecorator>
      {AudioMemo}
      {RoleMemo}
      {WireMemo}
      {HitMemo}
      {InfoMemo}
    </TransformDecorator>
  </ContextPlayground.Provider>
}

export default App