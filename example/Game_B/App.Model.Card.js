import { modelIndex as modelIndexCardBaseA, init as initCardBaseA } from './App.Model.Card.BaseA'

const init = (props) => {
  if (props.type === modelIndexCardBaseA) return initCardBaseA(props.option)
}

export default init