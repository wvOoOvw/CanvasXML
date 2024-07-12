import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './Hit.Component.PointDropCircle'

const json_0 = (locationLayout) => {

  const gameHit = []

  new Array(100).fill().map((i, index) => {

    const iGameHit = {
      init: initHitPointDropCircle,
      option: { cx: [] },
      time: 0
    }

    if (index % 2 === 0) {
      iGameHit.option.cx = [
        locationLayout.w / 2 + locationLayout.w / 4,
        locationLayout.w / 2 + locationLayout.w / 4,
      ]
    }

    if (index % 2 !== 0) {
      iGameHit.option.cx = [
        locationLayout.w / 2 - locationLayout.w / 4,
        locationLayout.w / 2 - locationLayout.w / 4,
      ]
    }

    if (index > 0 && index % 12 === 0) iGameHit.time = gameHit[index - 1].time + 120
    if (index > 0 && index % 12 !== 0) iGameHit.time = gameHit[index - 1].time + 20

    gameHit.push(iGameHit)
  })

  return {
    gameHit: gameHit
  }
}

export { json_0 }

