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

    Core.context().fill()

    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
  },
}

export default App