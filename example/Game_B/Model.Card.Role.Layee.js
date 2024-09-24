const modelIndex = 'Layee'
const modelType = 'Role'

const init = (props) => {
  const option = {
    modelIndex: modelIndex,
    modelType: modelType,

    descriptionImageIndex: 'imageJpgRoleA',
    descriptionName: '卢西亚',
    descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',

    attributeHitPointOrigin: 8,
    attributeHitPoint: 8,
    attributeAttackOrigin: 4,
    attributeAttack: 4,

    onUse: (props) => {
      return [
        { type: 'increase', attribute: 'attributeAttack', value: 2 }
      ]
    }
  }

  return option
}

export default { modelIndex, modelType, init }