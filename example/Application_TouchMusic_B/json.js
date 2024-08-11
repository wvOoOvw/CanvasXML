import { init as initPointBase } from './App.Playground.Hit.Component.Base'
import { init as initWireBase } from './App.Playground.Wire.Component.Base'

const jsonA = (contextApp) => {

  const createPointA = (time) => {
    const gameHit = []
    const gameWire = []

    new Array(40).fill().forEach((i, index) => {
      const iGameHitOption = {
        speed: contextApp.locationLayout.h / 120,
        path:[
          {
            x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
            y: 0 - contextApp.unitpx * 0.16,
            pass: false,
            time: 0,
          },
          {
            x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
            y: contextApp.locationLayout.h + contextApp.unitpx * 0.16,
            pass: false,
            time: 0,
          },
        ]
      }

      if (index > 0) time = gameHit[gameHit.length - 1].time + 30
      if (index > 0 && index % 4 === 0) time = gameHit[gameHit.length - 1].time
      if (index > 0 && index % 6 === 0) time = gameHit[gameHit.length - 1].time

      gameHit.push(initPointBase(iGameHitOption, time))
    })

    return { gameHit, gameWire }
  }

  const A0 = createPointA(30)
  const A1 = createPointA([...A0.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 300)
  const A2 = createPointA([...A1.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 300)
  const A3 = createPointA([...A2.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 300)

  const gameWire = [
    initWireBase({ imageIndex: 'imageJpgRoleA' }),
    initWireBase({ imageIndex: 'imageJpgRoleB' }),
    initWireBase({ imageIndex: 'imageJpgRoleC' }),
    initWireBase({ imageIndex: 'imageJpgRoleD' }),
  ]

  const gameBackgroundImageIndex = 'imageJpgRoleBackgroundA'
  const gameBackgroundAudioIndex = 'audioStormsEye'

  return {
    gameHit: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit].sort((a, b) => a.time - b.time),
    gameDuration: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit].reduce((t, i) => Math.max(t, i.time), 0),
    gameWire: gameWire,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }