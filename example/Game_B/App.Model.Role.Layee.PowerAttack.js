const modelIndex = 'Role.Layee.Action.PowerAttack'
const modelType = 'Action.Attack'
const modelRoleIndex = 'Role.Layee'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      modelIndex, 
      modelType,
      modelRoleIndex,

      descriptionImageIndex: 'imageJpgRoleA',
      descriptionName: '强力击',
      descriptionDetail: '攻击对手',

      attributeAttackPoint: 2,
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