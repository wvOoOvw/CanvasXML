import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const gameHitSuccessCount = React.useRef(0)

  const { animationCount: animationCountTranslateX, setAnimationCount: setAnimationCountTranslateX } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: contextApp.unitpx * 0.01 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountTranslateY, setAnimationCount: setAnimationCountTranslateY } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: contextApp.unitpx * 0.01 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountScale, setAnimationCount: setAnimationCountScale } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 1, destination: 1, rate: 0.004 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    const count = contextPlayground.gameHitSuccess.length

    contextPlayground.gameHitSuccess.filter((i, index) => index > gameHitSuccessCount.current - 1).forEach(i => {
      // setAnimationCountTranslateX(n => n + (i.successInformation.event.x - contextApp.locationLayout.w / 2))
      // setAnimationCountTranslateY(n => n + (i.successInformation.event.y - contextApp.locationLayout.h / 2))
      setAnimationCountScale(n => n + 0.004)
    })

    gameHitSuccessCount.current = count
  }, [contextPlayground.gameHitSuccess])

  const transform = [
    {
      translate: { x: contextApp.locationLayout.w / 2 + animationCountTranslateX, y: contextApp.locationLayout.h / 2 + animationCountTranslateY },
    },
    {
      scale: { w: animationCountScale, h: animationCountScale },
    },
    {
      translate: { x: (contextApp.locationLayout.w / 2 + animationCountTranslateX) * -1, y: (contextApp.locationLayout.h / 2 + animationCountTranslateY) * -1 },
    },
  ]

  return <layout  transform={transform}>{props.children}</layout>
}

export default App