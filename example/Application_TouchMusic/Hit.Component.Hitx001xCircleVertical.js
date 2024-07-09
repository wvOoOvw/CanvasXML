import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { useHitStatus } from './Hit.Hook'

const initHitx001xCircleVertical = (props) => {
  const randomX = Math.random()

  const option = Object.assign(
    {
      rateProcess: 90,
      rateSuccess: 30,
      rateFail: 30,
      radius: 100,
      cx: [
        100 + randomX * (100 * 2 * -1),
        100 + randomX * (100 * 2 * -1),
      ],
      cy: [
        100,
        100 * 2 * -1,
      ]
    }, props
  )

  return { type: 'Hitx001xCircleVertical', status: 'process', option: option }
}

const Hitx001xCircleVertical = (props) => {
  const { transitionCountProcess, transitionCountSuccess, transitionCountFail } = useHitStatus(props)

  const cx_0 = React.useMemo(() => {
    return (
      props.hit.option.cx[0] +
      transitionCountProcess * (props.hit.option.cx[1] - props.hit.option.cx[0]) +
      transitionCountSuccess * 0.1 * (props.hit.option.cx[1] - props.hit.option.cx[0]) +
      transitionCountFail * 0.1 * (props.hit.option.cx[1] - props.hit.option.cx[0])
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cx[0], props.hit.option.cx[1]])

  const cx_1 = React.useMemo(() => {
    return props.hit.option.cx[1]
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cx[0], props.hit.option.cx[1]])

  const cy_0 = React.useMemo(() => {
    return (
      props.hit.option.cy[0] +
      transitionCountProcess * (props.hit.option.cy[1] - props.hit.option.cy[0]) +
      transitionCountSuccess * 0.1 * (props.hit.option.cy[1] - props.hit.option.cy[0]) +
      transitionCountFail * 0.1 * (props.hit.option.cy[1] - props.hit.option.cy[0])
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cy[0], props.hit.option.cy[1]])

  const cy_1 = React.useMemo(() => {
    return props.hit.option.cy[1]
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cy[0], props.hit.option.cy[1]])

  const radius_0 = React.useMemo(() => {
    return Number(
      props.hit.option.radius -
      transitionCountSuccess * props.hit.option.radius * 0.35 -
      transitionCountFail * props.hit.option.radius * 0.35
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const radius_1 = React.useMemo(() => {
    return (
      props.hit.option.radius +
      (1 - transitionCountProcess) * props.hit.option.radius -
      transitionCountSuccess * props.hit.option.radius * 0.35 -
      transitionCountFail * props.hit.option.radius * 0.35
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const color = React.useMemo(() => {
    if (props.hit.status === 'process' && (transitionCountProcess < 0.8)) return 'white'
    if (props.hit.status === 'process' && (transitionCountProcess > 0.8 || transitionCountProcess === 0.8)) return 'yellow'
    if (props.hit.status === 'success') return 'green'
    if (props.hit.status === 'fail') return 'red'
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const globalAlpha_0 = React.useMemo(() => {
    if (transitionCountProcess < 0.2) return (transitionCountProcess / 0.2)
    if (transitionCountProcess > 0.2 || transitionCountProcess === 0.2) return 1 - transitionCountSuccess - transitionCountFail
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])

  const globalAlpha_1 = React.useMemo(() => {
    return 1 - transitionCountSuccess - transitionCountFail
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])


  const onMouseDown = () => {
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.onHit(transitionCountProcess)
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.hit.status = 'success'
  }

  const onTouchStart = () => {
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.onHit(transitionCountProcess)
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.hit.status = 'success'
  }

  return <>
    <circle beginPath fill cx={cx_0} cy={cy_0} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_0} fillStyle={color} globalAlpha={globalAlpha_0} />
    <arc beginPath stroke cx={cx_1} cy={cy_1} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_1} lineWidth={4} strokeStyle={color} globalAlpha={globalAlpha_1} />
    <circle beginPath cx={cx_1} cy={cy_1} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_0} onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
  </>
}

export { initHitx001xCircleVertical, Hitx001xCircleVertical }