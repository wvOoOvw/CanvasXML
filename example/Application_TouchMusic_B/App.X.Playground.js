import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.X.Playground.X.Background'
import Point from './App.X.Playground.X.Point'
import Infomation from './App.X.Playground.X.Infomation'
import Music from './App.X.Playground.X.Music'
import Wire from './App.X.Playground.X.Wire'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gamePlay, setGamePlay] = React.useState(true)
  const [gamePoint, setGamePoint] = React.useState([])
  const [gameWire, setGameWire] = React.useState([])
  const [gameMusic, setGameMusic] = React.useState()
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountGameTime } = React.useAnimationDestination({ play: gamePlay, defaultCount: 0, destination: Infinity, rate: gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const information = React.useMemo(() => jsonA(contextApp), [])

  const BackgroundMemo = React.useMemo(() => <Background />, [contextApp.locationLayout, gamePlay])
  const PointMemo = React.useMemo(() => <Point />, [contextApp.locationLayout, gamePlay, gamePoint, gameWire, animationCountGameTime])
  const InfomationMemo = React.useMemo(() => <Infomation />, [contextApp.locationLayout, gamePlay, gamePoint, animationCountGameTime])
  const MusicMemo = React.useMemo(() => <Music />, [contextApp.locationLayout, gamePlay, gameMusic])
  const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gamePoint, gameWire, animationCountGameTime])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gamePoint, setGamePoint, gameWire, setGameWire, gameMusic, setGameMusic, gameTimeRate, setGameTimeRate, animationCountGameTime, information }}>
    <layout>
      {MusicMemo}
      {PointMemo}
      {WireMemo}
    </layout>
  </ContextPlayground.Provider>
}

export default App