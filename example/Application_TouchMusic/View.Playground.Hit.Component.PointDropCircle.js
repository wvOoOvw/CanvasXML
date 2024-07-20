import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

const init = (optionOverlay) => {
  const option = Object.assign({ status: 'process' }, optionOverlay)

  return { component: App, option: option, toSuccess: () => option.status = 'success', toFail: () => option.status = 'fail' }
}

const MeshCircleFill = (props) => {
  const cx_0 = React.useMemo(() => props.option.cx[0] + (props.option.cx[1] - props.option.cx[0]) * props.animationCountProcess, [props.animationCountProcess, props.option.cx[0], props.option.cx[1]])
  const cy_0 = React.useMemo(() => props.option.cy[0] + (props.option.cy[1] - props.option.cy[0]) * props.animationCountProcess, [props.animationCountProcess, props.option.cy[0], props.option.cy[1]])
  const radius_0 = React.useMemo(() => props.option.radius + props.option.radius * props.animationCountWait * 0.25, [props.animationCountWait, props.option.radius])

  const color = React.useMemo(() => {
    var colorR = 255
    var colorG = 255
    var colorB = 255
    return `rgb(${colorR}, ${colorG}, ${colorB})`
  }, [])

  const globalAlpha_0 = React.useMemo(() => {
    var globalAlpha = 0

    if (props.animationCountProcess < 0.25) {
      globalAlpha = props.animationCountProcess / 0.25
    }

    if (props.animationCountProcess > 0.25 || props.animationCountProcess === 0.25) {
      globalAlpha = 1
    }

    globalAlpha = globalAlpha - props.animationCountWait - props.animationCountSuccess * 4 - props.animationCountFail * 4

    if (globalAlpha < 0) globalAlpha = 0
    if (globalAlpha > 1) globalAlpha = 1

    return globalAlpha
  }, [props.animationCountProcess, props.animationCountWait, props.animationCountSuccess, props.animationCountFail])

  return <>
    <circle
      beginPath
      fill
      cx={cx_0}
      cy={cy_0}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={radius_0}
      fillStyle={color}
      globalAlpha={globalAlpha_0}
    />
  </>
}

const MeshCircleStroke = (props) => {
  const radius_0 = React.useMemo(() => {
    var radius = props.option.radius

    radius = radius + radius
    radius = radius - props.option.radius * props.animationCountProcess

    if (props.animationCountProcess === 1) {
      radius = radius - props.option.radius * props.animationCountWait * 0.25
      radius = radius - props.option.radius * props.animationCountSuccess * 0.75
      radius = radius - props.option.radius * props.animationCountFail * 0.75
    }

    if (radius < 0) radius = 0

    return radius
  }, [props.animationCountProcess, props.animationCountWait, props.animationCountSuccess, props.animationCountFail, props.option.radius])

  const color = React.useMemo(() => {
    var colorR = 255
    var colorG = 255
    var colorB = 255
    return `rgb(${colorR}, ${colorG}, ${colorB})`
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail])

  const globalAlpha_0 = React.useMemo(() => {
    var globalAlpha = 0

    if (props.animationCountProcess < 0.25) {
      globalAlpha = props.animationCountProcess / 0.25
    }

    if (props.animationCountProcess > 0.25 || props.animationCountProcess === 0.25) {
      globalAlpha = 1
    }

    if (props.animationCountProcess === 1) globalAlpha = 0

    if (props.animationCountProcess !== 1) globalAlpha = globalAlpha - props.animationCountSuccess - props.animationCountFail

    if (globalAlpha < 0) globalAlpha = 0

    return globalAlpha
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail])

  return <>
    <arc
      beginPath
      stroke
      cx={props.option.cx[1]}
      cy={props.option.cy[1]}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={radius_0}
      lineWidth={props.option.radius * 0.04}
      strokeStyle={color}
      globalAlpha={globalAlpha_0}
    />
  </>
}

const Success = (props) => {
  const cx_0 = React.useMemo(() => props.option.cx[0] + (props.option.cx[1] - props.option.cx[0]) * props.animationCountProcess, [props.animationCountProcess, props.option.cx[0], props.option.cx[1]])
  const cy_0 = React.useMemo(() => props.option.cy[0] + (props.option.cy[1] - props.option.cy[0]) * props.animationCountProcess, [props.animationCountProcess, props.option.cy[0], props.option.cy[1]])
  const rotateAngle_0 = React.useMemo(() => props.animationCountSuccess * Math.PI, [props.animationCountSuccess])

  const globalAlpha_0 = React.useMemo(() => {
    var globalAlpha

    if (props.animationCountSuccess < 0.25) {
      globalAlpha = props.animationCountSuccess / 0.25
    }
    if (props.animationCountSuccess >= 0.25 && props.animationCountSuccess < 0.5) {
      globalAlpha = 1
    }
    if (props.animationCountSuccess > 0.5) {
      globalAlpha = (1 - props.animationCountSuccess) / 0.5
    }

    return globalAlpha
  }, [props.animationCountSuccess])

  return <>
    <rect
      beginPath
      stroke
      cx={cx_0}
      cy={cy_0}
      w={props.option.radius * 1.5}
      h={props.option.radius * 1.5}
      globalAlpha={globalAlpha_0}
      strokeStyle={'white'}
      lineWidth={props.option.radius * 0.04}
      radius={props.option.radius * 2 * 0.08}
    />

    <rect
      beginPath
      stroke
      cx={cx_0}
      cy={cy_0}
      w={props.option.radius * 0.75}
      h={props.option.radius * 0.75}
      globalAlpha={globalAlpha_0}
      strokeStyle={'white'}
      lineWidth={props.option.radius * 0.04}
      radius={props.option.radius * 0.08}
      transform={
        [
          {
            translate: { x: cx_0, y: cy_0 },
          },
          {
            rotate: { angle: rotateAngle_0 },
          },
          {
            translate: { x: cx_0 * -1, y: cy_0 * -1 },
          },
        ]
      }
    />

    <rect
      beginPath
      stroke
      cx={cx_0}
      cy={cy_0}
      w={props.option.radius * 2}
      h={props.option.radius * 2}
      globalAlpha={globalAlpha_0}
      strokeStyle={'white'}
      lineWidth={props.option.radius * 0.04}
      radius={props.option.radius * 4 * 0.08}
      transform={
        [
          {
            translate: { x: cx_0, y: cy_0 },
          },
          {
            rotate: { angle: rotateAngle_0 * -1 },
          },
          {
            translate: { x: cx_0 * -1, y: cy_0 * -1 },
          },
        ]
      }
    />
  </>
}

const Action = (props) => {
  const cx_0 = React.useMemo(() => props.option.cx[0] + (props.option.cx[1] - props.option.cx[0]) * props.animationCountProcess, [props.animationCountProcess, props.option.cx[0], props.option.cx[1]])
  const cy_0 = React.useMemo(() => props.option.cy[0] + (props.option.cy[1] - props.option.cy[0]) * props.animationCountProcess, [props.animationCountProcess, props.option.cy[0], props.option.cy[1]])

  const onHit = (e) => {
    if (
      props.option.status === 'wait' ||
      props.option.cx[0] === props.option.cx[1] && Math.abs(cy_0 - props.option.cy[1]) < props.option.radius * 2 ||
      props.option.cy[0] === props.option.cy[1] && Math.abs(cx_0 - props.option.cx[1]) < props.option.radius * 2
    ) {
      props.toSuccess()
      props.onHitManual(e, 1 - props.animationCountWait)
      e.stopPropagation()
    }
  }

  if (props.option.cx[0] === props.option.cx[1]) {
    return <rect
      beginPath
      cx={props.option.cx[1]}
      cy={'50%'}
      w={props.option.radius * 2}
      h={'100%'}
      onPointerDown={onHit}
    />
  }

  if (props.option.cy[0] === props.option.cy[1]) {
    return <rect
      beginPath
      cx={'50%'}
      cy={props.option.cy[1]}
      w={'100%'}
      h={props.option.radius * 2}
      onPointerDown={onHit}
    />
  }
}

const App = (props) => {
  const { animationCount: animationCountProcess } = React.useAnimationDestination(
    {
      play: true,
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateProcess * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  const { animationCount: animationCountWait } = React.useAnimationDestination(
    {
      play: props.option.status === 'wait',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateWait * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  const { animationCount: animationCountSuccess } = React.useAnimationDestination(
    {
      play: props.option.status === 'success',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateSuccess * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  const { animationCount: animationCountFail } = React.useAnimationDestination(
    {
      play: props.option.status === 'fail',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateFail * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  React.useEffect(() => {
    if (animationCountProcess === 1 && props.option.status === 'process') props.option.status = 'wait'
  }, [animationCountProcess])

  React.useEffect(() => {
    if (animationCountWait === 1 && props.option.status === 'wait') props.option.status = 'fail'
  }, [animationCountWait])

  React.useEffect(() => {
    if (animationCountSuccess === 1 || animationCountFail === 1) props.onDestory()
  }, [animationCountSuccess, animationCountFail])

  React.useEffect(() => {
    if (props.option.status === 'success') props.onSuccess()
  }, [props.option.status])

  React.useEffect(() => {
    if (props.option.status === 'fail') props.onFail()
  }, [props.option.status])

  const delivery = { animationCountProcess, animationCountWait, animationCountSuccess, animationCountFail, ...props }

  return <>
    <MeshCircleFill {...delivery} />
    <MeshCircleStroke {...delivery} />
    <Success {...delivery} />
    <Action {...delivery} />
  </>
}

export { init, App }