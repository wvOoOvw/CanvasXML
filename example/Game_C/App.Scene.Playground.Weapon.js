import React from '../../package/React'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

// function WeaponInPick() {
//   const contextApp = React.useContext(ContextApp)
//   const contextPlayground = React.useContext(ContextPlayground)

//   return <layout x={contextApp.locationLayout.x - contextApp.unitpx * 0.08} y={contextApp.locationLayout.y - contextApp.unitpx * 0.08} container verticalReverse horizontalAlignReverse gap={contextApp.unitpx * 0.08} zIndex={contextPlayground.zIndex.WeaponInPick}>
//     {
//       contextPlayground.weapon.map((i) => {
//         return <layout item>
//           {
//             <ComponentPreview key={i.key} weapon={i} use={contextPlayground.weaponInWar.includes(i)} onUse={() => contextPlayground.setWeaponInWar([i])}/>
//           }
//         </layout>
//       })
//     }
//   </layout>
// }

function WeaponInWar() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [weapon, setWeapon] = React.useState([])

  React.useEffect(() => {
    contextPlayground.weaponInWar.forEach(i => {
      if (weapon.includes(i) === false) setWeapon(n => [...n, i])
    })
  }, [contextPlayground.weaponInWar])

  const Component =
    <layout cy='75%' zIndex={contextPlayground.zIndex.WeaponInWar}>
      {
        weapon.map((i) => <i.ComponentInWar key={i.key} weapon={i} contextApp={contextApp} contextPlayground={contextPlayground} onDestory={() => setWeapon(n => n.filter(v => v !== i))} />)
      }
    </layout>

  return React.useMemo(() => Component, [weapon])
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <WeaponInWar />
    </>

  return Component
}

export default App