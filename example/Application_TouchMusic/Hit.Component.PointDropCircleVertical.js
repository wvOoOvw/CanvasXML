import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { useHitStatus } from './Hit.Hook'

const init = (locationCoordinate, optionOverlay) => {
  const randomX = Math.random()

  const radius = 100

  const option = Object.assign(
    {
      rateProcess: 12,
      rateSuccess: 12,
      rateFail: 12,
      radius: radius,
      cx: [
        randomX * (locationCoordinate.w - radius * 4) + radius * 2,
        randomX * (locationCoordinate.w - radius * 4) + radius * 2,
      ],
      cy: [
        radius * 2,
        locationCoordinate.h - radius * 3,
      ],
    }, optionOverlay
  )

  return { type: 'PointDropCircleVertical', status: 'process', option: option }
}

const Mesh = (props) => {
  const cx_0 = React.useMemo(() => {
    var cx = props.hit.option.cx[0]

    if (props.animationCountProcess < 0.8) {
      cx = cx + (props.hit.option.cx[1] - props.hit.option.cx[0]) * props.animationCountProcess / 0.8
    }

    if (props.animationCountProcess > 0.8 || props.animationCountProcess === 0.8) {
      cx = cx + (props.hit.option.cx[1] - props.hit.option.cx[0])
    }

    return cx
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail, props.hit.option.cx[0], props.hit.option.cx[1]])

  const cy_0 = React.useMemo(() => {
    var cy = props.hit.option.cy[0]

    if (props.animationCountProcess < 0.8) {
      cy = cy + (props.hit.option.cy[1] - props.hit.option.cy[0]) * props.animationCountProcess / 0.8
    }

    if (props.animationCountProcess > 0.8 || props.animationCountProcess === 0.8) {
      cy = cy + (props.hit.option.cy[1] - props.hit.option.cy[0])
    }

    return cy
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail, props.hit.option.cy[0], props.hit.option.cy[1]])

  const radius_0 = React.useMemo(() => {
    var radius = props.hit.option.radius

    if (props.animationCountProcess > 0.8) {
      radius = radius + radius * (props.animationCountProcess - 0.8)
    }

    if (props.animationCountSuccess > 0 || props.animationCountFail > 0) {
      radius = radius + radius * (props.animationCountSuccess * 0.65 + props.animationCountFail * 0.65)
    }

    return radius
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail, props.hit.option.radius])

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

    globalAlpha = 1 - props.animationCountSuccess * 2 - props.animationCountFail * 2

    if (globalAlpha < 0) globalAlpha = 0
    if (globalAlpha > 1) globalAlpha = 1

    return globalAlpha
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail])

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

const Hit = (props) => {
  const cx_0 = React.useMemo(() => {
    return props.hit.option.cx[1]
  }, [props.hit.option.cx[0]])

  const cy_0 = React.useMemo(() => {
    return props.hit.option.cy[1]
  }, [props.hit.option.cy[1]])

  const radius_0 = React.useMemo(() => {
    var radius = props.hit.option.radius

    radius = radius + radius
    radius = radius - radius * props.animationCountProcess / 2
    radius = radius - radius * props.animationCountSuccess * 0.65
    radius = radius - radius * props.animationCountFail * 0.65

    return radius
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail, props.hit.option.radius])

  const color = React.useMemo(() => {
    var colorR = 255
    var colorG = 255
    var colorB = 255
    return `rgb(${colorR}, ${colorG}, ${colorB})`
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail])

  const globalAlpha_0 = React.useMemo(() => {
    var globalAlpha = 0

    if (props.animationCountProcess < 0.25) globalAlpha = props.animationCountProcess / 0.25
    if (props.animationCountProcess > 0.25 || props.animationCountProcess === 0.25) globalAlpha = 1

    globalAlpha = 1 - props.animationCountSuccess * 4 - props.animationCountFail * 4

    if (globalAlpha < 0) globalAlpha = 0
    if (globalAlpha > 1) globalAlpha = 1

    return globalAlpha
  }, [props.animationCountProcess, props.animationCountSuccess, props.animationCountFail])

  const onHit = (e) => {
    if (props.animationCountProcess > 0.8 && props.hit.status === 'process') {
      const changeRotate = (e.xs[e.xs.length - 1] - props.locationLayout.x - props.locationLayout.w / 2)
      if (changeRotate < 0) props.setRotate(i => i - Math.PI * 2 / 360 * 4 * -1)
      if (changeRotate > 0) props.setRotate(i => i - Math.PI * 2 / 360 * 4)
    }

    if (props.animationCountProcess > 0.8 && props.hit.status === 'process') {
      props.setScore(i => i + props.animationCountProcess * 100)
    }

    if (props.animationCountProcess > 0.8 && props.hit.status === 'process') {
      props.hit.status = 'success'
    }
  }

  return <>
    <arc
      beginPath
      stroke
      cx={cx_0}
      cy={cy_0}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={radius_0}
      lineWidth={4}
      strokeStyle={color}
      globalAlpha={globalAlpha_0}
      onMouseDown={onHit}
      onTouchStart={onHit}
    />
  </>
}

const Success = (props) => {
  const cx_0 = React.useMemo(() => {
    return props.hit.option.cx[1]
  }, [props.hit.option.cx[1]])

  const cy_0 = React.useMemo(() => {
    return props.hit.option.cy[1]
  }, [props.hit.option.cy[1]])

  const globalAlpha_0 = React.useMemo(() => {
    if (props.animationCountSuccess < 0.25) return props.animationCountSuccess / 0.25
    if (props.animationCountSuccess >= 0.25 && props.animationCountSuccess < 0.75) return 1
    if (props.animationCountSuccess > 0.75) return (1 - props.animationCountSuccess) / 0.25
  }, [props.animationCountSuccess])

  const rotateAngle_0 = React.useMemo(() => {
    return props.animationCountSuccess * Math.PI
  }, [props.animationCountSuccess])

  return <>
    <translate translateX={cx_0} translateY={cy_0}>
      <rotate rotateAngle={rotateAngle_0}>
        <translate translateX={cx_0 * -1} translateY={cy_0 * -1}>
          <rect
            beginPath
            stroke
            cx={cx_0}
            cy={cy_0}
            w={props.hit.option.radius}
            h={props.hit.option.radius}
            globalAlpha={globalAlpha_0}
            strokeStyle={'white'}
            lineWidth={2}
          />
        </translate>
      </rotate>
    </translate>

    <translate translateX={cx_0} translateY={cy_0}>
      <rotate rotateAngle={rotateAngle_0 * -1}>
        <translate translateX={cx_0 * -1} translateY={cy_0 * -1}>
          <rect
            beginPath
            stroke
            cx={cx_0}
            cy={cy_0}
            w={props.hit.option.radius * 4}
            h={props.hit.option.radius * 4}
            globalAlpha={globalAlpha_0}
            strokeStyle={'white'}
            lineWidth={2}
            radius={props.hit.option.radius * 0.08}
          />
        </translate>
      </rotate>
    </translate>

    <rect
      beginPath
      stroke
      cx={cx_0}
      cy={cy_0}
      w={props.hit.option.radius * 2}
      h={props.hit.option.radius * 2}
      globalAlpha={globalAlpha_0}
      strokeStyle={'white'}
      lineWidth={2}
    />
  </>
}

const App = (props) => {
  const { animationCountProcess, animationCountSuccess, animationCountFail } = useHitStatus(props)

  return <>
    <Mesh animationCountProcess={animationCountProcess} animationCountSuccess={animationCountSuccess} animationCountFail={animationCountFail} {...props} />
    <Hit animationCountProcess={animationCountProcess} animationCountSuccess={animationCountSuccess} animationCountFail={animationCountFail} {...props} />
    <Success animationCountProcess={animationCountProcess} animationCountSuccess={animationCountSuccess} animationCountFail={animationCountFail} {...props} />
  </>
}

export { init, App }