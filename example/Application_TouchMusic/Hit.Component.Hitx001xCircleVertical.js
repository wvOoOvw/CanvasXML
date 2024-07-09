import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { useHitStatus } from './Hit.Hook'

const initHitx001xCircleVertical = (locationCoordinate, optionOverlay) => {
  const randomX = Math.random()
  const randomColorR = Math.random()
  const randomColorG = Math.random()
  const randomColorB = Math.random()

  const radius = locationCoordinate.vmin * 8

  const option = Object.assign(
    {
      rateProcess: 90,
      rateSuccess: 30,
      rateFail: 30,
      radius: radius,
      cx: randomX * (locationCoordinate.w - radius * 4) + radius * 2,
      cy: randomX * (locationCoordinate.h - radius * 4) + radius * 2,
      colorR: randomColorR * 125 + 65,
      colorG: randomColorG * 125 + 65,
      colorB: randomColorB * 125 + 65,
      color: `rgb(${randomColorR * 125 + 65}, ${randomColorG * 125 + 65}, ${randomColorB * 125 + 65})`
    }, optionOverlay
  )

  return { type: 'Hitx001xCircleVertical', status: 'process', option: option }
}

const Hitx001xCircleVertical = (props) => {
  const { transitionCountProcess, transitionCountSuccess, transitionCountFail } = useHitStatus(props)

  const lineWidth_0 = React.useMemo(() => {
    return 4
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const lineWidth_1 = React.useMemo(() => {
    return 4
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const radius_0 = React.useMemo(() => {
    return props.hit.option.radius * transitionCountProcess * 1 + props.hit.option.radius * transitionCountSuccess + props.hit.option.radius * transitionCountFail
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const radius_1 = React.useMemo(() => {
    return props.hit.option.radius + props.hit.option.radius * (1 - transitionCountProcess) - props.hit.option.radius * transitionCountSuccess - props.hit.option.radius * transitionCountFail
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.option.radius])

  const globalAlpha_0 = React.useMemo(() => {
    return 1 - transitionCountSuccess - transitionCountFail
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])

  const color_0 = React.useMemo(() => {
    if (props.hit.status === 'process') return props.hit.option.color
    if (props.hit.status === 'success') return `rgb(${props.hit.option.colorR - transitionCountSuccess * props.hit.option.colorR}, ${props.hit.option.colorG + transitionCountSuccess * (255 - props.hit.option.colorG)}, ${props.hit.option.colorB - transitionCountSuccess * props.hit.option.colorB})`
    if (props.hit.status === 'fail') return `rgb(${props.hit.option.colorR + transitionCountFail * (255 - props.hit.option.colorR)}, ${props.hit.option.colorG - transitionCountSuccess * props.hit.option.colorG}, ${props.hit.option.colorB - transitionCountSuccess * props.hit.option.colorB})`
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.status])

  const onMouseDown = () => {
    if (props.hit.status === 'process') props.onHit(1 - transitionCountProcess)
    if (props.hit.status === 'process') props.hit.status = 'success'
  }

  const onTouchStart = () => {
    if (props.hit.status === 'process') props.onHit(1 - transitionCountProcess)
    if (props.hit.status === 'process') props.hit.status = 'success'
  }

  return <>
    <arc beginPath stroke cx={props.hit.option.cx} cy={props.hit.option.cy} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_0} lineWidth={lineWidth_0} strokeStyle={color_0} globalAlpha={globalAlpha_0} onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
    <arc beginPath stroke cx={props.hit.option.cx} cy={props.hit.option.cy} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_1} lineWidth={lineWidth_1} strokeStyle={color_0} globalAlpha={globalAlpha_0} />
  </>
}

export { initHitx001xCircleVertical, Hitx001xCircleVertical }