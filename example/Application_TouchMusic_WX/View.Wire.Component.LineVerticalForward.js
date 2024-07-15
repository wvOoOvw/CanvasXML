import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

import { App as AppPointDropCircle } from './View.Hit.Component.PointDropCircle'

const init = (gameHit) => {
  const randomX = Math.random()

  const option = Object.assign(
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

  return { component: App, option: option, toSuccess: () => option.status = 'success', toFail: () => option.status = 'fail' }
}

function App() {
  const context = React.useContext(Context)

  // const gameHitIndexRef = React.useRef(0)
  // const gameHitSuccessIndexRef = React.useRef(0)

  const [wire, setWire] = React.useState([])

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountTranslateY, setAnimationCount: setAnimationCountTranslateY } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: 1 / 2 })

  React.useEffect(() => {

    const rWire = []

    context.gameHit.filter(i => i.inDestory === false).forEach(i => {
      const iWire = {
        key: `AppPointDropCircle ${gameHit.cx[0]} ${gameHit.cx[1]}`,
        gameHit: i
      }
    })

    setWire(rWire)

    while (context.gameHit[gameHitIndexRef.current]) {
      const gameHit = context.gameHit[gameHitIndexRef.current]

      if (gameHit.component === AppPointDropCircle) {
        if (gameHit.cx[0] !== gameHit.cx[1] && gameHit.cy[0] === gameHit.cy[1]) {
          const key = `AppPointDropCircle ${gameHit.cx[0]} ${gameHit.cx[1]}`
          const find = wire.find(i => i.key === key)

          if (find !== undefined) {
            find.gameHit.push(gameHit)
            setWire(i => [...i])
          }

          if (find === undefined) {
            const iWire = {
              key: key,
              component: AppWireLine,
              options: { cx: gameHit.cx[1], cy: gameHit.cy[1] },
              gameHit: [gameHit],
              gameHitSuccess: [],
              onDestory: () => setWire(i => i.filter(n => n !== iWire)),
            }
            setWire(i => [...i, iWire])
          }
        }
      }

      gameHitIndexRef.current = gameHitIndexRef.current + 1
    }
  }, [context.gameHit, context.gameHitSuccess])

  const WireMemo = React.useMemo(() => {
    return wire.map((i) => <i.component gameTimeRate={context.gameTimeRate} {...i} />)
  }, [wire])

  return <layout globalAlpha={animationCountIntersection * 1}>
    <rect
      beginPath
      fill
      cx={context.locationLayout.w / 2}
      cy={context.locationLayout.h - 100 * 2 - 16 + animationCountTranslateY}
      w={`200%`}
      h={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.25}
    />

    <rect
      beginPath
      fill
      cx={context.locationLayout.w / 2}
      cy={context.locationLayout.h - 100 * 2 + animationCountTranslateY}
      w={`200%`}
      h={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={1}
    />

    <rect
      beginPath
      fill
      cx={context.locationLayout.w / 2}
      cy={context.locationLayout.h - 100 * 2 + 16 + animationCountTranslateY}
      w={`200%`}
      h={4}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.25}
    />
  </layout>
}

export { init, App }