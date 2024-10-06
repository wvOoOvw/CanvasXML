import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import { randomArray } from './utils'

const useOpponentAi = (props) => {
  const contextPlayground = props.contextPlayground

  const pick = React.useRef([])

  const [animationCountPickOverPlay, setAnimationCountPickOver] = React.useState(false)

  const { animationCount: animationCountPickOver } = ReactExtensions.useAnimationDestination({ play: animationCountPickOverPlay, defaultCount: 0, destination: 1, rate: 1 / 60, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    var index

    if (animationCountPickOver === 15 / 60) index = 0
    if (animationCountPickOver === 30 / 60) index = 1
    if (animationCountPickOver === 45 / 60) index = 2
    if (animationCountPickOver === 60 / 60) index = 3

    if (index !== undefined) contextPlayground.setGameExecute(i => i.concat({ executeIndex: 'draw', card: pick.current[index], side: 1 }))
  }, [animationCountPickOver])

  React.useEffect(() => {
    if (contextPlayground.gameProcess === 2) setAnimationCountPickOver(true)
    if (contextPlayground.gameProcess === 2) contextPlayground.setGameExecute(i => i.concat({ executeIndex: 'pickover' }))
    if (contextPlayground.gameProcess === 2) pick.current = randomArray(contextPlayground.gameOpponentCardLibrary, 4)
  }, [contextPlayground.gameProcess])
}

export default useOpponentAi