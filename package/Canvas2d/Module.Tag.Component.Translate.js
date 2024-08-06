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
    if (dom.props.beginPath === undefined) dom.props.beginPath = false
    
    Tag.renderMount_0(dom)

    Core.context().translate(dom.props.translateX, dom.props.translateY)

    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
  },
}

export default App