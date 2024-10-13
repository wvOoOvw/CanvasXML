import Monster0001 from './Model.Monster.0001'

const monster = [Monster0001]

const init = (props) => {
  return monster.find(i => props.monsterIndex === i.monsterIndex).init(props.option)
}

export default init