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
    attributeHitPoint: 0,
    attributeAttackOrigin: 4,
    attributeAttack: 0,

    usePostprocess: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      const w = props.w
      const h = props.h
      const x = props.x
      const y = props.y

      const [animationCountAppearPlay, setAnimationCountAppearPlay] = React.useState(false)
      const [animationCountPropertyPlay, setAnimationCountPropertyPlay] = React.useState(false)

      const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: animationCountAppearPlay, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
      const { animationCount: animationCountProperty } = ReactExtensions.useAnimationDestination({ play: animationCountPropertyPlay, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

      React.useEffect(() => {
        if (contextPlayground.gameCardExecuteUnit.some(i => i.type === 'appear' && i.belong === card) && animationCountAppearPlay === false) setAnimationCountAppearPlay(true)
        if (contextPlayground.gameCardExecuteUnit.some(i => i.type === 'property-init' && i.belong === card) && animationCountPropertyPlay === false) setAnimationCountPropertyPlay(true)
      },[contextPlayground.gameCardExecuteUnit])

      React.useEffect(() => {
        if (animationCountAppear === 1) contextPlayground.setGameCardExecuteUnit(i => i.filter(n => n.type !== 'appear' || n.belong !== card))
      }, [animationCountAppear])

      React.useEffect(() => {
        if (animationCountProperty === 1) contextPlayground.setGameCardExecuteUnit(i => i.filter(n => n.type !== 'property-init' || n.belong !== card))
      }, [animationCountProperty])

      React.useEffect(() => {
        card.attributeHitPoint = card.attributeHitPointOrigin * animationCountProperty
        card.attributeAttack = card.attributeAttackOrigin * animationCountProperty
      }, [animationCountProperty])

      const Component =
        <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card]}>
          <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
          <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
            <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountAppear} />
          </rectradiusarc>
        </ReactCanvas2dExtensions.CanvasOffscreen>

      return { Component, property: { globalAlpha: animationCountAppear } }
    },

    onUse: (props) => {
      const card = props.card

      const findCardBattle = (props) => {
        const contextPlayground = props.contextPlayground

        var cardBattle

        if (contextPlayground.gameSelfCardRecord.includes(card)) cardBattle = contextPlayground.gameSelfCardBattle
        if (contextPlayground.gameOpponentCardRecord.includes(card)) cardBattle = contextPlayground.gameOpponentCardBattle

        return cardBattle
      }

      return [
        (props) => {
          const contextPlayground = props.contextPlayground

          return [
            { card, type: 'employee' }
          ]
        },
        (props) => {
          const contextPlayground = props.contextPlayground

          const cardBattle = findCardBattle(props)

          return [
            { card, type: 'appear', belong: cardBattle }
          ]
        },
        (props) => {
          const contextPlayground = props.contextPlayground

          const cardBattle = findCardBattle(props)

          return [
            { card, type: 'change-hit-point', value: 0 - card.attributeHitPointOrigin },
            { card, type: 'property-init', belong: cardBattle},
          ]
        },
        (props) => {
          const contextPlayground = props.contextPlayground

          const cardBattle = findCardBattle(props)

          return [
            { card, type: 'increase', attribute: 'attributeAttack', value: 2, belong: cardBattle }
          ]
        }
      ]
    },
  }
}

export default { cardIndex, init }