import RoleLayee from './Model.Card.Role.Layee'
import MagicDefend from './Model.Card.Magic.Defend'
import MagicFire from './Model.Card.Magic.Fire'

const card = [
  RoleLayee,
  MagicDefend,
  MagicFire,
]

const init = (props) => {
  return card.find(i => props.cardIndex === i.cardIndex).init(props.option)
}

export default init