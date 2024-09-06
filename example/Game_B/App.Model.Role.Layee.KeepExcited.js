const modelIndex = 'Role.Layee.Action.KeepExcited'
const modelType = 'Action.Magic'
const modelRoleIndex = 'Role.Layee'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      modelIndex, 
      modelType,
      modelRoleIndex,

      descriptionImageIndex: 'imageJpgRoleA',
      descriptionName: '保持兴奋',
      descriptionDetail: '提升自身 30% 攻击力，持续 5 回合',

      attributeClassLevel: 1,
      attributeExpendMagic: 1,

      onUse: (props) => {
        const selfRole = props.selfRole
        const opponentRole = props.opponentRole

        return { actionType: 'attack', attackPoint: selfRole.attributeAttack * 1.5 }
      }
    }, optionOverlay
  )

  return option
}

export default { modelIndex, modelType, modelRoleIndex, init }