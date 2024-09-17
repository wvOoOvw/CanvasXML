const modelIndex = 'Role.Layee.Action.Charge'
const modelIndexRole = 'Role.Layee'
const modelType = 'Card'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imagePngRoleE',
      descriptionName: '雇佣',
      descriptionDetail: '雇佣 《莱伊》 上阵',

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