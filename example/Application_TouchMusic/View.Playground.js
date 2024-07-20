import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Animation from './View.Playground.Animation'
import Audio from './View.Playground.Audio'
import Hit from './View.Playground.Hit'
import Info from './View.Playground.Info'
import Role from './View.Playground.Role'
import Wire from './View.Playground.Wire'

import { jsonA, jsonB } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameHit, setGameHit] = React.useState([])
  const [gameHitSuccess, setGameHitSuccess] = React.useState([])
  const [gameHitFail, setGameHitFail] = React.useState([])
  const [gameWire, setGameWire] = React.useState([])
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const [roleActive, setRoleActive] = React.useState(false)

  const { animationCount: animationCountGameTime } = React.useAnimationCount({ play: gamePlay, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: gameTimeRate })

  const information = React.useMemo(() => jsonA(contextApp.locationLayout, contextApp.unitpx), [contextApp.locationLayout, contextApp.unitpx])

  const AudioMemo = React.useMemo(() => <Audio />, [contextApp.locationLayout, gamePlay])
  const HitMemo = React.useMemo(() => <Hit />, [contextApp.locationLayout, gamePlay, gameHit, gameTimeRate, animationCountGameTime, roleActive])
  const InfoMemo = React.useMemo(() => <Info />, [contextApp.locationLayout, gamePlay, gameHit, gameHitSuccess, gameHitFail, animationCountGameTime])
  const RoleMemo = React.useMemo(() => <Role />, [contextApp.locationLayout, gamePlay, animationCountGameTime, setRoleActive])
  const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gameWire, gameTimeRate, animationCountGameTime, roleActive])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameHit, gameHitSuccess, setGameHitSuccess, gameHitFail, setGameHitFail, setGameHit, gameWire, setGameWire, gameTimeRate, setGameTimeRate, information, animationCountGameTime, roleActive, setRoleActive }}>
    <layout>
      <Animation>
        {AudioMemo}
        {InfoMemo}
        {RoleMemo}
        {WireMemo}
        {HitMemo}
      </Animation>
    </layout>
  </ContextPlayground.Provider>
}

export default App