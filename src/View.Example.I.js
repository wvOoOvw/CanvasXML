import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Position from './Utils.Position'
import Draw from './Utils.Draw'

import background from '../static/bg.97101e.jpg'

const RectRadius = () => {
  const context = ReactAnimation.useContext()

  const position = Position.centered({ x: context.coordinate.getCoordinate().x, y: context.coordinate.getCoordinate().y, w: context.coordinate.getCoordinate().w + 100, h: context.coordinate.getCoordinate().h + 100 })

  context.context.save()

  Draw.drawRectRadius(context.context, position, 12)
  context.context.fillStyle = 'rgba(255, 255, 255, 1)'
  context.context.fill()

  context.context.restore()
}

const App = () => {
  const context = ReactAnimation.useContext()

  const { animationCount } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: 1, rate: 1 / 60, play: true, reverse: true })

  const [positionOrigin, setPositionOrigin] = ReactAnimation.useState({ x: context.coordinate.getCoordinate().x, y: context.coordinate.getCoordinate().y + 200, w: 600, h: 900 })
  const [positionDrag, setPositionDrag] = ReactAnimation.useState({ x: 0, y: 0 })
  const [positionAnimation, setPositionAnimation] = ReactAnimation.useState({ x: 0, y: 0 })
  const [positionImage, setPositionImage] = ReactAnimation.useState(Position.add([Position.centered(positionOrigin), positionDrag, positionAnimation]))
  const [inDrag, setInDrag] = ReactAnimation.useState(false)

  const { image } = ReactAnimationPlugin.useImage({ src: background, onload: ReactAnimation.shouldRender })

  const onChange = (params) => {
    if (params.status === 'afterStart') setInDrag(true)
    if (params.status === 'afterEnd') setInDrag(false)
    if (params.status === 'afterMove') positionDrag.x = positionDrag.x + params.changedX * context.dpr
    if (params.status === 'afterMove') positionDrag.y = positionDrag.y + params.changedY * context.dpr
    setPositionDrag(positionDrag)
  }

  ReactAnimation.useEffectImmediate(() => setPositionAnimation(Object.assign(positionAnimation, { x: animationCount * 200 - 100 })), [animationCount])
  ReactAnimation.useEffectImmediate(() => setPositionImage(Object.assign(positionImage, Position.add([Position.centered(positionOrigin), positionDrag, positionAnimation]))), [positionDrag.x, positionDrag.y, positionAnimation.x, positionAnimation.y])

  ReactAnimationPlugin.useDragControlMouse({ onChange: ReactAnimation.useCallback(onChange, []), enable: true, useEventListener: context.useEventListener, mousedownOption: ReactAnimation.useMemo(() => Object({ position: positionImage }), []) })

  context.coordinate.useCoordinate(Position.coordinate(positionImage))

  if (inDrag) ReactAnimation.component(RectRadius)()

  Draw.drawImageClipMaxCenter(context.context, positionImage, image)
}

export default App
