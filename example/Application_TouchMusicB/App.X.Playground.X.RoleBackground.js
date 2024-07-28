import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import SkillTimeLine from './App.X.Playground.X.RoleBackground.Component.SkillTimeLine'

function Role(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const activeRef = React.useRef(false)

  const [ready, setReady] = React.useState(false)

  const { ref: refLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { x: 0, y: 0, w: 0, h: 0 } })

  const activeIn = props.role === contextPlayground.gameRoleUse
  const activeNot = props.role !== contextPlayground.gameRoleUse
  const activeAnother = contextPlayground.gameRoleUse !== undefined && props.role !== contextPlayground.gameRoleUse

  const skillReady = props.role.skillWaitTimeEnough - props.role.skillWaitTime === 0
  const skillProcess = props.role.skillWaitTime / props.role.skillWaitTimeEnough
  const skillTimeLineText = String(((props.role.skillWaitTimeEnough - props.role.skillWaitTime) / 60).toFixed(2)) + 's'

  const offsetYLimit = locationLayout.h * 0.35 * -1

  const { animationCount: animationCountActiveAnother } = React.useAnimationDestination({ play: true, defaultCount: activeAnother ? 1 : 0, destination: activeAnother ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountActiveNotOffsetY, setAnimationCount: setAnimationCountActiveNotOffsetY } = React.useAnimationDestination({ play: activeNot, defaultCount: 0, destination: 0, rate: contextApp.locationLayout.h / 75, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountReady } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  // const onChange = (params) => {
  //   const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

  //   if (activeRef.current === false && status === 'afterMove' && continuedY < locationLayout.h * 0.05 * -1) {
  //     activeRef.current = true
  //     contextPlayground.setGameRoleActive(props.role)
  //     contextPlayground.setGameTimeRate(i => i * 0.1)
  //   }

  //   if (activeRef.current === true && status === 'afterMove') {
  //     var offsetY = animationCountActiveNotOffsetY + changedY

  //     if (offsetY > 0) offsetY = 0
  //     if (offsetY < offsetYLimit) offsetY = offsetYLimit

  //     setAnimationCountActiveNotOffsetY(offsetY)
  //     setReady(animationCountActiveNotOffsetY < offsetYLimit * 0.75)
  //   }

  //   if (activeRef.current === true && props.role.skillWaitTime === props.role.skillWaitTimeEnough && ready === true && status === 'afterEnd') {
  //     props.role.skill(contextPlayground.gameHit)
  //     props.role.skillWaitTime = 0

  //     contextPlayground.setGameRole(i => [...i])
  //   }

  //   if (activeRef.current === true && props.role.skillWaitTime === props.role.skillWaitTimeEnough && status === 'afterEnd') {
  //     setReady(false)
  //   }

  //   if (activeRef.current === true && status === 'afterEnd') {
  //     activeRef.current = false
  //     contextPlayground.setGameRoleActive()
  //     contextPlayground.setGameTimeRate(i => i * 10)
  //   }
  // }

  // const { onStart, onMove, onEnd } = ReactCanvas2d.useEventDragControl({ enable: true, onChange: onChange })

  return <layout w='0px' item grow={1} onLocationMounted={dom => refLayout.current = dom}>
    <rectradius
      clip
      cx={'50%'}
      cy={`calc(50% + ${animationCountActiveNotOffsetY}px)`}
      radius={contextApp.unitpx * 0.02}
      globalAlpha={0.25 + (1 - animationCountActiveAnother) * 0.75}
    >
      <image
        cx={'50%'}
        cy={'50%'}
        w={`${100 + animationCountReady * 25}%`}
        h={`${100 + animationCountReady * 25}%`}
        image={contextApp[props.role.option.imageIndex]}
        size='auto-max'
        position='center'
      />

      <rect
        fill
        fillStyle={'rgb(255, 255, 255)'}
        globalAlpha={0.15}
      />

      <SkillTimeLine
        text={skillTimeLineText}
        unitpx={contextApp.unitpx * 0.08}
        ready={skillReady}
        process={skillProcess}
        x={locationLayout.x}
        y={locationLayout.y + animationCountActiveNotOffsetY}
        w={locationLayout.w}
        h={locationLayout.h}
        panelOffsetYPercent={animationCountActiveNotOffsetY / offsetYLimit}
      />
    </rectradius>
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const gap = contextApp.unitpx * 0.025

  const w = (contextApp.unitpx - gap * 2) / 4 * contextPlayground.gameRole.length
  const h = (w - contextPlayground.gameRole.length + gap) / contextPlayground.gameRole.length * 2.75

  return <layout cx={'50%'} b={gap} w={w} h={h} container horizontalCenter vericalCenter gap={gap}>
    {
      contextPlayground.gameRole.map((i, index) => {
        return <Role role={i} index={index} />
      })
    }
  </layout>
}

export default App