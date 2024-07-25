import { init as initHitPointDropCircle } from './App.X.Playground.X.Hit.Component.PointDropCircle'
import { init as PointDropLine } from './App.X.Playground.X.Hit.Component.PointDropLine'
import { init as initHitPointDropRect } from './App.X.Playground.X.Hit.Component.PointDropRect'

import { init as initWireShakeRect } from './App.X.Playground.X.Wire.Component.ShakeRect'

const jsonA = (contextApp) => {

  const createA = (time) => {
    const gameHit = []
    const gameWire = []

    new Array(120).fill().map((i, index) => {
      const iGameHit = { key: Math.random(), ...initHitPointDropCircle(contextApp.locationLayout) }

      iGameHit.option.rateProcess = 60
      iGameHit.option.rateWait = 30
      iGameHit.option.rateSuccess = 60
      iGameHit.option.rateFail = 30

      iGameHit.option.radius = contextApp.unitpx * 0.16

      iGameHit.option.cx = [
        contextApp.locationLayout.w / 2 + (contextApp.unitpx / 4) * (1.5 - index % 4),
        contextApp.locationLayout.w / 2 + (contextApp.unitpx / 4) * (1.5 - index % 4),
      ]
      iGameHit.option.cy = [
        0,
        contextApp.locationLayout.h - contextApp.unitpx * 0.32,
      ]

      if (index === 0) iGameHit.time = time

      if (index > 0) iGameHit.time = gameHit[gameHit.length - 1].time + 20

      if (index > 0 && index % 4 === 0) iGameHit.time = gameHit[gameHit.length - 1].time
      if (index > 0 && index % 6 === 0) iGameHit.time = gameHit[gameHit.length - 1].time

      if (index > 0 && index % 3 === 0) iGameHit.time = gameHit[gameHit.length - 1].time + 60
      if (index > 0 && index % 12 === 0) iGameHit.time = gameHit[gameHit.length - 1].time + 120

      gameHit.push(iGameHit)
    })

    new Array(1).fill().map((i, index) => {
      const iGameWire = { key: Math.random(), ...initWireShakeRect(contextApp.locationLayout) }

      iGameWire.option.rateShow = 30
      iGameWire.option.rateHide = 30

      iGameWire.option.cx = [
        contextApp.locationLayout.w / 2,
        contextApp.locationLayout.w / 2,
        contextApp.locationLayout.w / 2,
      ]

      iGameWire.option.cy = [
        contextApp.locationLayout.h - contextApp.unitpx * 0.32 + contextApp.unitpx * 0.08,
        contextApp.locationLayout.h - contextApp.unitpx * 0.32,
        contextApp.locationLayout.h - contextApp.unitpx * 0.32 + contextApp.unitpx * 0.08,
      ]

      iGameWire.option.w = '100%'
      iGameWire.option.h = contextApp.unitpx * 0.16 * 0.04

      iGameWire.option.rateProcess = [...gameHit].reduce((t, i) => Math.max(t, i.time), 0) - time + 90

      iGameWire.option.shakeDirection = 'vertical'
      iGameWire.option.shakeUnit = contextApp.unitpx * 0.16 * 0.12
      iGameWire.option.shakeRate = contextApp.unitpx * 0.16 * 0.12 / 15

      iGameWire.time = [...gameHit].reduce((t, i) => Math.min(t, i.time), Infinity) - 30

      gameWire.push(iGameWire)

      gameHit.forEach(i => i.onSuccess = () => iGameWire.toHit())
    })

    return { gameHit, gameWire }
  }

  const A0 = createA(30)
  const A1 = createA([...A0.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 1200)
  const A2 = createA([...A1.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 800)
  const A3 = createA([...A2.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 1200)

  const createB = (time) => {
    const gameHit = []
    const gameWire = []

    new Array(20).fill().map((i, index) => {
      const iGameHit = { key: Math.random(), time: 0, ...initHitPointDropCircle(contextApp.locationLayout) }

      iGameHit.option.rateProcess = 60
      iGameHit.option.rateWait = 30
      iGameHit.option.rateSuccess = 60
      iGameHit.option.rateFail = 30

      iGameHit.option.radius = contextApp.unitpx * 0.16

      iGameHit.option.cy = [
        contextApp.locationLayout.h / 2 + (contextApp.unitpx / 4) * (0.5 - index % 2),
        contextApp.locationLayout.h / 2 + (contextApp.unitpx / 4) * (0.5 - index % 2),
      ]

      iGameHit.option.cx = [
        0,
        contextApp.locationLayout.w - contextApp.unitpx * 0.32,
      ]

      if (index === 0) iGameHit.time = time

      if (index > 0) iGameHit.time = gameHit[gameHit.length - 1].time + 120

      gameHit.push(iGameHit)
    })

    new Array(1).fill().map((i, index) => {
      const iGameWire = { key: Math.random(), time: 0, ...initWireShakeRect(contextApp.locationLayout) }

      iGameWire.option.rateShow = 30
      iGameWire.option.rateHide = 30

      iGameWire.option.cx = [
        contextApp.locationLayout.w - contextApp.unitpx * 0.32 + contextApp.unitpx * 0.08,
        contextApp.locationLayout.w - contextApp.unitpx * 0.32,
        contextApp.locationLayout.w - contextApp.unitpx * 0.32 + contextApp.unitpx * 0.08,
      ]

      iGameWire.option.cy = [
        contextApp.locationLayout.h / 2,
        contextApp.locationLayout.h / 2,
        contextApp.locationLayout.h / 2,
      ]

      iGameWire.option.w = contextApp.unitpx * 0.16 * 0.04
      iGameWire.option.h = '100%'

      iGameWire.option.rateProcess = [...gameHit].reduce((t, i) => Math.max(t, i.time), 0) - time + 90

      iGameWire.option.shakeDirection = 'horizontal'
      iGameWire.option.shakeUnit = contextApp.unitpx * 0.16 * 0.12
      iGameWire.option.shakeRate = contextApp.unitpx * 0.16 * 0.12 / 15

      iGameWire.time = [...gameHit].reduce((t, i) => Math.min(t, i.time), Infinity) - 30

      gameWire.push(iGameWire)

      gameHit.forEach(i => i.onSuccess = () => iGameWire.toHit())
    })

    return { gameHit, gameWire }
  }

  const B0 = createB(600)
  const B1 = createB([...B0.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 600)
  const B2 = createB([...B1.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 400)
  const B3 = createB([...B2.gameHit].reduce((t, i) => Math.max(t, i.time), 0) + 600)

  const gameRole = [
    {
      image: contextApp.imageA,
      name: '斯卡蒂',
      skillWaitTime: 0,
      skillWaitTimeEnough: 60,
      skillDescription: '清除最接近的 1 个打击点',
      skill: (gameHit) => {
        gameHit.filter(i => i.inProcess === true && i.inSuccess === false && i.inFail === false && i.inDestory === false).forEach((i, index) => {
          if (index < 1) {
            i.toSuccess()
            i.onHitAuto(1)
          }
        })
      },
    },
    {
      image: contextApp.imageB,
      name: '莱伊',
      skillWaitTime: 0,
      skillWaitTimeEnough: 300,
      skillDescription: '清除最接近的 2 个打击点',
      skill: (gameHit) => {
        gameHit.filter(i => i.inProcess === true && i.inSuccess === false && i.inFail === false && i.inDestory === false).forEach((i, index) => {
          if (index < 2) {
            i.toSuccess()
            i.onHitAuto(1)
          }
        })
      },
    },
    {
      image: contextApp.imageC,
      name: '拉普兰德',
      skillWaitTime: 0,
      skillWaitTimeEnough: 600,
      skillDescription: '清除最接近的 3 个打击点',
      skill: (gameHit) => {
        gameHit.filter(i => i.inProcess === true && i.inSuccess === false && i.inFail === false && i.inDestory === false).forEach((i, index) => {
          if (index < 3) {
            i.toSuccess()
            i.onHitAuto(1)
          }
        })
      },
    },
    {
      image: contextApp.imageD,
      name: '伊迪丝',
      skillWaitTime: 0,
      skillWaitTimeEnough: 1200,
      skillDescription: '清除最接近的 4 个打击点',
      skill: (gameHit) => {
        gameHit.filter(i => i.inProcess === true && i.inFail === false && i.inDestory === false).forEach((i, index) => {
          if (index < 4) {
            i.toSuccess()
            i.onHitAuto(1)
          }
        })
      },
    },
  ]

  const gameBackground = contextApp.imageBackgroundA
  const gameMusic = contextApp.audioStormsEye

  return {
    gameHit: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit, ...B0.gameHit, ...B1.gameHit, ...B2.gameHit, ...B3.gameHit].sort((a, b) => a.time - b.time),
    gameWire: [...A0.gameWire, ...A1.gameWire, ...A2.gameWire, ...A3.gameWire, ...B0.gameWire, ...B1.gameWire, ...B2.gameWire, ...B3.gameWire].sort((a, b) => a.time - b.time),
    gameDuration: [...A0.gameHit, ...A1.gameHit, ...A2.gameHit, ...A3.gameHit, ...B0.gameHit, ...B1.gameHit, ...B2.gameHit, ...B3.gameHit].reduce((t, i) => Math.max(t, i.time), 0),
    gameRole: gameRole,
    gameBackground: gameBackground,
    gameMusic: gameMusic,
  }
}

export { jsonA }