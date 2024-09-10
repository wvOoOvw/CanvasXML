import RoleLayee from './App.Model.Card.Role.Layee'
import RoleLayeeAttack from './App.Model.Card.Role.Layee.Attack'
import RoleLayeeCharge from './App.Model.Card.Role.Layee.Charge'

const init = (props) => {
  if (props.modelIndex === RoleLayee.modelIndex) return RoleLayee.init(props.option)
  if (props.modelIndex === RoleLayeeAttack.modelIndex) return RoleLayeeAttack.init(props.option)
  if (props.modelIndex === RoleLayeeCharge.modelIndex) return RoleLayeeCharge.init(props.option)
}

export default init