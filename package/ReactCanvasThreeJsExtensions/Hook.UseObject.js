import React from '../React'

const useObject = (props) => {
  const object = React.useMemo(() => {
    if (typeof props.object === 'function') return props.object()
    if (typeof props.object !== 'function') return props.object
  }, props.dependence)

  React.useEffectImmediate(() => {
    if (Boolean(object) === true) return () => object.dispose()
  }, [object])

  return object
}

export default useObject