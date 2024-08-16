import Core from './Core'
import Tag from './Module.Tag'

const App = {
  locationMount: (dom) => {
    Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Tag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    Tag.renderMount_0(dom)

    const px = Number(Core.context().font.match(/[\d\.]+px/)[0].replace('px', ''))

    var text = dom.props.text
    var x = dom.props.x
    var y = dom.props.y + px * 0.82

    if (Boolean(dom.props.fillText) === true) Core.context().fillText(text, x, y)
    if (Boolean(dom.props.strokeText) === true) Core.context().strokeText(text, x, y)

    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
  },
}

export default App