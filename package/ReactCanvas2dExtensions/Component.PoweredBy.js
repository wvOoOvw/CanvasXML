import React from '../React'
import Canvas2d from '../Canvas2d'
import * as ReactExtensions from '../ReactExtensions'
import CanvasLayout from './Component.CanvasLayout'
import TextCaculateLine from './Component.TextCaculateLine'

function App(props) {
  const w = Canvas2d.rect().width * Canvas2d.dpr()
  const h = Canvas2d.rect().height * Canvas2d.dpr()

  const min = Math.min(w, h)

  const { animationCount: animationCountIntersection } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestoryWait } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 60, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestory } = ReactExtensions.useAnimationDestination({ play: animationCountDestoryWait === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  if (animationCountDestory === 1) {
    return props.children
  }

  if (animationCountDestory !== 1) {
    return <CanvasLayout>
      <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection - animationCountDestory}>
        <TextCaculateLine text={`CanvasXML`} font={`${min * 0.06}px sans-serif`} lineHeight={1} gap={0} w={w - min * 0.02} split=' ' wrap>
          {
            (line, location) => {
              return line.map(i => {
                return <layout w={i.w} h={i.h} item>
                  <text fillText fillStyle='white' w={i.w} h={i.h} text={i.text} font={i.font} />
                </layout>
              })
            }
          }
        </TextCaculateLine>

        <layout h={min * 0.02} item></layout>

        <TextCaculateLine text={'Powered by CanvasXML JS'} font={`${min * 0.025}px sans-serif`} lineHeight={1} gap={0} w={w - min * 0.02} split=' ' wrap>
          {
            (line, location) => {
              return line.map(i => {
                return <layout w={i.w} h={i.h} item>
                  <text fillText fillStyle={`rgb(130, 130, 130)`} w={i.w} h={i.h} text={i.text} font={i.font} />
                </layout>
              })
            }
          }
        </TextCaculateLine>
      </layout>
    </CanvasLayout>
  }
}

export default App