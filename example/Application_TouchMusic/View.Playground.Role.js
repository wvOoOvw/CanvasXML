import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Role(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const activeRef = React.useRef(false)

  const [ready, setReady] = React.useState(false)

  const { ref: refLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { w: 0, h: 0 } })

  const activeNot = props.role !== contextPlayground.gameRoleActive
  const activeAnother = contextPlayground.gameRoleActive !== undefined && props.role !== contextPlayground.gameRoleActive

  const { animationCount: animationCountActiveAnother } = React.useAnimationDestination({ play: true, defaultCount: activeAnother ? 0 : 1, destination: activeAnother ? 0 : 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountActiveNotOffsetY, setAnimationCount: setAnimationCountActiveNotOffsetY } = React.useAnimationDestination({ play: activeNot, defaultCount: 0, destination: 0, rate: contextApp.locationLayout.h / 75, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountReady } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (activeRef.current === false && status === 'afterMove') {
      activeRef.current = true
      contextPlayground.setGameRoleActive(props.role)
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
      props.role.skill(contextPlayground.gameHit)
      props.role.skillWaitTime = 0

      contextPlayground.setGameRole(i => [...i])
    }

    if (activeRef.current === true && props.role.skillWaitTime === props.role.skillWaitTimeEnough && status === 'afterEnd') {
      setReady(false)
    }

    if (activeRef.current === true && status === 'afterEnd') {
      activeRef.current = false
      contextPlayground.setGameRoleActive()
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

      <ReactCanvas2d.TextCaculateLine text={String(((props.role.skillWaitTimeEnough - props.role.skillWaitTime) / 60).toFixed(2))} font={`${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' ' wrap>
        {
          (line, location) => {
            return <text cx={'50%'} cy={'50%'} w={location.w} h={location.h} fillText fillStyle={`rgb(0, 0, 0)`} align='center' font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} line={line} globalAlpha={1 - props.role.skillWaitTime / props.role.skillWaitTimeEnough} />
          }
        }
      </ReactCanvas2d.TextCaculateLine>

    </rect>
  </>
}

function Roles() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const gap = contextApp.unitpx * 0.025

  const w = (contextApp.unitpx - gap * 2) / 4 * contextPlayground.gameRole.length
  const h = (w - contextPlayground.gameRole.length + gap) / contextPlayground.gameRole.length * 2.75

  return <layout container verticalReverse horizontalAlignCenter>
    <layout w={`${w}px`} h={`${h}px`} item>
      <layout y={`${gap * -1}px`} container horizontalCenter verticalAlignCenter gap={gap}>
        {
          contextPlayground.gameRole.map((i, index) => {
            return <layout w='0px' item grow={1}>
              <Role role={i} index={index} w={w} h={h} />
            </layout>
          })
        }
      </layout>
    </layout>
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (contextPlayground.information) {
      contextPlayground.setGameRole(contextPlayground.information.gameRole)
    }
  }, [contextPlayground.information])

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      contextPlayground.gameRole.forEach(i => i.skillWaitTime = Math.min(i.skillWaitTime + contextPlayground.gameTimeRate, i.skillWaitTimeEnough))
      contextPlayground.setGameRole(i => [...i])
    }
  }, [contextPlayground.animationCountGameTime, contextPlayground.gamePlay])

  const RoleMemo = React.useMemo(() => {
    return <Roles />
  }, [contextPlayground.animationCountGameTime, contextPlayground.gameHit, contextPlayground.gameRole, contextPlayground.gameRoleActive])

  return <layout globalAlpha={animationCountIntersection}>{RoleMemo}</layout>
}

export default App