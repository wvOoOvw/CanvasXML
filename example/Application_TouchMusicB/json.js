import { init as initHitCircle } from './App.X.Playground.X.Hit.Component.Circle'
import { init as initRoleLine } from './App.X.Playground.X.Role.Component.Line'

const dimensionsLocation = (location, ceilpx, dimensionsAll, dimensions) => {
  const x = location.x + location.w / dimensionsAll[0] * (dimensions[0] - 1)
  const y = location.y + location.h / dimensionsAll[1] * (dimensions[1] - 1)
  const w = location.w / dimensionsAll[0]
  const h = location.h / dimensionsAll[1]
  const cx = x + ceilpx / 2
  const cy = y + ceilpx / 2
  return { x, y, w, h, cx, cy }
}

const jsonA = (contextApp) => {
  const cx = contextApp.locationLayout.x + contextApp.locationLayout.w / 2
  const cy = contextApp.locationLayout.y + contextApp.locationLayout.h / 2

  const dimensions = [8, 8]

  const min = Math.min(contextApp.locationLayout.w, contextApp.locationLayout.h)

  var w = min
  var h = min

  if (dimensions[0] > dimensions[1]) h = h * dimensions[1] / dimensions[0]
  if (dimensions[1] > dimensions[0]) w = w * dimensions[0] / dimensions[1]

  const x = cx - w / 2
  const y = cy - h / 2

  const location = { x, y, w: w, h: h }
  const ceilpx = Math.min(w / dimensions[0], h / dimensions[1])

  const createA = (time) => {
    const gameHit = []
    const gameWire = []

    new Array(40).fill().forEach((i, index) => {
      const iGameHitOption = {}

      iGameHitOption.ceilpx = ceilpx

      iGameHitOption.geometryMode = 'circle'

      iGameHitOption.sx = dimensionsLocation(location, ceilpx, dimensions, [1, 1]).cx
      iGameHitOption.sy = dimensionsLocation(location, ceilpx, dimensions, [1, 1]).cy

      if (index % 2 === 0) iGameHitOption.ex = dimensionsLocation(location, ceilpx, dimensions, [8, 8]).cx
      if (index % 2 !== 0) iGameHitOption.ex = dimensionsLocation(location, ceilpx, dimensions, [6, 8]).cx

      if (index % 2 !== 0) iGameHitOption.ey = dimensionsLocation(location, ceilpx, dimensions, [8, 8]).cy
      if (index % 2 === 0) iGameHitOption.ey = dimensionsLocation(location, ceilpx, dimensions, [8, 6]).cy

      iGameHitOption.x = iGameHitOption.sx
      iGameHitOption.y = iGameHitOption.sy

      iGameHitOption.pathPoint = []

      iGameHitOption.radius = ceilpx / 2

      if (index > 0) time = gameHit[gameHit.length - 1].time + 60
      if (index > 0 && index % 4 === 0) time = gameHit[gameHit.length - 1].time
      if (index > 0 && index % 6 === 0) time = gameHit[gameHit.length - 1].time

      iGameHitOption.imageIndex = 'imageD'

      gameHit.push(initHitCircle(iGameHitOption, time))
    })

    return { gameHit, gameWire }
  }

  const A0 = createA(30)
  const A1 = createA([...A0.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 0)
  const A2 = createA([...A1.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 0)
  const A3 = createA([...A2.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 0)

  const gameMap = []

  const gameRole = [
    initRoleLine({ ceilpx: ceilpx, imageIndex: 'imageA' }),
    initRoleLine({ ceilpx: ceilpx, imageIndex: 'imageB' }),
    initRoleLine({ ceilpx: ceilpx, imageIndex: 'imageC' }),
    initRoleLine({ ceilpx: ceilpx, imageIndex: 'imageD' }),
  ]

  const gameBackground = contextApp.imageBackgroundA
  const gameMusic = contextApp.audioStormsEye

  return {
    dimensions: dimensions,
    location: location,
    ceilpx: ceilpx,
    gameHit: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit].sort((a, b) => a.time - b.time),
    // gameWire: [...A0.gameWire, ...A1.gameWire, ...A2.gameWire, ...A3.gameWire, ...B0.gameWire, ...B1.gameWire, ...B2.gameWire, ...B3.gameWire].sort((a, b) => a.time - b.time),
    gameDuration: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit].reduce((t, i) => Math.max(t, i.time), 0),
    gameMap: gameMap,
    gameRole: gameRole,
    gameBackground: gameBackground,
    gameMusic: gameMusic,
  }
}

export { jsonA }