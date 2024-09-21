import RoleLayee from './Model.Role.Layee'
import CardLayeeAttack from './Model.Card.Layee.Attack'

const card = [
  RoleLayee,
  CardLayeeAttack,
]

const init = (props) => {
  return card.find(i => props.modelIndex === i.modelIndex).init(props.option)
}

export default init