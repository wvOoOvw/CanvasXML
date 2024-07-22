import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

function App(props) {
  const { animationCount } = React.useAnimationDestination({ play: true, defaultCount: props.ready ? 1 : 0, destination: props.ready ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  return <ReactCanvas2d.TextCaculateLine text={props.text} font={`bolder ${props.fontSize}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
    {
      (line, location) => {
        return <>
          <text
            fillText
            cx={'50%'}
            cy={`calc(0% + ${(animationCount * 2 - 1) * props.fontSize * 1.5}px)`}
            w={location.w}
            h={location.h}
            fillStyle={`rgb(0, 0, 0)`}
            align='center'
            font={`bolder ${props.fontSize}px sans-serif`}
            lineHeight={1}
            gap={0}
            line={line}
          />
        </>
      }
    }
  </ReactCanvas2d.TextCaculateLine>
}

export default App