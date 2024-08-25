const jsonA = () => {
  const createPointA = (time) => {
    const gameEnemy = []

    new Array(40).fill().forEach((i, index) => {
      if (index > 0) time = gameEnemy[gameEnemy.length - 1].time + 120
      if (index > 0 && index % 4 === 0) time = gameEnemy[gameEnemy.length - 1].time
      if (index > 0 && index % 6 === 0) time = gameEnemy[gameEnemy.length - 1].time

      gameEnemy.push({ type: 'EnemyBaseA', option: {}, time })
    })

    return gameEnemy
  }

  const A0 = createPointA(60)

  const gameMap = [
    { type: 'MapBaseA', option: {}, scale: 1 }
  ]

  const gameEnemy = [
    { type: 'EnemyBaseA', option: {}, time: 60 }
    // ...A0,
    // { type: 'EnemyBaseA', option: undefined },
  ].sort((a, b) => a.time - b.time)

  const gameRole = [
    { type: 'RoleBaseA', option: undefined },
    // { type: 'RoleBaseB', option: undefined },
    // { type: 'RoleBaseC', option: undefined },
    // { type: 'RoleBaseD', option: undefined },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleB' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleC' } },
    { type: 'RoleBaseA', option: { imageIndex: 'imageJpgRoleD' } },
  ]

  const gameBackgroundImageIndex = 'imageJpgBackgroundA'
  const gameBackgroundAudioIndex = 'audioM4a猫咪派对'

  return {
    gameMap: gameMap,
    gameEnemy: gameEnemy,
    gameRole: gameRole,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }