import React from '../React'

import useStateDefault from './Hook.UseStateDefault'

const useAnimationCount = (props) => {
  const { state: animationPlay, setState: setAnimationPlay } = useStateDefault({ defaultState: props.defaultPlay, state: props.play })
  const { state: animationRate, setState: setAnimationRate } = useStateDefault({ defaultState: props.defaultRate, state: props.rate })
  const { state: animationCount, setState: setAnimationCount } = useStateDefault({ defaultState: props.defaultCount, state: props.count })
  const { state: animationDestination, setState: setAnimationDestination } = useStateDefault({ defaultState: props.defaultDestination, state: props.destination })

  const animationDistance = React.useMemo(() => animationDestination - animationCount, [animationDestination])

  const animationRateCount = React.useMemo(() => {
    if (typeof animationRate === 'function') return animationRate(animationDistance)
    if (typeof animationRate !== 'function') return animationRate
  }, [animationDistance, animationRate])

  React.useEffect(() => {
    var next = animationCount

    if (animationPlay === true && animationCount !== animationDestination && animationCount > animationDestination) next = next - animationRateCount
    if (animationPlay === true && animationCount !== animationDestination && animationCount < animationDestination) next = next + animationRateCount

    if (animationPlay === true && animationCount > animationDestination && next < animationDestination) next = animationDestination
    if (animationPlay === true && animationCount < animationDestination && next > animationDestination) next = animationDestination

    setAnimationCount(next)
  })

  return { animationPlay, setAnimationPlay, animationRate, setAnimationRate, animationCount, setAnimationCount, animationDestination, setAnimationDestination, animationCountProcessed: props.postprocess ? props.postprocess(animationCount): animationCount }
}

export default useAnimationCount