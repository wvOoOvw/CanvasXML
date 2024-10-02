import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentPoster(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const poster = props.poster

  const Component =
    <>
      <rectradiusrect fill radius={contextApp.unitpx * 0.024} shadowBlur={contextApp.unitpx * 0.02} lineWidth={contextApp.unitpx * 0.0064} fillStyle='rgb(0, 0, 0)' shadowColor='rgb(255, 255, 255)' />
      <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
      <rectradiusrect clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
        <image cx='50%' cy='50%' w={`calc(100% + ${contextApp.unitpx * 0.024}px)`} h={`calc(100% + ${contextApp.unitpx * 0.024}px)`} src={poster} clipHorizontalCenter clipVerticalCenter />
      </rectradiusrect>
      <rectradiusrect cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
        <image cx='50%' cy='50%' w={`calc(100% + ${contextApp.unitpx * 0.024}px)`} h={`calc(100% + ${contextApp.unitpx * 0.024}px)`} src={poster} clipHorizontalCenter clipVerticalCenter />
      </rectradiusrect>
    </>

  return Component
}

function ComponentProperty(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const title = props.title
  const content = props.content
  const color = props.color
  const prefix = props.prefix

  const Component =
    <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.08} item>
      {
        prefix ?
          <layout x={0 - contextApp.unitpx * 0.14} w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.08}>
            <rectradiusarc cx='50%' cy='50%' fill fillStyle={color} radius={contextApp.unitpx * 0.016} />
            <rectradiusarc cx='50%' cy='50%' stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.016} lineWidth={contextApp.unitpx * 0.0072} />
            <ReactCanvas2dExtensions.Text text={prefix} font={`bolder ${contextApp.unitpx * 0.024}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>
          : null
      }

      <rectradiusarc cx='50%' cy='50%' fill fillStyle={color} radius={contextApp.unitpx * 0.016} />
      <rectradiusarc cx='50%' cy='50%' stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.016} lineWidth={contextApp.unitpx * 0.0072} />
      <rectradiusarc x={contextApp.unitpx * 0.048 + contextApp.unitpx * 0.024 * 2 - contextApp.unitpx * 0.0072} cy='50%' w={contextApp.unitpx * 0.0072} h={contextApp.unitpx * 0.064} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.0072 / 2} />

      {
        title.text ?
          <ReactCanvas2dExtensions.Text text={title.text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text x={contextApp.unitpx * 0.024} cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
              }
            }
          </ReactCanvas2dExtensions.Text>
          : null
      }
      {
        title.image ?
          <image x={contextApp.unitpx * 0.024} cy='50%' w={contextApp.unitpx * 0.048} h={contextApp.unitpx * 0.048} src={title.image} />
          : null
      }
      {
        content.text ?
          <ReactCanvas2dExtensions.Text text={content.text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text x={contextApp.unitpx * 0.24 - contextApp.unitpx * 0.024 - line[0].w} cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
              }
            }
          </ReactCanvas2dExtensions.Text>
          : null
      }
      {
        content.image ?
          <image x={contextApp.unitpx * 0.24 - contextApp.unitpx * 0.024 - contextApp.unitpx * 0.048} cy='50%' w={contextApp.unitpx * 0.048} h={contextApp.unitpx * 0.048} src={content.image} />
          : null
      }
    </layout>

  return Component
}

function ComponentDescription(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const text = props.text

  const Component =
    <ReactCanvas2dExtensions.Text text={props.text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={contextApp.unitpx * 0.48 - contextApp.unitpx * 0.04} wrap gap={contextApp.unitpx * 0.016}>
      {
        (line, location) => {
          return <layout w={contextApp.unitpx * 0.48} h={location.h + contextApp.unitpx * 0.064} item>
            <rectradiusarc fill radius={contextApp.unitpx * 0.016} fillStyle='rgb(255, 255, 255)' />
            {
              line.map(i => {
                return <text cx='50%' y={i.y + contextApp.unitpx * 0.032} w={i.w} h={i.h} fillText fillStyle='rgb(0, 0, 0)' text={i.text} font={i.font} />
              })
            }
          </layout>
        }
      }
    </ReactCanvas2dExtensions.Text>

  return Component
}

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: card === contextPlayground.gameCardDescription ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (card !== contextPlayground.gameCardDescription && animationCountAppear === 0) {
      onDestory()
    }
  }, [card, animationCountAppear])

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardDescription}>
      <rect fill fillStyle='rgb(0, 0, 0)' globalAlpha={animationCountAppear * 0.8} />
      <layout globalAlpha={animationCountAppear}>
        <ReactCanvas2dExtensions.CanvasOffscreen dependence={[card]}>
          <layout x={contextApp.locationLayout.w / 2 - contextApp.unitpx * 1.28 / 2} y={contextApp.locationLayout.h / 2 - contextApp.unitpx * 0.72 / 2} w={contextApp.unitpx * 1.28} h={contextApp.unitpx * 0.72} container horizontalForward gap={contextApp.unitpx * 0.04}>
            <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.72} item container verticalCenter gap={contextApp.unitpx * 0.02}>
              {
                card.caculateCostHitPoint(card) > 0 ? <ComponentProperty title={{ image: contextApp.imagePngHeartBeatsWhite }} content={{ text: String(card.caculateCostHitPoint(card)) }} color={'rgb(125, 25, 25)'} prefix={'代价'} /> : null
              }
              {
                card.caculateCostGoldPoint(card) > 0 ? <ComponentProperty title={{ image: contextApp.imagePngSwapBagWhite }} content={{ text: String(card.caculateCostGoldPoint(card)) }} color={'rgb(115, 115, 0)'} prefix={'代价'} /> : null
              }
              {
                card.caculateCostActionPoint(card) > 0 ? <ComponentProperty title={{ image: contextApp.imagePngCampfireWhite }} content={{ text: String(card.caculateCostActionPoint(card)) }} color={'rgb(45, 45, 125)'} prefix={'代价'} /> : null
              }
              <ComponentProperty title={{ image: contextApp.imagePngSwordmanWhite }} content={{ image: contextApp.imagePngSwordmanWhite }} color={'rgb(125, 125, 125)'} prefix={'属性'} />
              <ComponentProperty title={{ image: contextApp.imagePngHeartBeatsWhite }} content={{ text: String(card.caculateAttributeHitPoint(card)) }} color={'rgb(125, 25, 25)'} prefix={'属性'} />
              <ComponentProperty title={{ image: contextApp.imagePngWizardStaffWhite }} content={{ text: String(card.caculateAttributeAttack(card)) }} color={'rgb(45, 45, 125)'} prefix={'属性'} />
            </layout>
            <layout w={contextApp.unitpx * 0.48} h={contextApp.unitpx * 0.72} item>
              <ComponentPoster poster={contextApp[card.descriptionImageIndex]} />
            </layout>
            <layout w={contextApp.unitpx * 0.48} h={contextApp.unitpx * 0.72} item container verticalCenter gap={contextApp.unitpx * 0.04}>
              <ComponentDescription text={'** ' + card.descriptionName + ' **'} />
              <ComponentDescription text={card.descriptionDetail} />
            </layout>
          </layout>
        </ReactCanvas2dExtensions.CanvasOffscreen>
      </layout>
    </layout>

  if (animationCountAppear > 0) return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [card, setCard] = React.useState([])

  React.useEffect(() => {
    if (contextPlayground.gameCardDescription && card.includes(contextPlayground.gameCardDescription) === false) {
      setCard(i => [...i, contextPlayground.gameCardDescription])
    }
  }, [contextPlayground.gameCardDescription])

  return card.map((i) => <Card key={i.key} card={i} onDestory={() => setCard(n => n.filter(v => v !== i))} />)
}

export default App