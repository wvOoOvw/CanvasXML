import RoleLayee from './Model.Card.Role.Layee'
import RoleLayeeAttack from './Model.Card.Role.Layee.Attack'
import RoleLayeeCharge from './Model.Card.Role.Layee.Charge'

import RoleKiller from './Model.Card.Role.Killer'
import RoleKillerAttack from './Model.Card.Role.Killer.Attack'

import RoleMaven from './Model.Card.Role.Maven'
import RoleMavenAttack from './Model.Card.Role.Maven.Attack'

import RoleSnow from './Model.Card.Role.Snow'
import RoleSnowAttack from './Model.Card.Role.Snow.Attack'

const card = [
  RoleLayee,
  RoleLayeeAttack,
  RoleLayeeCharge,

  RoleKiller,
  RoleKillerAttack,

  RoleMaven,
  RoleMavenAttack,

  RoleSnow,
  RoleSnowAttack,
]

const init = (props) => {
  return card.find(i => props.modelIndex === i.modelIndex).init(props.option)
}

export default init