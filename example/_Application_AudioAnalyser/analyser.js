const analyser = (src) => {
  const audioContext = new AudioContext()
  const audio = new Audio()
  const source = audioContext.createMediaElementSource(audio)
  const analyser = audioContext.createAnalyser()

  source.connect(analyser)
  analyser.connect(audioContext.destination)

  audio.src = src
  audio.play()

  analyser.fftSize = 2048
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  function draw() {
    requestAnimationFrame(draw)

    analyser.getByteFrequencyData(dataArray)

    let maxVolume = 0
    let maxIndex = 0

    new Array(bufferLength).forEach((i,index) => {
        if (dataArray[index] > maxVolume) {
            maxVolume = dataArray[index]
            maxIndex = index
          }
    })

    console.log(`最大音量点: ${maxIndex}, 音量: ${maxVolume}`)
  }

  draw()
}

export { analyser }
