import { init as initHitPointDropCircle, App as AppHitPointDropCircle } from './Hit.Component.PointDropCircle'

const json_0 = (locationCoordinate) => {
  return {
    hits: [
      ...new Array(100).fill().map((i, index) => {
        if (index % 2 === 0) {
          return {
            init: initHitPointDropCircle,
            option: {
              cx: [
                locationCoordinate.w / 2 + 100 * 2,
                locationCoordinate.w / 2 + 100 * 2,
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
                locationCoordinate.w / 2 - 100 * 2,
                locationCoordinate.w / 2 - 100 * 2,
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