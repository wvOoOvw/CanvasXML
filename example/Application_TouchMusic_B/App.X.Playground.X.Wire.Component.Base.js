import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      level: 1
    }, optionOverlay
  )

  return { key: Math.random(), component: App, option: option }
}

const LineHit = (props) => {
  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountIntersection * Math.PI * 0.5, [animationCountIntersection])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountIntersection < 0.25) {
      globalAlpha = animationCountIntersection / 0.25
    }
    if (animationCountIntersection >= 0.25 && animationCountIntersection < 0.5) {
      globalAlpha = 1
    }
    if (animationCountIntersection > 0.5) {
      globalAlpha = (1 - animationCountIntersection) / 0.5
    }

    return globalAlpha
  }, [animationCountIntersection])

  React.useEffect(() => {
    if (animationCountIntersection === 1) props.onDestory()
  }, [animationCountIntersection])

  return <>
    <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={props.unitpx * 0.16}
      h={props.unitpx * 0.16}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={props.unitpx * 0.004}
      radius={props.unitpx * 0.016}
    />

    <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={props.unitpx * 0.08}
      h={props.unitpx * 0.08}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={props.unitpx * 0.004}
      radius={props.unitpx * 0.008}
      transform={
        [
          {
            translate: { x: props.x, y: props.y },
          },
          {
            rotate: { angle: rotateAngle },
          },
          {
            translate: { x: props.x * -1, y: props.y * -1 },
          },
        ]
      }
    />

    <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={props.unitpx * 0.32}
      h={props.unitpx * 0.32}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={props.unitpx * 0.004}
      radius={props.unitpx * 0.032}
      transform={
        [
          {
            translate: { x: props.x, y: props.y },
          },
          {
            rotate: { angle: rotateAngle * -1 },
          },
          {
            translate: { x: props.x * -1, y: props.y * -1 },
          },
        ]
      }
    />
  </>
}

const LineTop = (props) => {
  const [open, setOpen] = React.useState(false)
  const [lineHit, setLineHit] = React.useState([])

  const { animationCount: animationCountIntersection, setAnimationCount: setAnimationCountIntersection } = React.useAnimationDestination({ play: open === true, defaultCount: 0, destination: 1, rate: 1 / 15 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory, setAnimationCount: setAnimationCountDestory } = React.useAnimationDestination({ play: open === false, defaultCount: 0, destination: 1, rate: 1 / 15 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 15 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = props.unitpx * 0.02
  const y = props.locationLayout.h * 0.15 - (1 - animationCountIntersection + animationCountDestory) * props.unitpx * 0.12

  const onPointerDown = (e) => {
    if (
      i.inProcess === true &&
      i.inDestory === false &&
      i.ifHit() === true &&
      i.ifCollision().y + i.ifCollision().radius > (y - h / 2) &&
      i.ifCollision().y - i.ifCollision().radius < (y + h / 2)
    ) {
      i.onHit()
      i.onUpdate()
      setLineHit(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
      setAnimationCountHitCount(i => i + 1)
    }
  }

  React.useEffect(() => {
    if (open === false) {
      if (props.animationCountGameTime !== 0 && props.animationCountGameTime % 2200 === 0) setOpen(true)
    }

    if (open === true) {
      if (props.animationCountGameTime !== 0 && props.animationCountGameTime % 3800 === 0) setOpen(false)
    }
  }, [props.animationCountGameTime, open])

  React.useEffect(() => {
    if (open === false) {
      setAnimationCountDestory(0)
    }

    if (open === true) {
      setAnimationCountIntersection(0)
    }
  }, [open])

  return <>
    <rect
      h={h + props.unitpx * 0.08}
      cx={'50%'}
      cy={y}
      onPointerDown={onPointerDown}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y + animationCountHitCount * props.unitpx * 0.04}
      fillStyle={'green'}
      globalAlpha={animationCountIntersection - animationCountDestory}
    />

    {
      lineHit.map(i => <LineHit animationCountDestory={animationCountDestory} onDestory={() => setLineHit} {...props} {...i} />)
    }
  </>
}

const LineBottom = (props) => {
  const [open, setOpen] = React.useState(false)
  const [destoryPlay, setDestoryPlay] = React.useState(false)

  const [lineHit, setLineHit] = React.useState([])

  const { animationCount: animationCountIntersection, setAnimationCount: setAnimationCountIntersection } = React.useAnimationDestination({ play: open === true, defaultCount: 0, destination: 1, rate: 1 / 15 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory, setAnimationCount: setAnimationCountDestory } = React.useAnimationDestination({ play: open === false, defaultCount: 0, destination: 1, rate: 1 / 15 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 0, rate: 1 / 15 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = props.unitpx * 0.004
  const y = props.locationLayout.h * 0.75 + (1 - animationCountIntersection + animationCountDestory) * props.unitpx * 0.12 + animationCountHitCount * props.unitpx * 0.04

  const onPointerDown = (e) => {
    if (open) {
      props.gameHit.forEach(i => {
        if (
          i.inProcess === true &&
          i.inDestory === false &&
          i.ifHit() === true &&
          i.ifCollision().y + i.ifCollision().radius > (y - h / 2) &&
          i.ifCollision().y - i.ifCollision().radius < (y + h / 2)
        ) {
          i.onHit()
          i.onUpdate()
          setLineHit(n => [...n, { key: Math.random(), x: i.option.x, y: y }])
          setAnimationCountHitCount(i => i + 1)
        }
      })
    }
  }

  React.useEffect(() => {
    setOpen(true)
  }, [])

  React.useEffect(() => {
    if (open === false) {
      if (props.animationCountGameTime !== 0 && props.animationCountGameTime % 4000 === 0) setOpen(true)
    }
    if (open === true) {
      if (props.animationCountGameTime !== 0 && props.animationCountGameTime % 2400 === 0) setOpen(false)
    }
  }, [props.animationCountGameTime, open])

  React.useEffect(() => {
    if (open === true) {
      setAnimationCountIntersection(0)
      setAnimationCountDestory(0)
    }
  }, [open])

  return <>
    <rect
      h={h + props.unitpx * 0.12}
      cx={'50%'}
      cy={y}
      onPointerDown={onPointerDown}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y + props.unitpx * 0.02}
      fillStyle={'white'}
      globalAlpha={(animationCountIntersection - animationCountDestory) * 0.25}
      onPointerDown={onPointerDown}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y - props.unitpx * 0.02}
      fillStyle={'white'}
      globalAlpha={(animationCountIntersection - animationCountDestory) * 0.25}
      onPointerDown={onPointerDown}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y}
      fillStyle={'white'}
      globalAlpha={animationCountIntersection - animationCountDestory}
    />

    {
      lineHit.map(i => <LineHit animationCountDestory={animationCountDestory} onDestory={() => setLineHit} {...props} {...i} y={y} />)
    }
  </>
}

const App = (props) => {
  return [
    // <LineTop {...props} />,
    <LineBottom {...props} />,
  ]
}

export { init, App }