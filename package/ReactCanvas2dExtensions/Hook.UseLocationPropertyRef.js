import React from '../React'

const useLocationPropertyRef = (props) => {
  const ref = React.useRef()

  const [load, setLoad] = React.useState(false)
  const refLocation = React.useRef(props.default)

  const locationProperty = Object.keys(location)

  React.useEffect(() => {
    if (ref.current && locationProperty.some(i => location[i] !== ref.current.props[i])) {
      setLoad(true)
      refLocation.current = locationProperty.reduce((t, i) => Object({ ...t, [i]: ref.current.props[i] }), Object)
    }
  })

  return { ref, load, location: refLocation.current }
}

export default useLocationPropertyRef