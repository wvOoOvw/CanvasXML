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

    attributeHitPointMax: 8,
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

    caculateAttributeHitPointMax: (card) => {
      return card.attributeHitPointMax + card.additionStatus.filter(i => i.type === 'attributeHitPointMax').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    caculateAttributeHitPoint: (card) => {
      return card.attributeHitPoint + card.additionStatus.filter(i => i.type === 'attributeHitPoint').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    caculateAttributeAttack: (card) => {
      return card.attributeAttack + card.additionStatus.filter(i => i.type === 'attributeAttack').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    ComponentCharacter: () => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      const id = props.id

      const w = props.w
      const h = props.h
      const x = props.x
      const y = props.y

      const [animationCountAppearPlay, setAnimationCountAppearPlay] = React.useState(false)

      const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: animationCountAppearPlay, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

      React.useEffect(() => {
        if (contextPlayground.gameCardExecute[0] && contextPlayground.gameCardExecute[0].type === 'appear' && contextPlayground.gameCardExecute[0].card === card) {
          setAnimationCountAppearPlay(true)
        }
      }, [contextPlayground.gameCardExecute])

      React.useEffect(() => {
        if (animationCountAppear === 1) {
          if (contextPlayground.gameCardExecute[0] && contextPlayground.gameCardExecute[0].type === 'appear' && contextPlayground.gameCardExecute[0].card === card) {
            contextPlayground.setGameCardExecute(i => i.filter((i, index) => index !== 0))
          }
        }
      }, [animationCountAppear])

      const Component =
        <layout x={x} y={y} w={w} h={h} id={id}>
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, property.globalAlpha, card.attributeHitPointOrigin, animationCountAttributeHitPoint]}>
            <layout y={h + w * 0.12} h={w * 0.12} globalAlpha={property.globalAlpha}>
              <rectradiusarc fill radius={w * 0.024} fillStyle='rgb(125, 125, 125)' />
              <rectradiusarc w={`${animationCountAttributeHitPoint / card.attributeHitPointOrigin * 100}%`} fill radius={w * 0.024} fillStyle='rgb(125, 15, 25)' />
              <rectradiusarc stroke radius={w * 0.024} strokeStyle='rgb(255, 255, 255)' />
            </layout>
          </ReactCanvas2dExtensions.CanvasOffscreen>
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card]}>
            <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
            <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
              <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountAppear} />
            </rectradiusarc>
          </ReactCanvas2dExtensions.CanvasOffscreen>
        </layout>

      return Component
    },

    onUse: (props) => {
      const card = props.card
      const from = props.from

      return [
        { card, from, type: 'cost' },
        { card, from, type: 'employee' },
        { card, from, type: 'appear' },
      ]
    },
  }
}

export default { cardIndex, init }