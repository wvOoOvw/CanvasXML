import React from '../React'

import useAnimationCount from './Hook.UseAnimationCount'

const useAnimationCountWithObject = (option) => {
  return Object.keys(option.object).reduce((r, i) => {
    if (typeof option.object[i] === 'number') {
      return {
        ...r,
        [i]: useAnimationCount({ defaultCount: option.object[i], defaultDestination: option.object[i], ...option })
      }
    }

    if (typeof option.object[i] === 'object') {
      return {
        ...r,
        [i]: useAnimationCountWithObject({ ...option, ...option.object[i], object: option.object[i] })
      }
    }
  }, Object())
}

export default useAnimationCountWithObject