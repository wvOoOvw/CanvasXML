import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Template(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const role = props.role

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const color = props.color

  const animationCountAppear = props.animationCountAppear

  const onPointerMove = props.onPointerMove
  const onPointerUp = props.onPointerUp

  const min = Math.min(w, h)

  return <layout x={x} y={y} w={w} h={h}>

    {
      role ?
        <>
          <rectradius fill fillStyle={color} radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />

          <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
            <image cx='50%' cy='50%' src={contextApp[role.imageIndex]} clipHorizontalCenter clipVerticalCenter />
          </rectradius>

          {/* <layout cx={0 - min * 0.12 - min * 0.12} cy={min * 0.2} w={min * 0.24} h={min * 0.24} globalAlpha={animationCountAppear}>
            <rectradius fill fillStyle={color} radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />
            <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngDigitalTraceWhite} />
          </layout>

          <layout cx={0 - (w - min * 0.24) / 2 - min * 0.12} cy={`calc(100% - ${min * 0.2}px)`} w={w - min * 0.24} h={min * 0.2} globalAlpha={animationCountAppear}>
            <rectradius fill fillStyle={color} radius={min * 0.032} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />
            <ReactCanvas2dExtensions.Text text={role.descriptionName} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout cx={w + (w - min * 0.24) / 2 + min * 0.12} cy={`calc(100% - ${min * 0.2}px)`} w={w - min * 0.24} h={min * 0.2} globalAlpha={animationCountAppear}>
            <rectradius fill fillStyle={color} radius={min * 0.032} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />
            <ReactCanvas2dExtensions.Text text={'ATTACT  765'} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout cx={w + (w - min * 0.24) / 2 + min * 0.12} cy={`calc(100% - ${min * 0.5}px)`} w={w - min * 0.24} h={min * 0.2} globalAlpha={animationCountAppear}>
            <rectradius fill fillStyle={color} radius={min * 0.032} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />
            <ReactCanvas2dExtensions.Text text={'ATTACT  765'} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout cx={w + (w - min * 0.24) / 2 + min * 0.12} cy={`calc(100% - ${min * 0.8}px)`} w={w - min * 0.24} h={min * 0.2} globalAlpha={animationCountAppear}>
            <rectradius fill fillStyle={color} radius={min * 0.032} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />
            <ReactCanvas2dExtensions.Text text={'ATTACT  765'} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout> */}
        </>
        : null
    }

    <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />

  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [role, setRole] = React.useState()

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  const color = 'rgb(75, 75, 75)'

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardDrag ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (contextPlayground.gameCardDrag) {
      setRole(contextPlayground.gameCardDrag)
    }
  },[contextPlayground.gameCardDrag])

  return <layout zIndex={contextPlayground.zIndex.CardDrag}>
    <Template
      x={x - w / 2}
      y={y - h / 2}
      w={w}
      h={h}
      color={color}
      role={role}
      animationCountAppear={animationCountAppear}
    />
  </layout>
}

export default App