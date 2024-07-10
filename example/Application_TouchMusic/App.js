import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import HitRender from './Hit.Render'
import { initHitxCircleDropVertical } from './Hit.Component.HitxCircleDropVertical'
import { initHitxCircleVertical } from './Hit.Component.HitxCircleVertical'

function Hit() {
  const context = React.useContext(Context)

  const locationCoordinate = React.useMemo(() => Canvas2d.Location.coordinate(context.locationLayout), [context.locationLayout])

  const add = () => {
    var h
    const ramdom = Math.ceil(Math.random() * 2)
    if (ramdom === 1) h = initHitxCircleDropVertical
    if (ramdom === 2) h = initHitxCircleVertical

    h = initHitxCircleDropVertical

    const hit = {
      key: Math.random(),
      hit: h(locationCoordinate),
      destory: () => context.setHit(pre => pre.filter(n => n !== hit)),
      onHit: (score) => {
        context.setScore(pre => pre + score * 100)
        context.dispatchRotate()
      }
    }

    context.setHit(pre => [...pre, hit])
  }

  React.useEffect(() => { if (context.animationCountTime % 60 === 0) add() }, [context.animationCountTime, 15])

  return <layout>
    {
      context.hit.map((i) => <HitRender key={i.key} hit={i.hit} destory={i.destory} onHit={i.onHit} rate={context.rate} />)
    }
  </layout>
}

function Score() {
  const context = React.useContext(Context)

  const { animationCount: animationCountScore } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.score, rate: 8 })

  const score = animationCountScore.toFixed()

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
  const [rate, setRate] = React.useState(8)

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const { animationCount: animationCountTime } = React.Plugin.useAnimationCount({ play: loadLayout, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: 1 })
  const { animationCount: animationCountRotate, setAnimationCount: setAnimationCountRotate } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: Math.PI * 2 / 360 * (rate / 8) / 8 })

  const HitMemo = React.useMemo(() => <Hit />, [hit, loadLayout, locationLayout, animationCountTime])
  const ScoreMemo = React.useMemo(() => <Score />, [score, loadLayout, locationLayout])

  const dispatchRotate = () => setAnimationCountRotate(animationCountRotate + Math.PI * 2 / 360 * 4 * (Math.random() > 0.5 ? 1 : -1))

  const value = { hit, setHit, score, setScore, rate, setRate, loadLayout, locationLayout, animationCountTime, dispatchRotate }

  return <Context.Provider value={value}>
    <layout onLocationMount={dom => refLayout.current = dom}>
      {
        loadLayout ?
          <>
            <translate translateX={locationLayout.x + locationLayout.w / 2} translateY={(locationLayout.y + locationLayout.h / 2)}>
              <rotate rotateAngle={animationCountRotate}>
                <translate translateX={(locationLayout.x + locationLayout.w / 2) * -1} translateY={(locationLayout.y + locationLayout.h / 2) * -1}>
                  {HitMemo}
                  {ScoreMemo}
                </translate>
              </rotate>
            </translate>
          </>
          : null
      }
    </layout>
  </Context.Provider>
}

export default App