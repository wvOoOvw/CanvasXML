import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

function App(props) {
  const { animationCount: animationCountReady } = React.useAnimationDestination({ play: true, defaultCount: props.ready ? 1 : 0, destination: props.ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const readyTextOffsetX = React.useMemo(() => {
    if (props.panelOffsetYPercent === undefined) return 0
    if (props.panelOffsetYPercent !== undefined) return props.panelOffsetYPercent * props.w * 0.5
  }, [props.panelOffsetYPercent])

  return <>
    <rect
      cx={'50%'}
      cy={'50%'}
      w={'300%'}
      h={`${(1 - props.process) * 100}%`}
      beginPath
      fill
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={0.75 - animationCountReady * 0.75}
      transform={
        [
          {
            translate: { x: props.x + props.w / 2, y: props.y + props.h / 2 },
          },
          {
            rotate: { angle: Math.PI * 0.15 * -1 },
          },
          {
            translate: { x: (props.x + props.w / 2) * -1, y: (props.y + props.h / 2) * -1 },
          },
        ]
      }
    />

    <arc
      beginPath
      stroke
      cx={'50%'}
      cy={'50%'}
      sAngle={0}
      eAngle={Math.PI * 2 * props.process}
      counterclockwise={false}
      radius={props.unitpx}
      lineWidth={props.unitpx * 0.1}
      strokeStyle={'rgb(0, 0, 0)'}
      globalAlpha={1 - animationCountReady}
    />

    <layout
      transform={
        [
          {
            translate: { x: props.x + props.w / 2, y: props.y + props.h / 2 },
          },
          {
            rotate: { angle: Math.PI * 0.15 * -1 },
          },
          {
            translate: { x: (props.x + props.w / 2) * -1, y: (props.y + props.h / 2) * -1 },
          },
        ]
      }
    >
      <rect
        cx={'50%'}
        cy={'50%'}
        w={'300%'}
        h={`${animationCountReady * props.unitpx * 1.2}px`}
        beginPath
        fill
        fillStyle={'rgb(255, 255, 255)'}
        globalAlpha={0.75}
      />

      <ReactCanvas2d.TextCaculateLine text={'Ready !!!'} font={`bolder ${props.unitpx * 0.4}px sans-serif`} lineHeight={1} gap={0} w={props.w - props.unitpx * 0.12} split=' ' wrap>
        {
          (line, location) => {
            return <>
              <text
                fillText
                cx={`calc(50% + ${readyTextOffsetX}px)`}
                cy={'50%'}
                w={location.w}
                h={location.h}
                fillStyle={`rgb(0, 0, 0)`}
                align='center'
                font={`bolder ${props.unitpx * 0.4}px sans-serif`}
                lineHeight={1}
                gap={0}
                line={line}
                globalAlpha={animationCountReady}
              />
            </>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>
  </>
}

export default App