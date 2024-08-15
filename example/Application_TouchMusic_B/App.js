import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

import Entry from './App.Entry'
import Playground from './App.Playground'
import Message from './App.Message'

import JpgBackgroundA from './static/image-background/bg.8954cef1.jpg'

import JpgRoleA from './static/image-role/15418_5819817346.jpg'
import JpgRoleB from './static/image-role/161527_92732416628.jpg'
import JpgRoleC from './static/image-role/7351_43140012279.jpg'
import JpgRoleD from './static/image-role/73728_4832045983.jpg'
import Pngかに from './static/image-role/かに.png'

import PngBeanstalkSliver from './static/image-icon/beanstalk-sliver.png'
import PngBeanstalkWhite from './static/image-icon/beanstalk-white.png'
import PngCaesarSliver from './static/image-icon/caesar-sliver.png'
import PngCaesarWhite from './static/image-icon/caesar-white.png'
import PngCampfireSliver from './static/image-icon/campfire-sliver.png'
import PngCrossedChainsSliver from './static/image-icon/crossed-chains-sliver.png'
import PngCrystalShineSliver from './static/image-icon/crystal-shine-sliver.png'
import PngDeadlyStrikeSliver from './static/image-icon/deadly-strike-sliver.png'
import PngFallingBlobSliver from './static/image-icon/falling-blob-sliver.png'
import PngFangsSliver from './static/image-icon/fangs-sliver.png'
import PngFreedomDoveSliver from './static/image-icon/freedom-dove-sliver.png'
import PngFishingSliver from './static/image-icon/fishing-sliver.png'
import PngHauntingSliver from './static/image-icon/haunting-sliver.png'
import PngInfoBlack from './static/image-icon/info-black.png'
import PngOrbitSliver from './static/image-icon/orbit-sliver.png'
import PngPauseButtonSliver from './static/image-icon/pause-button-sliver.png'
import PngPlagueDoctorProfileSliver from './static/image-icon/plague-doctor-profile-sliver.png'
import PngRobeSliver from './static/image-icon/robe-sliver.png'
import PngSandsOfTimeSliver from './static/image-icon/sands-of-time-sliver.png'
import PngSinagotSliver from './static/image-icon/sinagot-sliver.png'
import PngTripleCornSliver from './static/image-icon/triple-corn-sliver.png'
import PngVileFluidSliver from './static/image-icon/vile-fluid-sliver.png'


import M4a猫咪派对 from './static/audio-bgm/猫咪派对.m4a'
import M4aImpactMetalLight003 from './static/audio-action/impactMetal_light_003.ogg'

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

const useLoadImage = () => {
  const { load: loadImageJpgBackgroundA, image: imageJpgBackgroundA } = ReactCanvas2dExtensions.useImage({ src: JpgBackgroundA })

  const { load: loadImageJpgRoleA, image: imageJpgRoleA } = ReactCanvas2dExtensions.useImage({ src: JpgRoleA })
  const { load: loadImageJpgRoleB, image: imageJpgRoleB } = ReactCanvas2dExtensions.useImage({ src: JpgRoleB })
  const { load: loadImageJpgRoleC, image: imageJpgRoleC } = ReactCanvas2dExtensions.useImage({ src: JpgRoleC })
  const { load: loadImageJpgRoleD, image: imageJpgRoleD } = ReactCanvas2dExtensions.useImage({ src: JpgRoleD })

  const { load: loadImagePngBeanstalkSliver, image: imagePngBeanstalkSliver } = ReactCanvas2dExtensions.useImage({ src: PngBeanstalkSliver })
  const { load: loadImagePngCaesarSliver, image: imagePngCaesarSliver } = ReactCanvas2dExtensions.useImage({ src: PngCaesarSliver })
  const { load: loadImagePngCampfireSliver, image: imagePngCampfireSliver } = ReactCanvas2dExtensions.useImage({ src: PngCampfireSliver })
  const { load: loadImagePngCrossedChainsSliver, image: imagePngCrossedChainsSliver } = ReactCanvas2dExtensions.useImage({ src: PngCrossedChainsSliver })
  const { load: loadImagePngCrystalShineSliver, image: imagePngCrystalShineSliver } = ReactCanvas2dExtensions.useImage({ src: PngCrystalShineSliver })
  const { load: loadImagePngDeadlyStrikeSliver, image: imagePngDeadlyStrikeSliver } = ReactCanvas2dExtensions.useImage({ src: PngDeadlyStrikeSliver })
  const { load: loadImagePngFallingBlobSliver, image: imagePngFallingBlobSliver } = ReactCanvas2dExtensions.useImage({ src: PngFallingBlobSliver })
  const { load: loadImagePngFangsSliver, image: imagePngFangsSliver } = ReactCanvas2dExtensions.useImage({ src: PngFangsSliver })
  const { load: loadImagePngFreedomDoveSliver, image: imagePngFreedomDoveSliver } = ReactCanvas2dExtensions.useImage({ src: PngFreedomDoveSliver })
  const { load: loadImagePngFishingSliver, image: imagePngFishingSliver } = ReactCanvas2dExtensions.useImage({ src: PngFishingSliver })
  const { load: loadImagePngHauntingSliver, image: imagePngHauntingSliver } = ReactCanvas2dExtensions.useImage({ src: PngHauntingSliver })
  const { load: loadImagePngInfoBlack, image: imagePngInfoBlack } = ReactCanvas2dExtensions.useImage({ src: PngInfoBlack })
  const { load: loadImagePngOrbitSliver, image: imagePngOrbitSliver } = ReactCanvas2dExtensions.useImage({ src: PngOrbitSliver })
  const { load: loadImagePngPauseButtonSliver, image: imagePngPauseButtonSliver } = ReactCanvas2dExtensions.useImage({ src: PngPauseButtonSliver })
  const { load: loadImagePngPlagueDoctorProfileSliver, image: imagePngPlagueDoctorProfileSliver } = ReactCanvas2dExtensions.useImage({ src: PngPlagueDoctorProfileSliver })
  const { load: loadImagePngRobeSliver, image: imagePngRobeSliver } = ReactCanvas2dExtensions.useImage({ src: PngRobeSliver })
  const { load: loadImagePngSandsOfTimeSliver, image: imagePngSandsOfTimeSliver } = ReactCanvas2dExtensions.useImage({ src: PngSandsOfTimeSliver })
  const { load: loadImagePngSinagotSliver, image: imagePngSinagotSliver } = ReactCanvas2dExtensions.useImage({ src: PngSinagotSliver })
  const { load: loadImagePngTripleCornSliver, image: imagePngTripleCornSliver } = ReactCanvas2dExtensions.useImage({ src: PngTripleCornSliver })
  const { load: loadImagePngVileFluidSliver, image: imagePngVileFluidSliver } = ReactCanvas2dExtensions.useImage({ src: PngVileFluidSliver })
  const { load: loadImagePngかに, image: imagePngかに } = ReactCanvas2dExtensions.useImage({ src: Pngかに })

  const load =
    loadImageJpgBackgroundA &&
    loadImageJpgRoleA &&
    loadImageJpgRoleB &&
    loadImageJpgRoleC &&
    loadImageJpgRoleD &&
    loadImagePngBeanstalkSliver &&
    loadImagePngCaesarSliver &&
    loadImagePngCampfireSliver &&
    loadImagePngCrossedChainsSliver &&
    loadImagePngCrystalShineSliver &&
    loadImagePngDeadlyStrikeSliver &&
    loadImagePngFallingBlobSliver &&
    loadImagePngFangsSliver &&
    loadImagePngFreedomDoveSliver &&
    loadImagePngFishingSliver &&
    loadImagePngHauntingSliver &&
    loadImagePngInfoBlack &&
    loadImagePngOrbitSliver &&
    loadImagePngPauseButtonSliver &&
    loadImagePngPlagueDoctorProfileSliver &&
    loadImagePngRobeSliver &&
    loadImagePngSandsOfTimeSliver &&
    loadImagePngSinagotSliver &&
    loadImagePngTripleCornSliver &&
    loadImagePngVileFluidSliver &&
    loadImagePngPlagueDoctorProfileSliver &&
    loadImagePngかに

  const image = {
    imageJpgBackgroundA,
    imageJpgRoleA,
    imageJpgRoleB,
    imageJpgRoleC,
    imageJpgRoleD,
    imagePngBeanstalkSliver,
    imagePngCaesarSliver,
    imagePngCampfireSliver,
    imagePngCrossedChainsSliver,
    imagePngCrystalShineSliver,
    imagePngDeadlyStrikeSliver,
    imagePngFallingBlobSliver,
    imagePngFangsSliver,
    imagePngFreedomDoveSliver,
    imagePngFishingSliver,
    imagePngHauntingSliver,
    imagePngInfoBlack,
    imagePngOrbitSliver,
    imagePngPauseButtonSliver,
    imagePngPlagueDoctorProfileSliver,
    imagePngRobeSliver,
    imagePngSandsOfTimeSliver,
    imagePngSinagotSliver,
    imagePngTripleCornSliver,
    imagePngVileFluidSliver,
    imagePngかに,
  }

  return { load, image }
}

const useLoadAudio = () => {
  const { load: loadAudioM4a猫咪派对, audio: audioM4a猫咪派对 } = ReactCanvas2dExtensions.useAudio({ src: M4a猫咪派对 })
  const { load: loadAudioM4aImpactMetalLight003, audio: audioM4aImpactMetalLight003 } = ReactCanvas2dExtensions.useAudio({ src: M4aImpactMetalLight003 })

  const load =
    loadAudioM4a猫咪派对 &&
    loadAudioM4aImpactMetalLight003

  const audio = {
    audioM4a猫咪派对,
    audioM4aImpactMetalLight003,
  }

  return { load, audio }
}

const useLoadTimeout = () => {
  const [load, setLoad] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => setLoad(true), 1000)
  }, [])

  return { load }
}

const useProfileInformation = () => {
  const [profileInformation, setProfileInformation] = React.useState()

  const saveProfileInformation = () => localStorage.setItem(version, JSON.stringify(profileInformation))

  React.useEffect(() => {
    setProfileInformation(localStorage.getItem(version) ? JSON.parse(localStorage.getItem(version)) : defaultProfileInfromation)
  }, [])

  return { profileInformation, setProfileInformation, saveProfileInformation }
}

const useLocationLayout = () => {
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

      const minPxRatioW = 0.25
      const minPxRatioH = 0.25

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

  return { refLayout, loadLayout, locationLayout, unitpx }
}

const useMessage = () => {
  const [message, setMessage] = React.useState([])

  const addMessage = (message) => setMessage(i => [...i, { key: Math.random(), message: message }])
  const removeMessage = (key) => setMessage(i => i.filter(n => n.key !== key))

  return { message, setMessage, addMessage, removeMessage }
}

function App() {
  const [router, setRouter] = React.useState([])

  const { load: loadImage, image } = useLoadImage()
  const { load: loadAudio, audio } = useLoadAudio()
  const { load: loadTimeout } = useLoadTimeout()

  const { refLayout, loadLayout, locationLayout, unitpx } = useLocationLayout()

  const profileInformation = useProfileInformation()
  const message = useMessage()

  const load = loadTimeout && loadImage && loadLayout

  React.useEffect(() => {
    if (loadLayout) {
      setRouter(['Entry'])
    }
  }, [loadLayout])

  // React.useEffect(() => {
  //   if (load) {
  //     setRouter(['Playground'])
  //   }
  // }, [load])

  return <ContextApp.Provider value={{ version, setRouter, locationLayout, unitpx, load, ...profileInformation, ...message, ...image, ...audio }}>
    <layout onLocationMounted={dom => refLayout.current = dom}>
      {
        router[router.length - 1] === 'Entry' ? <Entry /> : null
      }
      {
        router[router.length - 1] === 'Playground' ? <Playground /> : null
      }
      <Message />
    </layout>
  </ContextApp.Provider>
}

export default App