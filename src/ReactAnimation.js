var contextQueue = []
var contextQueueRecordCount = []

var renderComponent = undefined

var renderFrameTimeDiff = 0
var renderFrameTimeDiffMax = 0

var renderQueue = { alternate: 'root', children: [] }

var renderQueueInRender = false
var renderQueueShouldRender = false

var renderQueueCallback = []

var renderQueueNode = undefined
var renderQueueNodeChildrenIndex = 0

var renderQueueHooks = []
var renderQueueHook = undefined

const destory = (node) => {
  node.hooks
    .filter(i => i.type === useEffect && i.effectPrevious && typeof i.effectPrevious === 'function')
    .forEach(i => renderQueueCallback.push(() => i.effectPrevious()))

  node.hooks
    .filter(i => i.type === useEffectImmediate && i.effectPrevious && typeof i.effectPrevious === 'function')
    .forEach(i => i.effectPrevious())

  node.children.forEach(i => destory(i))
}

const component = (alternate) => {
  return (props) => {
    var node
    var key = Object(props).key
    var equalIndex = renderQueueNode.children.findIndex(i => i.key !== undefined && i.key === key && i.alternate === alternate)

    if (equalIndex !== -1) {
      renderQueueNode.children.splice(renderQueueNodeChildrenIndex, 0, renderQueueNode.children.splice(equalIndex, 1)[0])
    }

    if (node === undefined && renderQueueNode.children[renderQueueNodeChildrenIndex] && renderQueueNode.children[renderQueueNodeChildrenIndex].alternate === alternate && renderQueueNode.children[renderQueueNodeChildrenIndex].key === key) {
      node = renderQueueNode.children[renderQueueNodeChildrenIndex]
    }

    if (node === undefined) {
      node = { key: key, alternate: alternate, children: [], hooks: [] }
    }

    if (node !== renderQueueNode.children[renderQueueNodeChildrenIndex] && renderQueueNode.children[renderQueueNodeChildrenIndex]) {
      destory(renderQueueNode.children[renderQueueNodeChildrenIndex])
    }

    node.parent = renderQueueNode

    renderQueueNode.children[renderQueueNodeChildrenIndex] = node

    renderQueueNode = node
    renderQueueNodeChildrenIndex = 0

    contextQueueRecordCount.push(0)

    renderQueueHooks.push({ hooks: node.hooks, index: 0 })
    renderQueueHook = renderQueueHooks[renderQueueHooks.length - 1]

    const result = node.alternate(props)

    node.children.filter((i, index) => index > renderQueueNodeChildrenIndex || index === renderQueueNodeChildrenIndex).forEach(i => destory(i))
    node.children = node.children.filter((i, index) => index < renderQueueNodeChildrenIndex)

    renderQueueNode = node.parent
    renderQueueNodeChildrenIndex = renderQueueNode.children.findIndex(i => i === node) + 1

    contextQueue = contextQueue.filter((i, index) => index < contextQueue.length - contextQueueRecordCount[contextQueueRecordCount.length - 1])
    contextQueueRecordCount = contextQueueRecordCount.filter((i, index) => index < contextQueueRecordCount.length - 1)

    renderQueueHooks = renderQueueHooks.filter((i, index) => index < renderQueueHooks.length - 1)
    renderQueueHook = renderQueueHooks[renderQueueHooks.length - 1]

    return result
  }
}

const mount = (component, frameTimeDiffMax) => {
  renderComponent = component
  renderFrameTimeDiffMax = frameTimeDiffMax
  return ReactAnimation
}

const render = () => {
  renderQueueInRender = true

  renderFrameTimeDiff = performance.now()

  renderQueueNode = renderQueue
  renderQueueNodeChildrenIndex = 0

  renderComponent()

  while (renderQueueCallback.length !== 0) renderQueueCallback.shift()()

  const renderRequestAnimationFrame = () => {
    requestAnimationFrame(() => {
      const now = performance.now()
      if (now - renderFrameTimeDiff < renderFrameTimeDiffMax) renderRequestAnimationFrame()
      if (now - renderFrameTimeDiff > renderFrameTimeDiffMax || now - renderFrameTimeDiff === renderFrameTimeDiffMax) renderQueueInRender = false
      if (now - renderFrameTimeDiff > renderFrameTimeDiffMax || now - renderFrameTimeDiff === renderFrameTimeDiffMax) render()
    })
  }

  if (renderQueueShouldRender) renderRequestAnimationFrame()
  if (renderQueueShouldRender === false) renderQueueInRender = false

  renderQueueShouldRender = false
}

const hook = (callback) => {
  return (...props) => {
    try {
      if (renderQueueHook.hooks[renderQueueHook.index] !== undefined && renderQueueHook.hooks[renderQueueHook.index].type !== callback) {
        throw Error(callback)
      }
      return callback(...props)
    } finally {
      renderQueueHook.hooks[renderQueueHook.index].type = callback
      renderQueueHook.index = renderQueueHook.index + 1
    }
  }
}

const contextProvider = (value) => {
  contextQueue.push(value)
  contextQueueRecordCount[contextQueueRecordCount.length - 1] = contextQueueRecordCount[contextQueueRecordCount.length - 1] + 1
}

const contextProviderExtend = (value) => {
  contextQueue.push({ ...contextQueue[contextQueue.length - 1], ...value })
  contextQueueRecordCount[contextQueueRecordCount.length - 1] = contextQueueRecordCount[contextQueueRecordCount.length - 1] + 1
}

const shouldRender = () => {
  if (renderQueueInRender === true) renderQueueShouldRender = true
  if (renderQueueInRender === false) requestAnimationFrame(render)
}

const useContext = () => {
  return contextQueue[contextQueue.length - 1]
}

const useState = (state) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { state: state }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  const setState = (state) => {
    if (typeof state === 'function') renderQueueCallback.push(() => hook.state = state(hook.state))
    if (typeof state !== 'function') renderQueueCallback.push(() => hook.state = state)

    if (renderQueueInRender === true) renderQueueShouldRender = true
    if (renderQueueInRender === false) requestAnimationFrame(render)
  }

  return [hook.state, setState]
}

const useStateImmediate = (state) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { state: state }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  const setState = (state) => {
    if (typeof state === 'function') hook.state = state(hook.state)
    if (typeof state !== 'function') hook.state = state

    if (renderQueueInRender === true) renderQueueShouldRender = true
    if (renderQueueInRender === false) requestAnimationFrame(render)
  }

  return [hook, setState]
}

const useRef = (current) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { current: current }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  return hook
}

const useEffect = (effect, dependence) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { effect: effect }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueCallback.push(() => hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined)
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueCallback.push(() => hook.effectPrevious = effect())

  hook.dependence = dependence
}

const useEffectImmediate = (effect, dependence) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { effect: effect }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effectPrevious = effect()

  hook.dependence = dependence
}

const useMemo = (memo, dependence) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { memo: memo }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.memo = memo()

  hook.dependence = dependence

  return hook.memo
}

const useCallback = (callback, dependence) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { callback: callback }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.callback = callback

  hook.dependence = dependence

  return hook.callback
}

const ReactAnimation = { mount, render, component, contextProvider, contextProviderExtend, shouldRender, useContext, useState, useStateImmediate, useRef, useEffect, useEffectImmediate, useMemo, useCallback }

Object.keys(ReactAnimation).filter(i => [useState, useStateImmediate, useRef, useEffect, useEffectImmediate, useMemo, useCallback].includes(ReactAnimation[i])).forEach(i => ReactAnimation[i] = hook(ReactAnimation[i]))

export default ReactAnimation