const jsonA = () => {
  const gameSelf = {
    role: [
      { modelIndex: 'Role.Layee', option: {  } },
    ],
    card: [
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
    ],
    cardBackImageIndex: 'imageJpg773503h90p0',
    profileImageIndex: 'imageJpgRoleC',
  }

  const gameOpponent = {
    role: [
      { modelIndex: 'Role.Layee', option: {  } },
    ],
    card: [
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
      { modelIndex: 'Card.Layee.Attack', option: {  } },
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