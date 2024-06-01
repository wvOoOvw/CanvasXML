import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import { number, range } from './Component.Math'
import { add, center, centered } from './Component.Position'
import { drawImageClipMinCenter, drawImageClipMaxCenter } from './Component.Draw'

import background from '../static/bg.97101e.jpg'

const App = () => {
  const context = ReactAnimation.useContext()

  const { image } = ReactAnimationPlugin.useImage({ src: background, onload: ReactAnimation.shouldRender })

  const { animationCount } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: Infinity, rate: 1 / 30, play: true, reverse: true })

  context.context.save()

  context.context.globalAlpha = range(number(context.pageAnimationCount, 2), 0, 1)

  drawImageClipMaxCenter(context.context, centered(context.coordinate.getCoordinatet()), image)

  context.context.restore()
}

export default App
