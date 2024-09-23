import RoleLayee from './Model.Card.Role.Layee'
import RoleLayeeAttack from './Model.Card.Role.Layee.Attack'
import RoleLayeeCharge from './Model.Card.Role.Layee.Charge'

const card = [
  RoleLayee,
  RoleLayeeAttack,
  RoleLayeeCharge,
]

const init = (props) => {
  return card.find(i => props.modelIndex === i.modelIndex).init(props.option)
}

export default init