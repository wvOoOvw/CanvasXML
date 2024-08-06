import React from '../React'

const useResourceReload = (props) => {
  const [resourceCount, setResourceCount] = React.useState(0)
  const [resourceLoading, setResourceLoading] = React.useState(true)

  React.useEffectImmediate(() => {
    setResourceCount(0)
    setResourceLoading(true)

    props.resource.forEach(i => fetch(i).then(() => setResourceCount(pre => pre + 1)))
  }, [...props.resource])

  React.useEffectImmediate(() => setResourceLoading(resourceCount < props.resource.length), [resourceCount])

  return { resourceCount, resourceLoading }
}

export default useResourceReload