const modelIndex = 'CardBaseAB'
const modelType = 'Magic'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      modelIndex: modelIndex,
      modelType: modelType,

      imageIndex: 'imageJpgRoleA',

      descriptionName: '兴奋',

      attributeHitPointOrigin: 30,
      attributeHitPoint: 30,
      attributeAttackPhysicsOrigin: 10,
      attributeAttackPhysics: 10,
      attributeDefensePhysicsOrigin: 10,
      attributeDefensePhysics: 10,
      attributeAttackMagicOrigin: 10,
      attributeAttackMagic: 10,
      attributeDefenseMagicOrigin: 10,
      attributeDefenseMagic: 10,
    }, optionOverlay
  )

  return option
}

export { modelIndex, modelType, init }