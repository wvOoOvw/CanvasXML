import RoleLayee from './Model.Card.Role.Layee'
import RoleLayeeAttack from './Model.Card.Role.Layee.Attack'
import RoleLayeeCharge from './Model.Card.Role.Layee.Charge'
import RoleLayeeDefent from './Model.Card.Role.Layee.Defent'
import RoleLayeeMushBlend from './Model.Card.Role.Layee.MushBlend'

const init = (props) => {
  if (props.modelIndex === RoleLayee.modelIndex) return RoleLayee.init(props.option)
  if (props.modelIndex === RoleLayeeAttack.modelIndex) return RoleLayeeAttack.init(props.option)
  if (props.modelIndex === RoleLayeeCharge.modelIndex) return RoleLayeeCharge.init(props.option)
  if (props.modelIndex === RoleLayeeDefent.modelIndex) return RoleLayeeDefent.init(props.option)
  if (props.modelIndex === RoleLayeeMushBlend.modelIndex) return RoleLayeeMushBlend.init(props.option)
}

export default init