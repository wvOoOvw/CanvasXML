const modelIndex = 'Role.Layee.Action.UltraSniping'
const modelType = 'Action.Magic'
const modelRoleIndex = 'Role.Layee'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      modelIndex, 
      modelType,
      modelRoleIndex,

      descriptionImageIndex: 'imageJpgRoleA',
      descriptionName: '强力击',
      descriptionDetail: '使用 150% 的攻击力攻击对手',

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