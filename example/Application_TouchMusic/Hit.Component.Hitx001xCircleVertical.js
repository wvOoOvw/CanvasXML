import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { useHitStatus } from './Hit.Hook'

const initHitx001xCircleVertical = (locationCoordinate, optionOverlay) => {
  const randomX = Math.random()

  const radius = locationCoordinate.vmin * 8

  const option = Object.assign(
    {
      rateProcess: 90,
      rateSuccess: 30,
      rateFail: 30,
      radius: radius,
      cx: [
        randomX * (locationCoordinate.w - radius * 4) + radius * 2,
        randomX * (locationCoordinate.w - radius * 4) + radius * 2,
      ],
      cy: [
        radius * 2,
        locationCoordinate.h - radius * 2,
      ],
    }, optionOverlay
  )

  return { type: 'Hitx001xCircleVertical', status: 'process', option: option }
}

const Hitx001xCircleVertical = (props) => {
  const { transitionCountProcess, transitionCountSuccess, transitionCountFail } = useHitStatus(props)

  const cx_0 = React.useMemo(() => {
    return (
      props.hit.option.cx[0] +
      (
        props.hit.option.cx[1] - 
        props.hit.option.cx[0]
      ) * 
      (
        Math.min(transitionCountProcess / 0.8, 1) + 
        transitionCountSuccess * 0.1 + 
        transitionCountFail * 0.1
      )
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cx[0], props.hit.option.cx[1]])

  const cx_1 = React.useMemo(() => {
    return props.hit.option.cx[1]
  }, [props.hit.option.cx[0]])

  const cy_0 = React.useMemo(() => {
    return (
      props.hit.option.cy[0] +
      (
        props.hit.option.cy[1] - 
        props.hit.option.cy[0]
      ) * 
      (
        Math.min(transitionCountProcess / 0.8, 1) + 
        transitionCountSuccess * 0.1 + 
        transitionCountFail * 0.1
      )
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cy[0], props.hit.option.cy[1]])

  const cy_1 = React.useMemo(() => {
    return props.hit.option.cy[1]
  }, [props.hit.option.cy[1]])

  const radius_0 = React.useMemo(() => {
    return (
      props.hit.option.radius * 
      (
        1 - 
        Math.max(transitionCountProcess - 0.8, 0) * 0.35 - 
        transitionCountSuccess * 0.35 - 
        transitionCountFail * 0.35
      )
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const radius_1 = React.useMemo(() => {
    return (
      props.hit.option.radius +
      props.hit.option.radius * 
        (
          (1 - transitionCountProcess) - 
          transitionCountSuccess * 0.35 -
          transitionCountFail * 0.35
        )
    )
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const color = React.useMemo(() => {
    if (props.hit.status === 'process' && (transitionCountProcess < 0.8)) return 'white'
    if (props.hit.status === 'process' && (transitionCountProcess > 0.8 || transitionCountProcess === 0.8)) return 'yellow'
    if (props.hit.status === 'success') return 'green'
    if (props.hit.status === 'fail') return 'red'
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])

  const globalAlpha_0 = React.useMemo(() => {
    if (transitionCountProcess < 0.2) return (transitionCountProcess / 0.2)
    if (transitionCountProcess > 0.2 || transitionCountProcess === 0.2) return 1 - transitionCountSuccess - transitionCountFail
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])

  const globalAlpha_1 = React.useMemo(() => {
    return 1 - transitionCountSuccess - transitionCountFail
  }, [transitionCountSuccess, transitionCountFail])

  const onMouseDown = () => {
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.onHit(transitionCountProcess)
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.hit.status = 'success'
  }

  const onTouchStart = () => {
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.onHit(transitionCountProcess)
    if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.hit.status = 'success'
  }

  return <>
    <arc beginPath fill cx={cx_0} cy={cy_0} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_0} fillStyle={color} globalAlpha={globalAlpha_0}/>
    <arc beginPath stroke cx={cx_1} cy={cy_1} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_1} lineWidth={4} strokeStyle={color} globalAlpha={globalAlpha_1} />
    <circle beginPath cx={cx_1} cy={cy_1} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_0} onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
  </>
}

export { initHitx001xCircleVertical, Hitx001xCircleVertical }