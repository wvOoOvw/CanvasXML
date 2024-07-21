import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function SkillText(props) {
  const { animationCount } = React.useAnimationDestination({ play: true, defaultCount: props.ready ? 1 : 0, destination: props.ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  return <ReactCanvas2d.TextCaculateLine text={props.text} font={`bolder ${props.fontSize}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
    {
      (line, location) => {
        return <text cx={'50%'} cy={`calc(0% + ${(animationCount * 2 - 1) * props.fontSize * 1.5}px)`} w={location.w} h={location.h} fillText fillStyle={`rgb(0, 0, 0)`} align='center' font={`bolder ${props.fontSize}px sans-serif`} lineHeight={1} gap={0} line={line} />
      }
    }
  </ReactCanvas2d.TextCaculateLine>
}

function SkillTimeLine(props) {
  const { animationCount } = React.useAnimationDestination({ play: true, defaultCount: props.ready ? 1 : 0, destination: props.ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  return <>
    <arc
      beginPath
      stroke
      cx={'50%'}
      cy={'50%'}
      sAngle={0}
      eAngle={Math.PI * 2 * props.process}
      counterclockwise={false}
      radius={props.radius}
      lineWidth={props.radius * 0.1}
      strokeStyle={'rgb(0, 0, 0)'}
      globalAlpha={1 - animationCount}
    />
    <ReactCanvas2d.TextCaculateLine text={props.text} font={`bolder ${props.fontSize}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
      {
        (line, location) => {
          return <text cx={'50%'} cy={`calc(50% - ${props.radius + props.fontSize}px)`} w={location.w} h={location.h} fillText fillStyle={`rgb(0, 0, 0)`} align='center' font={`bolder ${props.fontSize}px sans-serif`} lineHeight={1} gap={0} line={line} globalAlpha={1 - animationCount} />
        }
      }
    </ReactCanvas2d.TextCaculateLine>
  </>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [role, setRole] = React.useState()

  const { animationCount: animationCountActiveCurrent } = React.useAnimationDestination({ play: true, defaultCount: contextPlayground.gameRoleActive ? 1 : 0, destination: contextPlayground.gameRoleActive ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

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

    const transform = [
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

    return <rectradius
      x={x}
      y={y}
      w={w}
      h={h}
      beginPath
      clip
      transform={transform}
      radius={w * 0.04}
      globalAlpha={animationCountActiveCurrent}
    >
      <image
        cx={'50%'}
        cy={'50%'}
        image={role.image}
        size='auto-max'
        position='center'
      />

      <rectradius
        beginPath
        fill
        fillStyle={'rgb(255, 255, 255)'}
        globalAlpha={0.5 - role.skillWaitTime / role.skillWaitTimeEnough * 0.5}
      />

      <SkillTimeLine text={skillTimeLineText} radius={contextApp.unitpx * 0.16} fontSize={contextApp.unitpx * 0.06} ready={skillReady} process={skillProcess} />
      <SkillText text={'*技能冷却中*'} fontSize={contextApp.unitpx * 0.04} ready={skillReady !== true} />
      <SkillText text={'*技能就绪中*'} fontSize={contextApp.unitpx * 0.04} ready={skillReady === true} />

      <ReactCanvas2d.TextCaculateLine text={role.skillDescription} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <>
              <text
                fillText
                cx={'50%'}
                cy={`calc(0% + ${contextApp.unitpx * 0.16}px)`}
                w={location.w}
                h={location.h}
                fillStyle={`rgb(0, 0, 0)`} align='center'
                font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`}
                lineHeight={1}
                gap={0}
                line={line}
              />
              <rectradius
                beginPath
                fill
                cx={'50%'}
                cy={`calc(0% + ${contextApp.unitpx * 0.16 + location.h}px)`}
                w={location.w}
                h={contextApp.unitpx * 0.004}
                radius={contextApp.unitpx * 0.002}
                fillStyle={'rgb(0, 0, 0)'}
              />
            </>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </rectradius>
  }
}

export default App