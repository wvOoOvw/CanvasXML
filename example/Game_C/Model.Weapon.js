import Weapon0001 from './Model.Weapon.0001'

const weapon = [Weapon0001]

const init = (props) => {
  return weapon.find(i => props.weaponIndex === i.weaponIndex).init(props.option)
}

export default init