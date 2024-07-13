import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './View.Hit.Component.PointDropCircle'

const json_0 = (locationLayout) => {

  const gameHit = []

  new Array(100).fill().map((i, index) => {

    const iGameHit = {
      init: initHitPointDropCircle,
      option: { cx: [] },
      time: 0
    }

    iGameHit.option.radius = locationLayout.w / 8

    if (iGameHit.option.radius > 120) iGameHit.option.radius = 120
    if (iGameHit.option.radius < locationLayout.w / 24) iGameHit.option.radius = locationLayout.w / 24

    iGameHit.option.cx = [
      locationLayout.w / 2 + iGameHit.option.radius * 2.2 * (1.5 - index % 4),
      locationLayout.w / 2 + iGameHit.option.radius * 2.2 * (1.5 - index % 4),
    ]

    if (index === 0) iGameHit.time = 60

    if (index > 0) iGameHit.time = gameHit[index - 1].time + 20

    if (index > 0 && index % 4 === 0) iGameHit.time = gameHit[index - 1].time
    if (index > 0 && index % 6 === 0) iGameHit.time = gameHit[index - 1].time

    if (index > 0 && index % 3 === 0) iGameHit.time = gameHit[index - 1].time + 60
    if (index > 0 && index % 12 === 0) iGameHit.time = gameHit[index - 1].time + 120

    gameHit.push(iGameHit)
  })

  return {
    gameHit: gameHit
  }
}

export { json_0 }

