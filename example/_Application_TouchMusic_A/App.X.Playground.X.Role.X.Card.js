import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import SkillTimeLine from './App.X.Playground.X.Role.Component.SkillTimeLine'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [role, setRole] = React.useState()

  const { animationCount: animationCountActiveCurrent } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: contextPlayground.gameRoleActive ? 1 : 0, destination: contextPlayground.gameRoleActive ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (contextPlayground.gameRoleActive) setRole(contextPlayground.gameRoleActive)
  }, [contextPlayground.gameRoleActive])

  if (role === undefined) {
    return null
  }

  if (role !== undefined) {
    const skillReady = role.skillWaitTimeEnough - role.skillWaitTime === 0
    const skillProcess = role.skillWaitTime / role.skillWaitTimeEnough
    const skillTimeLineText = String(((role.skillWaitTimeEnough - role.skillWaitTime) / 60).toFixed(2)) + 's'

    const w = contextApp.unitpx * 0.75
    const h = contextApp.unitpx * 1.25
    const x = w * -1 + (animationCountActiveCurrent * 1) * w
    const y = (contextApp.locationLayout.h - h) / 2

    return <rectradius 
    
    
    clip
      x={x}
      y={y}
      w={w}
      h={h}
      radius={w * 0.04}
      globalAlpha={animationCountActiveCurrent}
      transform={
        [
          {
            translate: { x: x + w / 2, y: y + h / 2 },
          },
          {
            rotate: { angle: Math.PI * 0.2 * animationCountActiveCurrent },
          },
          {
            translate: { x: (x + w / 2) * -1, y: (y + h / 2) * -1 },
          },
        ]
      }
    >
      <image 
      
        cx={'50%'}
        cy={'50%'}
        src={role.image}
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
        unitpx={contextApp.unitpx * 0.24}
        ready={skillReady}
        process={skillProcess}
        x={x}
        y={y}
        w={w}
        h={h}
      />

      <ReactCanvas2dExtensions.TextCaculateLine text={role.name} font={`bolder ${contextApp.unitpx * 0.06}px sans-serif`} lineHeight={1} gap={0} w={w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <>
              <text 
                fillText
                cx={'50%'}
                y={`calc(0% + ${contextApp.unitpx * 0.04}px)`}
                w={location.w}
                h={location.h}
                fillStyle={`rgb(0, 0, 0)`}
                font={`bolder ${contextApp.unitpx * 0.06}px sans-serif`}
                lineHeight={1}
                gap={0}
                line={line}
              />
            </>
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>

      <ReactCanvas2dExtensions.TextCaculateLine text={role.skillDescription} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <>
              <text 
                fillText
                cx={'50%'}
                y={`calc(0% + ${contextApp.unitpx * 0.16}px)`}
                w={location.w}
                h={location.h}
                fillStyle={`rgb(0, 0, 0)`}
                font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`}
                lineHeight={1}
                gap={0}
                line={line}
              />
              <rectradius 
                fill
                cx={'50%'}
                cy={`calc(0% + ${contextApp.unitpx * 0.16 + contextApp.unitpx * 0.02 + location.h}px)`}
                w={location.w}
                h={contextApp.unitpx * 0.008}
                radius={contextApp.unitpx * 0.004}
                fillStyle={'rgb(0, 0, 0)'}
              />
            </>
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>
    </rectradius>
  }
}

export default App