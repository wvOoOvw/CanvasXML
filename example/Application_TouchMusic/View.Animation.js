import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App(props) {
  const context = React.useContext(Context)

  const gameHitSuccessCount = React.useRef(0)

  const { animationCount: animationCountTranslateX, setAnimationCount: setAnimationCountTranslateX } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: context.unitpx * 0.01 * context.gameTimeRate, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountTranslateY, setAnimationCount: setAnimationCountTranslateY } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: context.unitpx * 0.01 * context.gameTimeRate, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountScale, setAnimationCount: setAnimationCountScale } = React.useAnimationDestination({ play: true, defaultCount: 1, destination: 1, rate: 0.001 * context.gameTimeRate, postprocess: n => Number(n.toFixed(3)) })

  React.useEffect(() => {
    const count = context.gameHitSuccess.length

    context.gameHitSuccess.filter((i, index) => index > gameHitSuccessCount.current - 1).forEach(i => {
      // setAnimationCountTranslateX(n => n + (i.successInformation.event.x - context.locationLayout.w / 2))
      // setAnimationCountTranslateY(n => n + (i.successInformation.event.y - context.locationLayout.h / 2))
      setAnimationCountScale(n => n + 0.001 * 4)
    })

    gameHitSuccessCount.current = count
  }, [context.gameHitSuccess])

  return <translate translateX={context.locationLayout.w / 2 + animationCountTranslateX} translateY={context.locationLayout.h / 2 + animationCountTranslateY}>
    <scale scaleW={animationCountScale} scaleH={animationCountScale}>
      <translate translateX={(context.locationLayout.w / 2 + animationCountTranslateX) * -1} translateY={(context.locationLayout.h / 2 + animationCountTranslateY) * -1}>
        {
          props.children
        }
      </translate>
    </scale>
  </translate>
}

export default App