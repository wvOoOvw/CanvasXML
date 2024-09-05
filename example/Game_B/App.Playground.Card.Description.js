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

  const card = props.card

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const animationCountAppear = props.animationCountAppear

  const onPointerDown = props.onPointerDown
  const onPointerMove = props.onPointerMove
  const onPointerUp = props.onPointerUp

  const min = Math.min(w, h)

  const transform = [
    {
      translate: { x: props.translateX, y: props.translateY }
    },
    {
      rotate: { angle: props.rotateAngle }
    },
    {
      translate: { x: 0 - props.translateX, y: 0 - props.translateY }
    },
  ]

  return <>
    <layout x={x} y={y} w={w} h={h} transform={transform}>

<rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' globalAlpha={animationCountAppear * 0.8} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />

<rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
  <image cx='50%' cy='50%' src={contextApp[card.imageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountAppear * 0.8}/>
</rectradius>

<layout cx={min * 0.2} cy={min * 0.2} w={min * 0.24} h={min * 0.24}>
  <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} globalAlpha={animationCountAppear * 0.8}/>
  {
    card.modelType === 'Role' ? <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngDigitalTraceWhite} /> : null
  }
</layout>

<layout cx='50%' cy={`calc(100% - ${min * 0.2}px)`} w={w - min * 0.24} h={min * 0.2}>
  <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.032}  globalAlpha={animationCountAppear * 0.8} />
  <ReactCanvas2dExtensions.Text text={card.descriptionName} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
    {
      (line, location) => {
        return line.map(i => {
          return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} globalAlpha={animationCountAppear}/>
        })
      }
    }
  </ReactCanvas2dExtensions.Text>
</layout>

</layout>
  
    <layout x={x} y={y} w={w} h={h} transform={transform}>

    <layout cx={w + (w - min * 0.24) / 2 + min * 0.12} cy={`calc(100% - ${min * 0.2}px)`} w={w - min * 0.24} h={min * 0.2}>
            <rectradius fill fillStyle={color} radius={min * 0.032} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' globalAlpha={animationCountAppear * 0.8}/>
            <ReactCanvas2dExtensions.Text text={'ATTACT  765'} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} globalAlpha={animationCountAppear} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout cx={w + (w - min * 0.24) / 2 + min * 0.12} cy={`calc(100% - ${min * 0.5}px)`} w={w - min * 0.24} h={min * 0.2}>
            <rectradius fill fillStyle={color} radius={min * 0.032} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' globalAlpha={animationCountAppear * 0.8}/>
            <ReactCanvas2dExtensions.Text text={'ATTACT  765'} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} globalAlpha={animationCountAppear} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>

          <layout cx={w + (w - min * 0.24) / 2 + min * 0.12} cy={`calc(100% - ${min * 0.8}px)`} w={w - min * 0.24} h={min * 0.2}>
            <rectradius fill fillStyle={color} radius={min * 0.032} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' globalAlpha={animationCountAppear * 0.8}/>
            <ReactCanvas2dExtensions.Text text={'ATTACT  765'} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} globalAlpha={animationCountAppear} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>
</layout>
  </>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [card, setCard] = React.useState()

  const w = contextApp.unitpx * 0.48
  const h = contextApp.unitpx * 0.84
  const x = contextApp.locationLayout.x - w
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h

  const rotateTranslateX = contextApp.locationLayout.x
  const rotateTranslateY = contextApp.locationLayout.y + contextApp.locationLayout.h

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardDescription ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (contextPlayground.gameCardDescription) {
      setCard(contextPlayground.gameCardDescription)
    }
  }, [contextPlayground.gameCardDescription])

  if (card) {
    return <layout zIndex={contextPlayground.zIndex.CardDescription}>
      <Template
        x={x + animationCountAppear * w}
        y={y}
        w={w}
        h={h}
        animationCountAppear={animationCountAppear}
        card={card}
        translateX={rotateTranslateX}
        translateY={rotateTranslateY}
        rotateAngle={Math.PI * 0.12 * animationCountAppear}
      />
    </layout>
  }
}

export default App