import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './Hit.Component.PointDropCircle'

import { json_0 } from './json'

function Scene() {
  const context = React.useContext(Context)

  return <layout>
    <rect
      beginPath
      fill
      cx={context.locationLayout.w / 2}
      cy={context.locationLayout.h - 100 * 3 - 16}
      w='200%'
      h={4}
      lineWidth={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.25}
    />

    <rect
      beginPath
      fill
      cx={context.locationLayout.w / 2}
      cy={context.locationLayout.h - 100 * 3}
      w='200%'
      h={4}
      lineWidth={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={1}
    />

    <rect
      beginPath
      fill
      cx={context.locationLayout.w / 2}
      cy={context.locationLayout.h - 100 * 3 + 16}
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

  React.useEffect(() => {
    if (context.gameInformation.gameHit.length > 0 && context.gameTimeRate > context.gameInformation.gameHit[0].time) {
      const i = context.gameInformation.gameHit.shift()

      const h = { key: Math.random(), destory: () => context.setGameHit(i => i.filter(n => n !== h)), ...i.init(context.locationLayout, i.option) }

      context.setGameHit(i => [...i, h])
    }
  }, [context.gameTimeRate])

  const HitsMemo = React.useMemo(() => {
    return context.gameHit.map((i) => {
      var Component

      if (i.type === 'PointDropCircle') Component = AppHitPointDropCircle

      return <Component key={i.key} option={i.option} destory={i.destory} context={context} />
    })
  }, [context.gameHit, context.rate, context.locationLayout, context.setGameScore, context.setRotate])

  return <layout>{HitsMemo}</layout>
}

function Score() {
  const context = React.useContext(Context)

  const { animationCount: animationCountGameScore } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gameScore, rate: 8 })

  const gameScore = animationCountGameScore.toFixed()

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

    <ReactCanvas2d.Component.TextCaculateLine text={gameScore} font='48px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
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
  const [gameHit, setGameHit] = React.useState([])
  const [gameScore, setGameScore] = React.useState(0)
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const { animationCount: animationCountGameTimeRate } = React.Plugin.useAnimationCount({ play: loadLayout, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: gameTimeRate })
  const { animationCount: animationCountRotate, setAnimationCount: setAnimationCountRotate } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: Math.PI * 2 / 360 * gameTimeRate / 8 })

  const gameInformation = React.useMemo(() => { if (refLayout) return json_0(locationLayout) }, [refLayout])

  const SceneMemo = React.useMemo(() => <Scene />, [loadLayout, locationLayout, gameHit])
  const HitMemo = React.useMemo(() => <Hit />, [loadLayout, locationLayout, gameHit, animationCountGameTimeRate])
  const ScoreMemo = React.useMemo(() => <Score />, [loadLayout, locationLayout, gameScore])
  
  return <Context.Provider value={{ gameInformation, gameHit, setGameHit, gameScore, setGameScore, gameTimeRate, setGameTimeRate, loadLayout, locationLayout, animationCountGameTimeRate, setRotate: setAnimationCountRotate }}>
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