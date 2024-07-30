import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      level: 1,
    }, optionOverlay
  )

  option.wireA = {
    default: true,
    useTimeMax: 1200,
    useTime: 0,
    unuseTimeMax: 1200,
    unuseTime: 0,
  }

  option.wireB = {
    default: false,
    useTimeMax: 1200,
    useTime: 0,
    unuseTimeMax: 1200,
    unuseTime: 0,
  }

  const onTime = (time) => {

  }

  return { key: Math.random(), component: App, option: option, onTime }
}

const WireHitAnimation = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountIntersection * Math.PI * 0.75, [animationCountIntersection])
  const radius = React.useMemo(() => contextApp.unitpx * 0.16 + animationCountIntersection * contextApp.unitpx * 0.16, [animationCountIntersection])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountIntersection < 0.2) {
      globalAlpha = animationCountIntersection / 0.2
    }
    if (animationCountIntersection >= 0.2 && animationCountIntersection < 0.5) {
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
      w={radius}
      h={radius}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={contextApp.unitpx * 0.004}
      radius={radius * 0.1}
    />

    <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={radius * 0.5}
      h={radius * 0.5}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={contextApp.unitpx * 0.004}
      radius={radius * 0.5 * 0.1}
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
      w={radius * 2}
      h={radius * 2}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={contextApp.unitpx * 0.004}
      radius={radius * 2 * 0.1}
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

const WireA = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [open, setOpen] = React.useState(false)
  const [lineHit, setLineHit] = React.useState([])

  const { animationCount: animationCountIntersection, setAnimationCount: setAnimationCountIntersection } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === true, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory, setAnimationCount: setAnimationCountDestory } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === false && animationCountIntersection !== 0, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = contextApp.unitpx * 0.004
  const y = contextApp.locationLayout.h * 0.2 - (1 - animationCountIntersection + animationCountDestory) * contextApp.unitpx * 0.08 - animationCountHitCount * contextApp.unitpx * 0.02

  const onPointerDown = (e) => {
    if (contextPlayground.gamePlay === true && open) {
      setAnimationCountHitCount(i => i + 1)

      contextPlayground.gameHit.forEach(i => {
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
      })
    }
  }

  React.useEffect(() => {
    if (open === false) {
      if (contextPlayground.animationCountGameTime !== 0 && contextPlayground.animationCountGameTime % 360 === 0) setOpen(true)
    }
    if (open === true) {
      if (contextPlayground.animationCountGameTime !== 0 && contextPlayground.animationCountGameTime % 700 === 0) setOpen(false)
    }
  }, [contextPlayground.animationCountGameTime, open])

  React.useEffect(() => {
    if (open === true) {
      setAnimationCountIntersection(0)
      setAnimationCountDestory(0)
    }
  }, [open])

  return <>
    <rect
      h={h + contextApp.unitpx * 0.08}
      cx={'50%'}
      cy={y + contextApp.unitpx * 0.02}
      onPointerDown={onPointerDown}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y + contextApp.unitpx * 0.01}
      fillStyle={'white'}
      globalAlpha={(animationCountIntersection - animationCountDestory) * 0.2}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y - contextApp.unitpx * 0.01}
      fillStyle={'white'}
      globalAlpha={(animationCountIntersection - animationCountDestory) * 0.2}
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
      lineHit.map(i => <WireHitAnimation animationCountDestory={animationCountDestory} onDestory={() => setLineHit} {...props} {...i} y={y} />)
    }
  </>
}

const WireB = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)
  
  const [open, setOpen] = React.useState(false)
  const [lineHit, setLineHit] = React.useState([])

  const { animationCount: animationCountIntersection, setAnimationCount: setAnimationCountIntersection } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === true, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory, setAnimationCount: setAnimationCountDestory } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === false && animationCountIntersection !== 0, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = contextApp.unitpx * 0.004
  const y = contextApp.locationLayout.h * 0.75 + (1 - animationCountIntersection + animationCountDestory) * contextApp.unitpx * 0.08 + animationCountHitCount * contextApp.unitpx * 0.02

  const onPointerDown = (e) => {
    if (contextPlayground.gamePlay === true && open) {
      setAnimationCountHitCount(i => i + 1)

      contextPlayground.gameHit.forEach(i => {
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
      })
    }
  }

  React.useEffect(() => {
    setOpen(true)
  }, [])

  React.useEffect(() => {
    if (open === false) {
      if (contextPlayground.animationCountGameTime !== 0 && contextPlayground.animationCountGameTime % 1000 === 900) setOpen(true)
    }
    if (open === true) {
      if (contextPlayground.animationCountGameTime !== 0 && contextPlayground.animationCountGameTime % 1000 === 800) setOpen(false)
    }
  }, [contextPlayground.animationCountGameTime, open])

  React.useEffect(() => {
    if (open === true) {
      setAnimationCountIntersection(0)
      setAnimationCountDestory(0)
    }
  }, [open])

  return <>
    <rect
      h={h + contextApp.unitpx * 0.08}
      cx={'50%'}
      cy={y + contextApp.unitpx * 0.02}
      onPointerDown={onPointerDown}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y + contextApp.unitpx * 0.01}
      fillStyle={'white'}
      globalAlpha={(animationCountIntersection - animationCountDestory) * 0.2}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y - contextApp.unitpx * 0.01}
      fillStyle={'white'}
      globalAlpha={(animationCountIntersection - animationCountDestory) * 0.2}
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
      lineHit.map(i => <WireHitAnimation animationCountDestory={animationCountDestory} onDestory={() => setLineHit} {...props} {...i} y={y} />)
    }
  </>
}

const App = (props) => {
  return [
    <WireA {...props} />,
    <WireB {...props} />,
  ]
}

export { init, App }