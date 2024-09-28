const jsonA = () => {
  const gameSelf = {
    card: [
      { cardIndex: 'Role.Layee', option: {  } },
      { cardIndex: 'Role.Layee', option: {  } },
      { cardIndex: 'Role.Layee', option: {  } },
      { cardIndex: 'Role.Layee', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameOpponent = {
    card: [
      { cardIndex: 'Role.Layee', option: {  } },
      { cardIndex: 'Role.Layee', option: {  } },
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