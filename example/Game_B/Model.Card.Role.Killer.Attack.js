const modelIndex = 'Role.Killer.Action.Attack'
const modelIndexRole = 'Role.Killer'
const modelType = 'Card'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imageJpgRoleB',
      descriptionName: '雇佣',
      descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',

      attributeExpendActionPoint: 1,
      attributeExpendGoldPoint: 4,

      onUse: (props) => {
        const contextPlayground = props.contextPlayground

        return [
          { actionType: 'employ', modelIndexRole }
        ]
      }
    }, optionOverlay
  )

  return { ...option, modelIndex, modelIndexRole, modelType }
}

export default { modelIndex, modelIndexRole, modelType, init }