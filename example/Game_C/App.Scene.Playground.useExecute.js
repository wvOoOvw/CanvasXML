import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const useExecute = (props) => {
  const contextPlayground = props.contextPlayground

  React.useEffect(() => {
    if (contextPlayground.gameExecute.length > 0) {
      contextPlayground.gameExecute.forEach(i => {
        const executeIndex = i.executeIndex
        const side = i.side

        if (executeIndex === 'pickover') {
          contextPlayground.setGameOpponentPickOver(true)
        }

        if (executeIndex === 'property') {
          const propertyIndex = i.propertyIndex
          const change = i.change

          if (side === 0) {
            contextPlayground.setGameSelfProperty(i => ({ ...i, [propertyIndex]: i[propertyIndex] + change }))
          }
          if (side === 1) {
            contextPlayground.setGameOpponentProperty(i => ({ ...i, [propertyIndex]: i[propertyIndex] + change }))
          }
        }

        if (executeIndex === 'draw') {
          const card = i.card

          if (side === 0) {
            contextPlayground.setGameSelfCardReady(i => i.concat(card))
            contextPlayground.setGameSelfCardLibrary(i => i.filter(n => n !== card))
          }
          if (side === 1) {
            contextPlayground.setGameOpponentCardReady(i => i.concat(card))
            contextPlayground.setGameOpponentCardLibrary(i => i.filter(n => n !== card))
          }
        }

        if (executeIndex === 'use') {
          const card = i.card

          if (card.cardIndex.startsWith('Role')) {
            if (side === 0) contextPlayground.setGameSelfCardBattle(card)
            if (side === 1) contextPlayground.setGameOpponentCardBattle(card)
          }
          if (side === 0) contextPlayground.setGameSelfProperty(n => ({ hitPoint: n.hitPoint - card.caculateCostHitPoint(card), goldPoint: n.goldPoint - card.caculateCostGoldPoint(card), actionPoint: n.actionPoint - card.caculateCostActionPoint(card) }))
          if (side === 1) contextPlayground.setGameOpponentProperty(n => ({ hitPoint: n.hitPoint - card.caculateCostHitPoint(card), goldPoint: n.goldPoint - card.caculateCostGoldPoint(card), actionPoint: n.actionPoint - card.caculateCostActionPoint(card) }))

          if (side === 0) contextPlayground.setGameSelfCardReady(i => i.filter(n => n !== card))
          if (side === 0) contextPlayground.setGameSelfCardGraveyard(i => i.concat({ card: i, round: contextPlayground.gameRound }))
          if (side === 1) contextPlayground.setGameOpponentCardReady(i => i.filter(n => n !== card))
          if (side === 1) contextPlayground.setGameOpponentCardGraveyard(i => i.concat({ card: i, round: contextPlayground.gameRound }))
        }
      })
      contextPlayground.setGameExecute([])
    }
  }, [contextPlayground.gameExecute])
}

export default useExecute