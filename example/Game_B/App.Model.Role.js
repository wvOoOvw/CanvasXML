import RoleLayee from './App.Model.Role.Layee'
import RoleLayeeKeepExcited from './App.Model.Role.Layee.KeepExcited'
import RoleLayeePowerAttack from './App.Model.Role.Layee.PowerAttack'
import RoleLayeeUltraSniping from './App.Model.Role.Layee.UltraSniping'

const init = (props) => {
  if (props.modelIndex === RoleLayee.modelIndex) return RoleLayee.init(props.option)
  if (props.modelIndex === RoleLayeeKeepExcited.modelIndex) return RoleLayeeKeepExcited.init(props.option)
  if (props.modelIndex === RoleLayeePowerAttack.modelIndex) return RoleLayeePowerAttack.init(props.option)
  if (props.modelIndex === RoleLayeeUltraSniping.modelIndex) return RoleLayeeUltraSniping.init(props.option)
}

export default init