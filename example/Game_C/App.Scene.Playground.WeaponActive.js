import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [weapon, setWeapon] = React.useState([])

  React.useEffect(() => {
    contextPlayground.weaponActive.forEach(i => {
      if (card.includes(i) === false) setWeapon(n => [...n, i])
    })
  }, [contextPlayground.weaponActive])

  return weapon.map((i) => <i.ComponentWeapon key={i.key} weapon={i} active={contextPlayground.weaponActive.includes(i)} contextApp={contextApp} contextPlayground={contextPlayground} onDestory={() => setWeapon(n => n.filter(v => v !== i))} />)
}

export default App