import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './Hit.Component.PointDropCircle'

const json_0 = (locationLayout) => {
  return {
    gameHit: [
      ...new Array(100).fill().map((i, index) => {
        if (index % 2 === 0) {
          return {
            init: initHitPointDropCircle,
            option: {
              cx: [
                locationLayout.w / 2 + 100 * 2,
                locationLayout.w / 2 + 100 * 2,
              ]
            },
            time: index * 20
          }
        }

        if (index % 2 === 1) {
          return {
            init: initHitPointDropCircle,
            option: {
              cx: [
                locationLayout.w / 2 - 100 * 2,
                locationLayout.w / 2 - 100 * 2,
              ]
            },
            time: index * 20
          }
        }
      })
    ]
  }
}

export { json_0 }