import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

import Loading from './App.Loading'
import Entry from './App.Entry'
import Playground from './App.Playground'

import jpgRoleBackgroundA from './static/bg.8954cef1.jpg'

import jpgRoleA from './static/role/15418_5819817346.jpg'
import jpgRoleB from './static/role/161527_92732416628.jpg'
import jpgRoleC from './static/role/7351_43140012279.jpg'
import jpgRoleD from './static/role/73728_4832045983.jpg'

import pngBeanstalkButton from './static/icon/beanstalk.png'
import pngCaesar from './static/icon/caesar.png'
import pngCampfire from './static/icon/campfire.png'
import pngCrystalShineButton from './static/icon/crystal-shine.png'
import pngDeadlyStrike from './static/icon/deadly-strike.png'
import pngFallingBlob from './static/icon/falling-blob.png'
import pngFangs from './static/icon/fangs.png'
import pngFreedomDove from './static/icon/freedom-dove.png'
import pngFishing from './static/icon/fishing.png'
import pngHaunting from './static/icon/haunting.png'
import pngOrbit from './static/icon/orbit.png'
import pngPauseButton from './static/icon/pause-button.png'
import pngPlagueDoctorProfile from './static/icon/plague-doctor-profile.png'
import pngRobe from './static/icon/robe.png'
import pngSandsOfTime from './static/icon/sands-of-time.png'
import pngSinagot from './static/icon/sinagot.png'
import pngTripleCorn from './static/icon/triple-corn.png'
import pngVileFluid from './static/icon/vile-fluid.png'

// import StormsEye from './static/bgm/StormsEye.m4a'
// import Door from './static/bgm/Door.m4a'

// import PianoV1E1 from './static/PianoV1/e1.m4a'
// import PianoV1E2 from './static/PianoV1/e2.m4a'
// import PianoV1E3 from './static/PianoV1/e3.m4a'
// import PianoV1E4 from './static/PianoV1/e4.m4a'
// import PianoV1E5 from './static/PianoV1/e5.m4a'
// import PianoV1E6 from './static/PianoV1/e6.m4a'
import PianoV1E7 from './static/PianoV1/e7.m4a'

const version = '1.0.1'

const defaultProfileInfromation = {
  wire: [
    {
      type: '0001',
      level: 0,
    }
  ],
  store: [

  ]
}

function App() {
  const [loadTimeout, setLoadTimeout] = React.useState(false)

  const [router, setRouter] = React.useState('')

  const [profileInformation, setProfileInformation] = React.useState()

  const { load: loadBackgroundA, image: imageJpgBackgroundA } = ReactCanvas2dExtensions.useImage({ src: jpgRoleBackgroundA })

  const { load: loadimageJpgRoleA, image: imageJpgRoleA } = ReactCanvas2dExtensions.useImage({ src: jpgRoleA })
  const { load: loadimageJpgRoleB, image: imageJpgRoleB } = ReactCanvas2dExtensions.useImage({ src: jpgRoleB })
  const { load: loadimageJpgRoleC, image: imageJpgRoleC } = ReactCanvas2dExtensions.useImage({ src: jpgRoleC })
  const { load: loadimageJpgRoleD, image: imageJpgRoleD } = ReactCanvas2dExtensions.useImage({ src: jpgRoleD })

  const { load: loadImagePngBeanstalkButton, image: imagePngBeanstalkButton } = ReactCanvas2dExtensions.useImage({ src: pngBeanstalkButton })
  const { load: loadImagePngCaesar, image: imagePngCaesar } = ReactCanvas2dExtensions.useImage({ src: pngCaesar })
  const { load: loadImagePngCampfire, image: imagePngCampfire } = ReactCanvas2dExtensions.useImage({ src: pngCampfire })
  const { load: loadImagePngCrystalShineButton, image: imagePngCrystalShineButton } = ReactCanvas2dExtensions.useImage({ src: pngCrystalShineButton })
  const { load: loadImagePngDeadlyStrike, image: imagePngDeadlyStrike } = ReactCanvas2dExtensions.useImage({ src: pngDeadlyStrike })
  const { load: loadImagePngFallingBlob, image: imagePngFallingBlob } = ReactCanvas2dExtensions.useImage({ src: pngFallingBlob })
  const { load: loadImagePngFangs, image: imagePngFangs } = ReactCanvas2dExtensions.useImage({ src: pngFangs })
  const { load: loadImagePngFreedomDove, image: imagePngFreedomDove } = ReactCanvas2dExtensions.useImage({ src: pngFreedomDove })
  const { load: loadImagePngFishing, image: imagePngFishing } = ReactCanvas2dExtensions.useImage({ src: pngFishing })
  const { load: loadImagePngHaunting, image: imagePngHaunting } = ReactCanvas2dExtensions.useImage({ src: pngHaunting })
  const { load: loadImagePngOrbit, image: imagePngOrbit } = ReactCanvas2dExtensions.useImage({ src: pngOrbit })
  const { load: loadImagePngPauseButton, image: imagePngPauseButton } = ReactCanvas2dExtensions.useImage({ src: pngPauseButton })
  const { load: loadImagePngPlagueDoctorProfile, image: imagePngPlagueDoctorProfile } = ReactCanvas2dExtensions.useImage({ src: pngPlagueDoctorProfile })
  const { load: loadImagePngRobe, image: imagePngRobe } = ReactCanvas2dExtensions.useImage({ src: pngRobe })
  const { load: loadImagePngSandsOfTime, image: imagePngSandsOfTime } = ReactCanvas2dExtensions.useImage({ src: pngSandsOfTime })
  const { load: loadImagePngSinagot, image: imagePngSinagot } = ReactCanvas2dExtensions.useImage({ src: pngSinagot })
  const { load: loadImagePngTripleCorn, image: imagePngTripleCorn } = ReactCanvas2dExtensions.useImage({ src: pngTripleCorn })
  const { load: loadImagePngVileFluid, image: imagePngVileFluid } = ReactCanvas2dExtensions.useImage({ src: pngVileFluid })

  // const { load: loadAudioStormsEye, audio: audioStormsEye } = ReactCanvas2dExtensions.useAudio({ src: StormsEye })
  // const { load: loadAudioPianoV1E1, audio: audioPianoV1E1 } = ReactCanvas2dExtensions.useAudio({ src: PianoV1E1 })
  // const { load: loadAudioPianoV1E2, audio: audioPianoV1E2 } = ReactCanvas2dExtensions.useAudio({ src: PianoV1E2 })
  // const { load: loadAudioPianoV1E3, audio: audioPianoV1E3 } = ReactCanvas2dExtensions.useAudio({ src: PianoV1E3 })
  // const { load: loadAudioPianoV1E4, audio: audioPianoV1E4 } = ReactCanvas2dExtensions.useAudio({ src: PianoV1E4 })
  // const { load: loadAudioPianoV1E5, audio: audioPianoV1E5 } = ReactCanvas2dExtensions.useAudio({ src: PianoV1E5 })
  // const { load: loadAudioPianoV1E6, audio: audioPianoV1E6 } = ReactCanvas2dExtensions.useAudio({ src: PianoV1E6 })
  const { load: loadAudioPianoV1E7, audio: audioPianoV1E7 } = ReactCanvas2dExtensions.useAudio({ src: PianoV1E7 })

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2dExtensions.useLocationProperty({ default: { x: undefined, y: undefined, w: undefined, h: undefined } })

  const unitpx = React.useMemo(() => {
    if (loadLayout) {
      const w = locationLayout.w
      const h = locationLayout.h

      const ratio = w / h

      let px

      const minRatio = 0.25
      const maxRatio = 1 / 0.25
      const midRatio = 1

      const minPxRatioW = 0.3
      const minPxRatioH = 0.3

      var minPx = w
      var maxPx = h
      var midPx = w * minPxRatioW + h * minPxRatioH

      if (ratio < midRatio) midPx = w * minPxRatioW * 2
      if (ratio > midRatio) midPx = h * minPxRatioH * 2

      if (ratio < minRatio || ratio === minRatio) px = minPx
      if (ratio > maxRatio || ratio === maxRatio) px = maxPx
      if (ratio === midRatio) px = midPx
      if (ratio > minRatio && ratio < midRatio) px = minPx + ((ratio - minRatio) / (midRatio - minRatio)) * (midPx - minPx)
      if (ratio > midRatio && ratio < maxRatio) px = midPx + ((ratio - midRatio) / (maxRatio - midRatio)) * (maxPx - midPx)

      if (px > 768) px = px - px * (1 - 768 / px)

      return px
    }
  }, [loadLayout, locationLayout])

  const load =
    loadTimeout &&
    loadBackgroundA &&
    loadimageJpgRoleA &&
    loadimageJpgRoleB &&
    loadimageJpgRoleC &&
    loadimageJpgRoleD &&
    loadImagePngBeanstalkButton &&
    loadImagePngCaesar &&
    loadImagePngCampfire &&
    loadImagePngCrystalShineButton &&
    loadImagePngDeadlyStrike &&
    loadImagePngFallingBlob &&
    loadImagePngFangs &&
    loadImagePngFreedomDove &&
    loadImagePngFishing &&
    loadImagePngHaunting &&
    loadImagePngOrbit &&
    loadImagePngPauseButton &&
    loadImagePngPlagueDoctorProfile &&
    loadImagePngRobe &&
    loadImagePngSandsOfTime &&
    loadImagePngSinagot &&
    loadImagePngTripleCorn &&
    loadImagePngVileFluid &&
    loadImagePngPlagueDoctorProfile &&
    loadLayout

  const saveProfileInformation = () => localStorage.setItem(version, JSON.stringify(profileInformation))

  React.useEffect(() => {
    setTimeout(() => setLoadTimeout(true), 1000)
  }, [])

  React.useEffect(() => {
    if (loadLayout) setRouter('Loading')
  }, [loadLayout])

  // React.useEffect(() => {
  //   if (load) setRouter('Playground')
  // }, [load])

  React.useEffect(() => {
    setProfileInformation(localStorage.getItem(version) ? JSON.parse(localStorage.getItem(version)) : defaultProfileInfromation)
  }, [])

  console.log(1)

  return <ContextApp.Provider value={
    {
      version,
      router,
      setRouter,
      profileInformation,
      setProfileInformation,
      saveProfileInformation,
      locationLayout,
      unitpx,
      imageJpgBackgroundA,
      imageJpgRoleA,
      imageJpgRoleB,
      imageJpgRoleC,
      imageJpgRoleD,
      imagePngBeanstalkButton,
      imagePngCaesar,
      imagePngCampfire,
      imagePngCrystalShineButton,
      imagePngDeadlyStrike,
      imagePngFallingBlob,
      imagePngFangs,
      imagePngFreedomDove,
      imagePngFishing,
      imagePngHaunting,
      imagePngOrbit,
      imagePngPauseButton,
      imagePngPlagueDoctorProfile,
      imagePngRobe,
      imagePngSandsOfTime,
      imagePngSinagot,
      imagePngTripleCorn,
      imagePngVileFluid,
      audioPianoV1E7
    }
  }>
    <layout onLocationMounted={dom => refLayout.current = dom}>
      {
        router === 'Loading' ? <Loading load={load} onDestory={() => setRouter('Entry')} /> : null
      }

      {
        router === 'Entry' ? <Entry onDestory={() => setRouter('Playground')} /> : null
      }

      {
        router === 'Playground' ? <Playground /> : null
      }
    </layout>
  </ContextApp.Provider>
}

export default App