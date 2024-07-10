import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { useHitStatus } from './Hit.Hook'

const initHitxCircleVertical = (locationCoordinate, optionOverlay) => {
  const randomX = Math.random()
  const randomColorR = Math.random()
  const randomColorG = Math.random()
  const randomColorB = Math.random()

  const radius = locationCoordinate.vmin * 8

  const option = Object.assign(
    {
      rateProcess: 12,
      rateSuccess: 4,
      rateFail: 4,
      radius: radius,
      cx: randomX * (locationCoordinate.w - radius * 4) + radius * 2,
      cy: randomX * (locationCoordinate.h - radius * 4) + radius * 2,
      colorR: randomColorR * 125 + 65,
      colorG: randomColorG * 125 + 65,
      colorB: randomColorB * 125 + 65,
      color: `rgb(${randomColorR * 125 + 65}, ${randomColorG * 125 + 65}, ${randomColorB * 125 + 65})`
    }, optionOverlay
  )

  return { type: 'HitxCircleVertical', status: 'process', option: option }
}

const HitxCircleVertical = (props) => {
  const { animationCountProcess, animationCountSuccess, animationCountFail } = useHitStatus(props)

  const lineWidth_0 = React.useMemo(() => {
    return 4
  }, [animationCountProcess, animationCountSuccess, animationCountFail, props.hit.option.radius])

  const lineWidth_1 = React.useMemo(() => {
    return 4
  }, [animationCountProcess, animationCountSuccess, animationCountFail, props.hit.option.radius])

  const radius_0 = React.useMemo(() => {
    return props.hit.option.radius * animationCountProcess * 1 + props.hit.option.radius * animationCountSuccess + props.hit.option.radius * animationCountFail
  }, [animationCountProcess, animationCountSuccess, animationCountFail, props.hit.option.radius])

  const radius_1 = React.useMemo(() => {
    return props.hit.option.radius + props.hit.option.radius * (1 - animationCountProcess) - props.hit.option.radius * animationCountSuccess - props.hit.option.radius * animationCountFail
  }, [animationCountProcess, animationCountSuccess, animationCountFail, props.hit.option.radius])

  const globalAlpha_0 = React.useMemo(() => {
    return 1 - animationCountSuccess - animationCountFail
  }, [animationCountProcess, animationCountSuccess, animationCountFail])

  const color_0 = React.useMemo(() => {
    if (props.hit.status === 'process') return props.hit.option.color
    if (props.hit.status === 'success') return `rgb(${props.hit.option.colorR - animationCountSuccess * props.hit.option.colorR}, ${props.hit.option.colorG + animationCountSuccess * (255 - props.hit.option.colorG)}, ${props.hit.option.colorB - animationCountSuccess * props.hit.option.colorB})`
    if (props.hit.status === 'fail') return `rgb(${props.hit.option.colorR + animationCountFail * (255 - props.hit.option.colorR)}, ${props.hit.option.colorG - animationCountSuccess * props.hit.option.colorG}, ${props.hit.option.colorB - animationCountSuccess * props.hit.option.colorB})`
  }, [animationCountProcess, animationCountSuccess, animationCountFail, props.hit.status])

  const onMouseDown = () => {
    if (props.hit.status === 'process') props.onHit(1 - animationCountProcess)
    if (props.hit.status === 'process') props.hit.status = 'success'
  }

  const onTouchStart = () => {
    if (props.hit.status === 'process') props.onHit(1 - animationCountProcess)
    if (props.hit.status === 'process') props.hit.status = 'success'
  }

  return <>
    <arc beginPath stroke cx={props.hit.option.cx} cy={props.hit.option.cy} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_0} lineWidth={lineWidth_0} strokeStyle={color_0} globalAlpha={globalAlpha_0} onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
    <arc beginPath stroke cx={props.hit.option.cx} cy={props.hit.option.cy} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius_1} lineWidth={lineWidth_1} strokeStyle={color_0} globalAlpha={globalAlpha_0} />
  </>
}

export { initHitxCircleVertical, HitxCircleVertical }