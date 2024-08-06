import React from '../React'

const useLocationBox = (props) => {
  const ref = React.useRef()

  const [location, setLocation] = React.useState(props.default)

  React.useEffect(() => {
    if (ref.current) {
      const key = Object.keys(location)
      const box = Location.box(ReactCanvas2dUtils.flatDom(ref.current).filter(i => i !== ref.current).map(i => i.props))
      if (key.some(i => location[i] !== box[i])) {
        setLocation(key.reduce((t, i) => Object({ ...t, [i]: box[i] }), Object))
      }
    }
  })

  return { ref, location, setLocation }
}

export default useLocationBox