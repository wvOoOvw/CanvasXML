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

  const title = props.title
  const image = props.image

  const Component =
    <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.08} item>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[image]}>
        <rectradiusarc fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.012} />
        <rectradiusarc clip radius={contextApp.unitpx * 0.012}>
          <image src={image} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>
        <ReactCanvas2dExtensions.Text text={String(title)} font={`bolder ${contextApp.unitpx * 0.028}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <layout cx='50%' cy='50%' w={line[0].w + contextApp.unitpx * 0.08} h={line[0].h + contextApp.unitpx * 0.02}>
                <rectradiusrect fill fillStyle='rgb(0, 0, 0)' radius={(line[0].h + contextApp.unitpx * 0.02) / 2} globalAlpha={0.4} />
                <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  return Component
}

function ComponentProperty(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const color = props.color
  const title = props.title
  const content = props.content
  const cost = props.cost

  const [animationCountCostInfinityPlay, setAnimationCountCostInfinityPlay] = React.useState(false)

  const { animationCount: animationCountCostAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: cost ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountCostInfinity } = ReactExtensions.useAnimationDestination({ play: animationCountCostInfinityPlay, defaultCount: 0, destination: Infinity, rate: 1 / 60, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })
  const { animationCount: animationCountContent } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: content, destination: content, rate: 1, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (cost !== undefined) {
      setAnimationCountCostInfinityPlay(true)
    }
    if (cost === undefined) {
      if (animationCountCostInfinity <= (0.5 - Math.cos(Number((1 / 12).toFixed(4))) / 2)) setAnimationCountCostInfinityPlay(false)
    }
  }, [cost, animationCountCostInfinity])

  const Component =
  <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.08} item>
  <ReactCanvas2dExtensions.CanvasOffscreen dependence={[color, cost, animationCountCostAppear, animationCountCostInfinity]}>
    {
      animationCountCostAppear ?
        <layout x={contextApp.unitpx * 0.12 + contextApp.unitpx * 0.14 * animationCountCostAppear} w={contextApp.unitpx * 0.16} h={contextApp.unitpx * 0.08} globalAlpha={animationCountCostAppear * (1 - animationCountCostInfinity)}>
          <rectradiusarc fill fillStyle={color} radius={contextApp.unitpx * 0.012} />
          <rectradiusarc stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.012} lineWidth={contextApp.unitpx * 0.0064} />
          <image x={contextApp.unitpx * 0.024} cy='50%' w={contextApp.unitpx * 0.048} h={contextApp.unitpx * 0.048} src={contextApp.imagePngCardExchangeWhite} />
          {
            cost ?
              <ReactCanvas2dExtensions.Text text={String(0 - cost)} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
                {
                  (line, location) => {
                    return <text cx={contextApp.unitpx * 0.072 + (contextApp.unitpx * 0.16 - contextApp.unitpx * 0.072) / 2} cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                  }
                }
              </ReactCanvas2dExtensions.Text>
              : null
          }
        </layout>
        : null
    }
  </ReactCanvas2dExtensions.CanvasOffscreen>
  <ReactCanvas2dExtensions.CanvasOffscreen dependence={[color, title, content, animationCountContent]}>
    <rectradiusarc fill fillStyle={color} radius={contextApp.unitpx * 0.012} />
    <rectradiusarc stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.012} lineWidth={contextApp.unitpx * 0.0064} />
    <rectradiusarc x={contextApp.unitpx * 0.048 + contextApp.unitpx * 0.024 * 2 - contextApp.unitpx * 0.0064} cy='50%' w={contextApp.unitpx * 0.0064} h={contextApp.unitpx * 0.048} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.0064 / 2} />
    <image x={contextApp.unitpx * 0.024} cy='50%' w={contextApp.unitpx * 0.048} h={contextApp.unitpx * 0.048} src={title} />
    <ReactCanvas2dExtensions.Text text={String(animationCountContent)} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return <text x={contextApp.unitpx * 0.24 - contextApp.unitpx * 0.024 - line[0].w} cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
        }
      }
    </ReactCanvas2dExtensions.Text>
  </ReactCanvas2dExtensions.CanvasOffscreen>
</layout>

  return Component
}

function InSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const Component =
    <layout zIndex={contextPlayground.zIndex.NavigationStatus} globalAlpha={animationCountAppear}>
      <layout x={contextApp.unitpx * 0.08} y={contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.24} h={0} item container verticalForward gap={contextApp.unitpx * 0.02}>
        <ComponentAvatar
          title={contextPlayground.informationJson.gameSelf.profileName}
          image={contextApp[contextPlayground.informationJson.gameSelf.profileImageIndex]}
        />
        <ComponentProperty
          title={contextApp.imagePngHeartBeatsWhite}
          content={contextPlayground.gameSelfProperty.hitPoint}
          color='rgb(125, 25, 25)'
          cost={contextPlayground.gameCardReadyControl && contextPlayground.gameCardReadyControlUseable ? contextPlayground.gameCardReadyControl.caculateCostHitPoint(contextPlayground.gameCardReadyControl) : undefined}
        />
        <ComponentProperty
          title={contextApp.imagePngSwapBagWhite}
          content={contextPlayground.gameSelfProperty.goldPoint}
          color='rgb(125, 125, 45)'
          cost={contextPlayground.gameCardReadyControl && contextPlayground.gameCardReadyControlUseable ? contextPlayground.gameCardReadyControl.caculateCostGoldPoint(contextPlayground.gameCardReadyControl) : undefined}
        />
        <ComponentProperty
          title={contextApp.imagePngCampfireWhite}
          content={contextPlayground.gameSelfProperty.actionPoint}
          color='rgb(45, 45, 125)'
          cost={contextPlayground.gameCardReadyControl && contextPlayground.gameCardReadyControlUseable ? contextPlayground.gameCardReadyControl.caculateCostActionPoint(contextPlayground.gameCardReadyControl) : undefined}
        />
      </layout>
    </layout>

  return Component
}

function InOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.NavigationStatus}>
      <layout x={contextApp.locationLayout.w - contextApp.unitpx * 0.08 - contextApp.unitpx * 0.24} y={contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.24} item container verticalForward gap={contextApp.unitpx * 0.02}>
        <ComponentAvatar
          title={contextPlayground.informationJson.gameOpponent.profileName}
          image={contextApp[contextPlayground.informationJson.gameOpponent.profileImageIndex]}
        />
        <ComponentProperty
          title={contextApp.imagePngHeartBeatsWhite}
          content={contextPlayground.gameOpponentProperty.hitPoint}
          color='rgb(125, 25, 25)'
        />
        <ComponentProperty
          title={contextApp.imagePngSwapBagWhite}
          content={contextPlayground.gameOpponentProperty.goldPoint}
          color='rgb(125, 125, 45)'
        />
        <ComponentProperty
          title={contextApp.imagePngCampfireWhite}
          content={contextPlayground.gameOpponentProperty.actionPoint}
          color='rgb(45, 45, 125)'
        />
      </layout>
    </layout>

  return Component
}

function App() {
  const Component =
    <>
      <InSelf />
      <InOpponent />
    </>

  return Component
}

export default App