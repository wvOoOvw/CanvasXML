import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const weaponIndex = 'Weapon0001'

function ComponentInWar(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const weapon = props.weapon
  const scale = props.scale
  const onDestory = props.onDestory

  const unitpx = contextApp.unitpx * scale

  const inWar = contextPlayground.weaponInWar.includes(weapon)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: inWar ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const point = {
    cornerLT: [{ x: 0 - unitpx * 0.64, y: 0 - unitpx * 0.24 }],
    cornerRT: [{ x: 0 + unitpx * 0.64, y: 0 - unitpx * 0.24 }],
    cornerRB: [{ x: 0 + unitpx * 0.64, y: 0 + unitpx * 0.24 }],
    cornerLB: [{ x: 0 - unitpx * 0.64, y: 0 + unitpx * 0.24 }],

    shelfLT: [{ x: 0 - unitpx * 0.72, y: 0 - unitpx * 0.48 }],
    shelfRT: [{ x: 0 + unitpx * 0.72, y: 0 - unitpx * 0.48 }],
    shelfRB: [{ x: 0 + unitpx * 0.72, y: 0 - unitpx * 0.32 }],
    shelfLB: [{ x: 0 - unitpx * 0.72, y: 0 - unitpx * 0.32 }],

    rivet: [
      { x: 0 - unitpx * 0.64 * 0.5, y: 0 - unitpx * 0.24 * 0.5 },
      { x: 0 + unitpx * 0.64 * 0.5, y: 0 - unitpx * 0.24 * 0.5 },
      { x: 0 + unitpx * 0.64 * 0.5, y: 0 + unitpx * 0.24 * 0.5 },
      { x: 0 - unitpx * 0.64 * 0.5, y: 0 + unitpx * 0.24 * 0.5 },
    ],

    plank: [
      { x: unitpx * 0.14 * (0 - 3), y: unitpx * 0.12, w: unitpx * 0.12, h: unitpx * 0.32 },
      { x: unitpx * 0.14 * (0 - 2), y: unitpx * 0.12, w: unitpx * 0.12, h: unitpx * 0.32 },
      { x: unitpx * 0.14 * (0 - 1), y: unitpx * 0.12, w: unitpx * 0.12, h: unitpx * 0.32 },
      { x: unitpx * 0.14 * (0), y: unitpx * 0.12, w: unitpx * 0.12, h: unitpx * 0.32 },
      { x: unitpx * 0.14 * (0 + 1), y: unitpx * 0.12, w: unitpx * 0.12, h: unitpx * 0.32 },
      { x: unitpx * 0.14 * (0 + 2), y: unitpx * 0.12, w: unitpx * 0.12, h: unitpx * 0.32 },
      { x: unitpx * 0.14 * (0 + 3), y: unitpx * 0.12, w: unitpx * 0.12, h: unitpx * 0.32 },
    ]
  }
  const animationCountPoint = Object.keys(point).reduce((r, i) => {
    return {
      ...r,
      [i]: Object.keys(point[i]).reduce((r, n) => {
        return {
          ...r,
          [n]: Object.keys(point[i][n]).reduce((r, v) => {
            return {
              ...r,
              [v]: ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: point[i][n][v], destination: point[i][n][v], rateTime: 12, postprocess: n => Number(n.toFixed(4)) })
            }
          }, Object())
        }
      }, Object())
    }
  }, Object())

  React.useEffect(() => {
    if (inWar === false && animationCountAppear === 0) {
      onDestory()
    }
  }, [inWar, animationCountAppear])

  const Component =
    <layout cx='50%' cy='50%' w={0} h={0} globalAlpha={animationCountAppear}>

      <path fill fillStyle='rgb(25, 25, 25)' container>
        <path moveTo>
          <path x={animationCountPoint.cornerLT[0].x.animationCount} y={animationCountPoint.cornerLT[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerRT[0].x.animationCount} y={animationCountPoint.cornerRT[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerRB[0].x.animationCount} y={animationCountPoint.cornerRB[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerLB[0].x.animationCount} y={animationCountPoint.cornerLB[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerLT[0].x.animationCount} y={animationCountPoint.cornerLT[0].y.animationCount} />
        </path>
      </path>

      <path fill fillStyle='rgb(45, 45, 45)' container>
        <path moveTo>
          <path x={animationCountPoint.cornerLT[0].x.animationCount} y={animationCountPoint.cornerLT[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerRT[0].x.animationCount} y={animationCountPoint.cornerRT[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfRB[0].x.animationCount} y={animationCountPoint.shelfRB[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfLB[0].x.animationCount} y={animationCountPoint.shelfLB[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.cornerLT[0].x.animationCount} y={animationCountPoint.cornerLT[0].y.animationCount} />
        </path>
      </path>

      <path fill fillStyle='rgb(15, 15, 15)' container>
        <path moveTo>
          <path x={animationCountPoint.shelfLT[0].x.animationCount} y={animationCountPoint.shelfLT[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfRT[0].x.animationCount} y={animationCountPoint.shelfRT[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfRB[0].x.animationCount} y={animationCountPoint.shelfRB[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfLB[0].x.animationCount} y={animationCountPoint.shelfLB[0].y.animationCount} />
        </path>
        <path lineTo>
          <path x={animationCountPoint.shelfLT[0].x.animationCount} y={animationCountPoint.shelfLT[0].y.animationCount} />
        </path>
      </path>

      {
        new Array(7).fill().map((i, index) => {
          const onPointerDown = (e) => {
            e.stopPropagation()

            Object.values(animationCountPoint.plank).forEach((i, nindex) => {
              if (nindex !== index) {
                animationCountPoint.plank[nindex].x.setAnimationCount(i => i + unitpx * 0.004 * (nindex - index))
                animationCountPoint.plank[nindex].x.setReset()
              }
            })

            animationCountPoint.plank[index].w.setAnimationCount(i => i - unitpx * 0.012)
            animationCountPoint.plank[index].h.setAnimationCount(i => i - unitpx * 0.024)
            animationCountPoint.cornerLT[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.cornerLT[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.cornerRT[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.cornerRT[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.cornerRB[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.cornerRB[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.cornerLB[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.cornerLB[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfLT[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfLT[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfRT[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfRT[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfRB[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfRB[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfLB[0].x.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)
            animationCountPoint.shelfLB[0].y.setAnimationCount(i => i + (Math.random() - 0.5) * unitpx * 0.04)

            animationCountPoint.plank[index].w.setReset()
            animationCountPoint.plank[index].h.setReset()
            animationCountPoint.cornerLT[0].x.setReset()
            animationCountPoint.cornerLT[0].y.setReset()
            animationCountPoint.cornerRT[0].x.setReset()
            animationCountPoint.cornerRT[0].y.setReset()
            animationCountPoint.cornerRB[0].x.setReset()
            animationCountPoint.cornerRB[0].y.setReset()
            animationCountPoint.cornerLB[0].x.setReset()
            animationCountPoint.cornerLB[0].y.setReset()
            animationCountPoint.shelfLT[0].x.setReset()
            animationCountPoint.shelfLT[0].y.setReset()
            animationCountPoint.shelfRT[0].x.setReset()
            animationCountPoint.shelfRT[0].y.setReset()
            animationCountPoint.shelfRB[0].x.setReset()
            animationCountPoint.shelfRB[0].y.setReset()
            animationCountPoint.shelfLB[0].x.setReset()
            animationCountPoint.shelfLB[0].y.setReset()
          }

          return <layout cx={animationCountPoint.plank[index].x.animationCount} cy={animationCountPoint.plank[index].y.animationCount} w={animationCountPoint.plank[index].w.animationCount} h={animationCountPoint.plank[index].h.animationCount}>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={animationCountPoint.plank[index].w.animationCount * 0.2} shadowBlur={unitpx * 0.02} onPointerDown={onPointerDown} />
          </layout>
        })
      }

      {
        new Array(7).fill().map((i, index) => {
          const shelfX = animationCountPoint.shelfLB[0].x.animationCount
          const shelfW = (animationCountPoint.shelfRB[0].x.animationCount - animationCountPoint.shelfLB[0].x.animationCount)
          const shelfH = (animationCountPoint.shelfRB[0].y.animationCount - animationCountPoint.shelfLB[0].y.animationCount)

          const x = shelfW * 0.1 + shelfX + shelfW * 0.8 / 6 * index
          const y = animationCountPoint.shelfLB[0].y.animationCount + shelfH / 6 * index

          return <path fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' shadowBlur={unitpx * 0.02} container>
            <path moveTo>
              <path x={x - unitpx * 0.001} y={y} />
            </path>
            <path moveTo>
              <path x={x + unitpx * 0.001} y={y} />
            </path>
            <path lineTo>
              <path x={animationCountPoint.plank[index].x.animationCount} y={animationCountPoint.plank[index].y.animationCount - animationCountPoint.plank[index].h.animationCount / 2} />
            </path>
            <path lineTo>
              <path x={x} y={y} />
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
      <layout cy={unitpx * 0.32} cx='50%' w={unitpx * 0.48} h={unitpx * 0.24} globalAlpha={animationCountAppear}>
        <rect fill fillStyle='rgb(0, 0, 0)' />
      </layout>

      <rect onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
    </>

  return Component
}

const init = (props) => {
  return {
    weaponIndex: weaponIndex,

    descriptionNo: '0001',
    descriptionImageIndex: 'imageJpgRoleA',

    ComponentInWar: ComponentInWar,
    ComponentInPick: ComponentInPick,
  }
}

export default { weaponIndex, init }