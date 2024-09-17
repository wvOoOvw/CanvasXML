const modelIndex = 'Role.Layee'
const modelType = 'Role'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      descriptionImageIndex: 'imagePngRoleA',
      descriptionName: '莱伊',

      attributeHitPointOrigin: 8,
      attributeHitPoint: 8,
      attributeAttackOrigin: 4,
      attributeAttack: 4,
      attributeStatus: [],

      onMount: [],
      onMounted: [],
      onAttact: [],
      onAttacted: [],
      onHit: [],
      onHited: [],

    }, optionOverlay
  )

  return { ...option, modelIndex, modelType }
}

export default { modelIndex, modelType, init }