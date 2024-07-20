import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'
import ReactCanvas2d from './CanvasXML.ReactCanvas2d'

function App(props) {
  const w = Canvas2d.rect().width * Canvas2d.dpr()

  const { animationCount: animationCountIntersection } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestoryWait } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 60, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestory } = React.useAnimationDestination({ play: animationCountDestoryWait === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  if (animationCountDestory === 1) {
    return props.children
  }

  if (animationCountDestory !== 1) {
    return <ReactCanvas2d.CanvasLayout>
      <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection - animationCountDestory}>
        <ReactCanvas2d.TextCaculateLine text={`CanvasXML`} font={`${w * 0.04}px courier`} lineHeight={1} gap={0} w={w - w * 0.02} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle='white' align='center' font={`${w * 0.04}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.TextCaculateLine>

        <layout h={w * 0.02} item></layout>

        <ReactCanvas2d.TextCaculateLine text={'Powered by CanvasXML JS'} font={`${w * 0.015}px courier`} lineHeight={1} gap={0} w={w - w * 0.02} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={location.w} h={location.h} item>
                <text fillText fillStyle={`rgb(130, 130, 130)`} align='center' font={`${w * 0.015}px courier`} lineHeight={1} gap={0} line={line} />
              </layout>
            }
          }
        </ReactCanvas2d.TextCaculateLine>
      </layout>
    </ReactCanvas2d.CanvasLayout>
  }
}

export default App