const jsonA = () => {
  const gameRole = [
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleA' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleB' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleC' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleD' } },

    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleA' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleB' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleC' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleD' } },

    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleA' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleB' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleC' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleD' } },
  ]

  const gameBackgroundImageIndex = 'imageJpgBackgroundA'
  const gameBackgroundAudioIndex = 'audioM4a猫咪派对'

  return {
    gameRole: gameRole,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }