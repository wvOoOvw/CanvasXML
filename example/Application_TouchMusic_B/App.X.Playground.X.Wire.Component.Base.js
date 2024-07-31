import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      status: []
    }, optionOverlay
  )

  return { key: Math.random(), component: App, option: option }
}

const WireHitAnimation = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountAppear * Math.PI * 0.75, [animationCountAppear])
  const radius = React.useMemo(() => contextApp.unitpx * 0.16 + animationCountAppear * contextApp.unitpx * 0.16, [animationCountAppear])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.2) {
      globalAlpha = animationCountAppear / 0.2
    }
    if (animationCountAppear >= 0.2 && animationCountAppear <= 0.5) {
      globalAlpha = 1
    }
    if (animationCountAppear > 0.5) {
      globalAlpha = (1 - animationCountAppear) / 0.5
    }

    return globalAlpha
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountAppear === 1) props.onDestoryAnimation()
  }, [animationCountAppear])

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

const WireWaveAnimation = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.3) {
      globalAlpha = animationCountAppear / 0.3
    }
    if (animationCountAppear >= 0.3 && animationCountAppear <= 0.7) {
      globalAlpha = 1
    }
    if (animationCountAppear > 0.7) {
      globalAlpha = (1 - animationCountAppear) / 0.7
    }

    return globalAlpha
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountAppear === 1) props.onDestoryAnimation()
  }, [animationCountAppear])

  const count = Math.floor(animationCountAppear / 0.1) * 2 + 1

  return <layout globalAlpha={globalAlpha}>
    {
      new Array(count).fill().map((i, index) => {
        return <rect
          fill
          w={contextApp.unitpx * 0.004}
          h={contextApp.unitpx * 0.01 + (index - (count - 1) / 2) * contextApp.unitpx * 0.008}
          cx={props.x + (index - (count - 1) / 2) * contextApp.unitpx * 0.02}
          cy={props.y}
          fillStyle={'white'}
        />
      })
    }
  </layout>
}

const WireA = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [wireHit, setWireHit] = React.useState([])

  const [open, setOpen] = React.useState(false)

  const { animationCount: animationCountMount, setAnimationCount: setAnimationCountMount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === true, defaultCount: 0, destination: 1, rate: 1 / 720 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountUnmount, setAnimationCount: setAnimationCountUnmount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === false, defaultCount: 0, destination: 1, rate: 1 / 240 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountTransition } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: open ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = contextApp.unitpx * 0.004
  const y = contextApp.locationLayout.h * 0.2 - (1 - animationCountTransition) * contextApp.unitpx * 0.08 - animationCountHitCount * contextApp.unitpx * 0.02

  const onPointerDown = (e) => {
    if (contextPlayground.gamePlay === true && open === true) {
      setAnimationCountHitCount(i => i + 1)

      contextPlayground.gameHit.forEach(i => {
        if (
          i.inProcess === true &&
          i.inDestory === false &&
          i.ifHit() === true &&
          i.ifCollisions().every(i => i.y + i.radius > (y - h / 2) && i.y - i.radius < (y + h / 2))
        ) {
          i.onHit()
          i.onUpdate()
          setWireHit(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
          setAnimationCountHitCount(i => i + 1)
        }
      })
    }
  }

  React.useEffect(() => {
    if (animationCountMount === 1) {
      setOpen(false)
      setAnimationCountUnmount(0)
    }
  }, [animationCountMount])

  React.useEffect(() => {
    if (animationCountUnmount === 1) {
      setOpen(true)
      setAnimationCountMount(0)
    }
  }, [animationCountUnmount])

  return <>
    <rect
      h={h + contextApp.unitpx * 0.12}
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
      globalAlpha={(animationCountTransition) * 0.2}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y - contextApp.unitpx * 0.01}
      fillStyle={'white'}
      globalAlpha={(animationCountTransition) * 0.2}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y}
      fillStyle={'white'}
      globalAlpha={animationCountTransition}
    />

    {
      wireHit.map(i => <WireHitAnimation onDestoryAnimation={() => setWireHit(n => n.filter(v => v !== i))} {...props} {...i} y={y} />)
    }
  </>
}

const WireB = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [wireHit, setWireHit] = React.useState([])

  const [open, setOpen] = React.useState(true)

  const { animationCount: animationCountMount, setAnimationCount: setAnimationCountMount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === true, defaultCount: 0, destination: 1, rate: 1 / 720 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountUnmount, setAnimationCount: setAnimationCountUnmount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === false, defaultCount: 0, destination: 1, rate: 1 / 240 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountTransition } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: open ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = contextApp.unitpx * 0.004
  const y = contextApp.locationLayout.h * 0.8 + (1 - animationCountTransition) * contextApp.unitpx * 0.08 + animationCountHitCount * contextApp.unitpx * 0.02

  const onPointerDown = (e) => {
    if (contextPlayground.gamePlay === true && open === true) {
      setAnimationCountHitCount(i => i + 1)

      contextPlayground.gameHit.forEach(i => {
        if (
          i.inProcess === true &&
          i.inDestory === false &&
          i.ifHit() === true &&
          i.ifCollisions().every(i => i.y + i.radius > (y - h / 2) && i.y - i.radius < (y + h / 2))
        ) {
          i.onHit()
          i.onUpdate()
          setWireHit(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
          setAnimationCountHitCount(i => i + 1)
        }
      })
    }
  }

  React.useEffect(() => {
    if (animationCountMount === 1) {
      setOpen(false)
      setAnimationCountUnmount(0)
    }
  }, [animationCountMount])

  React.useEffect(() => {
    if (animationCountUnmount === 1) {
      setOpen(true)
      setAnimationCountMount(0)
    }
  }, [animationCountUnmount])

  return <>
    <rect
      h={h + contextApp.unitpx * 0.12}
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
      globalAlpha={(animationCountTransition) * 0.2}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y - contextApp.unitpx * 0.01}
      fillStyle={'white'}
      globalAlpha={(animationCountTransition) * 0.2}
    />

    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y}
      fillStyle={'white'}
      globalAlpha={animationCountTransition}
    />

    {
      wireHit.map(i => <WireHitAnimation onDestoryAnimation={() => setWireHit(n => n.filter(v => v !== i))} {...props} {...i} y={y} />)
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