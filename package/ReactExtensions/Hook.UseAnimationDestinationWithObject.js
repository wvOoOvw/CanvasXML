import React from '../React'

import useAnimationDestination from './Hook.UseAnimationDestination'

const useAnimationDestinationWithObject = (option) => {
  return Object.keys(option.object).reduce((r, i) => {
    if (typeof object[i] === 'number') {
      return {
        ...r,
        [i]: useAnimationDestination({ defaultCount: object[i], destination: object[i], ...option })
      }
    }
    if (typeof object[i] === 'object') {
      return {
        ...r,
        [i]: useAnimationDestinationWithObject({ ...object[i], ...option, object: object[i] })
      }
    }
  }, Object())
}

export default useAnimationDestinationWithObject