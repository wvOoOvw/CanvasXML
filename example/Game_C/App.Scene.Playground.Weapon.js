import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function WeaponPreview() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <layout x={contextApp.locationLayout.x - contextApp.unitpx * 0.08} y={contextApp.locationLayout.y - contextApp.unitpx * 0.08} container verticalReverse horizontalAlignReverse gap={contextApp.unitpx * 0.08} zIndex={contextPlayground.zIndex.WeaponPreview}>
    {
      contextPlayground.weapon.map((i) => {
        return <layout item>
          {
            <ComponentPreview key={i.key} weapon={i} use={contextPlayground.weaponUse.includes(i)} onUse={() => contextPlayground.setWeaponUse([i])}/>
          }
        </layout>
      })
    }
  </layout>
}

function WeaponUse() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [weapon, setWeapon] = React.useState([])

  React.useEffect(() => {
    contextPlayground.weaponUse.forEach(i => {
      if (card.includes(i) === false) setWeapon(n => [...n, i])
    })
  }, [contextPlayground.weaponUse])

  const Component = 
   <layout zIndex={contextPlayground.zIndex.WeaponUse}>
    {
      weapon.map((i) => <i.ComponentUse key={i.key} weapon={i} use={contextPlayground.weaponUse.includes(i)} onDestory={() => setWeapon(n => n.filter(v => v !== i))} />)
    }
  </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component = 
    <>
      <WeaponPreview/>
      <WeaponUse/>
    </>

  return Component
}

export default App