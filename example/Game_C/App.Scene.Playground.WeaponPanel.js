import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function MoudleWeapon() {

}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [card, setCard] = React.useState([])

  React.useEffect(() => {
    if (contextPlayground.gameCardDescription && card.includes(contextPlayground.gameCardDescription) === false) {
      setCard(i => [...i, contextPlayground.gameCardDescription])
    }
  }, [contextPlayground.gameCardDescription])

  return card.map((i) => <MoudleWeapon key={i.key} card={i} onDestory={() => setCard(n => n.filter(v => v !== i))} />)
}

export default App