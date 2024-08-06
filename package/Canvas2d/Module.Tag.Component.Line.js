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

    const pathProps = dom.children.filter((i) => i.element.tag === 'path').map((i) => i.props)

    pathProps.forEach((i, index) => {
      if (index === 0) Core.context().moveTo(i.x, i.y)
      if (index === 0) Core.context().lineTo(i.x, i.y)
      if (index !== 0) Core.context().lineTo(i.x, i.y)
    })

    Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Tag.renderUnmount_0(dom)
  },
}

export default App