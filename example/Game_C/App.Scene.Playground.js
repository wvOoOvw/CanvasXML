import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import useLoadInformation from './App.Scene.Playground.useLoadInformation'

import Animation from './App.Scene.Playground.Animation'
import WeaponActive from './App.Scene.Playground.WeaponActive'
import WeaponPanel from './App.Scene.Playground.WeaponPanel'

import { json } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [loadInformation, setLoadInformation] = React.useState(false)
  
  const [timePlay, setTimePlay] = React.useState(true)
  const [timeRate, setTimeRate] = React.useState(1)

  const [weapon, setWeapon] = React.useState([])
  const [weaponActive, setWeaponActive] = React.useState([])

  const [enemy, setEnemy] = React.useState([])
  const [enemyActive, setEnemyActive] = React.useState([])

  const [animation, setAnimation] = React.useState([])

  const information = React.useMemo(() => json(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array('Animation', 'WeaponActive', 'WeaponPanel').reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())
    const negative = new Array().reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const contextPlayground = { loadInformation, setLoadInformation, loadInformation, setLoadInformation, timePlay, setTimePlay, timeRate, setTimeRate, weapon, setWeapon, weaponActive, setWeaponActive, enemy, setEnemy, enemyActive, setEnemyActive,animation, setAnimation, information, zIndex }

  useLoadInformation({ contextApp, contextPlayground })

  const Component =
    <ContextPlayground.Provider value={contextPlayground}>
      <layout>
        {
          loadInformation ?
            <>
              <Animation />
              <weaponActive />
              <WeaponPanel/>
            </>
            : null
        }
      </layout>
    </ContextPlayground.Provider>

  return Component
}

export default App