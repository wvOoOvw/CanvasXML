import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'

import initWeapon from './Model.Weapon'
import initMonster from './Model.Monster'

const useLoadInformation = (props) => {
  const contextPlayground = props.contextPlayground

  // const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: contextPlayground.loadInformation, defaultCount: 0, destination: Infinity, rate: 1, postprocess: n => Number(n.toFixed()) })

  // React.useEffect(() => {
  //   contextPlayground.monster.some(i => {
  //     const inTime = i.time <= animationCountInfinity

  //     if (inTime) {
  //       contextPlayground.setMonster(n => n.filter(v => v !== i))
  //       contextPlayground.setMonsterInWar(n => n.concat(i))
  //     }

  //     return !inTime
  //   })
  // }, [animationCountInfinity])

  React.useEffect(() => {
    if (contextPlayground.information) {
      const weapon = contextPlayground.information.weapon.map(i => Object({ key: Math.random(), ...i, ...initWeapon(i) }))
      const monster = contextPlayground.information.monster.map(i => Object({ key: Math.random(), ...i, ...initMonster(i) }))

      contextPlayground.setWeapon(weapon)
      contextPlayground.setWeaponInWar([weapon[0]])

      contextPlayground.setMonster(monster)
      contextPlayground.setMonsterInWar([])

      contextPlayground.setLoadInformation(true)
    }
  }, [contextPlayground.information])
}

export default useLoadInformation