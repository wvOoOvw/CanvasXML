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

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = e => {
  }

  const onPointerUp = e => {
  }

  const ComponentPlank = React.useCallback((props) => {
    
  },[])

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

        <layout w={contextApp.unitpx * 0.8} h={contextApp.unitpx * 0.24} cx='50%' y={contextApp.unitpx * 0.2} container horizontalCenter gap={contextApp.unitpx * 0.04}>

          <layout w={contextApp.unitpx * 0.08} item>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text='Do' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout w={contextApp.unitpx * 0.08} item>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text='Re' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout w={contextApp.unitpx * 0.08} item>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text='Mi' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout w={contextApp.unitpx * 0.08} item>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text='Fa' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout w={contextApp.unitpx * 0.08} item>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text='So' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout w={contextApp.unitpx * 0.08} item>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text='La' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout w={contextApp.unitpx * 0.08} item>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text='Si' font={`bolder ${contextApp.unitpx * 0.036}px monospace`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='75%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(0, 0, 0)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

        </layout>

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