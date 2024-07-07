import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import {useHitStatus} from './Hit.Hook'

const initHitx001xCircleVertical = (props) => {
  const cavansCoordinate = Canvas2d.canvas().coordinate

  const randomX = Math.random()

  const option = Object.assign(
    {
      rateProcess: 90,
      rateSuccess: 30,
      rateFail: 30,
      radius: 100,
      cx: 100 + randomX * (cavansCoordinate.w - 100 * 2),
      scy: 100,
      ecy: cavansCoordinate.h - 100 * 2,
      angle: Math.random() * Math.PI * 2,
    }, props
  )

  return { type: 'Hitx001xCircleVertical', status: 'process', option: option }
}

const Hitx001xCircleVertical = (props) => {
  const radius = props.hit.option.radius
  const cx = props.hit.option.cx
  const scy = props.hit.option.scy
  const ecy = props.hit.option.ecy
  const angle = props.hit.option.angle

  const { transitionCountProcess, transitionCountSuccess, transitionCountFail } = useHitStatus(props)

  const property_0 = React.useMemo(() => {
    const cy_0 = () => {
      return scy + transitionCountProcess * (ecy - scy) + transitionCountSuccess * 0.1 * (ecy - scy) + transitionCountFail * 0.1 * (ecy - scy)
    }

    const radius_0 = () => {
      return radius - transitionCountSuccess * radius * 0.35 - transitionCountFail * radius * 0.35
    }

    const globalAlpha_0 = () => {
      if (transitionCountProcess < 0.2) return (transitionCountProcess / 0.2)
      if (transitionCountProcess > 0.2 || transitionCountProcess === 0.2) return 1 - transitionCountSuccess - transitionCountFail
    }

    const fillStyle_0 = () => {
      if (props.hit.status === 'process' && (transitionCountProcess < 0.8)) return 'white'
      if (props.hit.status === 'process' && (transitionCountProcess > 0.8 || transitionCountProcess === 0.8)) return 'yellow'
      if (props.hit.status === 'success') return 'green'
      if (props.hit.status === 'fail') return 'red'
    }

    return { cy: cy_0(), radius: radius_0(), globalAlpha: globalAlpha_0(), fillStyle: fillStyle_0() }
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail])

  const property_1 = React.useMemo(() => {
    const radius_0 = () => {
      return radius + (1 - transitionCountProcess) * radius - transitionCountSuccess * radius * 0.35 - transitionCountFail * radius * 0.35
    }

    const sAngle_0 = () => {
      return 0 + angle
    }

    const eAngle_0 = () => {
      return (transitionCountProcess / 0.8) * Math.PI * 2 + angle
    }

    const globalAlpha_0 = () => {
      return 1 - transitionCountSuccess - transitionCountFail
    }

    const strokeStyle_0 = () => {
      if (props.hit.status === 'process' && (transitionCountProcess < 0.8)) return 'white'
      if (props.hit.status === 'process' && (transitionCountProcess > 0.8 || transitionCountProcess === 0.8)) return 'yellow'
      if (props.hit.status === 'success') return 'green'
      if (props.hit.status === 'fail') return 'red'
    }

    return { radius: radius_0(), sAngle: sAngle_0(), eAngle: eAngle_0(), globalAlpha: globalAlpha_0(), strokeStyle: strokeStyle_0() }
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.status])

  const property_2 = React.useMemo(() => {
    const radius_0 = () => {
      return radius + (1 - transitionCountProcess) * radius - transitionCountSuccess * radius * 0.35 - transitionCountFail * radius * 0.35
    }

    const onMouseDown_0 = () => {
      return (e) => {
        if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.onHit(transitionCountProcess)
        if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.hit.status = 'success'
      }
    }

    const onTouchStart_0 = () => {
      return (e) => {
        if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.onHit(transitionCountProcess)
        if (transitionCountProcess > 0.8 && props.hit.status === 'process') props.hit.status = 'success'
      }
    }

    return { radius: radius_0(), onMouseDown: onMouseDown_0(), onTouchStart: onTouchStart_0() }
  }, [transitionCountProcess, transitionCountSuccess, transitionCountFail, props.hit.status])

  return <>
    <circle beginPath fill cx={cx} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={radius} {...property_0} />
    <arc beginPath stroke cx={cx} cy={ecy} counterclockwise={false} lineWidth={4} {...property_1} />
    <circle beginPath cx={cx} cy={ecy} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} {...property_2} />
  </>
}

export { initHitx001xCircleVertical, Hitx001xCircleVertical }