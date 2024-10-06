import Role0001 from './Model.Card.Role.0001'
import Role0002 from './Model.Card.Role.0002'
import Role0003 from './Model.Card.Role.0003'
import Role0004 from './Model.Card.Role.0004'
// import MagicDefend from './Model.Card.Magic.Defend'
// import MagicFire from './Model.Card.Magic.Fire'

const card = [
  Role0001,
  Role0002,
  Role0003,
  Role0004,
  // MagicDefend,
  // MagicFire,
]

const init = (props) => {
  return card.find(i => props.cardIndex === i.cardIndex).init(props.option)
}

export default init