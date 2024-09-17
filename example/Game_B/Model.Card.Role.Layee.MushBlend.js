const modelIndex = 'Role.Layee.Action.MushBlend'
const modelIndexRole = 'Role.Layee'
const modelType = 'Card'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imageJpgRoleD',
      descriptionName: '一步一息',
      descriptionDetail: '骨女受到攻击时会刻上一枚怨气标记，累积到4枚怨气标记时，骨女阵亡后会立即复活，并获得20%的生命，技能冷却3回合。',

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