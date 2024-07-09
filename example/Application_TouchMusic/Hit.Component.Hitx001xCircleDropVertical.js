import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { useHitStatus } from './Hit.Hook'

const initHitx001xCircleDropVertical = (locationCoordinate, optionOverlay) => {
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

  return { type: 'Hitx001xCircleDropVertical', status: 'process', option: option }
}

const Hitx001xCircleDropVertical = (props) => {
  const { transitionCountProcess, transitionCountSuccess, transitionCountFail } = useHitStatus(props)

  const cx_0 = React.useMemo(() => {
    return props.hit.option.cx[0] + (props.hit.option.cx[1] - props.hit.option.cx[0]) * Math.min(transitionCountProcess / 0.8, 1)
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cx[0], props.hit.option.cx[1]])

  const cx_1 = React.useMemo(() => {
    return props.hit.option.cx[1]
  }, [props.hit.option.cx[0]])

  const cy_0 = React.useMemo(() => {
    return props.hit.option.cy[0] + (props.hit.option.cy[1] - props.hit.option.cy[0]) * Math.min(transitionCountProcess / 0.8, 1)
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.cy[0], props.hit.option.cy[1]])

  const cy_1 = React.useMemo(() => {
    return props.hit.option.cy[1]
  }, [props.hit.option.cy[1]])

  const radius_0 = React.useMemo(() => {
    return props.hit.option.radius * (1 + transitionCountSuccess * 0.65 + transitionCountFail * 0.65 + Math.max(transitionCountProcess - 0.8, 0) / 0.2 * 0.65)
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const radius_1 = React.useMemo(() => {
    return props.hit.option.radius * (2 - transitionCountProcess - transitionCountSuccess * 0.85 - transitionCountFail * 0.85)
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const color = React.useMemo(() => {
    if (props.hit.status === 'process' && (transitionCountProcess < 0.8)) return 'white'
    if (props.hit.status === 'process' && (transitionCountProcess > 0.8 || transitionCountProcess === 0.8)) return 'yellow'
    if (props.hit.status === 'success') return 'green'
    if (props.hit.status === 'fail') return 'red'
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])

  const globalAlpha_0 = React.useMemo(() => {
    if (transitionCountProcess < 0.2) return transitionCountProcess / 0.2
    if (transitionCountProcess >= 0.2 && transitionCountProcess < 0.65) return 1
    if (transitionCountProcess > 0.65) return (1 - transitionCountProcess) / 0.35
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])

  const globalAlpha_1 = React.useMemo(() => {
    return 1 - Math.max(transitionCountProcess - 0.8, 0) - transitionCountSuccess * 0.8 - transitionCountFail * 0.8
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
    <arc beginPath fill cx={cx_0} cy={cy_0} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_0} fillStyle={color} globalAlpha={globalAlpha_0} />
    <arc beginPath stroke cx={cx_1} cy={cy_1} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_1} lineWidth={4} strokeStyle={color} globalAlpha={globalAlpha_1} />
    <circle beginPath cx={cx_1} cy={cy_1} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_1} onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
  </>
}

export { initHitx001xCircleDropVertical, Hitx001xCircleDropVertical }