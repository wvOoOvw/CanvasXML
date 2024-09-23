import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function Content(props) {
  const contextApp = React.useContext(ContextApp)

  const onDestory = props.onDestory

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: destory === true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) onDestory()
  }, [animationCountDisappear])

  const Component =
    <layout globalAlpha={animationCountAppear - animationCountDisappear}>

      <layout container verticalCenter horizontalAlignCenter>
        <ReactCanvas2dExtensions.Text text={`百闻牌`} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text fillText fillStyle='white' w={line[0].w} h={line[0].h} text={line[0].text} font={line[0].font} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>

        <layout h={contextApp.unitpx * 0.06} item></layout>

        <ReactCanvas2dExtensions.Text text={'点击任意处开始'} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text fillText fillStyle={`rgb(130, 130, 130)`} w={line[0].w} h={line[0].h} text={line[0].text} font={line[0].font} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <ReactCanvas2dExtensions.Text text={`Version ${contextApp.version}`} font={`bolder ${contextApp.unitpx * 0.025}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text b={contextApp.unitpx * 0.04} l={contextApp.unitpx * 0.04} fillText fillStyle='white' w={line[0].w} h={line[0].h} text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>

      <rect onPointerDown={animationCountAppear === 1 ? () => setDestory(true) : undefined} />
    </layout>

  return Component
}

function Loading(props) {
  const contextApp = React.useContext(ContextApp)

  const onDestory = props.onDestory

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) onDestory()
  }, [animationCountDisappear])

  React.useEffect(() => {
    if (contextApp.load === true) setDestory(true)
  }, [contextApp.load])

  const Component =
    <layout globalAlpha={animationCountAppear - animationCountDisappear}>

      <layout container verticalCenter horizontalAlignCenter>
        <ReactCanvas2dExtensions.Text text={`WIRELOST`} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text fillText fillStyle={`rgb(130, 130, 130)`} w={line[0].w} h={line[0].h} text={line[0].text} font={line[0].font} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>

        <layout h={contextApp.unitpx * 0.06} item></layout>

        <ReactCanvas2dExtensions.Text text={'加载中'} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text fillText fillStyle={`rgb(130, 130, 130)`} w={line[0].w} h={line[0].h} text={line[0].text} font={line[0].font} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <layout cx='50%' y={contextApp.locationLayout.h - contextApp.unitpx * 0.3} w={contextApp.unitpx * 0.5} h={contextApp.unitpx * 0.2}>
        <circle fill cx={`${Math.sin(animationCountInfinity + Math.PI * 1.5) * 50 + 50}%`} cy={'50%'} sAngle={0} radius={contextApp.unitpx * 0.08} fillStyle={'rgb(255, 255, 255)'} />
      </layout>

    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)

  const [view, setView] = React.useState('Loading')

  React.useEffect(() => { if (view === undefined) contextApp.setScene(['Playground']) }, [view])

  if (view === 'Loading') return <Loading onDestory={() => setView('Content')} />
  if (view === 'Content') return <Content onDestory={() => setView()} />
}

export default App