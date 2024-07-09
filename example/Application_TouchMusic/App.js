import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import HitRender from './Hit.Render'
import { initHitx001xCircleVertical } from './Hit.Component.Hitx001xCircleVertical'

function Hit() {
  const context = React.useContext(Context)

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const locationCoordinate = React.useMemo(() => Canvas2d.Location.coordinate(locationLayout), [locationLayout])

  const add = () => {
    const hit = {
      key: Math.random(),
      hit: initHitx001xCircleVertical(locationCoordinate),
      destory: () => context.setHit(pre => pre.filter(n => n !== hit)),
      onHit: (score) => context.setScore(pre => pre + score * 100)
    }

    context.setHit(pre => [...pre, hit])
  }

  const { animationCount } = React.Plugin.useAnimationCount({ play: loadLayout, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: 1 })

  React.useEffect(() => { if (loadLayout && animationCount % 45 === 0) add() }, [loadLayout, animationCount])

  return <layout onLocationMount={dom => refLayout.current = dom}>
    {
      context.hit.map((i) => <HitRender key={i.key} hit={i.hit} destory={i.destory} onHit={i.onHit} />)
    }
  </layout>
}

function Score() {
  const context = React.useContext(Context)

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountScore } = React.Plugin.useTransitionCount({ play: true, defaultCount: 0, destination: context.score, rate: 8 })

  const score = transitionCountScore.toFixed()

  return <layout container verticalCenter horizontalAlignCenter onLocationMount={dom => refLayout.current = dom}>

    {
      loadLayout ? 
        <>
          <ReactCanvas2d.Component.TextCaculateLine text={`HIT`} font='24px monospace' lineHeight={1} gap={0} w={locationLayout.w - 48} split=' ' wrap>
            {
              (line, location) => {
                return <layout w={location.w} h={location.h} item>
                  <text fillText fillStyle='white' align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
                </layout>
              }
            }
          </ReactCanvas2d.Component.TextCaculateLine>

          <layout h='32px' item></layout>

          <ReactCanvas2d.Component.TextCaculateLine text={score} font='48px monospace' lineHeight={1} gap={0} w={locationLayout.w - 48} split=' ' wrap>
            {
              (line, location) => {
                return <layout w={location.w} h={location.h} item>
                  <text fillText fillStyle='white' align='center' font='48px monospace' lineHeight={1} gap={0} line={line} />
                </layout>
              }
            }
          </ReactCanvas2d.Component.TextCaculateLine>
        </>
        : null
    }

  </layout>
}

// function Track() {
//   const [linePath, setLinePath] = React.useState([])

//   const onPointerMove = e => {
//     if (linePath.length === 20) {
//       setLinePath([...linePath, { x: e.x, y: e.y }].filter((i, index) => index !== 0))
//     }
//     if (linePath.length !== 20) {
//       setLinePath([...linePath, { x: e.x, y: e.y }])
//     }
//   }

//   const onPointerMoveAway = e => {
//     if (linePath.length > 0) {
//       setLinePath(linePath.filter((i, index) => index !== 0))
//     }
//   }

//   return <layout>
//     <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway}></rect>
//     <line beginPath stroke path={linePath.map(i => Object({ x: i.x, y: i.y }))} strokeStyle='rgba(255, 255, 255, 1)' lineWidth={2}></line>
//   </layout>
// }

function App() {
  const [hit, setHit] = React.useState([])
  const [score, setScore] = React.useState(0)

  const value = { hit, setHit, score, setScore }

  const HitMemo = React.useMemo(() => <Hit />, [hit])
  const ScoreMemo = React.useMemo(() => <Score />, [score])

  return <Context.Provider value={value}>
    {HitMemo}
    {ScoreMemo}
  </Context.Provider>
}

export default App