const jsonA = () => {
  const gameSelf = {
    card: [
      { cardIndex: 'Role.0001', option: {  } },
      { cardIndex: 'Role.0001', option: {  } },
      { cardIndex: 'Role.0002', option: {  } },
      { cardIndex: 'Role.0002', option: {  } },
      { cardIndex: 'Role.0003', option: {  } },
      { cardIndex: 'Role.0003', option: {  } },
      { cardIndex: 'Role.0004', option: {  } },
      { cardIndex: 'Role.0004', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileName: '纯纯的森林',
    profileImageIndex: 'imageJpgRoleB',
  }

  const gameOpponent = {
    card: [
      { cardIndex: 'Role.0001', option: {  } },
      { cardIndex: 'Role.0001', option: {  } },
      { cardIndex: 'Role.0002', option: {  } },
      { cardIndex: 'Role.0002', option: {  } },
      { cardIndex: 'Role.0003', option: {  } },
      { cardIndex: 'Role.0003', option: {  } },
      { cardIndex: 'Role.0004', option: {  } },
      { cardIndex: 'Role.0004', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileName: '威胁的康撒',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameBackgroundImageIndex = 'imagePngBackground1'
  const gameBackgroundAudioIndex = 'audioMp3Jjw'

  return {
    gameSelf: gameSelf,
    gameOpponent: gameOpponent,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }