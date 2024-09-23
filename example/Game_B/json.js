const jsonA = () => {
  const gameSelf = {
    role: [
      { modelIndex: 'Role.Layee', option: {  } },
      { modelIndex: 'Role.Maven', option: {  } },
      { modelIndex: 'Role.Snow', option: {  } },
      { modelIndex: 'Role.Killer', option: {  } },
    ],
    card: [
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Maven.Action.Attack', option: {  } },
      { modelIndex: 'Role.Maven.Action.Attack', option: {  } },
      { modelIndex: 'Role.Snow.Action.Attack', option: {  } },
      { modelIndex: 'Role.Snow.Action.Attack', option: {  } },
      { modelIndex: 'Role.Killer.Action.Attack', option: {  } },
      { modelIndex: 'Role.Killer.Action.Attack', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameOpponent = {
    role: [
      { modelIndex: 'Role.Layee', option: {  } },
      { modelIndex: 'Role.Maven', option: {  } },
      { modelIndex: 'Role.Snow', option: {  } },
      { modelIndex: 'Role.Killer', option: {  } },
    ],
    card: [
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Maven.Action.Attack', option: {  } },
      { modelIndex: 'Role.Maven.Action.Attack', option: {  } },
      { modelIndex: 'Role.Snow.Action.Attack', option: {  } },
      { modelIndex: 'Role.Snow.Action.Attack', option: {  } },
      { modelIndex: 'Role.Killer.Action.Attack', option: {  } },
      { modelIndex: 'Role.Killer.Action.Attack', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameBackgroundImageIndex = 'imageJpgBackground1'
  const gameBackgroundAudioIndex = 'audioM4a猫咪派对'

  return {
    gameSelf: gameSelf,
    gameOpponent: gameOpponent,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }