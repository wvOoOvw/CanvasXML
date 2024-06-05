import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Layout from './Utils.Layout'
import Position from './Utils.Position'
import PositionBatch from './Utils.Position.Batch'
import Draw from './Utils.Draw'

import Caculate from './Utils.Caculate'

import background from '../static/bg.97101e.jpg'

function ImageDragRectRadius() {
  const context = ReactAnimation.useContext()

  const position = Position.centered({ x: context.coordinate.getCoordinate().x, y: context.coordinate.getCoordinate().y, w: context.coordinate.getCoordinate().w + 100, h: context.coordinate.getCoordinate().h + 100 })

  context.context.save()

  Draw.drawRectRadius(context.context, position, 12)
  context.context.fillStyle = 'rgba(255, 255, 255, 1)'
  context.context.fill()

  context.context.restore()
}

function TestImageDrag() {
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

  if (inDrag) ReactAnimation.component(ImageDragRectRadius)()

  Draw.drawImageClipMaxCenter(context.context, positionImage, image)
}

function TestHorizontal() {
  const context = ReactAnimation.useContext()

  const vw = Position.vw(context.coordinate.getCoordinate())

  const centeredPosition = Position.centered({ x: context.coordinate.getCoordinate().x, y: context.coordinate.getCoordinate().y, w: vw * 50, h: vw * 10 })

  const position = [
    { w: vw * 20, h: vw * 10 },
    { w: vw * 15, h: vw * 10 },
    { w: vw * 5, h: vw * 10 },
    { w: vw * 20, h: vw * 10 },
  ]

  const positionHorizontal = Layout.horizontalcenter(centeredPosition, position).result

  context.context.save()

  positionHorizontal.forEach(i => {
    Draw.drawRect(context.context, { ...i, y: centeredPosition.y })
    context.context.fillStyle = `rgba(${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, 1)`
    context.context.fill()
  })

  context.context.restore()
}

function TestVertical() {
  const context = ReactAnimation.useContext()

  const coordinate = context.coordinateFlow.getState()

  const position = { x: coordinate.x + coordinate.vw * 10, y: coordinate.x + coordinate.vh * 10, w: coordinate.vw * 80, h: coordinate.vh * 80 }

  const positions = [
    { w: coordinate.vw * 20, h: coordinate.vw * 12 },
    { w: coordinate.vw * 15, h: coordinate.vw * 14 },
    { w: coordinate.vw * 12, h: coordinate.vw * 16 },
    { w: coordinate.vw * 20, h: coordinate.vw * 18 },

    { w: coordinate.vw * 20, h: coordinate.vw * 12 },
    { w: coordinate.vw * 15, h: coordinate.vw * 14 },
    { w: coordinate.vw * 12, h: coordinate.vw * 4 },
    { w: coordinate.vw * 20, h: coordinate.vw * 18 },

    { w: coordinate.vw * 20, h: coordinate.vw * 12 },
    { w: coordinate.vw * 15, h: coordinate.vw * 14 },
    { w: coordinate.vw * 12, h: coordinate.vw * 16 },
    { w: coordinate.vw * 20, h: coordinate.vw * 12 },

    { w: coordinate.vw * 20, h: coordinate.vw * 10 },
    { w: coordinate.vw * 15, h: coordinate.vw * 4 },
  ]

  const positionHorizontal = Layout.horizontalinfinite(position, positions, Layout.horizontalcenter).result

  const positionHorizontalBox = positionHorizontal.map(i => Object({ w: PositionBatch.wmax(i), h: PositionBatch.hmax(i) }))

  Layout.verticalcenter(position, positionHorizontalBox).forEach((i, index) => positionHorizontal[index].forEach(i_ => i_.y = i.y))

  context.context.save()

  positionHorizontal.flat().forEach(i => {
    Draw.drawRect(context.context, i)
    context.context.fillStyle = `rgba(${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, 1)`
    context.context.fill()
  })

  context.context.restore()
}

function App() {
  // TestImageDrag()
  // TestHorizontal()
  TestVertical()
}

export default App
