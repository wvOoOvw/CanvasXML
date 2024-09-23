const jsonA = () => {
  const gameSelf = {
    role: [

    ],
    card: [
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameOpponent = {
    role: [

    ],
    card: [
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
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