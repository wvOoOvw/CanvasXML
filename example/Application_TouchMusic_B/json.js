const jsonA = (contextApp) => {

  const createPointA = (time) => {
    const gameHit = []

    new Array(40).fill().forEach((i, index) => {
      const option = {
        moveSpeed: contextApp.locationLayout.h / 120,
        movePoint: [
          {
            x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
            y: 0 - contextApp.unitpx * 0.16,
            pass: false,
            time: 0,
          },
          {
            x: contextApp.locationLayout.w / 2 + (contextApp.unitpx * 0.36) * (1.5 - index % 4),
            y: contextApp.locationLayout.h + contextApp.unitpx * 0.16,
            pass: false,
            time: 0,
          },
        ]
      }

      if (index > 0) time = gameHit[gameHit.length - 1].time + 30
      if (index > 0 && index % 4 === 0) time = gameHit[gameHit.length - 1].time
      if (index > 0 && index % 6 === 0) time = gameHit[gameHit.length - 1].time

      gameHit.push({ type: 'HitBaseA', option, time })
    })

    return gameHit
  }

  const A0 = createPointA(30)
  const A1 = createPointA([...A0].reduce((t, i) => Math.max(t, i.time), 0) + 120)
  const A2 = createPointA([...A1].reduce((t, i) => Math.max(t, i.time), 0) + 120)
  const A3 = createPointA([...A2].reduce((t, i) => Math.max(t, i.time), 0) + 120)

  const gameWire = [
    { type: 'WireBaseA', option: undefined },
    { type: 'WireBaseA', option: undefined },
    { type: 'WireBaseA', option: undefined },
    { type: 'WireBaseA', option: undefined },
    // { type: 'WireBaseB', option: undefined },
    // { type: 'WireBaseC', option: undefined },
    // { type: 'WireBaseD', option: undefined },
  ]

  const gameBackgroundImageIndex = 'imageJpgBackgroundA'
  const gameBackgroundAudioIndex = 'audioM4a猫咪派对'

  return {
    gameHit: [...A0, ...A1, ...A2, ...A3].sort((a, b) => a.time - b.time),
    gameWire: gameWire,
    gameBackgroundImageIndex: gameBackgroundImageIndex,
    gameBackgroundAudioIndex: gameBackgroundAudioIndex,
  }
}

export { jsonA }