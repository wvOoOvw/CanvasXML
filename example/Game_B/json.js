const jsonA = () => {
  const gameSelf = {
    card: [
      { modelIndex: 'Role.Layee', option: {  } },
      { modelIndex: 'Role.Layee', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameOpponent = {
    card: [
      { modelIndex: 'Role.Layee', option: {  } },
      { modelIndex: 'Role.Layee', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameBackgroundImageIndex = 'imageJpgBackground1'
  const gameBackgroundAudioIndex = 'audioMp3Jjw'

  return {
    gameSelf: gameSelf,
    gameOpponent: gameOpponent,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }