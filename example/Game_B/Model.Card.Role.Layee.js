import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const cardIndex = 'Role.Layee'

const init = (props) => {
  return {
    cardIndex: cardIndex,

    descriptionImageIndex: 'imageJpgRoleA',
    descriptionName: '卢西亚',
    descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',

    costActionPoint: 0,
    costGoldPoint: 8,
    costHitPoint: 8,

    attributeHitPoint: 8,
    attributeAttack: 4,

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
      card.additionStatus.filter(i => i.onAttact).forEach(i => i(props.card))
    },

    onDefend: (props) => {
      card.additionStatus.filter(i => i.onDefend).forEach(i => i(props.card))
    },

    ComponentCharacter: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      const w = props.w
      const h = props.h
      const x = props.x
      const y = props.y

      const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

      const Component =
        <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card]}>
          <layout x={x} y={y} w={w} h={h} globalAlpha={animationCountAppear}>
            <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
            <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
              <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountAppear} />
            </rectradiusarc>
          </layout>
        </ReactCanvas2dExtensions.CanvasOffscreen>

      return Component
    },
  }
}

export default { cardIndex, init }