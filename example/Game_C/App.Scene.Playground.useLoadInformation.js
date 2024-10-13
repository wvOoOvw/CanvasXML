import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import initWeapon from './Model.Weapon'
import initMonster from './Model.Monster'

const useLoadInformation = (props) => {
  const contextPlayground = props.contextPlayground

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