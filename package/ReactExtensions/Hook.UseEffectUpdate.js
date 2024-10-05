import React from '../React'

const useEffectUpdate = (callback, dep) => {
  const ref = React.useRef(false)

  React.useEffect(() => {
    if (ref.current === true) callback()
    if (ref.current !== true) ref.current = true
  }, dep)
}

export default useEffectUpdate