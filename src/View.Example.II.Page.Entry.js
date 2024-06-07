import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Layout from './Utils.Layout'
import Caculate from './Utils.Caculate'
import Position from './Utils.Position'
import Draw from './Utils.Draw'

import kaltsit_e1 from '../static/kaltsit_e1.png'
import background from '../static/bg.97101e.jpg'
import setting from '../static/setting.svg'

function Buttons(props) {
  const context = ReactAnimation.useContext()



}

function App() {
  const context = ReactAnimation.useContext()

  const coordinate = context.coordinateFlow.getState()

  const { image: imageKaltsit } = ReactAnimationPlugin.useImage({ src: kaltsit_e1, onload: ReactAnimation.shouldRender })
  const { image: imageBackground } = ReactAnimationPlugin.useImage({ src: background, onload: ReactAnimation.shouldRender })
  const { image: imageSetting } = ReactAnimationPlugin.useImage({ src: setting, onload: ReactAnimation.shouldRender })

  // const { animationCount } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: Infinity, rate: 1 / 30, play: true, reverse: true })

  context.context.save()

  context.context.globalAlpha = Caculate.range(Caculate.number(context.pageAnimationCount, 2), 0, 1)

  Draw.drawImageClipMaxCenter(context.context, coordinate, imageBackground)
  // Draw.drawImageClipMinCenter(context.context, { x: coordinate.x, y: coordinate.y, w: coordinate.vw * 100, h: coordinate.vh * 100 }, imageKaltsit)

  // context.context.font = '20px Arial'
  // context.context.fillStyle = 'red'
  // Draw.drawText(context.context, Position.centered({ ...context.coordinate.getCoordinate(), w: 100, h: 20 }), 'DNE', 0)

  context.context.save()

  const layout = Layout.compose(
    {
      key: 1,
      position: coordinate,
      layout: Layout.verticalreverse,
      postprocess: (i, s) => i.x = s.x,
      positions: [
        {
          key: 2,
          position: { w: coordinate.w,h: coordinate.vh * 16 },
          layout: Layout.horizontalforward,
          postprocess: (i, s) => i.y = s.y,
          positions:
            [
              { key: 3,  position: { w: coordinate.vw * 40, h: coordinate.vh * 16 }, },
              { key: 4,  position: { w: coordinate.vw * 20, h: coordinate.vh * 16 }, },
            ]
        },
        { key: 5,  position: { w: coordinate.w, h: coordinate.vh * 32 }, },
      ]
    },
  )


  console.log(layout)

  layout.forEach(i => {
    Draw.drawRect(context.context, i)
    context.context.fillStyle = `rgba(${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, 1)`
    context.context.fill()
  })


  context.context.restore()
}

export default App
