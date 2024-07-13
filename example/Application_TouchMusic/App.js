import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import Hit from './View.Hit'
import Role from './View.Role'
import Scene from './View.Scene'
import Score from './View.Score'
import Start from './View.Start'

import pngA from './static/15418_5819817346.png'
import pngB from './static/161527_92732416628.png'
import pngC from './static/172347_42778254000.png'
import pngD from './static/3311_66125319722.png'

import StormsEye from './static/StormsEye.m4a'
import Door from './static/Door.m4a'

import { json_0 } from './json'

function App() {
  const [gamePlay, setGamePlay] = React.useState(true)
  const [gameHit, setGameHit] = React.useState([])
  const [gameHitSuccess, setGameHitSuccess] = React.useState([])
  const [gameHitFail, setGameHitFail] = React.useState([])
  const [gameScore, setGameScore] = React.useState(0)
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { load: loadPngA, image: imagePngA } = ReactCanvas2d.Plugin.useImage({ src: pngA })
  const { load: loadPngB, image: imagePngB } = ReactCanvas2d.Plugin.useImage({ src: pngB })
  const { load: loadPngC, image: imagePngC } = ReactCanvas2d.Plugin.useImage({ src: pngC })
  const { load: loadPngD, image: imagePngD } = ReactCanvas2d.Plugin.useImage({ src: pngD })
  const { load: loadStormsEye, audio: audioStormsEye } = ReactCanvas2d.Plugin.useAudio({ src: StormsEye })

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const load = loadPngA && loadPngB && loadPngC && loadPngD && loadStormsEye && loadLayout

  const { animationCount: animationCountGameTime } = React.Plugin.useAnimationCount({ play: load && gamePlay, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: gameTimeRate })

  const gameInformation = React.useMemo(() => { if (load) return json_0(locationLayout) }, [load])

  const HitMemo = React.useMemo(() => <Hit />, [loadLayout, locationLayout, gamePlay, gameHit, gameTimeRate, animationCountGameTime])
  const RoleMemo = React.useMemo(() => <Role />, [loadLayout, locationLayout, gamePlay, animationCountGameTime])
  const SceneMemo = React.useMemo(() => <Scene />, [loadLayout, locationLayout, gamePlay, gameHit, gameHitSuccess, gameHitFail])
  const ScoreMemo = React.useMemo(() => <Score />, [loadLayout, locationLayout, gamePlay, gameHitSuccess, gameScore])
  const StartMemo = React.useMemo(() => <Start />, [loadLayout, locationLayout, gamePlay])

  // React.useEffect(() => {
  //   if (gamePlay) audioStormsEye.play()
  //   if (gamePlay) return () => audioStormsEye.pause()
  // }, [gamePlay])

  return <Context.Provider value={{ gameInformation, gamePlay, setGamePlay, gameHit, setGameHit, gameHitSuccess, setGameHitSuccess, gameHitFail, setGameHitFail, gameScore, setGameScore, gameTimeRate, setGameTimeRate, loadLayout, locationLayout, animationCountGameTime, imagePngA, imagePngB, imagePngC, imagePngD, audioStormsEye }}>
    <layout onLocationMount={dom => refLayout.current = dom}>
      {
        load ?
          <>
            {StartMemo}
            {RoleMemo}
            {SceneMemo}
            {HitMemo}
            {ScoreMemo}
          </>
          : null
      }
    </layout>
  </Context.Provider>
}

export default App