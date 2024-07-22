import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

function App(props) {
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

export default App