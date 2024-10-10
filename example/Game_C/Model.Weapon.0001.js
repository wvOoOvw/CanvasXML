import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ComponentProperty from './Model.Card.Component.Property'

const weaponIndex = 'Weapon0001'

function ComponentWeaponActive(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const weapon = props.weapon
  const weaponActive = props.weaponActive
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = e => {
  }

  const onPointerUp = e => {
  }

  const Component =
    <>
      <layout cy={contextApp.unitpx * 0.32} cx='50%' w={contextApp.unitpx * 0.48} h={contextApp.unitpx * 0.24} globalAlpha={animationCountAppear}>
        <rect fill fillStyle='rgb(0, 0, 0)' />
      </layout>

      <rect onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
    </>

  return Component
}

function ComponentWeaponPanel(props) {

}

const init = (props) => {
  return {
    weaponIndex: weaponIndex,

    descriptionNo: '0001',
    descriptionImageIndex: 'imageJpgRoleA',
    descriptionName: '钢琴 I型',
    descriptionDetail: '采集繁花的香气，凝成温柔的生命之风，治愈一名队友，为其回复桃花妖生命上限20%（24%）的生命。',
    descriptionSkill: [
      {
        name: '魔法攻击',
        detail: '以 100% 魔力对目标造成伤害。',
        wait: 0,
        priority: 0,
        imageIndex: 'imagePngRobeWhite',
      },
      {
        name: '治愈',
        detail: '以 100% 魔力恢复自身生命。',
        wait: 4,
        priority: 1,
        imageIndex: 'imagePngVileFluidWhite',
      },
      {
        name: '点燃',
        detail: '以 180% 魔力对目标造成伤害，并对目标附加状态 <每次对方攻击后造成 30% 魔力伤害，造成3次伤害后移除此效果> 。',
        wait: 6,
        priority: 2,
        imageIndex: 'imagePngSwordmanWhite',
      },
    ],

    attributeHitPoint: 8,
    attributeAttack: 4,
    attributeSpeed: 5,

    ComponentWeaponActive: ComponentWeaponActive,
    ComponentWeaponPanel: ComponentWeaponPanel,
  }
}

export default { weaponIndex, init }