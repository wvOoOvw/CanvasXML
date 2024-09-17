const modelIndex = 'Role.Layee.Action.Attack'
const modelIndexRole = 'Role.Layee'
const modelType = 'Card'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imagePngRoleE',
      descriptionName: '攻击',
      // descriptionDetail: '25%（50%）[+效果命中：4%',
      descriptionDetail: '回合结束时，召唤暴风雪中的冰晶，形成护甲保护自身。冰甲能够吸收雪女生命上限6%（7.8%）的伤害。技能提升至3（5）级时，当雪女身披冰甲时，敌人对其发动攻击，有25%（50%）[+效果命中：4%（8%）]的概率损失10点速度，持续2回合。',

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