import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

const useHitStatus = (props) => {
  const { animationCount: animationCountProcess } = React.Plugin.useAnimationDestination(
    {
      play: true,
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.option.rateProcess / props.rate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { animationCount: animationCountSuccess } = React.Plugin.useAnimationDestination(
    {
      play: props.hit.status === 'success',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.option.rateSuccess / props.rate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { animationCount: animationCountFail } = React.Plugin.useAnimationDestination(
    {
      play: props.hit.status === 'fail',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.option.rateFail / props.rate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffect(() => {
    if (animationCountProcess === 1 && props.hit.status === 'process') props.hit.status = 'fail'
  }, [animationCountProcess])

  React.useEffect(() => {
    if (animationCountSuccess === 1 || animationCountFail === 1) props.destory()
  }, [animationCountSuccess, animationCountFail])

  return { animationCountProcess, animationCountSuccess, animationCountFail }
}

export { useHitStatus }