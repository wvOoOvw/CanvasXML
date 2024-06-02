import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Caculate from './Utils.Caculate'
import Position from './Utils.Position'
import Draw from './Utils.Draw'

import kaltsit_e1 from '../static/kaltsit_e1.png'
import background from '../static/bg.97101e.jpg'
import setting from '../static/setting.svg'

const App = () => {
  const context = ReactAnimation.useContext()

  const { image: imageKaltsit } = ReactAnimationPlugin.useImage({ src: kaltsit_e1, onload: ReactAnimation.shouldRender })
  const { image: imageBackground } = ReactAnimationPlugin.useImage({ src: background, onload: ReactAnimation.shouldRender })
  const { image: imageSetting } = ReactAnimationPlugin.useImage({ src: setting, onload: ReactAnimation.shouldRender })

  const { animationCount } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: Infinity, rate: 1 / 30, play: true, reverse: true })

  context.context.save()

  context.context.globalAlpha = Caculate.range(Caculate.number(context.pageAnimationCount, 2), 0, 1)

  // context.context.drawImage(imageSetting, 0, 0)

  Draw.drawImageClipMinCenter(context.context, context.coordinate.getCoordinate(), imageBackground)
  // Draw.drawImageClipMinCenter(context.context, { ...context.coordinate.getCoordinate(), w: 400, h: 400 }, imageKaltsit)
  // Draw.drawImageClipMaxCenter(context.context, { ...context.coordinate.getCoordinate(), w: 600, h: 1000 }, imageKaltsit)
  // Draw.drawImageClipMaxCenter(context.context, { ...context.coordinate.getCoordinate(), w: 240, h: 120 }, imageSetting)
  // Draw.drawImageClipMinCenter(context.context, { ...context.coordinate.getCoordinate(), w: 120, h: 120 }, imageSetting)

  context.context.restore()
}

export default App
