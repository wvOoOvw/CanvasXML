import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

import Loading from './View.Loading'
import Entry from './View.Entry'
import Playground from './View.Playground'

import pngA from './static/15418_5819817346.png'
import pngB from './static/161527_92732416628.png'
import pngC from './static/172347_42778254000.png'
import pngD from './static/3311_66125319722.png'

import StormsEye from './static/StormsEye.m4a'
// import Door from './static/Door.m4a'

function App() {
  const [loadTimeout, setLoadTimeout] = React.useState(false)

  const [router, setRouter] = React.useState('')

  const { load: loadPngA, image: imagePngA } = ReactCanvas2d.useImage({ src: pngA })
  const { load: loadPngB, image: imagePngB } = ReactCanvas2d.useImage({ src: pngB })
  const { load: loadPngC, image: imagePngC } = ReactCanvas2d.useImage({ src: pngC })
  const { load: loadPngD, image: imagePngD } = ReactCanvas2d.useImage({ src: pngD })
  const { load: loadStormsEye, audio: audioStormsEye } = ReactCanvas2d.useAudio({ src: StormsEye })

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const unitpx = React.useMemo(() => {
    if (loadLayout) {
      const w = locationLayout.w
      const h = locationLayout.h

      const ratio = w / h

      let px

      const minRatio = 0.25
      const maxRatio = 1 / 0.25
      const midRatio = 1

      var minPx = w
      var maxPx = h
      var midPx = w * 0.2 + h * 0.2

      if (ratio < midRatio) midPx = w * 0.4
      if (ratio > midRatio) midPx = h * 0.4

      if (ratio < minRatio || ratio === minRatio) px = minPx
      if (ratio > maxRatio || ratio === maxRatio) px = maxPx
      if (ratio === midRatio) px = midPx
      if (ratio > minRatio && ratio < midRatio) px = minPx + ((ratio - minRatio) / (midRatio - minRatio)) * (midPx - minPx)
      if (ratio > midRatio && ratio < maxRatio) px = midPx + ((ratio - midRatio) / (maxRatio - midRatio)) * (maxPx - midPx)

      return px
    }
  }, [loadLayout, locationLayout])

  const load = loadTimeout && loadPngA && loadPngB && loadPngC && loadPngD && loadLayout

  const LoadingMemo = React.useMemo(() => <Loading />, [])
  const EntryMemo = React.useMemo(() => <Entry />, [])
  const PlaygroundMemo = React.useMemo(() => <Playground />, [])

  React.useEffect(() => {
    setTimeout(() => setLoadTimeout(true), 1000)
  }, [])

  React.useEffect(() => {
    if (load === false && loadLayout === true) setRouter('Loading')
    if (load === true) setRouter('Entry')
  }, [load, loadLayout])

  return <ContextApp.Provider value={{ setRouter, locationLayout, unitpx, imagePngA, imagePngB, imagePngC, imagePngD, audioStormsEye }}>
    <layout onLocationMount={dom => refLayout.current = dom}>
      {
        router === 'Loading' ?
          <>
            {LoadingMemo}
          </>
          : null
      }

      {
        router === 'Entry' ?
          <>
            {EntryMemo}
          </>
          : null
      }

      {
        router === 'Playground' ?
          <>
            {PlaygroundMemo}
          </>
          : null
      }
    </layout>
  </ContextApp.Provider>
}

export default App