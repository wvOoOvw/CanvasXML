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

    attributeCostActionPoint: 0,
    attributeCostGoldPoint: 8,

    attributeHitPointOrigin: 8,
    attributeHitPoint: 8,
    attributeAttackOrigin: 4,
    attributeAttack: 4,

    usePostprocess: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      const w = props.w
      const h = props.h
      const x = props.x
      const y = props.y

      const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

      React.useEffect(() => {
        if (animationCountAppear === 1) {
          contextPlayground.gameCardExecuteUnit.forEach(i => {
            if (i.type === 'appear' && i.belong === card) contextPlayground.setGameCardExecuteUnit(n => n.filter(v => v !== i))
          })
        }
      }, [animationCountAppear])

      const Component =
        <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card]}>
          <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
          <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
            <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountAppear} />
          </rectradiusarc>
        </ReactCanvas2dExtensions.CanvasOffscreen>

      return { Component, property: { globalAlpha: 1 } }
    },

    onUse: (props) => {
      const card = props.card

      return [
        (props) => {
          const contextPlayground = props.contextPlayground

          return [
            { card, type: 'employee' }
          ]
        },
        (props) => {
          const contextPlayground = props.contextPlayground

          var cardBattle

          if (contextPlayground.gameSelfCardRecord.includes(card)) cardBattle = contextPlayground.gameSelfCardBattle
          if (contextPlayground.gameOpponentCardRecord.includes(card)) cardBattle = contextPlayground.gameOpponentCardBattle

          return [
            { card, type: 'appear', belong: cardBattle }
          ]
        },
        (props) => {
          const contextPlayground = props.contextPlayground

          var cardBattle

          if (contextPlayground.gameSelfCardRecord.includes(card)) cardBattle = contextPlayground.gameSelfCardBattle
          if (contextPlayground.gameOpponentCardRecord.includes(card)) cardBattle = contextPlayground.gameOpponentCardBattle

          return [
            { card, type: 'increase', attribute: 'attributeAttack', value: 2, belong: cardBattle }
          ]
        }
      ]
    },
  }
}

export default { cardIndex, init }