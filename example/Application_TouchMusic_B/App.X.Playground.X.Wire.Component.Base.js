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

function WireHitAnimation (props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountAppear * Math.PI * 0.75, [animationCountAppear])
  const radius = React.useMemo(() => contextApp.unitpx * 0.16 + animationCountAppear * contextApp.unitpx * 0.16, [animationCountAppear])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.25) globalAlpha = animationCountAppear / 0.25
    if (animationCountAppear >= 0.25 && animationCountAppear <= 0.5) globalAlpha = 1
    if (animationCountAppear > 0.5) globalAlpha = (1 - animationCountAppear) / 0.5

    return globalAlpha
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountAppear === 1) props.onDestory()
  }, [animationCountAppear])

  return <>
    {/* <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={radius}
      h={radius}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={contextApp.unitpx * 0.004}
      radius={radius * 0.1}
    /> */}

    <rectradius
      stroke
      cx={props.x}
      cy={props.y}
      w={radius * 1}
      h={radius * 1}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={contextApp.unitpx * 0.004}
      radius={radius * 1 * 0.1}
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
      w={radius * 1}
      h={radius * 1}
      globalAlpha={globalAlpha}
      strokeStyle={'white'}
      lineWidth={contextApp.unitpx * 0.004}
      radius={radius * 1 * 0.1}
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

function WireA (){
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [wireHitAnimation, setWireHitAnimation] = React.useState([])

  const [open, setOpen] = React.useState(false)

  const { animationCount: animationCountMount, setAnimationCount: setAnimationCountMount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === true, defaultCount: 0, destination: 1, rate: 1 / 720 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountUnmount, setAnimationCount: setAnimationCountUnmount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && open === false, defaultCount: 0, destination: 1, rate: 1 / 240 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountTransition } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: open ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const h = contextApp.unitpx * 0.004
  const y = contextApp.locationLayout.h * 0.2 - (1 - animationCountTransition) * contextApp.unitpx * 0.08 - animationCountHitCount * contextApp.unitpx * 0.02

  const onPointerDown = (e) => {
    if (contextPlayground.gamePlay === true && open === true) {
      contextPlayground.gamePoint.forEach(i => {
        if (
          i.inProcess === true &&
          i.inDestory === false &&
          i.ifHit() === true &&
          i.ifCollisions().every(i => i.x + i.radius > e.x && i.x - i.radius < e.x && i.y + i.radius > (y - h / 2) && i.y - i.radius < (y + h / 2))
          // i.ifCollisions().every(i => i.y + i.radius > (y - h / 2) && i.y - i.radius < (y + h / 2))
        ) {
          i.onHit()
          i.onUpdate()
          setWireHitAnimation(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
          setAnimationCountHitCount(i => i + 1)
          new Audio(contextApp.audioBoomB).play()
        }
      })
      setAnimationCountHitCount(i => i + 1)
      new Audio(contextApp.audioBoomA).play()
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
    <layout zIndex={0}>
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
        cy={y}
        fillStyle={'white'}
        globalAlpha={animationCountTransition}
      />
    </layout>

    <layout zIndex={2}>
      {
        wireHitAnimation.map(i => <WireHitAnimation onDestory={() => setWireHitAnimation(n => n.filter(v => v !== i))} {...i} y={y} />)
      }
    </layout>
  </>
}

function WireB (){
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [wireHitAnimation, setWireHitAnimation] = React.useState([])

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

      contextPlayground.gamePoint.forEach(i => {
        if (
          i.inProcess === true &&
          i.inDestory === false &&
          i.ifHit() === true &&
          i.ifCollisions().every(i => i.y + i.radius > (y - h / 2) && i.y - i.radius < (y + h / 2))
        ) {
          i.onHit()
          i.onUpdate()
          setWireHitAnimation(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
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
    <layout zIndex={0}>
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
        cy={y}
        fillStyle={'white'}
        globalAlpha={animationCountTransition}
      />
    </layout>

    <layout zIndex={2}>
      {
        wireHitAnimation.map(i => <WireHitAnimation onDestory={() => setWireHitAnimation(n => n.filter(v => v !== i))} {...i} y={y} />)
      }
    </layout>
  </>
}

function App(props) {
  return [
    <WireA {...props} />,
    <WireB {...props} />,
  ]
}

export { init, App }