import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentInWarAction001(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const animation = props.animation
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 4, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const Component =
    <layout w={contextApp.unitpx * 0.16} h={contextApp.unitpx * 0.16} globalAlpha={animationCountAppear - animationCountDisappear}>
      <ReactCanvas2dExtensions.Text text={'-' + String(animation.point)} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  return Component
}

function ComponentInWar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const monster = props.monster
  const onDestory = props.onDestory

  const collisionsDom = React.useRef()

  const [inWar, setInWar] = React.useState(true)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: inWar !== true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAction } = ReactExtensions.useAnimationDestination({ play: attributeHitPoint > 0, defaultCount: 0, destination: Infinity, rate: 1 / 60, postprocess: n => Number(n.toFixed(4)) })

  const location = 
    {
      container: { y: 0 - contextApp.locationLayout.h / 2 + contextApp.unitpx * 0.32 },

      body: [

      ],

        foot: [
          [
            {}
          ]
        ],

        property: {

        },
    
        change: { corner: contextApp.unitpx * 0.04, shelf: contextApp.unitpx * 0.04 }
    }

  const animationCountLocation = ReactExtensions.useAnimationDestinationRateTimeWithObject({ object: location, play: true, rateTime: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const [attributeHitPoint, setAttributeHitPoint] = React.useState(100)

  const [action, setAction] = React.useState([])

  const { animationCount: animationCountAttributeHitPoint } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: attributeHitPoint, destination: attributeHitPoint, rateTime: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const actions = [
    {
      name: '亡灵蜘蛛',
      random: 1,
      run: () => {

      },
    }
  ]

  React.useEffect(() => {
    if (animationCountAction > 0 && animationCountAction % 1 === 0) {
      const random = Math.random()


    }
  }, [animationCountAction])

  React.useEffect(() => {
    if (attributeHitPoint < 0) {
      setInWar(false)
    }
  }, [attributeHitPoint])

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const Component =
    <layout y={0 - contextApp.locationLayout.h / 2 + contextApp.unitpx * 0.32} globalAlpha={animationCountAppear - animationCountDisappear}>
      <rect onLocationMounted={dom => collisionsDom.current = dom} />
      <image src={contextApp.imagePngかに} />
      {/* <rectradiusarc fill y={hitPointY} w={hitPointW} h={hitPointH} radius={hitPointRadius} fillStyle='rgb(125, 125, 125)' /> */}
      {/* <rectradiusarc fill y={hitPointY} w={hitPointW * animationCountAttributeHitPoint / attributeHitPoint} h={hitPointH} radius={hitPointRadius} fillStyle='rgb(125, 25, 25)' /> */}
      {/* {
        animationHitPoint.map(i => <ComponentInWarAction001 key={i.key} action={i} onDestory={() => setAnimationHitPoint(i => i.filter(j => j.key !== i.key))} />)
      } */}
    </layout>

  return Component
}

const init = (props) => {
  return {
    ComponentInWar: ComponentInWar,
  }
}

export default { monsterIndex: 'Monster0001', init }