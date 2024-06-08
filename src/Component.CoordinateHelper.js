import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Position from './Utils.Position'
import Draw from './Utils.Draw'

const Rect = (props) => {
  const context = ReactAnimation.useContext()

  context.context.save()

  Draw.drawRect(context.context, props.position)

  context.context.globalAlpha = props.globalAlpha
  context.context.fillStyle = props.color
  context.context.fill()

  context.context.restore()
}

const App = (props) => {
  const context = ReactAnimation.useContext()

  context.context.save()

  new Array(Math.ceil(Position.vmax(props.position) * 100 / props.gap / 2)).fill().forEach((i, index) => {
    if (index === 0) {
      ReactAnimation.component(Rect)({ position: { x: props.position.x, y: props.position.cy, w: Position.vmax(props.position) * 100, h: Position.vmax(props.position) * 0.1 }, globalAlpha: 0.5, color: props.color })
      ReactAnimation.component(Rect)({ position: { x: props.position.cx, y: props.position.y, w: Position.vmax(props.position) * 0.1, h: Position.vmax(props.position) * 100 }, globalAlpha: 0.5, color: props.color })
    }

    if (index !== 0) {
      ReactAnimation.component(Rect)({ position: { x: props.position.x, y: props.position.cy + props.gap * index, w: Position.vmax(props.position) * 100, h: Position.vmax(props.position) * 0.1 }, globalAlpha: 0.25, color: props.color })
      ReactAnimation.component(Rect)({ position: { x: props.position.x, y: props.position.cy - props.gap * index, w: Position.vmax(props.position) * 100, h: Position.vmax(props.position) * 0.1 }, globalAlpha: 0.25, color: props.color })
      ReactAnimation.component(Rect)({ position: { x: props.position.cx + props.gap * index, y: props.position.y, w: Position.vmax(props.position) * 0.1, h: Position.vmax(props.position) * 100 }, globalAlpha: 0.25, color: props.color })
      ReactAnimation.component(Rect)({ position: { x: props.position.cx - props.gap * index, y: props.position.y, w: Position.vmax(props.position) * 0.1, h: Position.vmax(props.position) * 100 }, globalAlpha: 0.25, color: props.color })
    }
  })

  context.context.restore()
}

export default App