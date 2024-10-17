import React from '../React'

import useAnimationDestinationRateTime from './Hook.UseAnimationDestinationRateTime'

const useAnimationDestinationRateTimeWithObject = (option) => {
  return Object.keys(option.object).reduce((r, i) => {
    if (i === 'play' || i === 'defaultCount' || i === 'destination' || i === 'rate' || i === 'rateTime' || i === 'postprocess') {
      return
    }
    if (typeof option.object[i] === 'number') {
      return {
        ...r,
        [i]: useAnimationDestinationRateTime({ defaultCount: option.object[i], destination: option.object[i], ...option })
      }
    }
    if (typeof option.object[i] === 'object') {
      return {
        ...r,
        [i]: useAnimationDestinationRateTimeWithObject({ ...option, ...option.object[i], object: option.object[i] })
      }
    }
  }, Object())
}

export default useAnimationDestinationRateTimeWithObject