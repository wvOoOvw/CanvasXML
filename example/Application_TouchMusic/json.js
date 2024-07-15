import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './View.Hit.Component.PointDropCircle'
import { init as initHitPointDropRect, App as AppHitPointDropRect } from './View.Hit.Component.PointDropRect'

const jsonA = (locationLayout) => {
  const gameHitA = []

  new Array(100).fill().map((i, index) => {
    const iGameHit = {
      key: Math.random(),
      option: { cx: [], cy: [] },
      time: 0,
      init: initHitPointDropCircle,
    }

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
    const iGameHit = {
      key: Math.random(),
      option: { cx: [], cy: [] },
      time: 0,
      init: initHitPointDropCircle,
    }

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

  return {
    gameHit: [...gameHitA, ...gameHitB].sort((a, b) => a.time - b.time),
    // gameWire: [...gameHitA, ...gameHitB].sort((a, b) => a.time - b.time),
    gameDuration: [...gameHitA, ...gameHitB].reduce((t, i) => Math.max(t, i.time), 0),
  }
}

const jsonB = (locationLayout) => {
  const gameHitA = []

  new Array(100).fill().map((i, index) => {
    const iGameHit = {
      key: Math.random(),
      option: { cx: [], cy: [] },
      time: 0,
      init: initHitPointDropRect,
    }

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

  return {
    gameHit: [...gameHitA].sort((a, b) => a.time - b.time),
    // gameWire: [...gameHitA].sort((a, b) => a.time - b.time),
    gameDuration: [...gameHitA].reduce((t, i) => Math.max(t, i.time), 0),
  }
}

export { jsonA, jsonB }

