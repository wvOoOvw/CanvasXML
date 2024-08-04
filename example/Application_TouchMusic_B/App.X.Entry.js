import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const onDestory = props.onDestory

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = React.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) onDestory()
  }, [animationCountDisappear])

  return <layout globalAlpha={animationCountAppear - animationCountDisappear}>

    <layout container verticalCenter horizontalAlignCenter>
      <ReactCanvas2d.TextCaculateLine text={`WIRELOST`} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
      <layout h={contextApp.unitpx * 0.06} item></layout>
      <ReactCanvas2d.TextCaculateLine text={'点击任意处开始'} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle={`rgb(130, 130, 130)`} align='center' font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>

    <ReactCanvas2d.TextCaculateLine text={`Version 1.0.0`} font={`bolder ${contextApp.unitpx * 0.025}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
      {
        (line, location) => {
          return <text w={location.w} h={location.h} b={contextApp.unitpx * 0.02} r={contextApp.unitpx * 0.02} fillText fillStyle='white' align='center' font={`bolder ${contextApp.unitpx * 0.025}px sans-serif`} lineHeight={1} gap={0} line={line} />
        }
      }
    </ReactCanvas2d.TextCaculateLine>

    <rectradius onPointerDown={() => setDestory(true)} />

  </layout>
}

export default App