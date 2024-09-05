const modelIndex = 'EnemyBaseA'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      modelIndex: modelIndex,

      imageIndex: 'imagePngかに',

      descriptionName: '磐石之蟹',

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

export { modelIndex, init }