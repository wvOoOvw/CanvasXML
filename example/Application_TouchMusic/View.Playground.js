import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Audio from './View.Playground.Audio'
import Hit from './View.Playground.Hit'
import InfomationCombo from './View.Playground.InfomationCombo'
import InfomationDuration from './View.Playground.InfomationDuration'
import RolePanel from './View.Playground.RolePanel'
import RoleCard from './View.Playground.RoleCard'
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
  const InfomationComboMemo = React.useMemo(() => <InfomationCombo />, [contextApp.locationLayout, gamePlay, gameHit, gameHitSuccess, gameHitFail])
  const InfomationDurationMemo = React.useMemo(() => <InfomationDuration />, [contextApp.locationLayout, animationCountGameTime])
  const RolePanelMemo = React.useMemo(() => <RolePanel />, [contextApp.locationLayout, gamePlay, gameHit, gameRole, gameRoleActive, animationCountGameTime])
  const RoleCardMemo = React.useMemo(() => <RoleCard />, [contextApp.locationLayout, gamePlay, gameRole, gameRoleActive])
  const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gameWire, gameRoleActive, gameTimeRate, animationCountGameTime])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameHit, gameHitSuccess, setGameHitSuccess, gameHitFail, setGameHitFail, setGameHit, gameWire, setGameWire, gameRole, setGameRole, gameRoleActive, setGameRoleActive, gameTimeRate, setGameTimeRate, information, animationCountGameTime }}>
    <TransformDecorator>
      {AudioMemo}
      {RolePanelMemo}
      {RoleCardMemo}
      {WireMemo}
      {HitMemo}
      {InfomationDurationMemo}
      {InfomationComboMemo}
    </TransformDecorator>
  </ContextPlayground.Provider>
}

export default App