import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const useRound = (props) => {
  const contextPlayground = props.contextPlayground

  React.useEffect(() => {
    if (contextPlayground.gameRound > 0) {
      contextPlayground.setGemeSelfRoundOver(false)
      contextPlayground.setGameOpponentRoundOver(false)
      contextPlayground.setGameSelfProperty(i => ({ ...i, goldPoint: i.goldPoint + contextPlayground.gameRound, actionPoint: 2 }))
    }
  }, [contextPlayground.gameRound])
}

export default useRound