import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

const useHitStatus = (props) => {
  const { transitionCount: transitionCountProcess } = React.Plugin.useTransitionCount(
    {
      play: true,
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.option.rateProcess,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffectImmediate(() => {
    if (transitionCountProcess === 1 && props.hit.status === 'process') props.hit.status = 'fail'
  }, [transitionCountProcess])

  const { transitionCount: transitionCountSuccess } = React.Plugin.useTransitionCount(
    {
      play: transitionCountProcess === 1 && props.hit.status === 'success',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.option.rateSuccess,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { transitionCount: transitionCountFail } = React.Plugin.useTransitionCount(
    {
      play: transitionCountProcess === 1 && props.hit.status === 'fail',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.option.rateFail,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffect(() => {
    if (transitionCountSuccess === 1 || transitionCountFail === 1) props.destory()
  }, [transitionCountSuccess, transitionCountFail])

  return { transitionCountProcess, transitionCountSuccess, transitionCountFail }
}

export { useHitStatus }