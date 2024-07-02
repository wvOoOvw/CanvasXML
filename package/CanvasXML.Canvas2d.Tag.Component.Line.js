import Canvas2d from './CanvasXML.Canvas2d'

const App = {
  locationMount: (dom) => {
    Canvas2d.Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    Canvas2d.Tag.renderMount_0(dom)

    if (dom.props.path) {
      dom.props.path.forEach((i, index) => {
        if (index === 0) Canvas2d.context().moveTo(i.x, i.y)
        if (index === 0) Canvas2d.context().lineTo(i.x, i.y)
        if (index !== 0) Canvas2d.context().lineTo(i.x, i.y)
      })
    }

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
  },
}

export default App