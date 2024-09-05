import { modelIndex as modelIndexCardBaseA, init as initCardBaseA } from './App.Model.Card.BaseA'
import { modelIndex as modelIndexCardBaseAA, init as initCardBaseAA } from './App.Model.Card.BaseAA'
import { modelIndex as modelIndexCardBaseAB, init as initCardBaseAB } from './App.Model.Card.BaseAB'
import { modelIndex as modelIndexCardBaseAC, init as initCardBaseAC } from './App.Model.Card.BaseAC'

const init = (props) => {
  if (props.type === modelIndexCardBaseA) return initCardBaseA(props.option)
  if (props.type === modelIndexCardBaseAA) return initCardBaseAA(props.option)
  if (props.type === modelIndexCardBaseAB) return initCardBaseAB(props.option)
  if (props.type === modelIndexCardBaseAC) return initCardBaseAC(props.option)
}

export default init