import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

const init = (locationLayout, optionOverlay) => {
  const randomX = Math.random()

  const option = Object.assign(
    {
      hit: 0,
      status: 'show',
      rateShow: 30,
      rateProcess: 60,
      rateHide: 30,
      cx: [
        randomX * (locationLayout.w - 100 * 4) + 100 * 2,
        randomX * (locationLayout.w - 100 * 4) + 100 * 2,
        randomX * (locationLayout.w - 100 * 4) + 100 * 2,
      ],
      cy: [
        0,
        locationLayout.h - 100 * 2,
        0,
      ],
      w: 0,
      h: 0,
      shakeDirection: '',
      shakeUnit: 8,
      shakeRate: 0.5,
    }, optionOverlay
  )

  return { component: App, option: option, toHide: () => option.status = 'hide', toHit: () => option.hit = option.hit + 1 }
}

const MeshRectFill = (props) => {
  const cx_0 = React.useMemo(() => {
    var cx = props.option.cx[0]

    cx = cx + (props.option.cx[1] - props.option.cx[0]) * props.animationCountShow
    cx = cx + (props.option.cx[2] - props.option.cx[1]) * props.animationCountHide

    if (props.option.shakeDirection === 'horizontal') cx = cx + props.animationCountTranslate

    return cx
  }, [props.animationCountShow, props.animationCountHide, props.animationCountTranslate, props.option.shakeDirection, props.option.cx[0], props.option.cx[1], props.option.cx[2]])

  const cy_0 = React.useMemo(() => {
    var cy = props.option.cy[0]

    cy = cy + (props.option.cy[1] - props.option.cy[0]) * props.animationCountShow
    cy = cy + (props.option.cy[2] - props.option.cy[1]) * props.animationCountHide

    if (props.option.shakeDirection === 'vertical') cy = cy + props.animationCountTranslate

    return cy
  }, [props.animationCountShow, props.animationCountHide, props.animationCountTranslate, props.option.shakeDirection, props.option.cy[0], props.option.cy[1], props.option.cy[2]])

  const color = React.useMemo(() => {
    var colorR = 255
    var colorG = 255
    var colorB = 255
    return `rgb(${colorR}, ${colorG}, ${colorB})`
  }, [])

  const globalAlpha_0 = React.useMemo(() => {
    return props.animationCountShow - props.animationCountHide
  }, [props.animationCountShow, props.animationCountHide])

  return <>
    <rect
      beginPath
      fill
      w={props.option.w}
      h={props.option.h}
      cx={cx_0}
      cy={cy_0}
      fillStyle={color}
      globalAlpha={globalAlpha_0}
    />
  </>
}

const App = (props) => {
  const { animationCount: animationCountShow } = React.useAnimationDestination(
    {
      play: props.option.status === 'show',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateShow * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { animationCount: animationCountProcess } = React.useAnimationDestination(
    {
      play: props.option.status === 'process',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateProcess * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { animationCount: animationCountHide } = React.useAnimationDestination(
    {
      play: props.option.status === 'hide',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.option.rateHide * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffect(() => {
    if (animationCountShow === 1 && props.option.status === 'show') props.option.status = 'process'
  }, [animationCountShow])

  React.useEffect(() => {
    if (animationCountProcess === 1 && props.option.status === 'process') props.option.status = 'hide'
  }, [animationCountProcess])

  React.useEffect(() => {
    if (animationCountHide === 1) props.onDestory()
  }, [animationCountHide])

  React.useEffect(() => {
    if (props.option.status === 'hide') props.onHide()
  }, [props.option.status])

  const hitRef = React.useRef(0)

  const { animationCount: animationCountTranslate, setAnimationCount: setAnimationCountTranslate } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: props.option.shakeRate * props.gameTimeRate })

  React.useEffect(() => {
    setAnimationCountTranslate(i => i + props.option.shakeUnit * (props.option.hit - hitRef.current))
    hitRef.current = props.option.hit
  }, [props.option.hit])

  const delivery = { animationCountShow, animationCountProcess, animationCountHide, animationCountTranslate, ...props }

  return <>
    <MeshRectFill {...delivery} />
  </>
}

export { init, App }