import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const cardIndex = 'Role.Layee'

const init = (props) => {
  return {
    cardIndex: cardIndex,

    descriptionImageIndex: 'imageJpgRoleB',
    descriptionName: '卢西亚',
    descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',

    costActionPoint: 0,
    costGoldPoint: 8,
    costHitPoint: 8,

    attributeHitPoint: 8,
    attributeAttack: 4,

    attributeHitPointOrigin: 8,
    attributeAttackOrigin: 4,

    additionStatus: [],

    caculateCostActionPoint: (card) => {
      return card.costActionPoint + card.additionStatus.filter(i => i.type === 'costActionPoint').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    caculateCostGoldPoint: (card) => {
      return card.costGoldPoint + card.additionStatus.filter(i => i.type === 'costGoldPoint').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    caculateCostHitPoint: (card) => {
      return card.costHitPoint + card.additionStatus.filter(i => i.type === 'costHitPoint').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    caculateAttributeHitPoint: (card) => {
      return card.attributeHitPoint + card.additionStatus.filter(i => i.type === 'attributeHitPoint').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    caculateAttributeAttack: (card) => {
      return card.attributeAttack + card.additionStatus.filter(i => i.type === 'attributeAttack').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    onUse: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      card.additionStatus.filter(i => i.onUse).forEach(i => i(props.card))
    },

    onAttact: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      card.additionStatus.filter(i => i.onAttact).forEach(i => i(props.card))
    },

    onDefend: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      card.additionStatus.filter(i => i.onDefend).forEach(i => i(props.card))
    },

    ComponentCharacter: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card
      const side = props.side

      const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
      const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 240, postprocess: n => Number(n.toFixed(4)) % 1 })

      const onLocationMounted0 = dom => {
        if (side === 0) {
          dom.props.x = contextApp.locationLayout.w / 2 - dom.props.w / 2 - contextApp.unitpx * 0.48
          dom.props.y = contextApp.locationLayout.h / 2 - dom.props.h / 2
        }
        if (side === 1) {
          dom.props.x = contextApp.locationLayout.w / 2 - dom.props.w / 2 + contextApp.unitpx * 0.48
          dom.props.y = contextApp.locationLayout.h / 2 - dom.props.h / 2
        }

        dom.recoordinate()
      }

      const onPointerDown = e => {
        contextPlayground.setGameCardDescription(card)
      }

      const onPointerUp = e => {
        contextPlayground.setGameCardDescription(undefined)
      }

      const Component =
        <>
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[card, side, animationCountAppear, animationCountInfinity]}>
            <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.48} globalAlpha={animationCountAppear} onLocationMounted={onLocationMounted0}>
              <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
              <rectradiusrect clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
                <image cx='50%' cy='50%' w={`calc(100% + ${contextApp.unitpx * 0.04}px)`} h={`calc(100% + ${contextApp.unitpx * 0.04}px)`} src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
              <rectradiusrect cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
                <image cx='50%' cy='50%' w={`calc(100% + ${contextApp.unitpx * 0.04}px)`} h={`calc(100% + ${contextApp.unitpx * 0.04}px)`} src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
                <image cx={`calc(50% + ${animationCountInfinity * contextApp.unitpx * 0.02}px)`} cy={`calc(50% + ${animationCountInfinity * contextApp.unitpx * 0.02}px)`} w={`calc(100% + ${contextApp.unitpx * 0.04}px)`} h={`calc(100% + ${contextApp.unitpx * 0.04}px)`} src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountAppear * (1 - animationCountInfinity)} />
              </rectradiusrect>
            </layout>

            {/* <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.064} globalAlpha={animationCountAppear} onLocationMounted={onLocationMounted1}>
              <rectradiusarc clip fill radius={contextApp.unitpx * 0.064} fillStyle='rgb(125, 125, 125)'>
                <rect w={`${card.attributeHitPoint / card.attributeHitPointOrigin * 100}%`} fill fillStyle='rgb(125, 25, 25)' />
              </rectradiusarc>
              <ReactCanvas2dExtensions.Text text={String(card.attributeHitPoint)} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
                {
                  (line, location) => {
                    return <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                  }
                }
              </ReactCanvas2dExtensions.Text>
              <rectradiusarc cx='50%' cy='50%' stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.064} lineWidth={contextApp.unitpx * 0.0072} />
            </layout> */}
          </ReactCanvas2dExtensions.CanvasOffscreen>

          <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.48} onLocationMounted={onLocationMounted0}>
            <rectradiusarc radius={contextApp.unitpx * 0.024} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
          </layout>
        </>

      return Component
    },
  }
}

export default { cardIndex, init }