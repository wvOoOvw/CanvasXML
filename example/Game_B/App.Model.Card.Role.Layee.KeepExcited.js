const modelIndex = 'Role.Layee.Action.KeepExcited'
const modelType = 'Action.Appearance'
const modelRoleIndex = 'Role.Layee'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imagePngRoleE',
      descriptionName: '保持兴奋',
      descriptionDetail: '提升自身 30% 攻击力，持续 5 回合',

      attributeClassLevel: 1,

      caculateExpendGoldPoint: (props) => {
        const contextPlayground = props.contextPlayground

        if (contextPlayground.gameSelfCardBattle.some(i => i.modelIndex === modelRoleIndex) === true) {
          return 0
        }

        if (contextPlayground.gameSelfCardBattle.some(i => i.modelIndex === modelRoleIndex) !== true) {
          return 4
        }
      },

      onUse: (props) => {
        const contextPlayground = props.contextPlayground

        return { actionType: 'attack', attackPoint: selfRole.attributeAttack * 1.5 }
      }
    }, optionOverlay
  )

  return {...option, modelIndex, modelType, modelRoleIndex}
}

export default { modelIndex, modelType, modelRoleIndex, init }