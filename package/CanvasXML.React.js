var renderFrameTimeLast = 0
var renderFrameTimeDiffMax = 0

var renderQueueInRender = false

var renderQueueNode = undefined

var renderQueueHook = undefined
var renderQueueHookCallback = []

var renderListener = []

var updateQueueNode = []
var updateAnimationFrame = undefined

const destory = (node) => {
  node.hooks
    .filter(i => i.type === useEffect && i.effectPrevious && typeof i.effectPrevious === 'function')
    .forEach(i => renderQueueHookCallback.push(() => i.effectPrevious()))

  node.hooks
    .filter(i => i.type === useEffectImmediate && i.effectPrevious && typeof i.effectPrevious === 'function')
    .forEach(i => i.effectPrevious())

  node.children.forEach(i => destory(i))
}

const createElement = (alternate, props, ...children) => {
  return { alternate, props, children, component: true }
}

const createNode = (element) => {
  return { key: Object(element.props).key, alternate: element.alternate, children: [], hooks: [], element: element }
}

const renderNode = (node) => {
  renderQueueHook = { hooks: node.hooks, index: 0 }

  var childrenIteration = []
  var childrenRest = []
  var childrenDestory = []

  if (typeof node.element.alternate === 'function' && node.element.component === true && node.element.alternate !== Array && node.element.alternate !== Fragment) {
    childrenIteration = new Array(node.element.alternate({ ...node.element.props, children: node.element.children }))
  }

  if (typeof node.element.alternate === 'string') {
    childrenIteration = node.element.children
  }

  if (typeof node.element.alternate === 'function' && node.element.alternate === Array) {
    childrenIteration = node.element.children
  }

  if (typeof node.element.alternate === 'function' && node.element.alternate === Fragment) {
    childrenIteration = node.element.alternate({ children: node.element.children })
  }

  childrenIteration = childrenIteration.filter(i => typeof i === 'object')

  childrenIteration = childrenIteration.map(i => Array.isArray(i) ? Object({ alternate: Array, props: undefined, children: i }) : i)

  childrenDestory = node.children

  childrenIteration.forEach((i, index) => {
    var inode = createNode(i)

    inode.parent = node

    var equalIndex = node.children.findIndex(i => i.key !== undefined && i.key === inode.key && i.alternate === inode.alternate)

    if (equalIndex !== -1) {
      node.children.splice(index, 0, node.children.splice(equalIndex, 1)[0])
    }

    if (node.children[index] && node.children[index].alternate === inode.alternate && node.children[index].key === inode.key) {
      inode.hooks = node.children[index].hooks
      inode.children = node.children[index].children
    }

    if (node.children[index] && node.children[index].alternate === inode.alternate && node.children[index].key === inode.key) {
      childrenDestory = childrenDestory.filter(i => i !== node.children[index])
    }

    childrenRest.push(renderNode(inode))
  })

  childrenDestory.forEach(i => destory(i))

  node.children = childrenRest

  node.hooks
    .filter(i => i.type === useEffectLoopEnd && i.effect && typeof i.effect === 'function')
    .forEach(i => i.effect())

  renderQueueHook = undefined

  return node
}

const Fragment = (props) => {
  return props.children
}

const mount = (listener, frameTimeDiffMax) => {
  renderListener.push(listener)
  renderFrameTimeDiffMax = frameTimeDiffMax
  return React
}

const render = (element) => {
  renderQueueInRender = true

  if (updateAnimationFrame) cancelAnimationFrame(updateAnimationFrame)

  if (renderQueueNode) destory(renderQueueNode)

  renderQueueNode = createNode(element)

  renderNode(renderQueueNode)

  renderListener.forEach(i => i(renderQueueNode))

  while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()()

  renderQueueInRender = false
}

const update = () => {
  renderQueueInRender = true

  const now = performance.now()

  if (now - renderFrameTimeLast < renderFrameTimeDiffMax) {
    updateAnimationFrame = requestAnimationFrame(update)
  }

  if (now - renderFrameTimeLast > renderFrameTimeDiffMax || now - renderFrameTimeLast === renderFrameTimeDiffMax) {
    updateQueueNode = []

    renderNode(renderQueueNode)

    renderListener.forEach(i => i(renderQueueNode))

    while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()()

    renderQueueInRender = false
  }
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

const shouldRender = (queueNode) => {
  updateQueueNode = [...updateQueueNode, queueNode]

  if (renderQueueInRender === false) update()
}

const useState = (state) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { state: state }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  const queueNode = renderQueueNode

  const setState = (state) => {
    const _ = hook.state

    if (typeof state === 'function') hook.state = state(hook.state)
    if (typeof state !== 'function') hook.state = state

    if (hook.state !== _) shouldRender(queueNode)
  }

  return [hook.state, setState]
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

  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueHookCallback.push(() => hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined)
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueHookCallback.push(() => hook.effectPrevious = effect())

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

const useEffectLoopEnd = (effect, dependence) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { effect: effect }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effect = effect

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

const React = { mount, render, renderNode, createElement, Fragment, shouldRender, useState, useRef, useEffect, useEffectLoopEnd, useEffectImmediate, useMemo, useCallback }

Object.keys(React).filter(i => [useState, useRef, useEffect, useEffectLoopEnd, useEffectImmediate, useMemo, useCallback].includes(React[i])).forEach(i => React[i] = hook(React[i]))

export default React