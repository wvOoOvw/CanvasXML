import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

function ComponentInWar(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const weapon = props.weapon
  const onDestory = props.onDestory

  const inWar = contextPlayground.weaponInWar.includes(weapon)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: inWar ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const point = {
    cornerLT: { x: 0 - contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.26 },
    cornerRT: { x: 0 + contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.26 },
    cornerRB: { x: 0 + contextApp.unitpx * 0.72, y: 0 + contextApp.unitpx * 0.26 },
    cornerLB: { x: 0 - contextApp.unitpx * 0.72, y: 0 + contextApp.unitpx * 0.26 },

    shelfLT: { x: 0 - contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.54 },
    shelfRT: { x: 0 + contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.54 },
    shelfRB: { x: 0 + contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.36 },
    shelfLB: { x: 0 - contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.36 },

    plank: [
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 3), y: contextApp.unitpx * 0.14, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04, textGlobalAlpha: 0.4 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 2), y: contextApp.unitpx * 0.14, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04, textGlobalAlpha: 0.4 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 1), y: contextApp.unitpx * 0.14, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04, textGlobalAlpha: 0.4 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 * 0), y: contextApp.unitpx * 0.14, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04, textGlobalAlpha: 0.4 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 1), y: contextApp.unitpx * 0.14, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04, textGlobalAlpha: 0.4 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 2), y: contextApp.unitpx * 0.14, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04, textGlobalAlpha: 0.4 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 3), y: contextApp.unitpx * 0.14, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.04, textGlobalAlpha: 0.4 },
    ],

    wire: { shadowBlur: contextApp.unitpx * 0.02, width: contextApp.unitpx * 0.001 },

    touchRange: { corner: contextApp.unitpx * 0.04, shelf: contextApp.unitpx * 0.04, plankX: contextApp.unitpx * 0.004 },
  }

  const animationCountPoint = ReactExtensions.useAnimationDestinationRateTimeWithObject({ object: point, play: true, rateTime: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const ComponentTouch = React.useCallback((props) => {
    const animation = props.animation
    const onDestory = props.onDestory

    const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 4, postprocess: n => Number(n.toFixed(4)) })
    const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 4, postprocess: n => Number(n.toFixed(4)) })
    const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })

    React.useEffect(() => {
      if (animationCountAppear === 1) {
        contextPlayground.monsterInWar.forEach(i => {
          if (i.caculateLive() === true) {
            if (collisions(i.caculteCollision(), animation.caculteCollision())) {
              i.onHit(42)
            }
          }
        })
      }
    }, [animationCountAppear])

    React.useEffect(() => {
      if (animationCountDisappear === 1) {
        onDestory()
      }
    }, [animationCountDisappear])

    return <layout x={contextApp.locationLayout.w / 7 * animation.index} w={contextApp.locationLayout.w / 7} globalAlpha={animationCountAppear - animationCountDisappear}>
      <rect fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.04} shadowBlur={contextApp.unitpx * 0.04} />
    </layout>
  }, [])

  React.useEffect(() => {
    if (inWar === false && animationCountAppear === 0) {
      onDestory()
    }
  }, [inWar, animationCountAppear])

  const Component =
    <layout cx='50%' cy='50%' w={0} h={0} globalAlpha={animationCountAppear}>

      <path fill fillStyle='rgb(25, 25, 25)' container closePath>
        <path moveTo>
          <path x={animationCountPoint.cornerLT.x.animationCount} y={animationCountPoint.cornerLT.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerRT.x.animationCount} y={animationCountPoint.cornerRT.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerRB.x.animationCount} y={animationCountPoint.cornerRB.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerLB.x.animationCount} y={animationCountPoint.cornerLB.y.animationCount} />
        </path>
      </path>

      <path fill fillStyle='rgb(45, 45, 45)' container closePath>
        <path moveTo>
          <path x={animationCountPoint.cornerLT.x.animationCount} y={animationCountPoint.cornerLT.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerRT.x.animationCount} y={animationCountPoint.cornerRT.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfRB.x.animationCount} y={animationCountPoint.shelfRB.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfLB.x.animationCount} y={animationCountPoint.shelfLB.y.animationCount} />
        </path>
      </path>

      <path fill fillStyle='rgb(15, 15, 15)' container closePath>
        <path moveTo>
          <path x={animationCountPoint.shelfLT.x.animationCount} y={animationCountPoint.shelfLT.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfRT.x.animationCount} y={animationCountPoint.shelfRT.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfRB.x.animationCount} y={animationCountPoint.shelfRB.y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfLB.x.animationCount} y={animationCountPoint.shelfLB.y.animationCount} />
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

            contextPlayground.setAnimation(i => [...i, { key: Math.random(), ComponentAnimation: ComponentTouch, zIndex: contextPlayground.zIndex.WeaponAnimationLow, index }])

            Object.values(animationCountPoint.plank).forEach((i, nindex) => {
              if (nindex !== index) {
                animationCountPoint.plank[nindex].x.setAnimationCount(i => i + animationCountPoint.plank[nindex].w.animationCount * 0.04 * (nindex - index))
                animationCountPoint.plank[nindex].x.setReset()
              }
            })

            animationCountPoint.plank[index].w.setAnimationCount(i => i - animationCountPoint.plank[index].w.animationCount * 0.08)
            animationCountPoint.plank[index].h.setAnimationCount(i => i - animationCountPoint.plank[index].h.animationCount * 0.08)
            animationCountPoint.cornerLT.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.cornerRT.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.cornerRB.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.cornerLB.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.cornerLT.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.cornerRT.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.cornerRB.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.cornerLB.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.corner)
            animationCountPoint.shelfLT.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountPoint.shelfRT.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountPoint.shelfRB.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountPoint.shelfLB.x.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountPoint.shelfLT.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountPoint.shelfRT.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountPoint.shelfRB.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)
            animationCountPoint.shelfLB.y.setAnimationCount(i => i + (Math.random() - 0.5) * point.touchRange.shelf)

            animationCountPoint.plank[index].w.setReset()
            animationCountPoint.plank[index].h.setReset()
            animationCountPoint.cornerLT.x.setReset()
            animationCountPoint.cornerLT.y.setReset()
            animationCountPoint.cornerRT.x.setReset()
            animationCountPoint.cornerRT.y.setReset()
            animationCountPoint.cornerRB.x.setReset()
            animationCountPoint.cornerRB.y.setReset()
            animationCountPoint.cornerLB.x.setReset()
            animationCountPoint.cornerLB.y.setReset()
            animationCountPoint.shelfLT.x.setReset()
            animationCountPoint.shelfLT.y.setReset()
            animationCountPoint.shelfRT.x.setReset()
            animationCountPoint.shelfRT.y.setReset()
            animationCountPoint.shelfRB.x.setReset()
            animationCountPoint.shelfRB.y.setReset()
            animationCountPoint.shelfLB.x.setReset()
            animationCountPoint.shelfLB.y.setReset()
          }

          const cx = animationCountPoint.plank[index].x.animationCount
          const cy = animationCountPoint.plank[index].y.animationCount
          const w = animationCountPoint.plank[index].w.animationCount
          const h = animationCountPoint.plank[index].h.animationCount
          const radius = animationCountPoint.plank[index].radius.animationCount
          const shadowBlur = animationCountPoint.plank[index].shadowBlur.animationCount

          const textOffsetY = animationCountPoint.plank[index].textOffsetY.animationCount
          const textGlobalAlpha = animationCountPoint.plank[index].textGlobalAlpha.animationCount

          var text

          if (index === 0) text = 'Do'
          if (index === 1) text = 'Re'
          if (index === 2) text = 'Mi'
          if (index === 3) text = 'Fa'
          if (index === 4) text = 'So'
          if (index === 5) text = 'La'
          if (index === 6) text = 'Si'

          return <layout cx={cx} cy={cy} w={w} h={h}>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={radius} shadowBlur={shadowBlur} onPointerDown={onPointerDown} />
            <ReactCanvas2dExtensions.Text text={text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy={textOffsetY} w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>
        })
      }

      {
        new Array(7).fill().map((i, index) => {
          const rate = index / 6

          const shelfW = (animationCountPoint.shelfRB.x.animationCount - animationCountPoint.shelfLB.x.animationCount)
          const shelfH = (animationCountPoint.shelfRB.y.animationCount - animationCountPoint.shelfLB.y.animationCount)

          const x = animationCountPoint.shelfLB.x.animationCount + shelfW * 0.1 + shelfW * 0.8 * rate
          const y = animationCountPoint.shelfLB.y.animationCount + shelfH * rate

          return <path fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' shadowBlur={animationCountPoint.wire.width.shadowBlur} container closePath>
            <path moveTo>
              <path x={x - animationCountPoint.wire.width.animationCount} y={y} />
            </path>
            <path lineTo>
              <path x={x + animationCountPoint.wire.width.animationCount} y={y} />
            </path>
            <path lineTo>
              <path x={animationCountPoint.plank[index].x.animationCount} y={animationCountPoint.plank[index].y.animationCount - animationCountPoint.plank[index].h.animationCount / 2} />
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