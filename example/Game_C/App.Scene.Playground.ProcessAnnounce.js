import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentAvatar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const image = props.image
  const globalAlpha = props.globalAlpha

  // const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 120, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })

  const Component =
    <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.32 * 1.5} item>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[image]}>
        <rectradiusarc stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
        <rectradiusarc clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
          <image cx='50%' cy='50%' w='108%' h='108%' src={image} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>
        <rectradiusarc cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
          <image cx='50%' cy='50%' w='108%' h='108%' src={image} clipHorizontalCenter clipVerticalCenter />
          {/* <image cx={`calc(50% + ${animationCountInfinity * 4}%)`} cy={`calc(50% + ${animationCountInfinity * 4}%)`} w='108%' h='108%' src={image} clipHorizontalCenter clipVerticalCenter globalAlpha={globalAlpha * (1 - animationCountInfinity)} /> */}
        </rectradiusarc>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  return Component
}

function ComponentText(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const text = props.text

  const Component =
    <ReactCanvas2dExtensions.Text text={text} font={`bolder ${contextApp.unitpx * 0.08}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle={`rgb(255, 255, 255)`} text={line[0].text} font={line[0].font} />
          </layout>
        }
      }
    </ReactCanvas2dExtensions.Text>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) contextPlayground.setGameProcess(i => i + 1)
  }, [animationCountDisappear])

  // React.useEffect(() => {
  //   contextPlayground.setGameProcess(i => i + 1)
  // },[])

  const Component =
    <layout zIndex={contextPlayground.zIndex.ProcessAnnounce} globalAlpha={animationCountAppear - animationCountDisappear}>
      <layout item container horizontalCenter verticalAlignCenter gap={contextApp.unitpx * 0.12}>
        <ComponentAvatar image={contextApp[contextPlayground.informationJson.gameSelf.profileImageIndex]} globalAlpha={animationCountAppear - animationCountDisappear} />
        <ComponentText text='VS' />
        <ComponentAvatar image={contextApp[contextPlayground.informationJson.gameOpponent.profileImageIndex]} globalAlpha={animationCountAppear - animationCountDisappear} />
      </layout>
    </layout>

  return Component
}

export default App