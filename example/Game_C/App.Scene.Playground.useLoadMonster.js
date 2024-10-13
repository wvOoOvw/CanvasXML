import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const useLoadMonster = (props) => {
  const contextPlayground = props.contextPlayground

  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: contextPlayground.loadInformation, defaultCount: 0, destination: Infinity, rate: 1, postprocess: n => Number(n.toFixed()) })

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.monster.some(i => {
        const inTime = i.time <= animationCountInfinity

        if (inTime) {
          contextPlayground.setMonster(n => n.filter(v => v !== i))
          contextPlayground.setMonsterInWar(n => n.concat(i))
        }

        return !inTime
      })
    }
  }, [animationCountInfinity])
}

export default useLoadMonster