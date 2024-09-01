import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const role = contextPlayground.gameCardControl

  const w = contextApp.unitpx * 0.32
  const h = contextApp.unitpx * 0.48

  const color = 'rgb(75, 75, 75)'

  const [x, setX] = React.useState()
  const [y, setY] = React.useState()

  const onPointerMove = e => {
    if (contextPlayground.gameCardDrag || contextPlayground.gameCardControl) {
      setX(e.x)
      setY(e.y)
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameCardDrag()
    contextPlayground.setGameCardControl()
    setX()
    setY()
  }

  return <layout zIndex={contextPlayground.zIndex.CardControl}>
    {
      contextPlayground.gameCardControl ?
        <layout cx={x} cy={y} w={w} h={h}>
          <rectradius cx='50%' cy='50%' fill fillStyle={color} radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} shadowColor='white' />
          <rectradius cx='50%' cy='50%' w={w - contextApp.unitpx * 0.02} h={h - contextApp.unitpx * 0.02} clip radius={contextApp.unitpx * 0.02}>
            <image cx='50%' cy='50%' src={contextApp[role.imageIndex]} clipHorizontalCenter clipVerticalCenter />
          </rectradius>
          <layout cx={contextApp.unitpx * 0.06} cy={contextApp.unitpx * 0.06} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08}>
            <rectradius fill fillStyle={color} radius={contextApp.unitpx * 0.02} />
            <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngDigitalTraceWhite} />
          </layout>
          <layout cx='50%' cy={`calc(100% - ${contextApp.unitpx * 0.06}px)`} w={w - contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08}>
            <rectradius fill fillStyle={color} radius={contextApp.unitpx * 0.02} />
            <ReactCanvas2dExtensions.Text text={role.descriptionName} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return line.map(i => {
                    return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='white' text={i.text} font={i.font} />
                  })
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>
        </layout>
        : null
    }
    <layout onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
  </layout>
}

export default App