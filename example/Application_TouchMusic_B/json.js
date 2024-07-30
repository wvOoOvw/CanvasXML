import { init as initHitBase } from './App.X.Playground.X.Hit.Component.Base'
import { init as initWireBase } from './App.X.Playground.X.Wire.Component.Base'

const jsonA = (contextApp) => {

  const createA = (time) => {
    const gameHit = []
    const gameWire = []

    new Array(40).fill().forEach((i, index) => {
      const iGameHitOption = {}

      iGameHitOption.geometryMode = 'circle'

      iGameHitOption.speed = contextApp.locationLayout.h / 120

      iGameHitOption.radius = contextApp.unitpx * 0.16

      iGameHitOption.x = contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4)
      iGameHitOption.y = 0 - iGameHitOption.radius

      iGameHitOption.path = [
        {
          x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
          y: contextApp.locationLayout.h,
          pass: false,
          time: 0,
          destination: true,
        },
        {
          x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
          y: contextApp.locationLayout.h + 100000,
          pass: false,
          time: 0,
        },
      ]

      if (index > 0) time = gameHit[gameHit.length - 1].time + 60
      if (index > 0 && index % 4 === 0) time = gameHit[gameHit.length - 1].time
      if (index > 0 && index % 6 === 0) time = gameHit[gameHit.length - 1].time

      gameHit.push(initHitBase(iGameHitOption, time))
    })

    return { gameHit, gameWire }
  }

  const A0 = createA(30)
  const A1 = createA([...A0.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 0)
  const A2 = createA([...A1.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 0)
  const A3 = createA([...A2.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 0)

  const gameWire = [
    initWireBase({ imageIndex: 'imageA' }),
  ]

  const gameBackground = contextApp.imageBackgroundA
  const gameMusic = contextApp.audioStormsEye

  return {
    gameHit: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit].sort((a, b) => a.time - b.time),
    // gameDuration: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit].reduce((t, i) => Math.max(t, i.time), 0),
    gameWire: gameWire,
    gameBackground: gameBackground,
    gameMusic: gameMusic,
  }
}

export { jsonA }