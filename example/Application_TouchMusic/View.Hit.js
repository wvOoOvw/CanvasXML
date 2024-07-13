import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  React.useEffect(() => {
    while (context.gamePlay && context.gameInformation.gameHit.length > 0 && context.animationCountGameTime > context.gameInformation.gameHit[0].time) {
      const iShift = context.gameInformation.gameHit.shift()

      const iInit = iShift.init(context.locationLayout, iShift.option)

      const iHit = {
        key: Math.random(),
        component: iInit.component,
        option: iInit.option,
        toSuccess: iInit.toSuccess,
        toFail: iInit.toFail,
        onDestory: () => context.setGameHit(i => i.filter(n => n !== iHit)),
        onSuccess: () => context.setGameHitSuccess(i => [...i, iHit]),
        onFail: () => context.setGameHitFail(i => [...i, iHit]),
        onHit: (event, score) => Object.assign(iHit, { event, score }),
      }

      context.setGameHit(i => [...i, iHit])
    }
  }, [context.gamePlay, context.animationCountGameTime, context.locationLayout])

  const HitsMemo = React.useMemo(() => {
    return context.gameHit.map((i) => <i.component gameTimeRate={context.gameTimeRate} {...i} />)
  }, [context.gameHit, context.gameTimeRate, context.rate, context.locationLayout, context.setGameScore, context.setAnimationCountSceneRotate])

  return <layout>{HitsMemo}</layout>
}

export default App