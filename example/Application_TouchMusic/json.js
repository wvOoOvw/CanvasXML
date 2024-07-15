import { init as initHitPointDropCircle } from './View.Hit.Component.PointDropCircle'
import { init as initHitPointDropRect } from './View.Hit.Component.PointDropRect'

import { init as initWireShakeRect } from './View.Wire.Component.ShakeRect'

const jsonA = (locationLayout) => {
  const gameHitA = []

  new Array(100).fill().map((i, index) => {
    const iGameHit = { key: Math.random(), time: 0, ...initHitPointDropCircle(locationLayout) }

    iGameHit.option.radius = locationLayout.w / 8

    if (iGameHit.option.radius > locationLayout.h / 12) iGameHit.option.radius = locationLayout.h / 12
    if (iGameHit.option.radius < locationLayout.w / 24) iGameHit.option.radius = locationLayout.w / 24

    iGameHit.option.cx = [
      locationLayout.w / 2 + iGameHit.option.radius * 2.2 * (1.5 - index % 4),
      locationLayout.w / 2 + iGameHit.option.radius * 2.2 * (1.5 - index % 4),
    ]
    iGameHit.option.cy = [
      0,
      locationLayout.h - 100 * 2,
    ]

    if (index === 0) iGameHit.time = 60

    if (index > 0) iGameHit.time = gameHitA[gameHitA.length - 1].time + 20

    if (index > 0 && index % 4 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time
    if (index > 0 && index % 6 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time

    if (index > 0 && index % 3 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time + 60
    if (index > 0 && index % 12 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time + 120

    gameHitA.push(iGameHit)
  })

  const gameHitB = []

  new Array(40).fill().map((i, index) => {
    const iGameHit = { key: Math.random(), time: 0, ...initHitPointDropCircle(locationLayout) }

    iGameHit.option.radius = locationLayout.w / 8

    if (iGameHit.option.radius > locationLayout.h / 12) iGameHit.option.radius = locationLayout.h / 12
    if (iGameHit.option.radius < locationLayout.w / 24) iGameHit.option.radius = locationLayout.w / 24

    if (locationLayout.w > locationLayout.h) {
      iGameHit.option.cx = [
        (locationLayout.w - locationLayout.h) / 2,
        locationLayout.w - 100 - (locationLayout.w - locationLayout.h) / 2,
      ]
    }

    if (locationLayout.w < locationLayout.h) {
      iGameHit.option.cx = [
        0,
        locationLayout.w - 100,
      ]
    }

    iGameHit.option.cy = [
      locationLayout.h / 2 + iGameHit.option.radius * 2.2 * (0.5 - index % 2),
      locationLayout.h / 2 + iGameHit.option.radius * 2.2 * (0.5 - index % 2),
    ]

    if (index === 0) iGameHit.time = 120

    if (index > 0) iGameHit.time = gameHitB[gameHitB.length - 1].time + 120

    gameHitB.push(iGameHit)
  })

  const gameWireA = []

  new Array(1).fill().map((i, index) => {
    const iGameWire = { key: Math.random(), time: 0, ...initWireShakeRect(locationLayout) }

    iGameWire.option.cx = [
      locationLayout.w / 2,
      locationLayout.w / 2,
      locationLayout.w / 2,
    ]

    iGameWire.option.cy = [
      locationLayout.h - 100 * 2 + 24,
      locationLayout.h - 100 * 2,
      locationLayout.h - 100 * 2 + 24,
    ]

    iGameWire.option.w = '200%'
    iGameWire.option.h = 4
    iGameWire.option.shakeDirection = '4px'

    iGameWire.option.rateProcess = [...gameHitA].reduce((t, i) => Math.max(t, i.time), 0)

    iGameWire.option.shakeDirection = 'vertical'
    iGameWire.option.shakeUnit = 8
    iGameWire.option.shakeRate = 0.5

    iGameWire.time = [...gameHitA].reduce((t, i) => Math.min(t, i.time), 0)

    gameWireA.push(iGameWire)

    gameHitA.forEach(i => i.onSuccess = () => iGameWire.toHit())
  })

  return {
    gameHit: [...gameHitA, ...gameHitB].sort((a, b) => a.time - b.time),
    gameWire: [...gameWireA].sort((a, b) => a.time - b.time),
    gameDuration: [...gameHitA, ...gameHitB].reduce((t, i) => Math.max(t, i.time), 0),
  }
}

const jsonB = (locationLayout) => {
  const gameHitA = []

  new Array(100).fill().map((i, index) => {
    const iGameHit = { key: Math.random(), time: 0, ...initHitPointDropRect(locationLayout) }

    iGameHit.option.radius = locationLayout.w / 8

    if (iGameHit.option.radius > locationLayout.h / 12) iGameHit.option.radius = locationLayout.h / 12
    if (iGameHit.option.radius < locationLayout.w / 24) iGameHit.option.radius = locationLayout.w / 24

    iGameHit.option.w = iGameHit.option.radius * 2
    iGameHit.option.h = iGameHit.option.radius / 2

    iGameHit.option.cx = [
      locationLayout.w / 2 + iGameHit.option.radius * 2.2 * (1.5 - index % 4),
      locationLayout.w / 2 + iGameHit.option.radius * 2.2 * (1.5 - index % 4),
    ]
    iGameHit.option.cy = [
      0,
      locationLayout.h - 100 * 2,
    ]

    if (index === 0) iGameHit.time = 60

    if (index > 0) iGameHit.time = gameHitA[gameHitA.length - 1].time + 20

    if (index > 0 && index % 4 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time
    if (index > 0 && index % 6 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time

    if (index > 0 && index % 3 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time + 60
    if (index > 0 && index % 12 === 0) iGameHit.time = gameHitA[gameHitA.length - 1].time + 120

    gameHitA.push(iGameHit)
  })

  const gameWireA = []

  new Array(1).fill().map((i, index) => {
    const iGameWire = { key: Math.random(), option: initWireShakeRect(locationLayout), time: 0 }

    iGameWire.option.cx = [
      locationLayout.w / 2,
      locationLayout.w / 2,
      locationLayout.w / 2,
    ]

    iGameWire.option.cy = [
      locationLayout.h - 100 * 2 + 24,
      locationLayout.h - 100 * 2,
      locationLayout.h - 100 * 2 + 24,
    ]

    iGameWire.option.w = '200%'
    iGameWire.option.shakeDirection = '4px'

    iGameWire.option.rateProcess = [...gameHitA].reduce((t, i) => Math.max(t, i.time), 0)

    iGameWire.option.shakeDirection = 'vertical'
    iGameWire.option.shakeUnit = 8
    iGameWire.option.shakeRate = 0.5

    iGameWire.time = [...gameHitA].reduce((t, i) => Math.min(t, i.time), 0)

    gameWireA.push(iGameWire)

    gameHitA.forEach(i => i.onSuccess = () => iGameWire.toHit())
  })

  return {
    gameHit: [...gameHitA].sort((a, b) => a.time - b.time),
    gameWire: [...gameHitA].sort((a, b) => a.time - b.time),
    gameDuration: [...gameHitA].reduce((t, i) => Math.max(t, i.time), 0),
  }
}

export { jsonA, jsonB }

