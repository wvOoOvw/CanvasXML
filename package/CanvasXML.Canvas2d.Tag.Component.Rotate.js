import Canvas2d from './CanvasXML.Canvas2d'

const App = {
  locationMount: (dom) => {
    Canvas2d.Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom)
  },
  
  renderMount: (dom) => {
    if (dom.props.beginPath === undefined) dom.props.beginPath = false
    
    Canvas2d.Tag.renderMount_0(dom)

    Canvas2d.context().rotate(dom.props.rotateAngle)

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
  },
}

export default App