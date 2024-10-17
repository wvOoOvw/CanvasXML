import React from '../React'

import useAnimationDestination from './Hook.UseAnimationDestination'

const useAnimationDestinationWithObject = (option) => {
  return Object.keys(option.object).reduce((r, i) => {
    if (typeof option.object[i] === 'number') {
      return {
        ...r,
        [i]: useAnimationDestination({ defaultCount: option.object[i], defaultDestination: option.object[i], ...option })
      }
    }

    if (typeof option.object[i] === 'object') {
      return {
        ...r,
        [i]: useAnimationDestinationWithObject({ ...option, ...option.object[i], object: option.object[i] })
      }
    }
  }, Object())
}

export default useAnimationDestinationWithObject