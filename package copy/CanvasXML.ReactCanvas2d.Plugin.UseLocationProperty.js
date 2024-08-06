import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useLocationProperty = (props) => {
  const ref = React.useRef()

  const [load, setLoad] = React.useState(false)
  const [location, setLocation] = React.useState(props.default)

  const locationProperty = Object.keys(location)

  React.useEffect(() => {
    if (ref.current && locationProperty.some(i => location[i] !== ref.current.props[i])) {
      setLoad(true)
      setLocation(locationProperty.reduce((t, i) => Object({ ...t, [i]: ref.current.props[i] }), Object))
    }
  })

  return { ref, load, location, setLocation }
}

export default useLocationProperty