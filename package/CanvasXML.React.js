var renderFrameTimeLast = 0
var renderFrameTimeDiffMax = 0

var renderQueueInRender = false
var renderQueueShouldRender = false

var renderQueueNode = undefined

var renderQueueHook = undefined
var renderQueueHookCallback = []

var renderListener = []

var updateQueueNode = []
var updateAnimationFrame = undefined


const destory = (node) => {
  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffect) renderQueueHookCallback.push(() => i.effectPrevious())
  })

  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffectImmediate) i.effectPrevious()
  })

  node.children.forEach(i => destory(i))
}

const createElement = (alternate, props, ...children) => {
  return { alternate, props: props || Object(), children, xml: true }
}

const createNode = (element) => {
  var node = { key: undefined, type: undefined, children: [], hooks: [], element: undefined }

  if (Boolean(element) === true && typeof element === 'object' && typeof element.alternate === 'function' && element.xml === true) {
    node.key = Object(element.props).key
    node.type = 0b00000001
    node.element = element
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.alternate === 'string') {
    node.key = Object(element.props).key
    node.type = 0b00000010
    node.element = element
  }
  if (Boolean(element) === true && typeof element === 'object' && Array.isArray(element)) {
    node.key = Object(element.props).key
    node.type = 0b00000100
    node.element = { alternate: Array, props: undefined, children: element }
  }
  if (Boolean(element) === true && typeof element === 'object' && element.alternate === Fragment) {
    node.key = Object(element.props).key
    node.type = 0b00001000
    node.element = element
  }
  if (Boolean(element) === false || typeof element !== 'object') {
    node.type = 0b00010000
    node.element = { alternate: null, props: Object(), children: [] }
  }

  return node
}

const renderNode = (node) => {
  renderQueueHook = { hooks: node.hooks, index: 0, node: node }

  var childrenIteration = []
  var childrenRest = []
  var childrenDestory = []

  if (node.type === 0b00000001) {
    childrenIteration = new Array(node.element.alternate({ ...node.element.props, children: node.element.children, parent: node.parent }))
  }

  if (node.type === 0b00000010) {
    childrenIteration = node.element.children
  }

  if (node.type === 0b00000100) {
    childrenIteration = node.element.children
  }

  if (node.type === 0b00001000) {
    childrenIteration = node.element.alternate({ children: node.element.children })
  }

  childrenIteration = childrenIteration.map(i => createNode(i))

  childrenDestory = node.children

  childrenIteration.forEach((inode, index) => {
    inode.parent = node

    var equalIndex = node.children.findIndex(i => i.key !== undefined && i.key === inode.key && i.element.alternate === inode.element.alternate)

    if (equalIndex !== -1) {
      node.children.splice(index, 0, node.children.splice(equalIndex, 1)[0])
    }

    if (node.children[index] && node.children[index].key === inode.key && node.children[index].element.alternate === inode.element.alternate) {
      inode.hooks = node.children[index].hooks
      inode.children = node.children[index].children
    }

    if (node.children[index] && node.children[index].key === inode.key && node.children[index].element.alternate === inode.element.alternate) {
      childrenDestory = childrenDestory.filter(i => i !== node.children[index])
    }

    childrenRest.push(inode)
  })

  childrenDestory.forEach(i => destory(i))

  childrenRest = childrenRest.map(i => renderNode(i))

  node.children = childrenRest

  node.hooks.forEach(i => {
    if (typeof i.effect === 'function' && i.type === useEffectImmediateLoopEnd) i.effect()
  })

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

  var keepRender = renderQueueShouldRender

  renderQueueShouldRender = false

  if (keepRender) update()
}

const update = () => {
  renderQueueInRender = true

  const now = performance.now()

  if (now - renderFrameTimeLast < renderFrameTimeDiffMax) {
    updateAnimationFrame = requestAnimationFrame(update)
  }

  if (now - renderFrameTimeLast > renderFrameTimeDiffMax || now - renderFrameTimeLast === renderFrameTimeDiffMax) {
    renderFrameTimeLast = now

    const updateQueueNodeFilter = []

    updateQueueNode.forEach(i => {
      var inFilter = false

      while (inFilter === false && i) {
        inFilter = updateQueueNodeFilter.some(n => n === i)
        i = i.parent
      }

      if (inFilter === false) updateQueueNodeFilter.push(i)
    })

    updateQueueNode = []

    renderNode(renderQueueNode)

    renderListener.forEach(i => i(renderQueueNode))

    while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()()

    renderQueueInRender = false

    var keepRender = renderQueueShouldRender

    renderQueueShouldRender = false

    if (keepRender) update()
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

  if (renderQueueInRender === true) renderQueueShouldRender = true
  if (renderQueueInRender === false) update()
}

const useState = (state) => {
  var hook

  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index]
  if (hook === undefined) hook = { state: state }

  renderQueueHook.hooks[renderQueueHook.index] = hook

  const queueNode = renderQueueHook.node

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

const useEffectImmediateLoopEnd = (effect, dependence) => {
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


const React = { renderQueueNode: () => renderQueueNode, mount, render, renderNode, createElement, Fragment, shouldRender, useState, useRef, useEffect, useEffectImmediateLoopEnd, useEffectImmediate, useMemo, useCallback }

Object.keys(React).filter(i => [useState, useRef, useEffect, useEffectImmediateLoopEnd, useEffectImmediate, useMemo, useCallback].includes(React[i])).forEach(i => React[i] = hook(React[i]))

export default React