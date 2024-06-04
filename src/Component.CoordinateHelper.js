import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Position from './Utils.Position'
import Draw from './Utils.Draw'

const Rect = (props) => {
  const context = ReactAnimation.useContext()

  context.context.save()

  Draw.drawRect(context.context, props.position)

  context.context.globalAlpha = props.globalAlpha
  context.context.fillStyle = 'rgba(255, 255, 255, 1)'
  context.context.fill()

  context.context.restore()
}

const App = (props) => {
  const context = ReactAnimation.useContext()

  context.context.save()

  new Array(Math.floor(Position.vmax(props.position) * 100 / props.gap)).fill().forEach((i, index) => {
    if (index === 0) {
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y, w: Position.vmax(props.position) * 100, h: Position.vmax(props.position) * 0.1 }), globalAlpha: 0.5 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y, w: Position.vmax(props.position) * 0.1, h: Position.vmax(props.position) * 100 }), globalAlpha: 0.5 })
    }

    if (index !== 0) {
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y + props.gap * index, w: Position.vmax(props.position) * 100, h: Position.vmax(props.position) * 0.1 }), globalAlpha: 0.25 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y - props.gap * index, w: Position.vmax(props.position) * 100, h: Position.vmax(props.position) * 0.1 }), globalAlpha: 0.25 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x + props.gap * index, y: props.position.y, w: Position.vmax(props.position) * 0.1, h: Position.vmax(props.position) * 100 }), globalAlpha: 0.25 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x - props.gap * index, y: props.position.y, w: Position.vmax(props.position) * 0.1, h: Position.vmax(props.position) * 100 }), globalAlpha: 0.25 })
    }
  })

  context.context.restore()
}

export default App