import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import HitRender from './Hit.Render'
import { initHitx001xCircleVertical } from './Hit.Component.Hitx001xCircleVertical'

function Hit() {
  const context = React.useContext(Context)

  const locationCoordinate = React.useMemo(() => Canvas2d.Location.coordinate(context.locationLayout), [context.locationLayout])

  const add = () => {
    const hit = {
      key: Math.random(),
      hit: initHitx001xCircleVertical(locationCoordinate),
      destory: () => context.setHit(pre => pre.filter(n => n !== hit)),
      onHit: (score) => context.setScore(pre => pre + score * 100)
    }

    context.setHit(pre => [...pre, hit])
  }


  React.useEffect(() => { if (context.animationCount % context.rate === 0) add() }, [context.animationCount, context.rate])

  return <layout>
    {
      context.hit.map((i) => <HitRender key={i.key} hit={i.hit} destory={i.destory} onHit={i.onHit} />)
    }
  </layout>
}

function Score() {
  const context = React.useContext(Context)

  const { transitionCount: transitionCountScore } = React.Plugin.useTransitionCount({ play: true, defaultCount: 0, destination: context.score, rate: 8 })

  const score = transitionCountScore.toFixed()

  return <layout container verticalCenter horizontalAlignCenter>
    <ReactCanvas2d.Component.TextCaculateLine text={`HIT`} font='24px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>

    <layout h='32px' item></layout>

    <ReactCanvas2d.Component.TextCaculateLine text={score} font='48px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='48px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>
  </layout>
}

function App() {
  const [hit, setHit] = React.useState([])
  const [score, setScore] = React.useState(0)
  const [rate, setRate] = React.useState(45)

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const { animationCount } = React.Plugin.useAnimationCount({ play: loadLayout, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: 1 })

  const HitMemo = React.useMemo(() => <Hit />, [hit, loadLayout, locationLayout, animationCount % rate])
  const ScoreMemo = React.useMemo(() => <Score />, [score, loadLayout, locationLayout])

  const value = { hit, setHit, score, setScore, rate, setRate, loadLayout, locationLayout, animationCount }

  return <Context.Provider value={value}>
    <layout onLocationMount={dom => refLayout.current = dom}>
      {
        loadLayout ? [HitMemo, ScoreMemo] : null
      }
    </layout>
  </Context.Provider>
}

export default App