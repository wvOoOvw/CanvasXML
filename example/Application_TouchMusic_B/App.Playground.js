import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.Playground.Background'
import Hit from './App.Playground.Hit'
import Infomation from './App.Playground.Infomation'
import Wire from './App.Playground.Wire'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameHit, setGameHit] = React.useState([])
  const [gameHitReady, setGameHitReady] = React.useState([])
  const [gameWire, setGameWire] = React.useState([])
  const [gameWireActive, setGameWireActive] = React.useState()
  const [gamePoint, setGamePoint] = React.useState(0)
  const [gameTimeRate, setGameTimeRate] = React.useState(1)
  const [gameCombo, setGameCombo] = React.useState(0)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountGameTime } = ReactExtensions.useAnimationDestination({ play: gamePlay, defaultCount: 0, destination: Infinity, rate: gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const informationJson = React.useMemo(() => jsonA(contextApp), [])

  const zIndex = React.useMemo(() => {
    const array = new Array(
      'WireMeth',
      'HitMeth',
      'WireBackground',
      'WireHitAnimation',
      'WireSetting',
      'InfomationCombo',
    )
    return array.reduce((t, i, index) => Object({ ...t, [i]: 1000 + index }), Object())
  }, [])

  const priority = React.useMemo(() => {
    const array = new Array(
      'WireAction',
      'WireSetting',
    )
    return array.reduce((t, i, index) => Object({ ...t, [i]: 1000 + index }), Object())
  }, [])

  const expendLocationRef = React.useRef()

  // const BackgroundMemo = React.useMemo(() => <Background />, [contextApp.locationLayout, gamePlay])
  // const PointMemo = React.useMemo(() => <Hit />, [contextApp.locationLayout, gamePlay, gameHit, gameWire, animationCountGameTime])
  // const InfomationMemo = React.useMemo(() => <Infomation />, [contextApp.locationLayout, gamePlay, gameHit, animationCountGameTime])
  // const MusicMemo = React.useMemo(() => <Music />, [contextApp.locationLayout, gamePlay, gameMusic])
  // const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gameHit, gameWire, animationCountGameTime])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameHit, setGameHit, gameHitReady, setGameHitReady, gameWire, setGameWire, gameWireActive, setGameWireActive, gameTimeRate, setGameTimeRate, gamePoint, setGamePoint, gameCombo, setGameCombo, animationCountGameTime, informationJson, zIndex, priority, expendLocationRef }}>
    <Background />
    <Infomation />
    <Hit />
    <Wire />
    {/* <WirePanel /> */}
  </ContextPlayground.Provider>
}

export default App