import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import { App as AppPointDropCircle } from './View.Hit.Component.PointDropCircle'

const initial = (locationLayout, optionOverlay) => {
  const randomX = Math.random()

  return Object.assign(
    {
      status: 'process',
      rateProcess: 60,
      rateWait: 30,
      rateSuccess: 60,
      rateFail: 30,
      radius: 100,
      cx: [
        randomX * (locationLayout.w - 100 * 4) + 100 * 2,
        randomX * (locationLayout.w - 100 * 4) + 100 * 2,
      ],
      cy: [
        0,
        locationLayout.h - 100 * 2,
      ],
    }, optionOverlay
  )
}

const init = (option) => {
  return { component: App, option: option, toSuccess: () => option.status = 'success', toFail: () => option.status = 'fail' }
}

function App() {
  const context = React.useContext(Context)

  const gameHitSuccessCountRef = React.useRef(0)

  const [wire, setWire] = React.useState([])

  const { animationCount: animationCountProcess } = React.useAnimationDestination(
    {
      play: props.option.status === 'process',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateProcess * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { animationCount: animationCountFinal } = React.useAnimationDestination(
    {
      play: props.option.status === 'final',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateFinal * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestory } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountTranslateY, setAnimationCount: setAnimationCountTranslateY } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: 1 })

  React.useEffect(() => {
    const gameHitSuccessCount = context.gameHit.filter(i => props.option.filter(i) === true &&i.inSuccess === true)

    const gameHitSuccessCountDiff = gameHitSuccessCount - gameHitSuccessCountRef.current

    if (gameHitSuccessCountDiff > 0) setAnimationCountTranslateY(i => i + gameHitSuccessCountDiff * 8)

    gameHitSuccessCountRef.current = gameHitSuccessCount
  }, [context.gameHit])

  React.useEffect(() => {

  }, [])

  return <layout globalAlpha={animationCountIntersection * 1}>
    <rect
      beginPath
      fill
      cx={props.cx}
      cy={props.cy - 16 + animationCountTranslateY}
      w={`200%`}
      h={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.25}
    />

    <rect
      beginPath
      fill
      cx={props.cx}
      cy={props.cy + animationCountTranslateY}
      w={`200%`}
      h={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={1}
    />

    <rect
      beginPath
      fill
      cx={context.locationLayout.w / 2}
      cy={props.cy + 16 + animationCountTranslateY}
      w={`200%`}
      h={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.25}
    />
  </layout>
}

export { initial, init, App }