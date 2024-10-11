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
  const onDestory = props.onDestory

  const inWar = contextPlayground.weaponInWar.includes(weapon)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: inWar ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const point = {
    cornerLT: [{ x: 0 - contextApp.unitpx * 0.64, y: 0 - contextApp.unitpx * 0.24 }],
    cornerRT: [{ x: 0 + contextApp.unitpx * 0.64, y: 0 - contextApp.unitpx * 0.24 }],
    cornerRB: [{ x: 0 + contextApp.unitpx * 0.64, y: 0 + contextApp.unitpx * 0.24 }],
    cornerLB: [{ x: 0 - contextApp.unitpx * 0.64, y: 0 + contextApp.unitpx * 0.24 }],

    shelfLT: [{ x: 0 - contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.48 }],
    shelfRT: [{ x: 0 + contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.48 }],
    shelfRB: [{ x: 0 + contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.36 }],
    shelfLB: [{ x: 0 - contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.36 }],

    rivet: [
      { x: 0 - contextApp.unitpx * 0.64 * 0.5, y: 0 - contextApp.unitpx * 0.24 * 0.5 },
      { x: 0 + contextApp.unitpx * 0.64 * 0.5, y: 0 - contextApp.unitpx * 0.24 * 0.5 },
      { x: 0 + contextApp.unitpx * 0.64 * 0.5, y: 0 + contextApp.unitpx * 0.24 * 0.5 },
      { x: 0 - contextApp.unitpx * 0.64 * 0.5, y: 0 + contextApp.unitpx * 0.24 * 0.5 },
    ],

    plank: [
      { x: contextApp.unitpx * 0.12 * (0 - 3), y: contextApp.unitpx * 0.16 },
      { x: contextApp.unitpx * 0.12 * (0 - 2), y: contextApp.unitpx * 0.16 },
      { x: contextApp.unitpx * 0.12 * (0 - 1), y: contextApp.unitpx * 0.16 },
      { x: contextApp.unitpx * 0.12 * (0), y: contextApp.unitpx * 0.16 },
      { x: contextApp.unitpx * 0.12 * (0 + 1), y: contextApp.unitpx * 0.16 },
      { x: contextApp.unitpx * 0.12 * (0 + 2), y: contextApp.unitpx * 0.16 },
      { x: contextApp.unitpx * 0.12 * (0 + 3), y: contextApp.unitpx * 0.16 },
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
              [v]: ReactExtensions.useAnimationDestination({ play: true, defaultCount: point[i][n][v], destination: point[i][n][v], rate: contextApp.unitpx * 0.01, postprocess: n => Number(n.toFixed(4)) })
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


  const ComponentRivet = React.useCallback((props) => {
    return <layout cx={props.cx} cy={props.cy} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08}>
      <arc fill fillStyle='rgb(175, 175, 175)' cx='50%' cy='50%' radius={contextApp.unitpx * 0.04} />
      <rectradiusarc cx='50%' cy='50%' h={contextApp.unitpx * 0.02} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.01} />
      <rectradiusarc cx='50%' cy='50%' w={contextApp.unitpx * 0.02} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.01} />
    </layout>
  }, [])

  const ComponentPlank = React.useCallback((props) => {
    return <layout cx={props.cx} cy={props.cy} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.24}>
      <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} onPointerDown={props.onPointerDown} />
      <ReactCanvas2dExtensions.Text text='Do' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
        {
          (line, location) => {
            return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>
  }, [])

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

      {/* <path fill fillStyle='rgb(25, 65, 65)' container>
          <path moveTo>
            <path x={`calc(100% + ${contextApp.unitpx * 0}px)`} y='0%' />
          </path>
          <path lineTo>
            <path x={`calc(100% + ${contextApp.unitpx * 0}px)`} y='100%' />
          </path>
          <path lineTo>
            <path x={`calc(100% + ${contextApp.unitpx * 0.08}px)`} y={`calc(100% - ${contextApp.unitpx * 0.08}px)`} />
          </path>
          <path lineTo>
            <path x={`calc(100% + ${contextApp.unitpx * 0.08}px)`} y={`calc(0% + ${contextApp.unitpx * 0.08}px)`} />
          </path>
          <path lineTo>
            <path x={`calc(100% + ${contextApp.unitpx * 0}px)`} y='0%' />
          </path>
        </path> */}

      {/* {
          new Array(4).fill().map((i, index) => {
            return <ComponentRivet cx={animationCountPoint.rivet[index].x.animationCount} cy={animationCountPoint.rivet[index].y.animationCount} />
          })
        } */}

      {
        new Array(7).fill().map((i, index) => {
          const onPointerDown = (e) => {
            e.stopPropagation()
            animationCountPoint.plank[index].y.setAnimationCount(i => i + contextApp.unitpx * 0.04)
          }
          return <ComponentPlank cx={animationCountPoint.plank[index].x.animationCount} cy={animationCountPoint.plank[index].y.animationCount} onPointerDown={onPointerDown} />
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
    weaponIndex: weaponIndex,

    descriptionNo: '0001',
    descriptionImageIndex: 'imageJpgRoleA',

    ComponentInWar: ComponentInWar,
    ComponentInPick: ComponentInPick,
  }
}

export default { weaponIndex, init }