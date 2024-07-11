import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './Hit.Component.PointDropCircle'

import { json_0 } from './json'

function Scene() {
  const context = React.useContext(Context)

  const locationCoordinate = React.useMemo(() => Canvas2d.Location.coordinate(context.locationLayout), [context.locationLayout])

  return <layout>
    <rect
      beginPath
      fill
      cx={locationCoordinate.w / 2}
      cy={locationCoordinate.h - 100 * 3 - 16}
      w='200%'
      h={4}
      lineWidth={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.25}
    />

    <rect
      beginPath
      fill
      cx={locationCoordinate.w / 2}
      cy={locationCoordinate.h - 100 * 3}
      w='200%'
      h={4}
      lineWidth={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={1}
    />

    <rect
      beginPath
      fill
      cx={locationCoordinate.w / 2}
      cy={locationCoordinate.h - 100 * 3 + 16}
      w='200%'
      h={4}
      lineWidth={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.25}
    />

  </layout>
}

function Hit() {
  const context = React.useContext(Context)

  const locationCoordinate = React.useMemo(() => Canvas2d.Location.coordinate(context.locationLayout), [context.locationLayout])

  const jsonInformation = React.useMemo(() => json_0(locationCoordinate), [])

  // const add = () => {
  //   var init

  //   init = initHitPointDropCircle

  //   const hit = { key: Math.random(), destory: () => context.setHit(i => i.filter(n => n !== hit)), ...init(locationCoordinate) }

  //   context.setHit(i => [...i, hit])
  // }

  // React.useEffect(() => { if (context.animationCountTime > 60) add() }, [context.animationCountTime])

  React.useEffect(() => {
    if (jsonInformation.hits.length > 0 && context.animationCountTime > jsonInformation.hits[0].time) {
      const shift = jsonInformation.hits.shift()

      const hit = { key: Math.random(), destory: () => context.setHit(i => i.filter(n => n !== hit)), ...shift.init(locationCoordinate, shift.option) }

      context.setHit(i => [...i, hit])
    }
  }, [context.animationCountTime])

  const HitsMemo = React.useMemo(() => {
    return context.hit.map((i) => {
      var Component

      if (i.type === 'PointDropCircle') Component = AppHitPointDropCircle

      return <Component key={i.key} option={i.option} destory={i.destory} rate={context.rate} locationLayout={context.locationLayout} setScore={context.setScore} setRotate={context.setRotate} />
    })
  }, [context.hit, context.rate, context.locationLayout, context.setScore, context.setRotate])

  return <layout>{HitsMemo}</layout>
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
  const [rate, setRate] = React.useState(1)

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const { animationCount: animationCountTime } = React.Plugin.useAnimationCount({ play: loadLayout, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: rate })
  const { animationCount: animationCountRotate, setAnimationCount: setAnimationCountRotate } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: Math.PI * 2 / 360 * rate / 8 })

  const SceneMemo = React.useMemo(() => <Scene />, [hit, loadLayout, locationLayout])
  const HitMemo = React.useMemo(() => <Hit />, [hit, loadLayout, locationLayout, animationCountTime])
  const ScoreMemo = React.useMemo(() => <Score />, [score, loadLayout, locationLayout])

  const value = { hit, setHit, score, setScore, rate, setRate, loadLayout, locationLayout, animationCountTime, setRotate: setAnimationCountRotate }

  return <Context.Provider value={value}>
    <layout onLocationMount={dom => refLayout.current = dom}>
      {
        loadLayout ?
          <>
            <translate translateX={locationLayout.x + locationLayout.w / 2} translateY={(locationLayout.y + locationLayout.h / 2)}>
              <rotate rotateAngle={animationCountRotate}>
                <translate translateX={(locationLayout.x + locationLayout.w / 2) * -1} translateY={(locationLayout.y + locationLayout.h / 2) * -1}>
                  {SceneMemo}
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