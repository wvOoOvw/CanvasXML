import React from '../React'

const useDispose = (props) => {
  const object = React.useRef(props.object)

  React.useEffectImmediate(() => {
    const diff = object.current.filter((i, index) => i !== props.object[index])
    object.current = props.object
    return () => diff.forEach(i => i.dispose())
  }, [...props.object])
}

export default useDispose