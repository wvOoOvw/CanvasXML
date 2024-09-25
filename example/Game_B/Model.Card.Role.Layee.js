import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const cardIndex = 'Role.Layee'

const init = (props) => {
  return {
    cardIndex: cardIndex,

    descriptionImageIndex: 'imageJpgRoleA',
    descriptionName: '卢西亚',
    descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',

    attributeCostActionPoint: 0,
    attributeCostGoldPoint: 8,

    attributeHitPointOrigin: 8,
    attributeHitPoint: 8,
    attributeAttackOrigin: 4,
    attributeAttack: 4,

    usePostprocess: (props) => {
      const contextPlayground = props.contextPlayground

      const card = props.card

      const w = props.w
      const h = props.h
      const x = props.x
      const y = props.y

      return { w, h, x, y }
    },

    onUse: (props) => {
      const contextPlayground = props.contextPlayground

      const card = props.card

      var selfCardBattle

      if (contextPlayground.gameSelfCardQueue.inclueds(card)) selfCardBattle = contextPlayground.gameSelfCardBattle
      if (contextPlayground.gameOpponentCardQueue.inclueds(card)) selfCardBattle = contextPlayground.gameOpponentCardBattle

      return [
        { type: 'increase', attribute: 'attributeAttack', value: 2, belong: selfCardBattle },
      ]
    },
  }
}

export default { cardIndex, init }