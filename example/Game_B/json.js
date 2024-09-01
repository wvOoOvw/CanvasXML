const jsonA = () => {
  const gameCard = [
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleA' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleB' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleC' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleD' } },

    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleA' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleB' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleC' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleD' } },

    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleA' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleB' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleC' } },
    { type: 'CardBaseA', option: { imageIndex: 'imageJpgRoleD' } },
  ]

  const gameEnemy = [
    { type: 'EnemyBaseA', option: {} },
    { type: 'EnemyBaseA', option: {} },
    { type: 'EnemyBaseA', option: {} },
    { type: 'EnemyBaseA', option: {} },
    { type: 'EnemyBaseA', option: {} },
  ]

  const gameBackgroundImageIndex = 'imageJpgBackgroundA'
  const gameBackgroundAudioIndex = 'audioM4a猫咪派对'

  return {
    gameCard: gameCard,
    gameEnemy: gameEnemy,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }