import React from '../React'

import useAnimationDestination from './Hook.UseAnimationDestination'

const useAnimationDestinationRateTime = (props) => {
  const cache = React.useRef([undefined, undefined])

  const shouldRender = React.useShouldRender()

  const animationDestination = useAnimationDestination({ play: props.play && Boolean(cache.current[0] !== undefined && cache.current[1] !== undefined), defaultCount: props.defaultCount, defaultDestination: props.defaultDestination, count: props.count, destination: props.destination, rate: Math.abs(cache.current[1] - cache.current[0]) * props.rateTime, postprocess: props.postprocess })

  React.useEffectImmediate(() => {
    cache.current = [animationDestination.animationCount, animationDestination.animationDestination]
    shouldRender()
  }, [animationDestination.animationDestination])

  return { ...animationDestination }
}

export default useAnimationDestinationRateTime