import { init as initPointBase } from './App.X.Playground.X.Point.Component.Base'
import { init as initWireBase } from './App.X.Playground.X.Wire.Component.Base'

const jsonA = (contextApp) => {

  const createA = (time) => {
    const gamePoint = []
    const gameWire = []

    new Array(40).fill().forEach((i, index) => {
      const iGameHitOption = {
        geometryMode: 'circle',
        speed: contextApp.locationLayout.h / 120,
        radius: contextApp.unitpx * 0.16,
        x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
        y: 0 - contextApp.unitpx * 0.16,
        path:[
          {
            x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
            y: contextApp.locationLayout.h,
            pass: false,
            time: 0,
            destination: true,
          },
          {
            x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
            y: contextApp.locationLayout.h + contextApp.unitpx * 0.16,
            pass: false,
            time: 0,
          },
        ]
      }

      if (index > 0) time = gamePoint[gamePoint.length - 1].time + 60
      if (index > 0 && index % 4 === 0) time = gamePoint[gamePoint.length - 1].time
      if (index > 0 && index % 6 === 0) time = gamePoint[gamePoint.length - 1].time

      gamePoint.push(initPointBase(iGameHitOption, time))
    })

    return { gamePoint, gameWire }
  }

  const A0 = createA(30)
  const A1 = createA([...A0.gamePoint].reduce((t, i) => Math.max(t, i.time), 0) + 0)
  const A2 = createA([...A1.gamePoint].reduce((t, i) => Math.max(t, i.time), 0) + 0)
  const A3 = createA([...A2.gamePoint].reduce((t, i) => Math.max(t, i.time), 0) + 0)

  const gameWire = [
    initWireBase({ imageIndex: 'imageA' }),
  ]

  const gameBackground = contextApp.imageBackgroundA
  const gameMusic = contextApp.audioStormsEye

  return {
    gamePoint: [...A0.gamePoint, ...A1.gamePoint, ...A2.gamePoint, ...A3.gamePoint].sort((a, b) => a.time - b.time),
    gameDuration: [...A0.gamePoint, ...A1.gamePoint, ...A2.gamePoint, ...A3.gamePoint].reduce((t, i) => Math.max(t, i.time), 0),
    gameWire: gameWire,
    gameBackground: gameBackground,
    gameMusic: gameMusic,
  }
}

export { jsonA }