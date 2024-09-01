const init = (optionOverlay) => {
  const option = Object.assign(
    {
      modelIndex: 'CardBaseA',

      imageIndex: 'imageJpgRoleA',

      descriptionType: 'Role',
      descriptionName: '莱伊',

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

      actionCount: 20,
      actionCountMax: 100,
      actionCountRecover: 1 / 60,
      actionInterval: 0,
      actionIntervalMax: 100,
      actionIntervalRecover: 100 / 60,

      action: [
        {
          count: 1,
          interval: 100,
          imageIndex: 'imagePngCaesarWhite',
        },
        {
          count: 15,
          interval: 100,
          imageIndex: 'imagePngFangsWhite',
        },
        {
          count: 25,
          interval: 100,
          imageIndex: 'imagePngPlagueDoctorProfileWhite',
        },
      ],

    }, optionOverlay
  )

  return option
}

export default init