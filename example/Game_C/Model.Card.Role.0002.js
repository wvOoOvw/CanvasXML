import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const cardIndex = 'Role.0002'

const init = (props) => {
  return {
    cardIndex: cardIndex,

    descriptionNo: '0002',
    descriptionImageIndex: 'imageJpgRoleB',
    descriptionName: '尼亚',
    descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',
    descriptionSkill: [
      {
        name: '影袭',
        detail: '影子一头扎进地下，奋力向敌方冲击，对敌方目标造成攻击100%伤害。',
        wait: 0,
        priority: 0,
        imageIndex: 'imagePngRobeWhite',
      },
      {
        name: '影壳',
        detail: '使用「影袭」和「幕影盖地」攻击时，有40%基础概率附加影食，持续2回合。',
        wait: 4,
        priority: 1,
        imageIndex: 'imagePngVileFluidWhite',
      },
      {
        name: '幕影盖地',
        detail: '“啵伊”一声给自己鼓劲，攻击敌方全体2次，每次造成攻击30%伤害，影子最后再对敌方目标猛冲造成攻击60%伤害并有20%基础概率附加影缚，持续1回合。',
        wait: 6,
        priority: 2,
        imageIndex: 'imagePngSwordmanWhite',
      },
    ],

    costActionPoint: 1,
    costGoldPoint: 1,
    costHitPoint: 8,

    attributeHitPoint: 8,
    attributeAttack: 4,
    attributeSpeed: 5,

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

    caculateAttributeSpeed: (card) => {
      return card.attributeSpeed + card.additionStatus.filter(i => i.type === 'attributeSpeed').map(i => i.function(card)).reduce((a, b) => a + b, 0)
    },

    onUse: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      card.additionStatus.filter(i => i.onUse).forEach(i => i(props.card))
    },

    onBattleStart: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card
    },

    onBattleAttack: (props) => {
      const contextApp = props.contextApp
      const contextPlayground = props.contextPlayground

      const card = props.card

      card.additionStatus.filter(i => i.onAttact).forEach(i => i(props.card))
    },

    onBattleDefend: (props) => {
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
      // const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 60, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })

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
          <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.48} globalAlpha={animationCountAppear} onLocationMounted={onLocationMounted0}>
            <ReactCanvas2dExtensions.CanvasOffscreen dependence={[card, side, animationCountAppear]}>
              <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
              <rectradiusrect clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
              <rectradiusrect cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
                <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
              </rectradiusrect>
              {
                side === 0 ?
                  <layout w={contextApp.unitpx * 0.2} h={contextApp.unitpx * 0.48} x={0 - contextApp.unitpx * 0.24} item container verticalCenter gap={contextApp.unitpx * 0.02}>
                    <ComponentProperty contextApp={contextApp} title={{ image: contextApp.imagePngHeartBeatsWhite }} content={{ text: String(card.caculateAttributeHitPoint(card)) }} color={'rgb(125, 25, 25)'} />
                    <ComponentProperty contextApp={contextApp} title={{ image: contextApp.imagePngWizardStaffWhite }} content={{ text: String(card.caculateAttributeAttack(card)) }} color={'rgb(45, 45, 125)'} />
                    <ComponentProperty contextApp={contextApp} title={{ image: contextApp.imagePngSinagotWhite }} content={{ text: String(card.caculateAttributeSpeed(card)) }} color={'rgb(25, 25, 75)'} />
                  </layout>
                  : null
              }
              {
                side === 1 ?
                  <layout w={contextApp.unitpx * 0.2} h={contextApp.unitpx * 0.48} x={contextApp.unitpx * 0.32 - contextApp.unitpx * 0.24} item container verticalCenter gap={contextApp.unitpx * 0.02}>
                    <ComponentProperty contextApp={contextApp} title={{ image: contextApp.imagePngHeartBeatsWhite }} content={{ text: String(card.caculateAttributeHitPoint(card)) }} color={'rgb(125, 25, 25)'} />
                    <ComponentProperty contextApp={contextApp} title={{ image: contextApp.imagePngWizardStaffWhite }} content={{ text: String(card.caculateAttributeAttack(card)) }} color={'rgb(45, 45, 125)'} />
                    <ComponentProperty contextApp={contextApp} title={{ image: contextApp.imagePngSinagotWhite }} content={{ text: String(card.caculateAttributeSpeed(card)) }} color={'rgb(25, 25, 75)'} />
                  </layout>
                  : null
              }
            </ReactCanvas2dExtensions.CanvasOffscreen>
            <rectradiusarc radius={contextApp.unitpx * 0.024} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
          </layout>
        </>

      return Component
    },
  }
}

export default { cardIndex, init }