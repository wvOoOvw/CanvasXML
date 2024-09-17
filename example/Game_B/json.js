const jsonA = () => {
  const gameSelf = {
    role: [
      { modelIndex: 'Role.Layee', option: {  } },
    ],
    card: [
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
  
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameOpponent = {
    role: [
      { modelIndex: 'Role.Layee', option: {  } },
    ],
    card: [
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
      { modelIndex: 'Role.Layee.Action.Attack', option: {  } },
  
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
      { modelIndex: 'Role.Layee.Action.Charge', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameBackgroundImageIndex = 'imageJpgBackgroundA'
  const gameBackgroundAudioIndex = 'audioM4a猫咪派对'

  return {
    gameSelf: gameSelf,
    gameOpponent: gameOpponent,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }