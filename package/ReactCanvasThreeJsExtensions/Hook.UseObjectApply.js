import React from '../React'

const useObjectApply = (props) => {
  React.useEffectImmediate(() => {
    if (Boolean(props.target) === true && Boolean(props.object) === true && Boolean(props.apply) === true) {
      props.target.add(props.object)
      return () => props.target.remove(props.object)
    }
  }, [props.target, props.object, props.apply])
}

export default useObjectApply