import { React, ReactCanvas2d } from '../../package/index'

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
  const [gameWire, setGameWire] = React.useState([])
  const [gamePoint, setGamePoint] = React.useState(0)
  const [gameExpend, setGameExpend] = React.useState(20)
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountGameTime } = React.useAnimationDestination({ play: gamePlay, defaultCount: 0, destination: Infinity, rate: gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const informationJson = React.useMemo(() => jsonA(contextApp), [])

  const zIndex = React.useMemo(() => {
    const array = new Array(
      'WireMeth',
      'HitMeth',
      'WireImage',
      'InfomationAction',
      'InfomationDuration',
      'InfomationPoint',
      'InfomationExpend',
      'WireSpecialAnimation',
      'WireHitAnimation',
    )
    return array.reduce((t, i, index) => Object({ ...t, [i]: 1000 + index }), Object())
  }, [])

  const expendLocationRef = React.useRef()

  // const BackgroundMemo = React.useMemo(() => <Background />, [contextApp.locationLayout, gamePlay])
  // const PointMemo = React.useMemo(() => <Hit />, [contextApp.locationLayout, gamePlay, gameHit, gameWire, animationCountGameTime])
  // const InfomationMemo = React.useMemo(() => <Infomation />, [contextApp.locationLayout, gamePlay, gameHit, animationCountGameTime])
  // const MusicMemo = React.useMemo(() => <Music />, [contextApp.locationLayout, gamePlay, gameMusic])
  // const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gameHit, gameWire, animationCountGameTime])

  return <ContextPlayground.Provider value={{ gamePlay, setGamePlay, gameHit, setGameHit, gameWire, setGameWire, gameTimeRate, setGameTimeRate, gameExpend, gamePoint, setGamePoint, setGameExpend, animationCountGameTime, informationJson, zIndex, expendLocationRef }}>
    <Background />
    <Infomation />
    <Hit />
    <Wire />
  </ContextPlayground.Provider>
}

export default App