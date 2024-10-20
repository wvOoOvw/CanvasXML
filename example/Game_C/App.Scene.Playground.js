import React from '../../package/React'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import useLoadInformation from './App.Scene.Playground.useLoadInformation'

import Animation from './App.Scene.Playground.Animation'
import Background from './App.Scene.Playground.Background'
import Monster from './App.Scene.Playground.Monster'
import Weapon from './App.Scene.Playground.Weapon'

import { json } from './json'

function App() {
  const contextApp = React.useContext(ContextApp)

  const [loadInformation, setLoadInformation] = React.useState(false)

  const [timePlay, setTimePlay] = React.useState(true)
  const [timeRate, setTimeRate] = React.useState(1)

  const [weapon, setWeapon] = React.useState([])
  const [weaponInWar, setWeaponInWar] = React.useState([])

  const [monster, setMonster] = React.useState([])
  const [monsterInWar, setMonsterInWar] = React.useState([])

  const [animation, setAnimation] = React.useState([])

  const information = React.useMemo(() => json(), [])

  const zIndex = React.useMemo(() => {
    const positive = new Array('Background', 'Decoration', 'WeaponAnimationLow', 'WeaponInWar', 'MonsterInWar', 'WeaponAnimationHigh', 'WeaponInPick').reduce((t, i, index) => Object({ ...t, [i]: 0 + (index + 1) }), Object())
    const negative = new Array().reduce((t, i, index) => Object({ ...t, [i]: 0 - (index + 1) }), Object())

    return { ...positive, ...negative }
  }, [])

  const contextPlayground = { loadInformation, setLoadInformation, timePlay, setTimePlay, timeRate, setTimeRate, weapon, setWeapon, weaponInWar, setWeaponInWar, monster, setMonster, monsterInWar, setMonsterInWar, animation, setAnimation, information, zIndex }

  useLoadInformation({ contextApp, contextPlayground })

  const Component =
    <ContextPlayground.Provider value={contextPlayground}>
      <layout>
        {
          loadInformation ?
            <>
              <Animation />
              <Background />
              <Monster />
              <Weapon />
            </>
            : null
        }
      </layout>
    </ContextPlayground.Provider>

  return Component
}

export default App