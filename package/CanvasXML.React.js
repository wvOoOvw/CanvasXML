var rootElement = undefined

var renderFrameTimeLast = 0
var renderFrameTimeDiffMax = 0

var renderQueueInRender = false
var renderQueueShouldRender = false

var renderQueueNode = undefined

var renderQueueHook = undefined
var renderQueueHookCallback = []

var renderListener = []

var updateQueueNode = []
var updateQueueNodeFilter = []
var updateQueueNodeRoot = []

var updateAnimationFrame = undefined

var shouldRenderAnimationFrame = undefined


const destory = (node) => {
  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffect) renderQueueHookCallback.push(() => i.effectPrevious())
  })

  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffectImmediate) i.effectPrevious()
  })

  node.children.forEach(i => destory(i))
}

const createElement = (tag, props, ...children) => {
  return { tag, key: Object(props).key, props: props || Object(), children, xml: true }
}

const createNode = (element) => {
  var node = { key: undefined, type: undefined, children: [], hooks: [], element: undefined }

  if (Boolean(element) === false || typeof element !== 'object') {
    node.type = 0
    node.element = element
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'function' && element.xml === true) {
    node.type = 1
    node.element = element
    node.key = element.key
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'string') {
    node.type = 2
    node.element = element
    node.key = element.key
  }
  if (Boolean(element) === true && typeof element === 'object' && Array.isArray(element)) {
    node.type = 3
    node.element = element
    node.key = element.key
  }
  if (Boolean(element) === true && typeof element === 'object' && element.tag === Fragment) {
    node.type = 4
    node.element = element
    node.key = element.key
  }

  return node
}

const renderNode = (node) => {
  renderQueueHook = { hooks: node.hooks, index: 0, node: node }

  var childrenIteration = []
  var childrenRest = []
  var childrenDestory = []

  if (node.type === 1) {
    childrenIteration = new Array(node.element.tag({ ...node.element.props, children: node.element.children, parent: node.parent }))
  }

  if (node.type === 2) {
    childrenIteration = node.element.children
  }

  if (node.type === 3) {
    childrenIteration = node.element
  }

  if (node.type === 4) {
    childrenIteration = node.element.tag({ children: node.element.children })
  }

  childrenDestory = node.children

  childrenIteration.forEach((i, index) => {
    var equalIndex = node.children.findIndex(n => n.key !== undefined && n.key === i.key && n.element.tag === i.tag)

    if (equalIndex !== -1) node.children.splice(index, 0, node.children.splice(equalIndex, 1)[0])

    var inode

    if ((node.children[index] && node.children[index].element === i) === true && updateQueueNode.includes(node.children[index]) === true) {
      inode = node.children[index]
    }

    if ((node.children[index] && node.children[index].element === i) !== true || updateQueueNode.includes(node.children[index]) !== true) {
      inode = createNode(i)
    }

    if (
      node.children[index] !== inode && 
      node.children[index] && 
      node.children[index].type === inode.type && 
      node.children[index].key === inode.key && 
      node.children[index].element.tag === inode.element.tag
    ) {
      inode.hooks = node.children[index].hooks
      inode.children = node.children[index].children
      childrenDestory = childrenDestory.filter(i => i !== node.children[index])
    }

    inode.parent = node

    childrenRest.push(renderNode(inode))
  })

  childrenDestory.forEach(i => destory(i))

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

const mount = (renderListenerFrom, rootElementFrom, renderFrameTimeDiffMaxFrom) => {
  renderListener.push(renderListenerFrom)
  rootElement = rootElementFrom
  renderFrameTimeDiffMax = renderFrameTimeDiffMaxFrom
  return React
}

const render = () => {
  renderQueueInRender = true

  updateQueueNode = []
  updateQueueNodeFilter = []
  updateQueueNodeRoot = []

  if (updateAnimationFrame) updateAnimationFrame = cancelAnimationFrame(updateAnimationFrame)
  if (shouldRenderAnimationFrame) shouldRenderAnimationFrame = cancelAnimationFrame(shouldRenderAnimationFrame)

  if (renderQueueNode) destory(renderQueueNode)

  renderQueueNode = createNode(rootElement)

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

      updateQueueNodeFilter = Array.from(new Set(updateQueueNode))

      updateQueueNodeRoot = updateQueueNodeFilter.filter(i => {
        var isRoot = true

        while(isRoot === true && i.parent) {
          i = i.parent
          isRoot = updateQueueNodeFilter.every(n => n !== i)
        }

        return isRoot
      })

      console.log('updateQueueNode', updateQueueNode)
      console.log('updateQueueNodeFilter', updateQueueNodeFilter)
      console.log('updateQueueNodeRoot', updateQueueNodeRoot)

      updateQueueNode = []

      updateQueueNodeRoot.forEach(i => renderNode(i))

      updateQueueNodeFilter = []
      updateQueueNodeRoot = []

      // renderNode(renderQueueNode)

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

  if (renderQueueInRender === true) {
    renderQueueShouldRender = true
  }
  
  if (renderQueueInRender !== true && shouldRenderAnimationFrame === undefined) {
    shouldRenderAnimationFrame = requestAnimationFrame(() => {
      shouldRenderAnimationFrame = undefined
      update()
    })
  }
}

const createContext = (value) => {
  const context = { value: value }

  return {
    context,
    Consumer: (props) => {
      return props.children(context.value)
    },
    Provider: (props) => {
      if (props.value !== undefined) context.value = props.value
      return props.children
    }
  }
}

const useContext = (contextInstance) => {
  return contextInstance.context.value
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


const React = { renderQueueNode: () => renderQueueNode, mount, render, renderNode, createElement, Fragment, shouldRender, createContext, useContext, useState, useRef, useEffect, useEffectImmediateLoopEnd, useEffectImmediate, useMemo, useCallback }

Object.keys(React).filter(i => [useState, useRef, useEffect, useEffectImmediateLoopEnd, useEffectImmediate, useMemo, useCallback].includes(React[i])).forEach(i => React[i] = hook(React[i]))

export default React