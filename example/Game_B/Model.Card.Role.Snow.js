const modelIndex = 'Role.Snow'
const modelType = 'Role'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imageJpgRoleC',
      descriptionName: 'Snow',

      attributeHitPointOrigin: 8,
      attributeHitPoint: 8,
      attributeAttackOrigin: 4,
      attributeAttack: 4,

      onEmployee: [],
      onAttact: [],
      onHit: [],
      onRoundStart: [],
      onRoundEnd: [],
    }, optionOverlay
  )

  return { ...option, modelIndex, modelType }
}

export default { modelIndex, modelType, init }