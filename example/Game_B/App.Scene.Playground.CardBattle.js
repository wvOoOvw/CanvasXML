import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentCardEmpty(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h]}>
      <layout x={x} y={y} w={w} h={h}>
        <rectradiusarc stroke radius={w * 0.064} strokeStyle='rgb(255, 255, 255)' lineWidth={w * 0.012} />
        <image cx='50%' cy='35%' w={w * 0.4} h={w * 0.4} src={contextApp.imagePngSwordmanWhite} />
        <ReactCanvas2dExtensions.Text text='待部署区' font={`bolder ${w * 0.12}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='60%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
        <ReactCanvas2dExtensions.Text text='战斗' font={`bolder ${w * 0.08}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='70%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return Component
}

function ComponentCardSelfContent(props){
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const card = props.card

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const Component =
    <layout x={x} y={y} w={w} h={h}>
      <card.Character />
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card]}>
        <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
        <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
          <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountAppear} />
        </rectradiusarc>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  return Component
}

function CardSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.w / 2 - w / 2 - w * 1.75
  const y = contextApp.locationLayout.h / 2 - h / 2

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card !== undefined ? <ComponentCardSelfContent x={x} y={y} w={w} h={h} card={card} /> : null
      }
      {
        card === undefined ? <ComponentCardEmpty x={x} y={y} w={w} h={h} /> : null
      }
    </layout>

  return Component
}

function CardOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameOpponentCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.w / 2 - w / 2 + w * 1.75
  const y = contextApp.locationLayout.h / 2 - h / 2

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card !== undefined ? <card.ComponentCharacter x={x} y={y} w={w} h={h} card={card} id='opponent-card-battle' /> : null
      }
      {
        card === undefined ? <ComponentCardEmpty x={x} y={y} w={w} h={h} /> : null
      }
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <CardSelf />
      <CardOpponent />
    </>

  return Component
}

export default App