import React from '../React'

import useAnimationDestination from './Hook.UseAnimationDestination'

const useAnimationDestinationRateTime = (props) => {
  const cache = React.useRef([undefined, undefined])

  const [reset, setReset] = React.useState(0)

  const shouldRender = React.useShouldRender()

  const animationDestination = useAnimationDestination({ play: props.play && Boolean(cache.current[0] !== undefined && cache.current[1] !== undefined), defaultCount: props.defaultCount, destination: props.destination, rate: Math.abs(cache.current[1] - cache.current[0]) * props.rateTime, postprocess: props.postprocess })

  React.useEffectImmediate(() => {
    cache.current = [animationDestination.animationCount, props.destination]
    shouldRender()
  }, [props.destination, reset])

  React.useEffectImmediate(() => {
    if (reset !== 0) {
      cache.current = [animationDestination.animationCount, props.destination]
      shouldRender()
    }
  }, [reset])

  return { ...animationDestination, setReset: () => setReset(i => i + 1) }
}

export default useAnimationDestinationRateTime