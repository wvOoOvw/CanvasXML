import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import { collisions } from './utils'

function ComponentInWarTouchEffect(props) {
  const animation = props.animation
  const onDestory = props.onDestory

  const location = {
    container: {
      x: contextApp.locationLayout.w / 7 * animation.index,
      y: 0,
      w: contextApp.locationLayout.w / 7,
      h: contextApp.locationLayout.h
    }
  }

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 4, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountAppear === 1) {
      contextPlayground.monsterInWar.forEach(i => {
          if (i.caculateLive() === true && collisions(i.caculteCollision(), { shape: 'rect', x, y, w, h })) {
            i.onHit(42)
          }
      })
    }
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  return <layout x={location.container.x} y={location.container.y} w={location.container.w} h={location.container.h} globalAlpha={animationCountAppear - animationCountDisappear}>
    <rect fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.04} shadowBlur={contextApp.unitpx * 0.04} />
  </layout>
}

function ComponentInWar(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const weapon = props.weapon
  const onDestory = props.onDestory

  const inWar = contextPlayground.weaponInWar.includes(weapon)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: inWar ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const location = {
    container: { cx: contextApp.locationLayout.w / 2, cy: contextApp.locationLayout.h - contextApp.unitpx * 0.32 },

    cornerLT: { cx: 0 - contextApp.unitpx * 0.72, cy: 0 - contextApp.unitpx * 0.24 },
    cornerRT: { cx: 0 + contextApp.unitpx * 0.72, cy: 0 - contextApp.unitpx * 0.24 },
    cornerRB: { cx: 0 + contextApp.unitpx * 0.72, cy: 0 + contextApp.unitpx * 0.24 },
    cornerLB: { cx: 0 - contextApp.unitpx * 0.72, cy: 0 + contextApp.unitpx * 0.24 },

    shelfLT: { cx: 0 - contextApp.unitpx * 0.84, cy: 0 - contextApp.unitpx * 0.5 },
    shelfRT: { cx: 0 + contextApp.unitpx * 0.84, cy: 0 - contextApp.unitpx * 0.5 },
    shelfRB: { cx: 0 + contextApp.unitpx * 0.84, cy: 0 - contextApp.unitpx * 0.32 },
    shelfLB: { cx: 0 - contextApp.unitpx * 0.84, cy: 0 - contextApp.unitpx * 0.32 },

    plank: [
      { cx: contextApp.unitpx * 0.14 * 1.2 * (0 - 3), cy: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04 },
      { cx: contextApp.unitpx * 0.14 * 1.2 * (0 - 2), cy: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04 },
      { cx: contextApp.unitpx * 0.14 * 1.2 * (0 - 1), cy: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04 },
      { cx: contextApp.unitpx * 0.14 * 1.2 * (0 * 0), cy: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04 },
      { cx: contextApp.unitpx * 0.14 * 1.2 * (0 + 1), cy: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04 },
      { cx: contextApp.unitpx * 0.14 * 1.2 * (0 + 2), cy: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04 },
      { cx: contextApp.unitpx * 0.14 * 1.2 * (0 + 3), cy: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04 },
    ],

    wire: { shadowBlur: contextApp.unitpx * 0.02, width: contextApp.unitpx * 0.001 },

    touchRange: { corner: contextApp.unitpx * 0.04, shelf: contextApp.unitpx * 0.04, plankX: contextApp.unitpx * 0.004 },
  }

  const animationCountLocation = ReactExtensions.useAnimationDestinationRateTimeWithObject({ object: location, play: true, rateTime: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (inWar === false && animationCountAppear === 0) {
      onDestory()
    }
  }, [inWar, animationCountAppear])

  Object.assign(
    weapon,
    {
      caculateInWar: () => {
        return inWar
      },
      caculteCollision: () => {
        // return { shape: 'rect', x: location.container.x, y: location.container.y, w: location.container.w, h: location.container.h }
      },
    }
  )

  const Component =
    <layout cx={location.container.cx} cy={location.container.cy} globalAlpha={animationCountAppear}>

      <path fill fillStyle='rgb(25, 25, 25)' container closePath>
        <path moveTo>
          <path x={animationCountLocation.cornerLT.cx.animationCount} y={animationCountLocation.cornerLT.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerRT.cx.animationCount} y={animationCountLocation.cornerRT.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerRB.cx.animationCount} y={animationCountLocation.cornerRB.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerLB.cx.animationCount} y={animationCountLocation.cornerLB.cy.animationCount} />
        </path>
      </path>

      <path fill fillStyle='rgb(45, 45, 45)' container closePath>
        <path moveTo>
          <path x={animationCountLocation.cornerLT.cx.animationCount} y={animationCountLocation.cornerLT.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerRT.cx.animationCount} y={animationCountLocation.cornerRT.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfRB.cx.animationCount} y={animationCountLocation.shelfRB.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfLB.cx.animationCount} y={animationCountLocation.shelfLB.cy.animationCount} />
        </path>
      </path>

      <path fill fillStyle='rgb(15, 15, 15)' container closePath>
        <path moveTo>
          <path x={animationCountLocation.shelfLT.cx.animationCount} y={animationCountLocation.shelfLT.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfRT.cx.animationCount} y={animationCountLocation.shelfRT.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfRB.cx.animationCount} y={animationCountLocation.shelfRB.cy.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfLB.cx.animationCount} y={animationCountLocation.shelfLB.cy.animationCount} />
        </path>
      </path>

      {
        new Array(7).fill().map((i, index) => {
          const onPointerDown = (e) => {
            e.stopPropagation()

            if (index === 0) new Audio(contextApp.audioM4aPianoC1.src).play()
            if (index === 1) new Audio(contextApp.audioM4aPianoC2.src).play()
            if (index === 2) new Audio(contextApp.audioM4aPianoC3.src).play()
            if (index === 3) new Audio(contextApp.audioM4aPianoC4.src).play()
            if (index === 4) new Audio(contextApp.audioM4aPianoC5.src).play()
            if (index === 5) new Audio(contextApp.audioM4aPianoC6.src).play()
            if (index === 6) new Audio(contextApp.audioM4aPianoC7.src).play()

            contextPlayground.setAnimation(i => [...i, { key: Math.random(), ComponentAnimation: ComponentInWarTouchEffect, zIndex: contextPlayground.zIndex.WeaponAnimationLow, index }])

            Object.values(animationCountLocation.plank).forEach((i, nindex) => {
              if (nindex !== index) {
                animationCountLocation.plank[nindex].cx.setAnimationCount(i => i + animationCountLocation.plank[nindex].w.animationCount * 0.04 * (nindex - index))
                animationCountLocation.plank[nindex].cx.setReset()
              }
            })

            animationCountLocation.plank[index].w.setAnimationCount(i => i - animationCountLocation.plank[index].w.animationCount * 0.08)
            animationCountLocation.plank[index].h.setAnimationCount(i => i - animationCountLocation.plank[index].h.animationCount * 0.08)

            animationCountLocation.cornerLT.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountLocation.cornerRT.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountLocation.cornerRB.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountLocation.cornerLB.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountLocation.cornerLT.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountLocation.cornerRT.cy.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountLocation.cornerRB.cy.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountLocation.cornerLB.cy.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)

            animationCountLocation.shelfLT.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountLocation.shelfRT.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountLocation.shelfRB.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountLocation.shelfLB.cx.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountLocation.shelfLT.cy.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountLocation.shelfRT.cy.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountLocation.shelfRB.cy.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountLocation.shelfLB.cy.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)

            animationCountLocation.plank[index].w.setReset()
            animationCountLocation.plank[index].h.setReset()

            animationCountLocation.cornerLT.cx.setReset()
            animationCountLocation.cornerLT.cy.setReset()
            animationCountLocation.cornerRT.cx.setReset()
            animationCountLocation.cornerRT.cy.setReset()
            animationCountLocation.cornerRB.cx.setReset()
            animationCountLocation.cornerRB.cy.setReset()
            animationCountLocation.cornerLB.cx.setReset()
            animationCountLocation.cornerLB.cy.setReset()

            animationCountLocation.shelfLT.cx.setReset()
            animationCountLocation.shelfLT.cy.setReset()
            animationCountLocation.shelfRT.cx.setReset()
            animationCountLocation.shelfRT.cy.setReset()
            animationCountLocation.shelfRB.cx.setReset()
            animationCountLocation.shelfRB.cy.setReset()
            animationCountLocation.shelfLB.cx.setReset()
            animationCountLocation.shelfLB.cy.setReset()
          }

          var text

          if (index === 0) text = 'Do'
          if (index === 1) text = 'Re'
          if (index === 2) text = 'Mi'
          if (index === 3) text = 'Fa'
          if (index === 4) text = 'So'
          if (index === 5) text = 'La'
          if (index === 6) text = 'Si'

          return <layout cx={animationCountLocation.plank[index].cx.animationCount} cy={animationCountLocation.plank[index].cy.animationCount} w={animationCountLocation.plank[index].w.animationCount} h={animationCountLocation.plank[index].h.animationCount}>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={animationCountLocation.plank[index].radius.animationCount} shadowBlur={animationCountLocation.plank[index].shadowBlur.animationCount} onPointerDown={onPointerDown} />
            <ReactCanvas2dExtensions.Text text={text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy={animationCountLocation.plank[index].textOffsetY.animationCount} w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>
        })
      }

      {
        new Array(7).fill().map((i, index) => {
          const rate = index / 6

          const shelfW = (animationCountLocation.shelfRB.x.animationCount - animationCountLocation.shelfLB.x.animationCount)
          const shelfH = (animationCountLocation.shelfRB.cy.animationCount - animationCountLocation.shelfLB.cy.animationCount)

          const x = animationCountLocation.shelfLB.cx.animationCount + shelfW * 0.1 + shelfW * 0.8 * rate
          const y = animationCountLocation.shelfLB.cy.animationCount + shelfH * rate

          return <path fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' shadowBlur={animationCountLocation.wire.width.shadowBlur} container closePath>
            <path moveTo>
              <path x={x - animationCountLocation.wire.width.animationCount} y={y} />
            </path>
            <path lineTo>
              <path x={x + animationCountLocation.wire.width.animationCount} y={y} />
            </path>
            <path lineTo>
              <path x={animationCountLocation.plank[index].x.animationCount} y={animationCountLocation.plank[index].y.animationCount - animationCountLocation.plank[index].h.animationCount / 2} />
            </path>
          </path>
        })
      }

    </layout>

  return Component
}

function ComponentInPick(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const weapon = props.weapon
  const use = props.use

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

const init = (props) => {
  return {
    ComponentInWar: ComponentInWar,
    ComponentInPick: ComponentInPick,
  }
}

export default { weaponIndex: 'Weapon0001', init }