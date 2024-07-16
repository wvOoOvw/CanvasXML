import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function Role(props) {
  const context = React.useContext(Context)

  const [ready, setReady] = React.useState(false)

  const { ref: refLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { w: 0, h: 0 } })

  const { animationCount: animationCountGlobalAlpha } = React.useAnimationDestination({ play: true, defaultCount: 1, destination: props.activeIndex !== undefined && props.index !== props.activeIndex ? 0 : 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountOffsetY, setAnimationCount: setAnimationCountOffsetY } = React.useAnimationDestination({ play: props.index !== props.activeIndex, defaultCount: 0, destination: 0, rate: context.locationLayout.h / 75, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountReadyScale, setAnimationCount: setAnimationCountReadyScale } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(3)) })

  const onChange = (params) => {
    const { type, status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterMove' && props.role.skillWaitTime === 0 && props.role.skillUseTime === 0) {
      props.setActiveIndex(props.index)
      context.setGameTimeRate(i => i * 0.1)

      var offsetY = animationCountOffsetY + changedY

      if (offsetY < locationLayout.h * 0.35 * -1) offsetY = locationLayout.h * 0.35 * -1
      if (offsetY > 0) offsetY = 0

      setReady(animationCountOffsetY < locationLayout.h * 0.35 * -1 * 0.75)

      setAnimationCountOffsetY(offsetY)
    }

    if (status === 'afterEnd') {
      props.setActiveIndex()
      context.setGameTimeRate(i => i * 10)

      if (ready === true) {
        context.gameHit.filter(i => i.inProcess === true && i.inFail === false && i.inDestory === false).forEach(i => {
          i.toSuccess()
          i.onHit(undefined, 1)
          props.role.skillWaitTime = props.role.skillWaitTimeLimit
          props.setRole(i => [...i])
        })
      }

      if (ready === false) {
        props.role.skillUseTime = props.role.skillWaitTimeLimit
        props.setRole(i => [...i])
      }

      setReady(false)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2d.useEventDragControl({ enable: true, onChange: onChange })

  const globalAlpha = 
    0.25 + 
    Math.min(
      0.75,
      animationCountGlobalAlpha * 0.5 + 
      props.role.skillWaitTime / props.skillWaitTimeLimit * 0.5 + 
      props.role.skillUseTime / props.role.skillWaitTimeLimit * 0.5
    )

  return <>
    <rect
      gx={0}
      gy={0}
      w={context.locationLayout.w}
      h={context.locationLayout.h}
      onPointerMove={onMove}
      onPointerUp={onEnd}
    />
    <rect
      beginPath
      clip
      cx={'50%'}
      cy={`calc(50% - ${props.index * locationLayout.h * 0.04 * 3}px + ${animationCountOffsetY}px)`}
      radius={locationLayout.w * 0.08}
      globalAlpha={globalAlpha}
      onPointerDown={onStart}
      onLocationMount={dom => refLayout.current = dom}
    >
      <image
        cx={'50%'}
        cy={'50%'}
        w={`${100 + animationCountReadyScale * 25}%`}
        h={`${100 + animationCountReadyScale * 25}%`}
        image={props.role.image}
        size='auto-max'
        position='center'
      />
    </rect>
  </>
}

function App() {
  const context = React.useContext(Context)

  const [role, setRole] = React.useState([
    {
      image: context.imagePngA,
      skillWaitTime: 300,
      skillWaitTimeLimit: 300,
      skillUseTime: 0,
      skillUseTimeLimit: 120,
    },
    {
      image: context.imagePngB,
      skillWaitTime: 300,
      skillWaitTimeLimit: 300,
      skillUseTime: 0,
      skillUseTimeLimit: 120,
    },
    {
      image: context.imagePngC,
      skillWaitTime: 300,
      skillWaitTimeLimit: 300,
      skillUseTime: 0,
      skillUseTimeLimit: 120,
    },
    {
      image: context.imagePngD,
      skillWaitTime: 300,
      skillWaitTimeLimit: 300,
      skillUseTime: 0,
      skillUseTimeLimit: 120,
    },
  ])

  const [activeIndex, setActiveIndex] = React.useState()

  const { animationCount: animationCountGamePlay } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: context.gamePlay ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  const gap = Math.min(context.locationLayout.h * 0.65, context.locationLayout.w) * 0.025

  const w = (Math.min(context.locationLayout.h * 0.65, context.locationLayout.w) - gap * 2) / 4 * role.length
  const h = (w - role.length + gap) / role.length * 2.75

  React.useEffect(() => {
    if (context.gamePlay) {
      role.forEach(i => {
        i.skillWaitTime = Math.max(i.skillWaitTime - context.gameTimeRate, 0)
        i.skillUseTime = Math.max(i.skillUseTime - context.gameTimeRate, 0)
      })
      setRole(i => [...i])
    }
  }, [context.gamePlay, context.gameTimeRate])

  return <layout container verticalReverse horizontalAlignCenter globalAlpha={animationCountGamePlay * 1}>
    <layout w={`${w}px`} h={`${h}px`} item>
      <layout h={`calc(100% - ${gap}px)`} container horizontalCenter verticalAlignCenter gap={gap}>
        {
          role.map((i, index) => {
            return <layout w='0px' item grow={1}>
              <Role
                role={i}
                setRole={setRole}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </layout>
          })
        }
      </layout>
    </layout>
  </layout>
}

export default App