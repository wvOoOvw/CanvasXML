import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvasThreeJsExtensions from '../../package/ReactCanvasThreeJsExtensions'

import ContextApp from './Context.App'

import Message from './App.Message'
import Scene from './App.Scene'

import PngBackground1 from './static/image-background/game_background_1.png'
import Jpg773503h90p0 from './static/image-background/773503h90p0.jpg'

import JpgRoleA from './static/image-role/15418_5819817346.jpg'
import JpgRoleB from './static/image-role/161527_92732416628.jpg'
import JpgRoleC from './static/image-role/7351_43140012279.jpg'
import JpgRoleD from './static/image-role/0212_26213370232.jpg'
import JpgRoleE from './static/image-role/73728_4832045983.jpg'
// import Pngかに from './static/image-role/かに.png'

import PngAnticlockwiseRotationWhite from './static/image-icon/anticlockwise-rotation-white.png'
import PngArrowDunkWhite from './static/image-icon/arrow-dunk-white.png'
import PngBeanstalkSliver from './static/image-icon/beanstalk-sliver.png'
import PngBeanstalkWhite from './static/image-icon/beanstalk-white.png'
import PngCaesarSliver from './static/image-icon/caesar-sliver.png'
import PngCaesarWhite from './static/image-icon/caesar-white.png'
import PngCampfireSliver from './static/image-icon/campfire-sliver.png'
import PngCampfireWhite from './static/image-icon/campfire-white.png'
import PngCardDrawWhite from './static/image-icon/card-draw-white.png'
import PngCardExchangeWhite from './static/image-icon/card-exchange-white.png'
import PngClockwiseRotationWhite from './static/image-icon/clockwise-rotation-white.png'
import PngCrossedChainsSliver from './static/image-icon/crossed-chains-sliver.png'
import PngCrossedChainsWhite from './static/image-icon/crossed-chains-white.png'
import PngCrystalShineSliver from './static/image-icon/crystal-shine-sliver.png'
import PngCycleWhite from './static/image-icon/cycle-white.png'
import PngDeadlyStrikeSliver from './static/image-icon/deadly-strike-sliver.png'
import PngDeadlyStrikeWhite from './static/image-icon/deadly-strike-white.png'
import PngDigitalTraceWhite from './static/image-icon/digital-trace-white.png'
import PngDividedSpiralWhite from './static/image-icon/divided-spiral-white.png'
import PngFallingBlobSliver from './static/image-icon/falling-blob-sliver.png'
import PngFallingBlobWhite from './static/image-icon/falling-blob-white.png'
import PngFangsSliver from './static/image-icon/fangs-sliver.png'
import PngFangsWhite from './static/image-icon/fangs-white.png'
import PngFreedomDoveSliver from './static/image-icon/freedom-dove-sliver.png'
import PngFreedomDoveWhite from './static/image-icon/freedom-dove-white.png'
import PngFishingSliver from './static/image-icon/fishing-sliver.png'
import PngFishingWhite from './static/image-icon/fishing-white.png'
import PngHauntingSliver from './static/image-icon/haunting-sliver.png'
import PngHauntingWhite from './static/image-icon/haunting-white.png'
import PngHeartBeatsD0021B from './static/image-icon/heart-beats-D0021B.png'
import PngHeartBeatsGray from './static/image-icon/heart-beats-gray.png'
import PngHeartBeatsWhite from './static/image-icon/heart-beats-white.png'
import PngInfoBlack from './static/image-icon/info-black.png'
import PngInfoCandy from './static/image-icon/info-candy.png'
import PngInfoCustomBlackpink from './static/image-icon/info-custom-blackpink.png'
import PngInfoCustomBlackshadow from './static/image-icon/info-custom-blackshadow.png'
import PngLayeredArmor8B572A from './static/image-icon/layered-armor-8B572A.png'
import PngLayeredArmorWhite from './static/image-icon/layered-armor-white.png'
import PngMushroomHouseWhite from './static/image-icon/mushroom-house-white.png'
import PngOrbitSliver from './static/image-icon/orbit-sliver.png'
import PngOrbitWhite from './static/image-icon/orbit-white.png'
import PngPauseButtonSliver from './static/image-icon/pause-button-sliver.png'
import PngPauseButtonWhite from './static/image-icon/pause-button-white.png'
import PngPlagueDoctorProfileSliver from './static/image-icon/plague-doctor-profile-sliver.png'
import PngPlagueDoctorProfileWhite from './static/image-icon/plague-doctor-profile-white.png'
import PngPlayButtonWhite from './static/image-icon/play-button-white.png'
import PngRobeSliver from './static/image-icon/robe-sliver.png'
import PngRobeWhite from './static/image-icon/robe-white.png'
import PngSandsOfTimeSliver from './static/image-icon/sands-of-time-sliver.png'
import PngSandsOfTimeWhite from './static/image-icon/sands-of-time-white.png'
import PngSinagotSliver from './static/image-icon/sinagot-sliver.png'
import PngSinagotWhite from './static/image-icon/sinagot-white.png'
import PngSpeedometerWhite from './static/image-icon/speedometer-white.png'
import PngSwapBagWhite from './static/image-icon/swap-bag-white.png'
import PngSwordmanWhite from './static/image-icon/swordman-white.png'
import PngSwordsEmblemCustomBlue0 from './static/image-icon/swords-emblem-custom-blue-0.png'
import PngSwordsEmblemWhite from './static/image-icon/swords-emblem-white.png'
import PngTripleCornSliver from './static/image-icon/triple-corn-sliver.png'
import PngTripleCornWhite from './static/image-icon/triple-corn-white.png'
import PngVileFluidSliver from './static/image-icon/vile-fluid-sliver.png'
import PngVileFluidWhite from './static/image-icon/vile-fluid-white.png'
import PngWizardStaffWhite from './static/image-icon/wizard-staff-White.png'

import PngBlack_crystal1 from './static/image-rock/Black_crystal1.png'
import PngBlue_crystal1 from './static/image-rock/Blue_crystal1.png'
import PngRed_crystal1 from './static/image-rock/Red_crystal1.png'
import PngGreen_crystal1 from './static/image-rock/Green_crystal1.png'

// import Mp3Jjw from './static/audio-bgm/jjw.mp3'
// import Mp3ImpactMetalLight003 from './static/audio-action/impactMetal_light_003.mp3'
// import Mp3Switch1 from './static/audio-action/switch1.mp3'

const version = '1.0.0'

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
  const { load: loadImagePngBackground1, image: imagePngBackground1 } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngBackground1 })
  const { load: loadImageJpg773503h90p0, image: imageJpg773503h90p0 } = ReactCanvasThreeJsExtensions.useLoadImage({ src: Jpg773503h90p0 })

  const { load: loadImageJpgRoleA, image: imageJpgRoleA } = ReactCanvasThreeJsExtensions.useLoadImage({ src: JpgRoleA })
  const { load: loadImageJpgRoleB, image: imageJpgRoleB } = ReactCanvasThreeJsExtensions.useLoadImage({ src: JpgRoleB })
  const { load: loadImageJpgRoleC, image: imageJpgRoleC } = ReactCanvasThreeJsExtensions.useLoadImage({ src: JpgRoleC })
  const { load: loadImageJpgRoleD, image: imageJpgRoleD } = ReactCanvasThreeJsExtensions.useLoadImage({ src: JpgRoleD })
  const { load: loadImageJpgRoleE, image: imageJpgRoleE } = ReactCanvasThreeJsExtensions.useLoadImage({ src: JpgRoleE })
  // const { load: loadImagePngかに, image: imagePngかに } = ReactCanvasThreeJsExtensions.useLoadImage({ src: Pngかに })

  const { load: loadImagePngBeanstalkSliver, image: imagePngBeanstalkSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngBeanstalkSliver })
  const { load: loadImagePngAnticlockwiseRotationWhite, image: imagePngAnticlockwiseRotationWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngAnticlockwiseRotationWhite })
  const { load: loadImagePngArrowDunkWhite, image: imagePngArrowDunkWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngArrowDunkWhite })
  const { load: loadImagePngBeanstalkWhite, image: imagePngBeanstalkWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngBeanstalkWhite })
  const { load: loadImagePngCaesarSliver, image: imagePngCaesarSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCaesarSliver })
  const { load: loadImagePngCaesarWhite, image: imagePngCaesarWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCaesarWhite })
  const { load: loadImagePngCampfireSliver, image: imagePngCampfireSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCampfireSliver })
  const { load: loadImagePngCampfireWhite, image: imagePngCampfireWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCampfireWhite })
  const { load: loadImagePngCardDrawWhite, image: imagePngCardDrawWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCardDrawWhite })
  const { load: loadImagePngCardExchangeWhite, image: imagePngCardExchangeWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCardExchangeWhite })
  const { load: loadImagePngClockwiseRotationWhite, image: imagePngClockwiseRotationWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngClockwiseRotationWhite })
  const { load: loadImagePngCrossedChainsSliver, image: imagePngCrossedChainsSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCrossedChainsSliver })
  const { load: loadImagePngCrossedChainsWhite, image: imagePngCrossedChainsWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCrossedChainsWhite })
  const { load: loadImagePngCrystalShineSliver, image: imagePngCrystalShineSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCrystalShineSliver })
  const { load: loadImagePngCycleWhite, image: imagePngCycleWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngCycleWhite })
  const { load: loadImagePngDeadlyStrikeSliver, image: imagePngDeadlyStrikeSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngDeadlyStrikeSliver })
  const { load: loadImagePngDeadlyStrikeWhite, image: imagePngDeadlyStrikeWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngDeadlyStrikeWhite })
  const { load: loadImagePngDigitalTraceWhite, image: imagePngDigitalTraceWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngDigitalTraceWhite })
  const { load: loadImagePngDividedSpiralWhite, image: imagePngDividedSpiralWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngDividedSpiralWhite })
  const { load: loadImagePngFallingBlobSliver, image: imagePngFallingBlobSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFallingBlobSliver })
  const { load: loadImagePngFallingBlobWhite, image: imagePngFallingBlobWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFallingBlobWhite })
  const { load: loadImagePngFangsSliver, image: imagePngFangsSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFangsSliver })
  const { load: loadImagePngFangsWhite, image: imagePngFangsWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFangsWhite })
  const { load: loadImagePngFreedomDoveSliver, image: imagePngFreedomDoveSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFreedomDoveSliver })
  const { load: loadImagePngFreedomDoveWhite, image: imagePngFreedomDoveWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFreedomDoveWhite })
  const { load: loadImagePngFishingSliver, image: imagePngFishingSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFishingSliver })
  const { load: loadImagePngFishingWhite, image: imagePngFishingWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngFishingWhite })
  const { load: loadImagePngHauntingSliver, image: imagePngHauntingSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngHauntingSliver })
  const { load: loadImagePngHauntingWhite, image: imagePngHauntingWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngHauntingWhite })
  const { load: loadImagePngHeartBeatsD0021B, image: imagePngHeartBeatsD0021B } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngHeartBeatsD0021B })
  const { load: loadImagePngHeartBeatsGray, image: imagePngHeartBeatsGray } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngHeartBeatsGray })
  const { load: loadImagePngHeartBeatsWhite, image: imagePngHeartBeatsWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngHeartBeatsWhite })
  const { load: loadImagePngInfoBlack, image: imagePngInfoBlack } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngInfoBlack })
  const { load: loadImagePngInfoCandy, image: imagePngInfoCandy } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngInfoCandy })
  const { load: loadImagePngInfoCustomBlackpink, image: imagePngInfoCustomBlackpink } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngInfoCustomBlackpink })
  const { load: loadImagePngInfoCustomBlackshadow, image: imagePngInfoCustomBlackshadow } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngInfoCustomBlackshadow })
  const { load: loadImagePngLayeredArmor8B572A, image: imagePngLayeredArmor8B572A } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngLayeredArmor8B572A })
  const { load: loadImagePngLayeredArmorWhite, image: imagePngLayeredArmorWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngLayeredArmorWhite })
  const { load: loadImagePngMushroomHouseWhite, image: imagePngMushroomHouseWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngMushroomHouseWhite })
  const { load: loadImagePngOrbitSliver, image: imagePngOrbitSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngOrbitSliver })
  const { load: loadImagePngOrbitWhite, image: imagePngOrbitWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngOrbitWhite })
  const { load: loadImagePngPauseButtonSliver, image: imagePngPauseButtonSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngPauseButtonSliver })
  const { load: loadImagePngPauseButtonWhite, image: imagePngPauseButtonWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngPauseButtonWhite })
  const { load: loadImagePngPlagueDoctorProfileSliver, image: imagePngPlagueDoctorProfileSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngPlagueDoctorProfileSliver })
  const { load: loadImagePngPlagueDoctorProfileWhite, image: imagePngPlagueDoctorProfileWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngPlagueDoctorProfileWhite })
  const { load: loadImagePngPlayButtonWhite, image: imagePngPlayButtonWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngPlayButtonWhite })
  const { load: loadImagePngRobeSliver, image: imagePngRobeSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngRobeSliver })
  const { load: loadImagePngRobeWhite, image: imagePngRobeWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngRobeWhite })
  const { load: loadImagePngSandsOfTimeSliver, image: imagePngSandsOfTimeSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSandsOfTimeSliver })
  const { load: loadImagePngSandsOfTimeWhite, image: imagePngSandsOfTimeWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSandsOfTimeWhite })
  const { load: loadImagePngSinagotSliver, image: imagePngSinagotSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSinagotSliver })
  const { load: loadImagePngSinagotWhite, image: imagePngSinagotWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSinagotWhite })
  const { load: loadImagePngSpeedometerWhite, image: imagePngSpeedometerWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSpeedometerWhite })
  const { load: loadImagePngSwapBagWhite, image: imagePngSwapBagWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSwapBagWhite })
  const { load: loadImagePngSwordmanWhite, image: imagePngSwordmanWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSwordmanWhite })
  const { load: loadImagePngSwordsEmblemCustomBlue0, image: imagePngSwordsEmblemCustomBlue0 } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSwordsEmblemCustomBlue0 })
  const { load: loadImagePngSwordsEmblemWhite, image: imagePngSwordsEmblemWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngSwordsEmblemWhite })
  const { load: loadImagePngTripleCornSliver, image: imagePngTripleCornSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngTripleCornSliver })
  const { load: loadImagePngTripleCornWhite, image: imagePngTripleCornWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngTripleCornWhite })
  const { load: loadImagePngVileFluidSliver, image: imagePngVileFluidSliver } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngVileFluidSliver })
  const { load: loadImagePngVileFluidWhite, image: imagePngVileFluidWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngVileFluidWhite })
  const { load: loadImagePngWizardStaffWhite, image: imagePngWizardStaffWhite } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngWizardStaffWhite })

  const { load: loadImagePngBlack_crystal1, image: imagePngBlack_crystal1 } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngBlack_crystal1 })
  const { load: loadImagePngBlue_crystal1, image: imagePngBlue_crystal1 } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngBlue_crystal1 })
  const { load: loadImagePngRed_crystal1, image: imagePngRed_crystal1 } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngRed_crystal1 })
  const { load: loadImagePngGreen_crystal1, image: imagePngGreen_crystal1 } = ReactCanvasThreeJsExtensions.useLoadImage({ src: PngGreen_crystal1 })

  const load =
    loadImagePngBackground1 &&
    loadImageJpg773503h90p0 &&
    loadImageJpgRoleA &&
    loadImageJpgRoleB &&
    loadImageJpgRoleC &&
    loadImageJpgRoleD &&
    loadImageJpgRoleE &&
    // loadImagePngかに &&
    loadImagePngBeanstalkSliver &&
    loadImagePngAnticlockwiseRotationWhite &&
    loadImagePngArrowDunkWhite &&
    loadImagePngBeanstalkWhite &&
    loadImagePngCaesarSliver &&
    loadImagePngCaesarWhite &&
    loadImagePngCampfireSliver &&
    loadImagePngCampfireWhite &&
    loadImagePngCardDrawWhite &&
    loadImagePngCardExchangeWhite &&
    loadImagePngClockwiseRotationWhite &&
    loadImagePngCrossedChainsSliver &&
    loadImagePngCrossedChainsWhite &&
    loadImagePngCrystalShineSliver &&
    loadImagePngCycleWhite &&
    loadImagePngDeadlyStrikeSliver &&
    loadImagePngDeadlyStrikeWhite &&
    loadImagePngDigitalTraceWhite &&
    loadImagePngDividedSpiralWhite &&
    loadImagePngFallingBlobSliver &&
    loadImagePngFallingBlobWhite &&
    loadImagePngFangsSliver &&
    loadImagePngFangsWhite &&
    loadImagePngFreedomDoveSliver &&
    loadImagePngFreedomDoveWhite &&
    loadImagePngFishingSliver &&
    loadImagePngFishingWhite &&
    loadImagePngHauntingSliver &&
    loadImagePngHauntingWhite &&
    loadImagePngHeartBeatsD0021B &&
    loadImagePngHeartBeatsGray &&
    loadImagePngHeartBeatsWhite &&
    loadImagePngInfoBlack &&
    loadImagePngInfoCandy &&
    loadImagePngInfoCustomBlackpink &&
    loadImagePngInfoCustomBlackshadow &&
    loadImagePngLayeredArmor8B572A &&
    loadImagePngLayeredArmorWhite &&
    loadImagePngMushroomHouseWhite &&
    loadImagePngOrbitSliver &&
    loadImagePngOrbitWhite &&
    loadImagePngPauseButtonSliver &&
    loadImagePngPauseButtonWhite &&
    loadImagePngPlagueDoctorProfileSliver &&
    loadImagePngPlagueDoctorProfileWhite &&
    loadImagePngPlayButtonWhite &&
    loadImagePngRobeSliver &&
    loadImagePngRobeWhite &&
    loadImagePngSandsOfTimeSliver &&
    loadImagePngSandsOfTimeWhite &&
    loadImagePngSinagotSliver &&
    loadImagePngSinagotWhite &&
    loadImagePngSpeedometerWhite &&
    loadImagePngSwapBagWhite &&
    loadImagePngSwordmanWhite &&
    loadImagePngSwordsEmblemCustomBlue0 &&
    loadImagePngSwordsEmblemWhite &&
    loadImagePngTripleCornSliver &&
    loadImagePngTripleCornWhite &&
    loadImagePngVileFluidSliver &&
    loadImagePngVileFluidWhite &&
    loadImagePngWizardStaffWhite &&
    loadImagePngBlack_crystal1 &&
    loadImagePngBlue_crystal1 &&
    loadImagePngRed_crystal1 &&
    loadImagePngGreen_crystal1

  const image = {
    imagePngBackground1,
    imageJpg773503h90p0,
    imageJpgRoleA,
    imageJpgRoleB,
    imageJpgRoleC,
    imageJpgRoleD,
    imageJpgRoleE,
    // imagePngかに,
    imagePngBeanstalkSliver,
    imagePngAnticlockwiseRotationWhite,
    imagePngArrowDunkWhite,
    imagePngBeanstalkWhite,
    imagePngCaesarSliver,
    imagePngCaesarWhite,
    imagePngCampfireSliver,
    imagePngCampfireWhite,
    imagePngCardDrawWhite,
    imagePngCardExchangeWhite,
    imagePngClockwiseRotationWhite,
    imagePngCrossedChainsSliver,
    imagePngCrossedChainsWhite,
    imagePngCrystalShineSliver,
    imagePngCycleWhite,
    imagePngDeadlyStrikeSliver,
    imagePngDeadlyStrikeWhite,
    imagePngDigitalTraceWhite,
    imagePngDividedSpiralWhite,
    imagePngFallingBlobSliver,
    imagePngFallingBlobWhite,
    imagePngFangsSliver,
    imagePngFangsWhite,
    imagePngFreedomDoveSliver,
    imagePngFreedomDoveWhite,
    imagePngFishingSliver,
    imagePngFishingWhite,
    imagePngHauntingSliver,
    imagePngHauntingWhite,
    imagePngHeartBeatsD0021B,
    imagePngHeartBeatsGray,
    imagePngHeartBeatsWhite,
    imagePngInfoBlack,
    imagePngInfoCandy,
    imagePngInfoCustomBlackpink,
    imagePngInfoCustomBlackshadow,
    imagePngLayeredArmor8B572A,
    imagePngLayeredArmorWhite,
    imagePngMushroomHouseWhite,
    imagePngOrbitSliver,
    imagePngOrbitWhite,
    imagePngPauseButtonSliver,
    imagePngPauseButtonWhite,
    imagePngPlagueDoctorProfileSliver,
    imagePngPlagueDoctorProfileWhite,
    imagePngPlayButtonWhite,
    imagePngRobeSliver,
    imagePngRobeWhite,
    imagePngSandsOfTimeSliver,
    imagePngSandsOfTimeWhite,
    imagePngSinagotSliver,
    imagePngSinagotWhite,
    imagePngSpeedometerWhite,
    imagePngSwapBagWhite,
    imagePngSwordmanWhite,
    imagePngSwordsEmblemCustomBlue0,
    imagePngSwordsEmblemWhite,
    imagePngTripleCornSliver,
    imagePngTripleCornWhite,
    imagePngVileFluidSliver,
    imagePngVileFluidWhite,
    imagePngWizardStaffWhite,
    imagePngBlack_crystal1,
    imagePngBlue_crystal1,
    imagePngRed_crystal1,
    imagePngGreen_crystal1,
  }

  return { load, image }
}

const useLoadAudio = () => {
  // const { load: loadAudioMp3Jjw, audio: audioMp3Jjw } = ReactCanvasThreeJsExtensions.useLoadAudio({ src: Mp3Jjw })
  // const { load: loadAudioMp3ImpactMetalLight003, audio: audioMp3ImpactMetalLight003 } = ReactCanvasThreeJsExtensions.useLoadAudio({ src: Mp3ImpactMetalLight003 })
  // const { load: loadAudioMp3Switch1, audio: audioMp3Switch1 } = ReactCanvasThreeJsExtensions.useLoadAudio({ src: Mp3Switch1 })

  const load = true
  // loadAudioMp3Jjw &&
  // loadAudioMp3ImpactMetalLight003 &&
  // loadAudioMp3Switch1

  const audio = {
    // audioMp3Jjw,
    // audioMp3ImpactMetalLight003,
    // audioMp3Switch1,
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
  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvasThreeJsExtensions.useLocationProperty({ default: { x: undefined, y: undefined, w: undefined, h: undefined } })

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

      // if (px > 768) px = px - px * (1 - 768 / px)

      return px
    }
  }, [loadLayout, locationLayout])

  return { refLayout, loadLayout, locationLayout, unitpx }
}

const useMessage = () => {
  const [message, setMessage] = React.useState([])

  const addMessage = (message) => {
    setMessage(i => i.find(n => n.message === message) ? i : [...i, { key: Math.random(), message: message }])
  }

  const removeMessage = (key) => {
    setMessage(i => i.filter(n => n.key !== key))
  }

  return { message, setMessage, addMessage, removeMessage }
}

const useWxSafeArea = () => {
  const safeArea = React.useMemo(() => {
    try {
      if (wx) {
        const safeArea = wx.getSystemInfoSync().safeArea
        return { top: safeArea.top, left: safeArea.left, right: safeArea.right, bottom: safeArea.bottom, width: safeArea.width, height: safeArea.height }
      }
    } catch { }
  }, [])

  return { safeArea }
}

const useObject = (props) => {
  const shouldRender = React.useShouldRender()

  const renderer = React.useMemo(() => new THREE.WebGLRenderer({ antialias: true, canvas: props.canvas }), [])
  const camera = React.useMemo(() => new THREE.OrthographicCamera(), [])
  const scene = React.useMemo(() => new THREE.Scene(), [])
  const raycaster = React.useMemo(() => new THREE.Raycaster(), [])

  const eventListender = React.useMemo(() => ReactCanvasThreeJsExtensions.createEventLinstener({ renderer, camera, scene, raycaster }), [])

  React.useEffect(() => {
    const rect = props.canvas.getBoundingClientRect()

    rect.x = rect.x
    rect.y = rect.y

    if (rect.x === undefined) rect.x = rect.left
    if (rect.y === undefined) rect.y = rect.top

    renderer.setSize(rect.width, rect.height)

    camera.aspect = rect.width / rect.height
    camera.left = 0 - rect.width / 2
    camera.right = rect.width / 2
    camera.top = rect.height / 2
    camera.bottom = 0 - rect.height / 2

    camera.updateProjectionMatrix()

    eventListender.addEventListenerWithCanvas(props.canvas, { dpr: props.dpr, rect })

    return () => eventListender.removeEventListenerWithCanvas(props.canvas)
  }, [props.canvas, props.dpr])

  React.useEffect(() => shouldRender())

  React.useEffect(() => renderer.render(scene, camera))

  return { renderer, camera, scene, raycaster, eventListender }
}

function App(props) {
  const [scenePath, setScenePath] = React.useState([])

  const { load: loadImage, image } = useLoadImage()
  const { load: loadAudio, audio } = useLoadAudio()
  const { load: loadTimeout } = useLoadTimeout()
  const { profileInformation, setProfileInformation, saveProfileInformation } = useProfileInformation()
  const { message, setMessage, addMessage, removeMessage } = useMessage()
  const { renderer, camera, scene, raycaster, eventListender } = useObject(props)

  const load = loadImage && loadTimeout

  const Component =
    <ContextApp.Provider value={{ version, scenePath, setScenePath, profileInformation, setProfileInformation, saveProfileInformation, message, setMessage, addMessage, removeMessage, renderer, camera, scene, raycaster, eventListender, load, ...image, ...audio }}>
      <Scene />
      {/* <Message /> */}
    </ContextApp.Provider>

  return Component
}

export default App