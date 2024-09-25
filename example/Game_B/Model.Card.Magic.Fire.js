import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const cardIndex = 'Magic.Fire'

const init = (props) => {
  return {
    cardIndex: cardIndex,

    descriptionImageIndex: 'imageJpgRoleB',
    descriptionName: '燃烧',
    descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',

    attributeCostActionPoint: 1,
    attributeCostGoldPoint: 2,

    onUse: (props) => {
      return [
        { type: 'increase', attribute: 'attributeAttack', value: 2 },
      ]
    },
  }
}

export default { cardIndex, init }