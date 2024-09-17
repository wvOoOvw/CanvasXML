const modelIndex = 'Role.Layee.Action.Defent'
const modelIndexRole = 'Role.Layee'
const modelType = 'Card'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imageJpgRoleC',
      descriptionName: '汇聚',
      descriptionDetail: '鬼使白汇聚力量攻击敌人，造成攻击100%（120%）的伤害，并使敌人受到的治疗效果下降40%，持续2回合。',

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