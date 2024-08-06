import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

import Loading from './App.Loading'
import Entry from './App.Entry'
import Playground from './App.Playground'

import jpgBackgroundA from './static/bg.8954cef1.jpg'

import jpgA from './static/role/15418_5819817346.jpg'
import jpgB from './static/role/161527_92732416628.jpg'
import jpgC from './static/role/7351_43140012279.jpg'
import jpgD from './static/role/73728_4832045983.jpg'

import pngBalls9 from './static/kenney_puzzle-pack/Balls/Blue/ballBlue_09.png'
import pngPause from './static/icon/pause-button.png'

import StormsEye from './static/bgm/StormsEye.m4a'
// import Door from './static/bgm/Door.m4a'

import PianoV1E1 from './static/PianoV1/e1.m4a'
import PianoV1E2 from './static/PianoV1/e2.m4a'
import PianoV1E3 from './static/PianoV1/e3.m4a'
import PianoV1E4 from './static/PianoV1/e4.m4a'
import PianoV1E5 from './static/PianoV1/e5.m4a'
import PianoV1E6 from './static/PianoV1/e6.m4a'
import PianoV1E7 from './static/PianoV1/e7.m4a'

function App() {
  const [loadTimeout, setLoadTimeout] = React.useState(false)

  const [router, setRouter] = React.useState('')

  const { load: loadBackgroundA, image: imageBackgroundA } = ReactCanvas2d.useImage({ src: jpgBackgroundA })
  const { load: loadImageA, image: imageA } = ReactCanvas2d.useImage({ src: jpgA })
  const { load: loadImageB, image: imageB } = ReactCanvas2d.useImage({ src: jpgB })
  const { load: loadImageC, image: imageC } = ReactCanvas2d.useImage({ src: jpgC })
  const { load: loadImageD, image: imageD } = ReactCanvas2d.useImage({ src: jpgD })
  const { load: loadImageBalls9, image: imageBalls9 } = ReactCanvas2d.useImage({ src: pngBalls9 })
  const { load: loadImagePngPause, image: imagePngPause } = ReactCanvas2d.useImage({ src: pngPause })
  const { load: loadAudioStormsEye, audio: audioStormsEye } = ReactCanvas2d.useAudio({ src: StormsEye })
  const { load: loadAudioPianoV1E1, audio: audioPianoV1E1 } = ReactCanvas2d.useAudio({ src: PianoV1E1 })
  const { load: loadAudioPianoV1E2, audio: audioPianoV1E2 } = ReactCanvas2d.useAudio({ src: PianoV1E2 })
  const { load: loadAudioPianoV1E3, audio: audioPianoV1E3 } = ReactCanvas2d.useAudio({ src: PianoV1E3 })
  const { load: loadAudioPianoV1E4, audio: audioPianoV1E4 } = ReactCanvas2d.useAudio({ src: PianoV1E4 })
  const { load: loadAudioPianoV1E5, audio: audioPianoV1E5 } = ReactCanvas2d.useAudio({ src: PianoV1E5 })
  const { load: loadAudioPianoV1E6, audio: audioPianoV1E6 } = ReactCanvas2d.useAudio({ src: PianoV1E6 })
  const { load: loadAudioPianoV1E7, audio: audioPianoV1E7 } = ReactCanvas2d.useAudio({ src: PianoV1E7 })

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { x: undefined, y: undefined, w: undefined, h: undefined } })

  const unitpx = React.useMemo(() => {
    if (loadLayout) {
      const w = locationLayout.w
      const h = locationLayout.h

      const ratio = w / h

      let px

      const minRatio = 0.25
      const maxRatio = 1 / 0.25
      const midRatio = 1

      const minPxRatioW = 0.3
      const minPxRatioH = 0.3

      var minPx = w
      var maxPx = h
      var midPx = w * minPxRatioW + h * minPxRatioH

      if (ratio < midRatio) midPx = w * minPxRatioW * 2
      if (ratio > midRatio) midPx = h * minPxRatioH * 2

      if (ratio < minRatio || ratio === minRatio) px = minPx
      if (ratio > maxRatio || ratio === maxRatio) px = maxPx
      if (ratio === midRatio) px = midPx
      if (ratio > minRatio && ratio < midRatio) px = minPx + ((ratio - minRatio) / (midRatio - minRatio)) * (midPx - minPx)
      if (ratio > midRatio && ratio < maxRatio) px = midPx + ((ratio - midRatio) / (maxRatio - midRatio)) * (maxPx - midPx)

      if (px > 768) px = px - px * (1 - 768 / px)

      return px
    }
  }, [loadLayout, locationLayout])

  const load = loadTimeout && loadBackgroundA && loadImageA && loadImageB && loadImageC && loadImageD && loadImageBalls9 && loadImagePngPause && loadLayout

  const LoadingMemo = React.useMemo(() => <Loading load={load} onDestory={() => setRouter('Entry')} />, [load])
  const EntryMemo = React.useMemo(() => <Entry onDestory={() => setRouter('Playground')} />, [])
  const PlaygroundMemo = React.useMemo(() => <Playground />, [])

  React.useEffect(() => {
    setTimeout(() => setLoadTimeout(true), 1000)
  }, [])

  React.useEffect(() => {
    if (loadLayout) setRouter('Loading')
    // if (loadLayout) setRouter('Entry')
    if (loadLayout) setRouter('Playground')
  }, [loadLayout])

  return <ContextApp.Provider value={{ setRouter, locationLayout, unitpx, imageA, imageB, imageC, imageD, imageBalls9, imagePngPause, imageBackgroundA, audioStormsEye, audioPianoV1E1, audioPianoV1E2, audioPianoV1E3, audioPianoV1E4, audioPianoV1E5, audioPianoV1E6, audioPianoV1E7 }}>
    <layout onLocationMounted={dom => refLayout.current = dom}>
      {
        router === 'Loading' ? LoadingMemo : null
      }

      {
        router === 'Entry' ? EntryMemo : null
      }

      {
        router === 'Playground' ? PlaygroundMemo : null
      }
    </layout>
  </ContextApp.Provider>
}

export default App