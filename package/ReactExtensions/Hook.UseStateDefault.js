import React from '../React'

import useEffectUpdate from './Hook.UseEffectUpdate'

const useStateDefault = (props) => {
  const [state, setState] = React.useState(
    () => {
      if (props.defaultState !== undefined) return props.defaultState
      if (props.state !== undefined) return props.state
    }
  )

  useEffectUpdate(() => setState(props.state), [props.state])

  return { state, setState }
}

export default useStateDefault