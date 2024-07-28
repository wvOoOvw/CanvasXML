import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      status: [],

      touch: [],

      hitPoint: 100,
      hitDamage: 1,
      hitDefense: 0,
    }, optionOverlay
  )

  const onTouch = (e) => {
    return option.touch = [...option.touch, { ...e, key: Math.random() }]
  }

  const onHit = (value) => {
    option.hitPoint = option.hitPoint - Math.max(point - option.hitDefense, point * 0.15)
  }

  return { key: Math.random(), component: App, option: option, onTouch, onHit }
}

const LineHit = (props) => {
  const rotateAngle = React.useMemo(() => props.animationCountDestory * Math.PI * 0.5, [props.animationCountDestory])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (props.animationCountDestory < 0.25) {
      globalAlpha = props.animationCountDestory / 0.25
    }
    if (props.animationCountDestory >= 0.25 && props.animationCountDestory < 0.5) {
      globalAlpha = 1
    }
    if (props.animationCountDestory > 0.5) {
      globalAlpha = (1 - props.animationCountDestory) / 0.5
    }

    return globalAlpha
  }, [props.animationCountDestory])

  return <>
    <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={props.ceilpx * 0.75}
      h={props.ceilpx * 0.75}
      globalAlpha={globalAlpha}
      strokeStyle={'yellow'}
      lineWidth={props.ceilpx * 0.02}
      radius={props.ceilpx * 0.04}
    />

    <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={props.ceilpx * 0.35}
      h={props.ceilpx * 0.35}
      globalAlpha={globalAlpha}
      strokeStyle={'yellow'}
      lineWidth={props.ceilpx * 0.01}
      radius={props.ceilpx * 0.02}
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
      w={props.ceilpx}
      h={props.ceilpx}
      globalAlpha={globalAlpha}
      strokeStyle={'yellow'}
      lineWidth={props.ceilpx * 0.02}
      radius={props.ceilpx * 0.08}
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

const Line = (props) => {
  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 15 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30 * props.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = props.ceilpx * 0.02

  const [lineHit, setLineHit] = React.useState([])

  React.useEffect(() => {
    props.gameHit.forEach(i => {
      if (
        i.inProcess === true &&
        i.inDestory === false &&
        i.ifDie() === false &&
        i.ifCollision().y + i.ifCollision().radius > (props.y - h / 2) &&
        i.ifCollision().y - i.ifCollision().radius < (props.y + h / 2)
      ) {
        i.onHit(props.option.hitDamage)
        i.onUpdate()
        setLineHit(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
      }
    })
  }, [])

  React.useEffect(() => {
    if (animationCountDestory === 1) props.onDestory()
  }, [animationCountDestory])

  return <>
    <rect
      fill
      h={h}
      cx={'50%'}
      cy={props.y}
      fillStyle={'yellow'}
      globalAlpha={animationCountIntersection - animationCountDestory}
    />

    {
      lineHit.map(i => <LineHit animationCountDestory={animationCountDestory} {...props} {...i} />)
    }
  </>
}

const Action = (props) => {
  const onClickAction = (e) => {
    props.onTouch(e)
  }

  const onClick = ReactCanvas2d.useEventClick({ onClick: onClickAction })

  return <rect onPointerDown={onClick.onDown} onPointerUp={onClick.onUp}></rect>
}

const App = (props) => {
  const [line, setLine] = React.useState([])

  React.useEffect(() => {
    props.option.touch.forEach(i => {
      setLine(n => [...n, { key: Math.random(), ...i }])
    })

    props.option.touch = []
  }, [props.option.touch])

  return <>
    {
      line.map(i => <Line onDestory={() => setLine(n => n.filter(u => u !== i))} {...props} {...i} />)
    }
    {
      props.inUse ? <Action {...props} /> : null
    }
  </>
}

export { init, App }