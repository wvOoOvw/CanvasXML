import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './Hit.Component.PointDropCircle'

import StormsEye from './static/StormsEye.m4a'
import Door from './static/Door.m4a'

import { json_0 } from './json'

function Scene() {
  const context = React.useContext(Context)

  const { animationCount: animationCountSceneRotate, setAnimationCount: setAnimationCountSceneRotate } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: Math.PI * 2 / 360 * context.gameTimeRate / 8 })

  React.useEffect(() => {
    if (context.gameHitSuccess.length > 0) {
      const event = context.gameHitSuccess[context.gameHitSuccess.length - 1].event

      const changeRotate = (event.xs[event.xs.length - 1] - context.locationLayout.x - context.locationLayout.w / 2)

      if (changeRotate > 0) setAnimationCountSceneRotate(i => i - Math.PI * 2 / 360 * 4 * -1)
      if (changeRotate < 0) setAnimationCountSceneRotate(i => i - Math.PI * 2 / 360 * 4)
    }
  }, [context.gameHitSuccess, context.locationLayout])

  return <layout>
    <translate translateX={context.locationLayout.x + context.locationLayout.w / 2} translateY={(context.locationLayout.y + context.locationLayout.h / 2)}>
      <rotate rotateAngle={animationCountSceneRotate}>
        <translate translateX={(context.locationLayout.x + context.locationLayout.w / 2) * -1} translateY={(context.locationLayout.y + context.locationLayout.h / 2) * -1}>
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
        </translate>
      </rotate>
    </translate>
  </layout>
}

function Hit() {
  const context = React.useContext(Context)

  React.useEffect(() => {
    if (context.gamePlay && context.gameInformation.gameHit.length > 0 && context.animationCountGameTime > context.gameInformation.gameHit[0].time) {
      const iShift = context.gameInformation.gameHit.shift()

      const iInit = iShift.init(context.locationLayout, iShift.option)

      const iHit = {
        key: Math.random(),
        type: iInit.type,
        option: iInit.option,
        toSuccess: iInit.toSuccess,
        toFail: iInit.toFail,
        onDestory: () => context.setGameHit(i => i.filter(n => n !== iHit)),
        onSuccess: () => context.setGameHitSuccess(i => [...i, iHit]),
        onFail: () => context.setGameHitFail(i => [...i, iHit]),
        onHit: (event, score) => Object.assign(iHit, { event, score }),
        gameTimeRate: context.gameTimeRate,
      }

      context.setGameHit(i => [...i, iHit])
    }
  }, [context.gamePlay, context.animationCountGameTime, context.locationLayout])

  const HitsMemo = React.useMemo(() => {
    return context.gameHit.map((i) => {
      var Component

      if (i.type === 'PointDropCircle') Component = AppHitPointDropCircle

      return <Component {...i} />
    })
  }, [context.gameHit, context.rate, context.locationLayout, context.setGameScore, context.setAnimationCountSceneRotate])

  return <layout>{HitsMemo}</layout>
}

function Score() {
  const context = React.useContext(Context)

  const { animationCount: animationCountGameScore } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gameScore, rate: 8, postprocess: n => n.toFixed() })
  const { animationCount: animationCountGlobalAlpha } = React.Plugin.useAnimationDestination({ play: context.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => n.toFixed(3) })

  React.useEffect(() => {
    if (context.gameHitSuccess.length > 0) {
      const score = context.gameHitSuccess[context.gameHitSuccess.length - 1].score
      context.setGameScore(i => i + score * 100)
    }
  }, [context.gameHitSuccess, context.locationLayout])

  return <layout container verticalForward horizontalAlignCenter globalAlpha={animationCountGlobalAlpha}>
    <layout h='128px' item></layout>

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

    <ReactCanvas2d.Component.TextCaculateLine text={animationCountGameScore} font='48px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
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

function Start() {
  const context = React.useContext(Context)

  const [hover, setHover] = React.useState(false)

  const { animationCount: animationCountIntersection } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => n.toFixed(3) })
  const { animationCount: animationCountHover } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: hover ? 1 : 0, rate: 1 / 15, postprocess: n => n.toFixed(3) })
  const { animationCount: animationCountGamePlay } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gamePlay ? 1 : 0, rate: 1 / 30, postprocess: n => n.toFixed(3) })

  return <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection * 1 - animationCountGamePlay * 1}>
    <ReactCanvas2d.Component.TextCaculateLine text={`PHIGROS`} font='72px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='72px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>

    <layout h='32px' item></layout>

    <ReactCanvas2d.Component.TextCaculateLine text={'START'} font='24px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle={`rgb(${130 + animationCountHover * 125}, ${130 + animationCountHover * 125}, ${130 + animationCountHover * 125})`} align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
            <rect onClick={() => context.setGamePlay(true)} onPointerDown={() => setHover(true)} onPointerMove={() => setHover(true)} onPointerMoveAway={() => setHover(false)} onPointerUp={() => setHover(false)} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>
  </layout>
}

function App() {
  const [gamePlay, setGamePlay] = React.useState(false)
  const [gameHit, setGameHit] = React.useState([])
  const [gameHitSuccess, setGameHitSuccess] = React.useState([])
  const [gameHitFail, setGameHitFail] = React.useState([])
  const [gameScore, setGameScore] = React.useState(0)
  const [gameTimeRate, setGameTimeRate] = React.useState(1)

  const { load: loadStormsEye, audio: audioStormsEye } = ReactCanvas2d.Plugin.useAudio({ src: StormsEye })

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const { animationCount: animationCountGameTime } = React.Plugin.useAnimationCount({ play: loadLayout && loadStormsEye && gamePlay, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: gameTimeRate })

  const gameInformation = React.useMemo(() => { if (refLayout) return json_0(locationLayout) }, [locationLayout])

  const StartMemo = React.useMemo(() => <Start />, [loadLayout, locationLayout, gamePlay])
  const SceneMemo = React.useMemo(() => <Scene />, [loadLayout, locationLayout, gamePlay, gameHit, gameHitSuccess, gameHitFail])
  const HitMemo = React.useMemo(() => <Hit />, [loadLayout, locationLayout, gamePlay, gameHit, animationCountGameTime])
  const ScoreMemo = React.useMemo(() => <Score />, [loadLayout, locationLayout, gamePlay, gameHitSuccess, gameScore])

  React.useEffect(() => {
    if (gamePlay) audioStormsEye.play()
    if (gamePlay) return () => audioStormsEye.pause()
  }, [gamePlay])

  return <Context.Provider value={{ gameInformation, gamePlay, setGamePlay, gameHit, setGameHit, gameHitSuccess, setGameHitSuccess, gameHitFail, setGameHitFail, gameScore, setGameScore, gameTimeRate, setGameTimeRate, loadLayout, locationLayout, animationCountGameTime, audioStormsEye }}>
    <layout onLocationMount={dom => refLayout.current = dom}>
      {
        loadLayout && loadStormsEye ?
          <>
            {StartMemo}
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