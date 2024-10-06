import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import init from './Model.Card'

const useLoadInformation = (props) => {
  const contextPlayground = props.contextPlayground

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.setGameSelfProperty({ hitPoint: 30, goldPoint: 0, actionPoint: 0 })
      contextPlayground.setGameSelfCardLibrary(contextPlayground.informationJson.gameSelf.card.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameOpponentProperty({ hitPoint: 30, goldPoint: 0, actionPoint: 0 })
      contextPlayground.setGameOpponentCardLibrary(contextPlayground.informationJson.gameOpponent.card.map(i => Object({ key: Math.random(), ...init(i) })))
      contextPlayground.setGameProcess(i => i + 1)
    }
  }, [contextPlayground.informationJson])
}

export default useLoadInformation