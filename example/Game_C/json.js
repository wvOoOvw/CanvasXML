const json = () => {

  const weapon = [
    {
      weaponIndex: 'Weapon0001'
    }
  ]

  const monster = new Array(40).fill().map((i, index) => {
    return {
      monsterIndex: 'Monster0001',
      time: 60 * index,
    }
  })

  return {
    weapon: weapon,
    monster: monster,
  }
}

export { json }