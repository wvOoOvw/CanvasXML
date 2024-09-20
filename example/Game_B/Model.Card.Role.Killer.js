const modelIndex = 'Role.Killer'
const modelType = 'Role'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imageJpgRoleD',
      descriptionName: 'Killer',

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