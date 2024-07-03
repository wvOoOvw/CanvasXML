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

    if(dom.props.key === '1') console.log(Canvas2d.context().fillStyle, dom.props.fillStyle)

    Canvas2d.context().fill()

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
  },
}

export default App