import { modelIndex as modelIndexEnemyBaseA, init as initEnemyBaseA } from './App.Model.Enemy.BaseA'

const init = (props) => {
  if (props.type === modelIndexEnemyBaseA) return initEnemyBaseA(props.option)
}

export default init