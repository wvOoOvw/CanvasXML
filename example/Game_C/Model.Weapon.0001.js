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

  const fixed = {
    rivet: [
      { x: {
        count: 25,
        postprocess: n => `${n}`
      }, y: '25%' },
      { x: `75%`, y: '25%' },
      { x: `75%`, y: '75%' },
      { x: `25%`, y: '75%' },
    ],
    corner: [
      { x: `0%`, y: '0%' },
      { x: `100%`, y: '0%' },
      { x: `100%`, y: '100%' },
      { x: `0%`, y: '100%' },
    ],
    plank: [
      { x: `calc(50% + ${contextApp.unitpx * 0.12 * (0 - 3)}px)`, y: `calc(100% - ${contextApp.unitpx * 0.12}px)` },
      { x: `calc(50% + ${contextApp.unitpx * 0.12 * (0 - 2)}px)`, y: `calc(100% - ${contextApp.unitpx * 0.12}px)` },
      { x: `calc(50% + ${contextApp.unitpx * 0.12 * (0 - 1)}px)`, y: `calc(100% - ${contextApp.unitpx * 0.12}px)` },
      { x: `calc(50% + ${contextApp.unitpx * 0.12 * (0)}px)`, y: `calc(100% - ${contextApp.unitpx * 0.12}px)` },
      { x: `calc(50% + ${contextApp.unitpx * 0.12 * (0 + 1)}px)`, y: `calc(100% - ${contextApp.unitpx * 0.12}px)` },
      { x: `calc(50% + ${contextApp.unitpx * 0.12 * (0 + 2)}px)`, y: `calc(100% - ${contextApp.unitpx * 0.12}px)` },
      { x: `calc(50% + ${contextApp.unitpx * 0.12 * (0 + 3)}px)`, y: `calc(100% - ${contextApp.unitpx * 0.12}px)` },
    ]
  }

  const animationCountFixed = Object.keys(fixed).reduce((a, b) => {
      return {
        ...a,
        [b]: Object.keys(fixed[b]).reduce((c, d) => {
          return {
            ...c,
            [d]: ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
          }
        }, {})
      }
  }, Object())

  // const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: inWar ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = e => {
  }

  const onPointerUp = e => {
  }

  React.useEffect(() => {
    if (inWar === false && animationCountAppear === 0) {
      onDestory()
    }
  }, [inWar, animationCountAppear])


  const ComponentRivet = React.useCallback((props) => {
    return <layout cx={props.cx} cy={props.cy} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08}>
      <arc fill fillStyle='rgb(175, 175, 175)' cx='50%' cy='50%' radius={contextApp.unitpx * 0.04}/>
      <rectradiusarc cx='50%' cy='50%' h={contextApp.unitpx * 0.02} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.01} />
      <rectradiusarc cx='50%' cy='50%' w={contextApp.unitpx * 0.02} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.01} />
    </layout>
  },[])

  const ComponentPlank = React.useCallback((props) => {
    return <layout cx={props.cx} cy={props.cy} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.24}>
      <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
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
    <>
      <layout cx='50%' cy='50%' w={contextApp.unitpx * 1.2} h={contextApp.unitpx * 0.42} globalAlpha={animationCountAppear}>
        <rect fill fillStyle='rgb(75, 75, 75)' />

        <path fill fillStyle='rgb(25, 65, 65)' container>
          <path moveTo>
            <path x={`calc(0% + ${contextApp.unitpx * 0}px)`} y='0%' />
          </path>
          <path lineTo>
            <path x={`calc(0% + ${contextApp.unitpx * 0}px)`} y='100%' />
          </path>
          <path lineTo>
            <path x={`calc(0% - ${contextApp.unitpx * 0.08}px)`} y={`calc(100% - ${contextApp.unitpx * 0.08}px)`} />
          </path>
          <path lineTo>
            <path x={`calc(0% - ${contextApp.unitpx * 0.08}px)`} y={`calc(0% + ${contextApp.unitpx * 0.08}px)`} />
          </path>
          <path lineTo>
            <path x={`calc(0% + ${contextApp.unitpx * 0}px)`} y='0%' />
          </path>
        </path>

        <path fill fillStyle='rgb(25, 65, 65)' container>
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
        </path>

        {
          new Array(4).fill().map((i,index) => {
            return <ComponentRivet cx={fixed.rivet[index].x} cy={fixed.rivet[index].y}/>
          })
        }

        {
          new Array(7).fill().map((i,index) => {
            return <ComponentPlank cx={fixed.plank[index].x} cy={fixed.plank[index].y}/>
          })
        }

      </layout>

      <rect onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
    </>

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