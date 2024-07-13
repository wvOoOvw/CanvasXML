import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const { animationCount: animationCountIntersection } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountGamePlay } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gamePlay ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountRotate, setAnimationCount: setAnimationCountRotate } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: Math.PI * 2 / 360 * context.gameTimeRate / 4 })
  const { animationCount: animationCountTranslateY, setAnimationCount: setAnimationCountTranslateY } = React.Plugin.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: 1 / 2 })

  React.useEffect(() => {
    if (context.gameHitSuccess.length > 0) {
      const event = context.gameHitSuccess[context.gameHitSuccess.length - 1].event

      const changeRotate = (event.xs[event.xs.length - 1] - context.locationLayout.x - context.locationLayout.w / 2)

      // if (changeRotate > 0) setAnimationCountRotate(i => i - Math.PI * 2 / 360 * 4 * -1)
      // if (changeRotate < 0) setAnimationCountRotate(i => i - Math.PI * 2 / 360 * 4)

      setAnimationCountTranslateY(i => i + 8)
    }
  }, [context.gameHitSuccess, context.locationLayout])

  return <layout globalAlpha={animationCountIntersection * 1}>
    <translate translateX={context.locationLayout.x + context.locationLayout.w / 2} translateY={(context.locationLayout.y + context.locationLayout.h - 100 * 2)}>
      <rotate rotateAngle={animationCountRotate}>
        <translate translateX={(context.locationLayout.x + context.locationLayout.w / 2) * -1} translateY={(context.locationLayout.y + context.locationLayout.h - 100 * 2) * -1 + animationCountTranslateY}>
          <rect
            beginPath
            fill
            cx={context.locationLayout.w / 2}
            cy={context.locationLayout.h - 100 * 2 - 16}
            w={`200%`}
            h={4}
            lineWidth={4}
            fillStyle={'rgb(255, 255, 255)'}
            globalAlpha={0.25}
          />

          <rect
            beginPath
            fill
            cx={context.locationLayout.w / 2}
            cy={context.locationLayout.h - 100 * 2}
            w={`200%`}
            h={4}
            lineWidth={4}
            fillStyle={'rgb(255, 255, 255)'}
            globalAlpha={1}
          />

          <rect
            beginPath
            fill
            cx={context.locationLayout.w / 2}
            cy={context.locationLayout.h - 100 * 2 + 16}
            w={`200%`}
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

export default App