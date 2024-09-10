const modelIndex = 'Role.Layee.Action.Attack'
const modelIndexRole = 'Role.Layee'
const modelType = 'Card'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imageJpgRoleA',
      descriptionName: '攻击',
      descriptionDetail: '《莱伊》 发起攻击',

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