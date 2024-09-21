const modelIndex = 'Role.Layee'
const modelType = 'Role'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imagePngRoleE',
      descriptionName: '莱伊',

      attributeHitPointMax: 8,
      attributeHitPoint: 8,
      attributeAttackPhysics: 4,
      attributeAttackMagic: 4,
      attributeDefendPhysics: 4,
      attributeDefendMagic: 4,
    }, optionOverlay
  )

  return { ...option, modelIndex, modelType }
}

export default { modelIndex, modelType, init }