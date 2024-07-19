import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Role(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const activeRef = React.useRef(false)

  const [ready, setReady] = React.useState(false)

  const { ref: refLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { w: 0, h: 0 } })

  const activeNot = props.index !== props.activeIndex
  const activeAnother = props.activeIndex !== undefined && props.index !== props.activeIndex

  const { animationCount: animationCountActiveAnother } = React.useAnimationDestination({ play: true, defaultCount: activeAnother ? 0 : 1, destination: activeAnother ? 0 : 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountActiveNotOffsetY, setAnimationCount: setAnimationCountActiveNotOffsetY } = React.useAnimationDestination({ play: activeNot, defaultCount: 0, destination: 0, rate: contextApp.locationLayout.h / 75, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountReady } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(3)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (activeRef.current === false && status === 'afterMove') {
      activeRef.current = true
      props.setActiveIndex(props.index)
      contextPlayground.setGameTimeRate(i => i * 0.1)
    }

    if (activeRef.current === true && props.role.skillWaitTime === props.role.skillWaitTimeEnough && status === 'afterMove') {
      var offsetY = animationCountActiveNotOffsetY + changedY

      if (offsetY < locationLayout.h * 0.35 * -1) {
        offsetY = locationLayout.h * 0.35 * -1
      }
      if (offsetY > 0) {
        offsetY = 0
      }

      setAnimationCountActiveNotOffsetY(offsetY)
      setReady(animationCountActiveNotOffsetY < locationLayout.h * 0.35 * -1 * 0.75)
    }

    if (activeRef.current === true && props.role.skillWaitTime === props.role.skillWaitTimeEnough && ready === true && status === 'afterEnd') {
      contextPlayground.gameHit.filter(i => i.inProcess === true && i.inFail === false && i.inDestory === false).forEach(i => {
        i.toSuccess()
        i.onHitAuto(1)
      })
    }

    if (activeRef.current === true && props.role.skillWaitTime === props.role.skillWaitTimeEnough && status === 'afterEnd') {
      if (ready === true) {
        props.role.skillWaitTime = 0
      }

      props.setRole(i => [...i])
      setReady(false)
    }

    if (activeRef.current === true && status === 'afterEnd') {
      activeRef.current = false
      props.setActiveIndex()
      contextPlayground.setGameTimeRate(i => i * 10)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2d.useEventDragControl({ enable: true, onChange: onChange })

  return <>
    <rect
      gx={0}
      gy={0}
      w={contextApp.locationLayout.w}
      h={contextApp.locationLayout.h}
      onPointerMove={onMove}
      onPointerUp={onEnd}
    />
    <rect
      beginPath
      clip
      cx={'50%'}
      cy={`calc(50% - ${props.index * locationLayout.h * 0.04 * 3}px + ${animationCountActiveNotOffsetY}px)`}
      radius={props.w * 0.02}
      onPointerDown={onStart}
      onLocationMount={dom => refLayout.current = dom}
    >
      <image
        cx={'50%'}
        cy={'50%'}
        w={`${100 + animationCountReady * 25}%`}
        h={`${100 + animationCountReady * 25}%`}
        image={props.role.image}
        size='auto-max'
        position='center'
        globalAlpha={0.25 + animationCountActiveAnother * 0.75}
      />

      <rect
        beginPath
        fill
        fillStyle={'rgb(255, 255, 255)'}
        globalAlpha={0.5 - props.role.skillWaitTime / props.role.skillWaitTimeEnough * 0.5}
      />

      <arc
        beginPath
        stroke
        cx={'50%'}
        cy={'50%'}
        sAngle={0}
        eAngle={Math.PI * 2 * props.role.skillWaitTime / props.role.skillWaitTimeEnough}
        counterclockwise={false}
        radius={props.w * 0.08}
        lineWidth={props.w * 0.008}
        strokeStyle={'rgb(0, 0, 0)'}
        globalAlpha={1 - props.role.skillWaitTime / props.role.skillWaitTimeEnough}
      />

    </rect>
  </>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [role, setRole] = React.useState([
    {
      image: contextApp.imagePngA,
      skill: () => {

      },
      skillWaitTime: 0,
      skillWaitTimeEnough: 60,
    },
    {
      image: contextApp.imagePngB,
      skillWaitTime: 0,
      skillWaitTimeEnough: 300,
    },
    {
      image: contextApp.imagePngC,
      skillWaitTime: 0,
      skillWaitTimeEnough: 600,
    },
    {
      image: contextApp.imagePngD,
      skillWaitTime: 0,
      skillWaitTimeEnough: 1200,
    },
  ])

  const [activeIndex, setActiveIndex] = React.useState()

  const { animationCount: animationCountGamePlay } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gamePlay ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  const gap = contextApp.unitpx * 0.025

  const w = (contextApp.unitpx - gap * 2) / 4 * role.length
  const h = (w - role.length + gap) / role.length * 2.75

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      role.forEach(i => {
        i.skillWaitTime = Math.min(i.skillWaitTime + contextPlayground.gameTimeRate, i.skillWaitTimeEnough)
      })
      setRole(i => [...i])
    }
  }, [contextPlayground.gamePlay, contextPlayground.animationCountGameTime])

  React.useEffect(() => {
    contextPlayground.setRoleActive(activeIndex !== undefined)
  }, [activeIndex])

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
                w={w}
                h={h}
              />
            </layout>
          })
        }
      </layout>
    </layout>
  </layout>
}

export default App