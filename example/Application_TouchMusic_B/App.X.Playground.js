import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import Background from './App.X.Playground.X.Background'
import Hit from './App.X.Playground.X.Hit'
import Infomation from './App.X.Playground.X.Infomation'
import Load from './App.X.Playground.X.Load'
import Music from './App.X.Playground.X.Music'
import Wire from './App.X.Playground.X.Wire'

import { jsonA } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [gameLoad, setGameLoad] = React.useState(false)
  const [gamePlay, setGamePlay] = React.useState(false)
  const [gameHit, setGameHit] = React.useState([])
  const [gameWire, setGameWire] = React.useState([])
  const [gameMusic, setGameMusic] = React.useState()
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountGameTime } = React.useAnimationDestination({ play: gamePlay, defaultCount: 0, destination: Infinity, rate: gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const information = React.useMemo(() => jsonA(contextApp), [])

  const BackgroundMemo = React.useMemo(() => <Background />, [contextApp.locationLayout, gamePlay])
  const HitMemo = React.useMemo(() => <Hit />, [contextApp.locationLayout, gamePlay, gameHit, gameWire, animationCountGameTime])
  const InfomationMemo = React.useMemo(() => <Infomation />, [contextApp.locationLayout, gamePlay, gameHit, animationCountGameTime])
  const LoadMemo = React.useMemo(() => <Load />, [contextApp.locationLayout])
  const MusicMemo = React.useMemo(() => <Music />, [contextApp.locationLayout, gamePlay, gameMusic])
  const WireMemo = React.useMemo(() => <Wire />, [contextApp.locationLayout, gamePlay, gameHit, gameWire, animationCountGameTime])

  React.useEffect(() => {
    if (gameHit.length > 0 && gameWire.length > 0) {
      setGamePlay(true)
    }
  }, [gameHit, gameWire])

  return <ContextPlayground.Provider value={{ gameLoad, setGameLoad, gamePlay, setGamePlay, gameHit, setGameHit, gameWire, setGameWire, gameMusic, setGameMusic, gameTimeRate, setGameTimeRate, animationCountGameTime, information }}>
    <layout>
      {
        gameLoad === false ? 
          <>
            {LoadMemo}
          </>
          : null
      }
      {
        gameLoad === true ? 
          <>
            {MusicMemo}
            {/* {BackgroundMemo} */}
            {HitMemo}
            {WireMemo}
            {/* {InfomationMemo} */}
          </>
          : null
      }
    </layout>
  </ContextPlayground.Provider>
}

export default App