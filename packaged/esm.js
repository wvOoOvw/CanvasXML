/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $W: () => (/* reexport */ CanvasXML_Canvas2d),
  q_: () => (/* reexport */ CanvasXML_React),
  EA: () => (/* reexport */ CanvasXML_ReactCanvas2d),
  Ay: () => (/* binding */ package_0)
});

;// CONCATENATED MODULE: ./package/CanvasXML.React.Plugin.js

const useEffectUpdate = (callback, dep) => {
  const ref = CanvasXML_React.useRef(false);
  CanvasXML_React.useEffect(() => {
    if (ref.current === true) callback();
    if (ref.current === false) ref.current = true;
  }, dep);
};
const useAnimationCount = props => {
  const [animationCount, setAnimationCount] = CanvasXML_React.useState(props.defaultCount);
  const [animationDelay, setAnimationDelay] = CanvasXML_React.useState(props.defaultDelay);
  const [animationFlow, setAnimationFlow] = CanvasXML_React.useState(props.defaultFlow);
  CanvasXML_React.useEffect(() => {
    if (animationDelay !== 0) setAnimationDelay(animationDelay - 1);
  });
  CanvasXML_React.useEffect(() => {
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.min || animationCount < props.min)) setAnimationFlow(0);
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.max || animationCount > props.max)) setAnimationFlow(1);
  });
  CanvasXML_React.useEffect(() => {
    if (props.play === true && animationDelay === 0 && animationFlow === 0 && animationCount < props.max) setAnimationCount(animationCount + props.rate);
    if (props.play === true && animationDelay === 0 && animationFlow === 1 && animationCount > props.min) setAnimationCount(animationCount - props.rate);
  });
  return {
    animationCount: props.postprocess ? props.postprocess(animationCount) : animationCount,
    setAnimationCount,
    animationDelay,
    setAnimationDelay,
    animationFlow,
    setAnimationFlow
  };
};
const useAnimationDestination = props => {
  const [animationCount, setAnimationCount] = CanvasXML_React.useState(props.defaultCount);
  CanvasXML_React.useEffect(() => {
    var next = animationCount;
    if (props.play === true && animationCount !== props.destination && animationCount > props.destination) next = next - props.rate;
    if (props.play === true && animationCount !== props.destination && animationCount < props.destination) next = next + props.rate;
    if (props.play === true && animationCount > props.destination && next < props.destination) next = props.destination;
    if (props.play === true && animationCount < props.destination && next > props.destination) next = props.destination;
    setAnimationCount(next);
  });
  return {
    animationCount: props.postprocess ? props.postprocess(animationCount) : animationCount,
    setAnimationCount
  };
};
const ReactPlugin = {
  useEffectUpdate,
  useAnimationCount,
  useAnimationDestination
};
/* harmony default export */ const CanvasXML_React_Plugin = (ReactPlugin);
;// CONCATENATED MODULE: ./package/CanvasXML.React.js

var rootElement = undefined;
var renderFrameTimeLast = 0;
var renderFrameTimeDiffMax = 0;
var renderQueueInRender = false;
var renderQueueShouldRender = false;
var renderQueueNode = undefined;
var renderQueueHook = undefined;
var renderQueueHookCallback = [];
var renderListener = [];
var updateQueueNode = [];
var updateQueueNodeFilter = [];
var updateQueueNodeRoot = [];
var updateAnimationFrame = undefined;
const destory = node => {
  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffect) renderQueueHookCallback.push(() => i.effectPrevious());
  });
  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffectImmediate) i.effectPrevious();
  });
  node.children.forEach(i => destory(i));
};
const createElement = (tag, props, ...children) => {
  return {
    tag,
    key: Object(props).key,
    props: props || Object(),
    children
  };
};
const createNode = element => {
  var node = {
    element: element,
    key: undefined,
    type: undefined,
    children: [],
    hooks: [],
    memo: undefined,
    update: undefined,
    create: undefined,
    parent: undefined
  };
  if (Boolean(element) !== true || typeof element !== 'object') {
    node.type = 0;
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'function') {
    node.type = 1;
    node.key = element.key;
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'string') {
    node.type = 2;
    node.key = element.key;
  }
  if (Boolean(element) === true && typeof element === 'object' && Array.isArray(element) === true) {
    node.type = 3;
    node.key = element.key;
  }
  // if (Boolean(element) === true && typeof element === 'object' && element.tag === Fragment) {
  //   node.type = 4
  //   node.key = element.key
  // }

  return node;
};
const renderNode = node => {
  renderQueueHook = {
    hooks: node.hooks,
    index: 0,
    node: node
  };
  var childrenIteration = [];
  var childrenRest = [];
  var childrenDestory = [];
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 1) {
    childrenIteration = new Array(node.element.tag({
      ...node.element.props,
      children: node.element.children
    }));
  }
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 2) {
    childrenIteration = node.element.children;
  }
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 3) {
    childrenIteration = node.element;
  }

  // if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 4) {
  //   childrenIteration = node.element.tag({ children: node.element.children })
  // }

  if (node.memo === true && updateQueueNodeFilter.includes(node) !== true) {
    childrenIteration = node.children.map(i => i.element);
  }
  childrenDestory = node.children;
  childrenIteration.forEach((i, index) => {
    var equalIndex = node.children.findIndex(n => n.key !== undefined && n.key === i.key && n.element.tag === i.tag);
    if (equalIndex !== -1) node.children.splice(index, 0, node.children.splice(equalIndex, 1)[0]);
    var inode;
    const memo = Boolean(node.children[index] && node.children[index].element === i);
    if (memo === true) inode = node.children[index];
    if (memo !== true) inode = createNode(i);
    inode.memo = memo;
    const update = !memo && Boolean(node.children[index] && node.children[index].type === inode.type && node.children[index].key === inode.key && node.children[index].element.tag === inode.element.tag);
    if (update === true) {
      inode.hooks = node.children[index].hooks;
      inode.children = node.children[index].children;
    }
    inode.update = update;
    inode.create = memo === false && update === false;
    inode.parent = node;
    if (memo === true || update === true) childrenDestory = childrenDestory.filter(i => i !== node.children[index]);
    childrenRest.push(renderNode(inode));
  });
  node.children = childrenRest;
  childrenDestory.forEach(i => destory(i));
  node.hooks.forEach(i => {
    if (typeof i.effect === 'function' && i.type === useEffectImmediateLoopEnd) i.effect();
  });
  renderQueueHook = undefined;
  return node;
};
const Fragment = props => {
  return props.children;
};
const mount = (rootElement_0, renderFrameTimeDiffMax_0, renderListener_0) => {
  rootElement = rootElement_0;
  renderFrameTimeDiffMax = renderFrameTimeDiffMax_0;
  renderListener = renderListener_0;
  return React;
};
const unmount = () => {
  if (renderQueueNode) destory(renderQueueNode);
  if (updateAnimationFrame) updateAnimationFrame = cancelAnimationFrame(updateAnimationFrame);
  while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()();
  rootElement = undefined;
  renderFrameTimeLast = 0;
  renderFrameTimeDiffMax = 0;
  renderQueueInRender = false;
  renderQueueShouldRender = false;
  renderQueueNode = undefined;
  renderQueueHook = undefined;
  renderQueueHookCallback = [];
  renderListener = [];
  updateQueueNode = [];
  updateQueueNodeFilter = [];
  updateQueueNodeRoot = [];
  updateAnimationFrame = undefined;
};
const render = () => {
  updateQueueNode = [];
  updateQueueNodeFilter = [];
  updateQueueNodeRoot = [];
  if (updateAnimationFrame) updateAnimationFrame = cancelAnimationFrame(updateAnimationFrame);
  if (renderQueueNode) destory(renderQueueNode);
  renderQueueNode = createNode(rootElement);
  renderQueueInRender = true;
  renderNode(renderQueueNode);
  renderListener(renderQueueNode);
  while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()();
  renderQueueInRender = false;
  if (renderQueueShouldRender && renderQueueShouldRender !== (renderQueueShouldRender = false)) update();
};
const update = () => {
  if (updateAnimationFrame === undefined) {
    const now = performance.now();
    if (now - renderFrameTimeLast < renderFrameTimeDiffMax) {
      updateAnimationFrame = requestAnimationFrame(() => {
        updateAnimationFrame = undefined;
        update();
      });
    }
    if (now - renderFrameTimeLast > renderFrameTimeDiffMax || now - renderFrameTimeLast === renderFrameTimeDiffMax) {
      updateAnimationFrame = requestAnimationFrame(() => {
        updateAnimationFrame = undefined;
        renderFrameTimeLast = now;
        updateQueueNodeFilter = Array.from(new Set(updateQueueNode));
        updateQueueNodeRoot = updateQueueNodeFilter.filter(i => {
          var isRoot = true;
          while (isRoot === true && i.parent) {
            i = i.parent;
            isRoot = updateQueueNodeFilter.every(n => n !== i);
          }
          return isRoot;
        });
        updateQueueNode = [];
        renderQueueInRender = true;
        updateQueueNodeRoot.forEach(i => renderNode(i));
        renderListener(renderQueueNode);
        while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()();
        renderQueueInRender = false;
        updateQueueNodeFilter = [];
        updateQueueNodeRoot = [];
        if (renderQueueShouldRender && renderQueueShouldRender !== (renderQueueShouldRender = false)) update();
      });
    }
  }
};
const hook = callback => {
  return (...props) => {
    try {
      if (renderQueueHook.hooks[renderQueueHook.index] !== undefined && renderQueueHook.hooks[renderQueueHook.index].type !== callback) {
        throw Error(callback);
      }
      return callback(...props);
    } finally {
      renderQueueHook.hooks[renderQueueHook.index].type = callback;
      renderQueueHook.index = renderQueueHook.index + 1;
    }
  };
};
const shouldRender = queueNode => {
  updateQueueNode = [...updateQueueNode, queueNode];
  if (renderQueueInRender === true) renderQueueShouldRender = true;
  if (renderQueueInRender !== true) update();
};
const createContext = value => {
  const context = {
    value: value
  };
  return {
    context,
    Consumer: props => {
      return props.children(context.value);
    },
    Provider: props => {
      if (props.value !== undefined) context.value = props.value;
      return props.children;
    }
  };
};
const useContext = contextInstance => {
  return contextInstance.context.value;
};
const useShouldRender = () => {
  const queueNode = renderQueueHook.node;
  return () => shouldRender(queueNode);
};
const useState = state => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    state: state
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  const queueNode = renderQueueHook.node;
  const setState = state => {
    const _ = hook.state;
    if (typeof state === 'function') hook.state = state(hook.state);
    if (typeof state !== 'function') hook.state = state;
    if (hook.state !== _) shouldRender(queueNode);
  };
  return [hook.state, setState];
};
const useRef = current => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    current: current
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  return hook;
};
const useEffect = (effect, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    effect: effect
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueHookCallback.push(() => hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined);
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueHookCallback.push(() => hook.effectPrevious = effect());
  hook.dependence = dependence;
};
const useEffectImmediate = (effect, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    effect: effect
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effectPrevious = effect();
  hook.dependence = dependence;
};
const useEffectImmediateLoopEnd = (effect, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    effect: effect
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effect = effect;
  hook.dependence = dependence;
};
const useMemo = (memo, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    memo: memo
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.memo = memo();
  hook.dependence = dependence;
  return hook.memo;
};
const useCallback = (callback, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    callback: callback
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.callback = callback;
  hook.dependence = dependence;
  return hook.callback;
};
const React = {
  renderQueueNode: () => renderQueueNode,
  mount,
  unmount,
  render,
  renderNode,
  createElement,
  Fragment,
  shouldRender,
  createContext,
  useContext,
  useShouldRender,
  useState,
  useRef,
  useEffect,
  useEffectImmediateLoopEnd,
  useEffectImmediate,
  useMemo,
  useCallback,
  ...CanvasXML_React_Plugin
};
Object.keys(React).filter(i => [useState, useRef, useEffect, useEffectImmediateLoopEnd, useEffectImmediate, useMemo, useCallback].includes(React[i])).forEach(i => React[i] = hook(React[i]));
/* harmony default export */ const CanvasXML_React = (React);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Arc.js

const cover = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5;
  return distance <= radius;
};
const App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom, App);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom, App);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom, App);
    CanvasXML_Canvas2d.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom, App);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom, App);
    CanvasXML_Canvas2d.Tag.renderUnmount_1(dom, (x, y) => cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise));
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Arc = (App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Circle.js

const CanvasXML_Canvas2d_Tag_Component_Circle_cover = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
  const distance = (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5;
  const atan = Math.atan2(targetY - circleY, targetX - circleX);
  const angle = atan + (atan < 0 ? Math.PI * 2 : 0);
  var sAngleUse = sAngle;
  var eAngleUse = eAngle;
  var counterclockwiseUse = counterclockwise;
  if (Boolean(counterclockwise) === true && sAngle > eAngle && sAngle - eAngle >= Math.PI * 2) {
    sAngleUse = Math.PI * 2;
    eAngleUse = 0;
  }
  if (Boolean(counterclockwise) !== true && sAngle < eAngle && eAngle - sAngle >= Math.PI * 2) {
    sAngleUse = 0;
    eAngleUse = Math.PI * 2;
  }
  while (sAngleUse > Math.PI * 2) sAngleUse = sAngleUse - Math.PI * 2;
  while (eAngleUse > Math.PI * 2) eAngleUse = eAngleUse - Math.PI * 2;
  while (sAngleUse < 0) sAngleUse = sAngleUse + Math.PI * 2;
  while (eAngleUse < 0) eAngleUse = eAngleUse + Math.PI * 2;
  if (Boolean(counterclockwise) === true && sAngleUse > eAngleUse) {
    counterclockwiseUse = !Boolean(counterclockwise);
    var [sAngleUse, eAngleUse] = [eAngleUse, sAngleUse];
  }
  if (Boolean(counterclockwise) !== true && sAngleUse > eAngleUse) {
    counterclockwiseUse = !Boolean(counterclockwise);
    var [sAngleUse, eAngleUse] = [eAngleUse, sAngleUse];
  }
  if (Boolean(counterclockwiseUse) === true) {
    return distance <= radius && (angle <= sAngleUse || angle >= eAngleUse);
  }
  if (Boolean(counterclockwiseUse) !== true) {
    return distance <= radius && angle >= sAngleUse && angle <= eAngleUse;
  }
};
const CanvasXML_Canvas2d_Tag_Component_Circle_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom, CanvasXML_Canvas2d_Tag_Component_Circle_App);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom, CanvasXML_Canvas2d_Tag_Component_Circle_App);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom, CanvasXML_Canvas2d_Tag_Component_Circle_App);
    CanvasXML_Canvas2d.context().moveTo(dom.props.cx, dom.props.cy);
    CanvasXML_Canvas2d.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise);
    CanvasXML_Canvas2d.context().lineTo(dom.props.cx, dom.props.cy);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom, CanvasXML_Canvas2d_Tag_Component_Circle_App);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom, CanvasXML_Canvas2d_Tag_Component_Circle_App);
    CanvasXML_Canvas2d.Tag.renderUnmount_1(dom, (x, y) => CanvasXML_Canvas2d_Tag_Component_Circle_cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise));
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Circle = (CanvasXML_Canvas2d_Tag_Component_Circle_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Clip.js

const CanvasXML_Canvas2d_Tag_Component_Clip_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().clip();
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Clip = (CanvasXML_Canvas2d_Tag_Component_Clip_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Fill.js

const CanvasXML_Canvas2d_Tag_Component_Fill_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().fill();
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Fill = (CanvasXML_Canvas2d_Tag_Component_Fill_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Image.js

const caculateImageParams = (location, image, size, position) => {
  var {
    x,
    y,
    w,
    h
  } = location;
  if (!image || image.width === 0 || image.height === 0) return;
  var sx = 0;
  var sy = 0;
  var sw = image.width;
  var sh = image.height;
  if (size === 'auto-max' && position === 'center') {
    const dw = w / sw;
    const dh = h / sh;
    if (dw > dh) {
      sy = sh - sh * dh / dw;
      sh = sh - (sh - sh * dh / dw);
    }
    if (dh > dw) {
      sx = sw - sw * dw / dh;
      sw = sw - (sw - sw * dw / dh);
    }
  }
  if (size === 'auto-min' && position === 'center') {
    const dw = w / sw;
    const dh = h / sh;
    if (dw > dh) {
      x = x + (w - w * dh / dw) / 2;
      w = w - (w - w * dh / dw);
    }
    if (dh > dw) {
      y = y + (h - h * dw / dh) / 2;
      h = h - (h - h * dw / dh);
    }
  }
  return {
    sx,
    sy,
    sw,
    sh,
    x,
    y,
    w,
    h
  };
};
const CanvasXML_Canvas2d_Tag_Component_Image_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    const params = caculateImageParams({
      x: dom.props.x,
      y: dom.props.y,
      w: dom.props.w,
      h: dom.props.h
    }, dom.props.image, dom.props.size, dom.props.position);
    if (params !== undefined) {
      CanvasXML_Canvas2d.context().drawImage(dom.props.image, params.sx, params.sy, params.sw, params.sh, params.x, params.y, params.w, params.h);
    }
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Image = (CanvasXML_Canvas2d_Tag_Component_Image_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Layout.js

const horizontalForward = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  unitPositons.forEach(i => {
    i.x = x;
    x = x + i.w + gap;
  });
  return unitPositons;
};
const horizontalReverse = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  unitPositons.forEach(i => {
    i.x = layoutPosition.w - i.w - x;
    x = x + i.w + gap;
  });
  return unitPositons;
};
const horizontalCenter = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  var w = CanvasXML_Canvas2d.Location.add(unitPositons).w + (unitPositons.length - 1) * gap;
  unitPositons.forEach(i => {
    i.x = (layoutPosition.w - w) / 2 + x;
    x = x + i.w + gap;
  });
  return unitPositons;
};
const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = CanvasXML_Canvas2d.Location.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = (layoutPosition.w - w) / (unitPositons.length + 1) * (index + 1) + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = CanvasXML_Canvas2d.Location.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = (layoutPosition.w - w) / (unitPositons.length - 1) * index + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x;
  });
  return unitPositons;
};
const horizontalAlignReverse = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.w;
  });
  return unitPositons;
};
const horizontalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = (layoutPosition.w - i.w) / 2;
  });
  return unitPositons;
};
const horizontalFlex = (layoutPosition, unitPositons, gap) => {
  const tw = unitPositons.reduce((t, i) => t + i.w, 0) + gap * (unitPositons.length - 1);
  const tgrow = unitPositons.reduce((t, i) => t + (i.grow || 0), 0);
  const tshrink = unitPositons.reduce((t, i) => t + (i.shrink || 0), 0);
  if (tw > layoutPosition.w && tshrink > 0) {
    unitPositons.forEach(i => {
      if (i.shrink) i.w = i.w - (tw - layoutPosition.w) * (i.shrink / tshrink);
    });
  }
  if (tw < layoutPosition.w) {
    unitPositons.forEach(i => {
      if (i.grow) i.w = i.w - (tw - layoutPosition.w) * (i.grow / tgrow);
    });
  }
  return unitPositons;
};
const horizontalAccommodate = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  var accommodated = false;
  var result = [];
  unitPositons.forEach(i => {
    if (accommodated === false && (x + i.w + gap < layoutPosition.w || x + i.w + gap === layoutPosition.w)) result.push(i);
    if (accommodated === false && (x + i.w + gap < layoutPosition.w || x + i.w + gap === layoutPosition.w)) x = x + i.w + gap;
    if (x + i.w + gap > layoutPosition.w) accommodated = true;
  });
  return {
    result: result,
    rest: unitPositons.filter((i, index) => index > result.length - 1)
  };
};
const verticalForward = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  unitPositons.forEach(i => {
    i.y = y;
    y = y + i.h + gap;
  });
  return unitPositons;
};
const verticalReverse = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  unitPositons.forEach(i => {
    i.y = layoutPosition.h - i.h - y;
    y = y + i.h + gap;
  });
  return unitPositons;
};
const verticalCenter = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  var h = CanvasXML_Canvas2d.Location.add(unitPositons).h + (unitPositons.length - 1) * gap;
  unitPositons.forEach(i => {
    i.y = (layoutPosition.h - h) / 2 + y;
    y = y + i.h + gap;
  });
  return unitPositons;
};
const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = CanvasXML_Canvas2d.Location.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = (layoutPosition.h - h) / (unitPositons.length + 1) * (index + 1) + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = CanvasXML_Canvas2d.Location.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = (layoutPosition.h - h) / (unitPositons.length - 1) * index + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y;
  });
  return unitPositons;
};
const verticalAlignReverse = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.h;
  });
  return unitPositons;
};
const verticalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = (layoutPosition.h - i.h) / 2;
  });
  return unitPositons;
};
const verticalFlex = (layoutPosition, unitPositons, gap) => {
  const th = unitPositons.reduce((t, i) => t + i.h, 0) + gap * (unitPositons.length - 1);
  const tgrow = unitPositons.reduce((t, i) => t + (i.grow || 0), 0);
  const tshrink = unitPositons.reduce((t, i) => t + (i.shrink || 0), 0);
  if (th > layoutPosition.h && tshrink > 0) {
    unitPositons.forEach(i => {
      if (i.shrink) i.h = i.h - (th - layoutPosition.h) * (i.shrink / tshrink);
    });
  }
  if (th < layoutPosition.h) {
    unitPositons.forEach(i => {
      if (i.grow) i.h = i.h - (th - layoutPosition.h) * (i.grow / tgrow);
    });
  }
  return unitPositons;
};
const verticalAccommodate = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  var accommodated = false;
  var result = [];
  unitPositons.forEach(i => {
    if (accommodated === false && (y + i.h + gap < layoutPosition.h || y + i.h + gap === layoutPosition.h)) result.push(i);
    if (accommodated === false && (y + i.h + gap < layoutPosition.h || y + i.h + gap === layoutPosition.h)) y = y + i.h + gap;
    if (y + i.h + gap > layoutPosition.h) accommodated = true;
  });
  return {
    result: result,
    rest: unitPositons.filter((i, index) => index > result.length - 1)
  };
};
const maps = {
  horizontalForward: horizontalForward,
  horizontalReverse: horizontalReverse,
  horizontalCenter: horizontalCenter,
  horizontalAround: horizontalAround,
  horizontalBetween: horizontalBetween,
  horizontalAlignForward: horizontalAlignForward,
  horizontalAlignReverse: horizontalAlignReverse,
  horizontalAlignCenter: horizontalAlignCenter,
  verticalForward: verticalForward,
  verticalReverse: verticalReverse,
  verticalCenter: verticalCenter,
  verticalAround: verticalAround,
  verticalBetween: verticalBetween,
  verticalAlignForward: verticalAlignForward,
  verticalAlignReverse: verticalAlignReverse,
  verticalAlignCenter: verticalAlignCenter
};
const wrapHorizontal = (layoutPosition, unitPositons, layoutInner, layoutOuter, gap) => {
  var accommodateResult = [];
  var accommodateRest = unitPositons;
  while (accommodateRest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, accommodateRest, gap);
    if (accommodate.result.length === 0) {
      accommodateResult = [...accommodateResult, accommodate.rest[0]];
      accommodateRest = accommodate.rest.filter((i, index) => index !== 0);
    }
    if (accommodate.result.length > 0) {
      accommodateResult = [...accommodateResult, accommodate.result];
      accommodateRest = accommodate.rest;
    }
  }
  layoutOuter(layoutPosition, accommodateResult.map(i => Object({
    y: layoutPosition.y,
    h: CanvasXML_Canvas2d.Location.hmax(i)
  })), gap).forEach((i, index) => accommodateResult[index].forEach(a => a.y = i.y));
  accommodateResult.forEach(i => layoutInner({
    x: layoutPosition.x,
    y: i.y,
    w: layoutPosition.w
  }, i, gap));
  return unitPositons;
};
const wrapVertical = (layoutPosition, unitPositons, layoutInner, layoutOuter, gap) => {
  var accommodateResult = [];
  var accommodateRest = unitPositons;
  while (accommodateRest.length) {
    const accommodate = verticalAccommodate(layoutPosition, accommodateRest, gap);
    if (accommodate.result.length === 0) {
      accommodateResult = [...accommodateResult, accommodate.rest[0]];
      accommodateRest = accommodate.rest.filter((i, index) => index !== 0);
    }
    if (accommodate.result.length > 0) {
      accommodateResult = [...accommodateResult, accommodate.result];
      accommodateRest = accommodate.rest;
    }
  }
  layoutOuter(layoutPosition, accommodateResult.map(i => Object({
    x: layoutPosition.x,
    w: CanvasXML_Canvas2d.Location.wmax(i)
  })), gap).forEach((i, index) => accommodateResult[index].forEach(a => a.x = i.x));
  accommodateResult.forEach(i => layoutInner({
    y: layoutPosition.y,
    h: layoutPosition.h
  }, i), gap);
  return unitPositons;
};
const CanvasXML_Canvas2d_Tag_Component_Layout_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
    if (Boolean(dom.props.container) === true && dom.children.length > 0) {
      const gap = dom.props.gap || 0;
      const layoutItemProps = dom.children.filter(i => i.element.tag === 'layout' && Boolean(i.props.item) === true && (CanvasXML_Canvas2d.Tag.locationAnalysis(i, ['w', 'h']) || true)).map(i => i.props);
      const indexHorizontal = Object.keys(dom.props).findIndex(i => {
        return ['horizontalForward', 'horizontalReverse', 'horizontalCenter', 'horizontalAround', 'horizontalAround', 'horizontalBetween'].includes(i);
      });
      const indexVertical = Object.keys(dom.props).findIndex(i => {
        return ['verticalForward', 'verticalReverse', 'verticalCenter', 'verticalAround', 'verticalAround', 'verticalBetween'].includes(i);
      });
      const indexHorizontalAlign = Object.keys(dom.props).findIndex(i => {
        return ['horizontalAlignForward', 'horizontalAlignReverse', 'horizontalAlignCenter'].includes(i);
      });
      const indexVerticalAlign = Object.keys(dom.props).findIndex(i => {
        return ['verticalAlignForward', 'verticalAlignReverse', 'verticalAlignCenter'].includes(i);
      });
      if (Boolean(dom.props.wrap) === true && indexHorizontal > -1 && indexVertical > -1 && indexHorizontal < indexVertical) {
        wrapHorizontal({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, layoutItemProps, maps[Object.keys(dom.props)[indexHorizontal]], maps[Object.keys(dom.props)[indexVertical]], gap);
      }
      if (Boolean(dom.props.wrap) === true && indexVertical > -1 && indexVertical > -1 && indexVertical < indexHorizontal) {
        wrapVertical({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, layoutItemProps, maps[Object.keys(dom.props)[indexVertical]], maps[Object.keys(dom.props)[indexHorizontal]], gap);
      }
      if (Boolean(dom.props.wrap) === false) {
        if (indexHorizontal > -1) {
          horizontalFlex({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, layoutItemProps, gap);
        }
        if (indexVertical > -1) {
          verticalFlex({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, layoutItemProps, gap);
        }
        if (indexHorizontal > -1) {
          maps[Object.keys(dom.props)[indexHorizontal]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, layoutItemProps, gap);
        }
        if (indexVertical > -1) {
          maps[Object.keys(dom.props)[indexVertical]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, layoutItemProps, gap);
        }
        if (indexHorizontalAlign > -1) {
          maps[Object.keys(dom.props)[indexHorizontalAlign]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, layoutItemProps, gap);
        }
        if (indexVerticalAlign > -1) {
          maps[Object.keys(dom.props)[indexVerticalAlign]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, layoutItemProps, gap);
        }
      }
    }
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Layout = (CanvasXML_Canvas2d_Tag_Component_Layout_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Line.js

const CanvasXML_Canvas2d_Tag_Component_Line_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    if (dom.props.path) {
      dom.props.path.forEach((i, index) => {
        if (index === 0) CanvasXML_Canvas2d.context().moveTo(i.x, i.y);
        if (index === 0) CanvasXML_Canvas2d.context().lineTo(i.x, i.y);
        if (index !== 0) CanvasXML_Canvas2d.context().lineTo(i.x, i.y);
      });
    }
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Line = (CanvasXML_Canvas2d_Tag_Component_Line_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Rect.js

const circleCenterDistance = (targetX, targetY, circleX, circleY) => {
  return (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5;
};
const circleCenterAngle = (targetX, targetY, circleX, circleY) => {
  var angle = Math.atan2(targetY - circleY, targetX - circleX);
  if (angle < 0) angle = angle + Math.PI * 2;
  return angle;
};
const coverRectRadius = (targetX, targetY, rectX, rectY, rectWidth, rectHeight, radius) => {
  const coverRectIn = targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight;
  if (coverRectIn === true && targetX > rectX + rectWidth / 2 && targetY > rectY + rectHeight / 2 && circleCenterDistance(targetX, targetY, rectX + rectWidth - radius[2], rectY + rectHeight - radius[2]) > radius[2] && circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[2], rectY + rectHeight - radius[2]) > Math.PI * 0 && circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[2], rectY + rectHeight - radius[2]) < Math.PI * 0.5) {
    return false;
  }
  if (coverRectIn === true && targetX < rectX + rectWidth / 2 && targetY > rectY + rectHeight / 2 && circleCenterDistance(targetX, targetY, rectX + radius[3], rectY + rectHeight - radius[3]) > radius[3] && circleCenterAngle(targetX, targetY, rectX + radius[3], rectY + rectHeight - radius[3]) > Math.PI * 0.5 && circleCenterAngle(targetX, targetY, rectX + radius[3], rectY + rectHeight - radius[3]) < Math.PI * 1) {
    return false;
  }
  if (coverRectIn === true && targetX < rectX + rectWidth / 2 && targetY < rectY + rectHeight / 2 && circleCenterDistance(targetX, targetY, rectX + radius[0], rectY + radius[0]) > radius[0] && circleCenterAngle(targetX, targetY, rectX + radius[0], rectY + radius[0]) > Math.PI * 1 && circleCenterAngle(targetX, targetY, rectX + radius[0], rectY + radius[0]) < Math.PI * 1.5) {
    return false;
  }
  if (coverRectIn === true && targetX > rectX + rectWidth / 2 && targetY < rectY + rectHeight / 2 && circleCenterDistance(targetX, targetY, rectX + rectWidth - radius[1], rectY + radius[1]) > radius[1] && circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[1], rectY + radius[1]) > Math.PI * 1.5 && circleCenterAngle(targetX, targetY, rectX + rectWidth - radius[1], rectY + radius[1]) < Math.PI * 2) {
    return false;
  }
  return coverRectIn;
};
const fillRadius = radius => {
  var rRadius = new Array(4).fill(0);
  if (radius && typeof radius === 'object') rRadius = radius;
  if (radius && typeof radius === 'number') rRadius = new Array(4).fill(radius);
  return rRadius;
};
const CanvasXML_Canvas2d_Tag_Component_Rect_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    const radius = fillRadius(dom.props.radius);
    radius.forEach((i, index) => {
      if (radius[index] > dom.props.w / 2) radius[index] = dom.props.w / 2;
      if (radius[index] > dom.props.h / 2) radius[index] = dom.props.h / 2;
      if (radius[index] < 0) radius[index] = 0;
    });
    CanvasXML_Canvas2d.context().moveTo(dom.props.x, dom.props.y + radius[0]);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0]);
    CanvasXML_Canvas2d.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1]);
    CanvasXML_Canvas2d.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2]);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2]);
    CanvasXML_Canvas2d.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3]);
    CanvasXML_Canvas2d.context().lineTo(dom.props.x, dom.props.y + radius[0]);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
    CanvasXML_Canvas2d.Tag.renderUnmount_1(dom, (x, y) => coverRectRadius(x, y, dom.props.x, dom.props.y, dom.props.w, dom.props.h, fillRadius(dom.props.radius)));
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Rect = (CanvasXML_Canvas2d_Tag_Component_Rect_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Rotate.js

const CanvasXML_Canvas2d_Tag_Component_Rotate_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().rotate(dom.props.rotateAngle);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Rotate = (CanvasXML_Canvas2d_Tag_Component_Rotate_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Scale.js

const CanvasXML_Canvas2d_Tag_Component_Scale_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().scale(dom.props.scaleW, dom.props.scaleH);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Scale = (CanvasXML_Canvas2d_Tag_Component_Scale_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Stroke.js

const CanvasXML_Canvas2d_Tag_Component_Stroke_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().stroke();
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Stroke = (CanvasXML_Canvas2d_Tag_Component_Stroke_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Text.js

const caculateLine = (text, font, w, wrap, ellipsis, split) => {
  ellipsis = ellipsis || '';
  split = split || '';
  const px = Number(font.match(/[\d\.]+px/)[0].replace('px', ''));
  CanvasXML_Canvas2d.context().save();
  CanvasXML_Canvas2d.context().font = font;
  var caculateText = '';
  var caculateTextLine = [];
  text = text.split(split).map((i, index) => index ? [split, i] : [i]).flat();
  if (Boolean(wrap) === true) {
    text.forEach(i => {
      const tw = CanvasXML_Canvas2d.context().measureText(caculateText + i).width;
      if (tw > w && caculateText !== '') caculateTextLine.push(caculateText);
      if (tw > w && caculateText !== '') caculateText = i;
      if (tw > w && caculateText === '') caculateTextLine.push(i);
      if (tw < w) caculateText = caculateText + i;
    });
  }
  if (Boolean(wrap) !== true) {
    text.some(i => {
      const tw = CanvasXML_Canvas2d.context().measureText(caculateText + i + ellipsis).width;
      if (tw > w) caculateTextLine.push(caculateText + ellipsis);
      if (tw > w) caculateText = '';
      if (tw < w) caculateText = caculateText + i;
      return caculateTextLine.length > 0;
    });
  }
  if (caculateText) caculateTextLine.push(caculateText);
  caculateTextLine = caculateTextLine.map(i => {
    return {
      text: i.trim(),
      w: CanvasXML_Canvas2d.context().measureText(i.trim()).width,
      h: px
    };
  });
  CanvasXML_Canvas2d.context().restore();
  return caculateTextLine;
};
const caculateLineLocation = (line, lineHeight, gap) => {
  const w = Math.max(...line.map(i => i.w));
  const h = line.reduce((t, n, index) => t + n.h * lineHeight + (index ? gap : 0), 0);
  return {
    w,
    h
  };
};
const CanvasXML_Canvas2d_Tag_Component_Text_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    const lineHeight = dom.props.lineHeight || 1;
    const gap = dom.props.gap || 0;
    const px = Number(CanvasXML_Canvas2d.context().font.match(/[\d\.]+px/)[0].replace('px', ''));
    const line = dom.props.line ? dom.props.line : caculateLine(dom.props.text, dom.props.font, dom.props.w, dom.props.wrap, dom.props.ellipsis, dom.props.split);
    line.forEach((i, index) => {
      var x = dom.props.x;
      var y = dom.props.y;
      var h = px * lineHeight;
      y = y - px * 0.18 - (h - px) * 0.5;
      y = y + (index + 1) * h + index * gap;
      if (dom.props.align === 'left') x = x;
      if (dom.props.align === 'center') x = x + (dom.props.w - i.w) / 2;
      if (dom.props.align === 'right') x = x + (dom.props.w - i.w);
      if (Boolean(dom.props.fillText) === true) CanvasXML_Canvas2d.context().fillText(i.text, x, y);
      if (Boolean(dom.props.strokeText) === true) CanvasXML_Canvas2d.context().strokeText(i.text, x, y);
    });
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
CanvasXML_Canvas2d_Tag_Component_Text_App.caculateLine = caculateLine;
CanvasXML_Canvas2d_Tag_Component_Text_App.caculateLineLocation = caculateLineLocation;
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Text = (CanvasXML_Canvas2d_Tag_Component_Text_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Translate.js

const CanvasXML_Canvas2d_Tag_Component_Translate_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().translate(dom.props.translateX, dom.props.translateY);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Translate = (CanvasXML_Canvas2d_Tag_Component_Translate_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.js














const locationAnalysis = (dom, property) => {
  const unit = (value, property) => {
    if (value.match(/^[\d\.-]+$/) && isNaN(value) === false) {
      return Number(value);
    }
    if (value.match(/^w$/)) {
      return dom.parent.props.w;
    }
    if (value.match(/^h$/)) {
      return dom.parent.props.h;
    }
    if (value.match(/^x$/)) {
      return dom.parent.props.x;
    }
    if (value.match(/^y$/)) {
      return dom.parent.props.y;
    }
    if (value.match(/^cx$/)) {
      return dom.parent.props.cx;
    }
    if (value.match(/^cy$/)) {
      return dom.parent.props.cy;
    }
    if (value.match(/^l$/)) {
      return dom.parent.props.l;
    }
    if (value.match(/^r$/)) {
      return dom.parent.props.r;
    }
    if (value.match(/^t$/)) {
      return dom.parent.props.t;
    }
    if (value.match(/^h$/)) {
      return dom.parent.props.h;
    }
    if (value.match(/^.+px$/)) {
      return Number(value.replace(/px/, ''));
    }
    if (value.match(/^min\(.+\)$/)) {
      const splits = value.replace(/^min\(/, '').replace(/\)$/, '').split(/\s?,\s?/);
      splits.forEach((i, index) => {
        splits[index] = unit(i, property);
      });
      return Math.min(...splits);
    }
    if (value.match(/^max\(.+\)$/)) {
      const splits = value.replace(/^max\(/, '').replace(/\)$/, '').split(/(\s+)?,(\s+)?/);
      splits.forEach((i, index) => {
        splits[index] = unit(i, property);
      });
      return Math.max(...splits);
    }
    if (value.match(/^.+%$/)) {
      if (property === 'x' || property === 'cx' || property === 'gx' || property === 'w' || property === 'l' || property === 'r') return dom.parent.props.w * Number(value.replace(/%/, '')) / 100;
      if (property === 'y' || property === 'cy' || property === 'gy' || property === 'h' || property === 'r' || property === 'b') return dom.parent.props.h * Number(value.replace(/%/, '')) / 100;
    }
    if (value.match(/^.+vmin$/)) {
      return dom.parent.props.vmin * Number(value.replace(/vmin/, ''));
    }
    if (value.match(/^.+vmax$/)) {
      return dom.parent.props.vmax * Number(value.replace(/vmax/, ''));
    }
    if (value.match(/^.+vw$/)) {
      return dom.parent.props.vw * Number(value.replace(/vw/, ''));
    }
    if (value.match(/^.+vh$/)) {
      return dom.parent.props.vh * Number(value.replace(/vh/, ''));
    }
    if (value.match(/^calc\(.+\)$/)) {
      return value.replace(/^calc\(/, '').replace(/\)$/, '').split(/\s+/).reduce((t, i) => {
        if (i === '+' || i === '-' || i === '*' || i === '/') t.operator = i;
        if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '+') t.value = t.value + unit(i, property);
        if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '-') t.value = t.value - unit(i, property);
        if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '*') t.value = t.value * unit(i, property);
        if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '/') t.value = t.value / unit(i, property);
        if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === undefined) t.value = unit(i, property);
        return t;
      }, {
        value: undefined,
        operator: undefined
      }).value;
    }
  };
  const analysis = () => {
    if (dom.props && dom.parent) {
      if (property === undefined || typeof property === 'string' && property === 'w' || typeof property === 'object' && property.includes('w')) {
        if (typeof dom.props.w === 'number') {
          dom.props.w = dom.props.w;
        }
        if (typeof dom.props.w === 'function') {
          dom.props.w = value(dom.parent.props);
        }
        if (typeof dom.props.w === 'string') {
          dom.props.w = unit(dom.props.w, 'w');
        }
        if (typeof dom.props.w === 'undefined') {
          dom.props.w = dom.parent.props.w;
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'h' || typeof property === 'object' && property.includes('h')) {
        if (typeof dom.props.h === 'number') {
          dom.props.h = dom.props.h;
        }
        if (typeof dom.props.h === 'function') {
          dom.props.h = value(dom.parent.props);
        }
        if (typeof dom.props.h === 'string') {
          dom.props.h = unit(dom.props.h, 'h');
        }
        if (typeof dom.props.h === 'undefined') {
          dom.props.h = dom.parent.props.h;
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'x' || typeof property === 'object' && property.includes('x')) {
        if (typeof dom.props.x === 'number') {
          dom.props.x = dom.parent.props.x + dom.props.x;
        }
        if (typeof dom.props.x === 'function') {
          dom.props.x = dom.parent.props.x + value(dom.parent.props);
        }
        if (typeof dom.props.x === 'string') {
          dom.props.x = dom.parent.props.x + unit(dom.props.x, 'x');
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined') {
          dom.props.x = dom.parent.props.x;
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'y' || typeof property === 'object' && property.includes('y')) {
        if (typeof dom.props.y === 'number') {
          dom.props.y = dom.parent.props.y + dom.props.y;
        }
        if (typeof dom.props.y === 'function') {
          dom.props.y = dom.parent.props.y + value(dom.parent.props);
        }
        if (typeof dom.props.y === 'string') {
          dom.props.y = dom.parent.props.y + unit(dom.props.y, 'y');
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined') {
          dom.props.y = dom.parent.props.y;
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'cx' || typeof property === 'object' && property.includes('cx')) {
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.cx === 'number') {
          dom.props.x = dom.parent.props.x - dom.props.w / 2 + dom.props.cx;
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.cx === 'function') {
          dom.props.x = dom.parent.props.x - dom.props.w / 2 + value(dom.parent.props);
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.cx === 'string') {
          dom.props.x = dom.parent.props.x - dom.props.w / 2 + unit(dom.props.cx, 'cx');
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'cy' || typeof property === 'object' && property.includes('cy')) {
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.cy === 'number') {
          dom.props.y = dom.parent.props.y - dom.props.h / 2 + dom.props.cy;
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.cy === 'function') {
          dom.props.y = dom.parent.props.y - dom.props.h / 2 + value(dom.parent.props);
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.cy === 'string') {
          dom.props.y = dom.parent.props.y - dom.props.h / 2 + unit(dom.props.cy, 'cy');
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'gx' || typeof property === 'object' && property.includes('gx')) {
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.gx === 'number') {
          dom.props.x = dom.props.gx;
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.gx === 'function') {
          dom.props.x = value(dom.parent.props);
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.gx === 'string') {
          dom.props.x = unit(dom.props.gx, 'gx');
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'gy' || typeof property === 'object' && property.includes('gy')) {
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.gy === 'number') {
          dom.props.y = dom.props.gy;
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.gy === 'function') {
          dom.props.y = value(dom.parent.props);
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.gy === 'string') {
          dom.props.y = unit(dom.props.gy, 'gy');
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'l' || typeof property === 'object' && property.includes('l')) {
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.l === 'number') {
          dom.props.x = dom.parent.props.x + dom.props.l;
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.l === 'function') {
          dom.props.x = dom.parent.props.x + value(dom.parent.props);
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.r === 'undefined' && typeof dom.props.l === 'string') {
          dom.props.x = dom.parent.props.x + unit(dom.props.l, 'l');
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'r' || typeof property === 'object' && property.includes('r')) {
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'number') {
          dom.props.x = dom.parent.props.x + dom.parent.props.w - dom.props.r;
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'function') {
          dom.props.x = dom.parent.props.x + dom.parent.props.w - value(dom.parent.props);
        }
        if (typeof dom.props.x === 'undefined' && typeof dom.props.gx === 'undefined' && typeof dom.props.cx === 'undefined' && typeof dom.props.l === 'undefined' && typeof dom.props.r === 'string') {
          dom.props.x = dom.parent.props.x + dom.parent.props.w - unit(dom.props.r, 'r');
        }
      }
      if (property === undefined || typeof property === 'string' && property === 't' || typeof property === 'object' && property.includes('t')) {
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.t === 'number') {
          dom.props.y = dom.parent.props.y + dom.props.t;
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.t === 'function') {
          dom.props.y = dom.parent.props.y + value(dom.parent.props);
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.b === 'undefined' && typeof dom.props.t === 'string') {
          dom.props.y = dom.parent.props.y + unit(dom.props.t, 't');
        }
      }
      if (property === undefined || typeof property === 'string' && property === 'b' || typeof property === 'object' && property.includes('b')) {
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'number') {
          dom.props.y = dom.parent.props.y + dom.parent.props.h - dom.props.b;
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'function') {
          dom.props.y = dom.parent.props.y + dom.parent.props.h - value(dom.parent.props);
        }
        if (typeof dom.props.y === 'undefined' && typeof dom.props.gy === 'undefined' && typeof dom.props.cy === 'undefined' && typeof dom.props.t === 'undefined' && typeof dom.props.b === 'string') {
          dom.props.y = dom.parent.props.y + dom.parent.props.h - unit(dom.props.b, 'b');
        }
      }
    }
  };
  analysis();
};
const locationMount = dom => {
  locationAnalysis(dom);
  Object.assign(dom.props, CanvasXML_Canvas2d.Location.coordinate(dom.props));
};
const locationUnmount = dom => {
  Object.assign(dom.props, CanvasXML_Canvas2d.Location.coordinate(dom.props));
};
const renderMount_0 = dom => {
  CanvasXML_Canvas2d.context().save();
  const transformUnit = (type, value) => {
    if (type === 'rotate') CanvasXML_Canvas2d.context().rotate(value.angle);
    if (type === 'scale') CanvasXML_Canvas2d.context().scale(value.w, value.h);
    if (type === 'translate') CanvasXML_Canvas2d.context().translate(value.x, value.y);
  };
  if (dom.props.globalAlpha !== undefined) CanvasXML_Canvas2d.context().globalAlpha = CanvasXML_Canvas2d.context().globalAlpha * dom.props.globalAlpha;
  if (dom.props.font !== undefined) CanvasXML_Canvas2d.context().font = dom.props.font;
  if (dom.props.fillStyle !== undefined) CanvasXML_Canvas2d.context().fillStyle = dom.props.fillStyle;
  if (dom.props.strokeStyle !== undefined) CanvasXML_Canvas2d.context().strokeStyle = dom.props.strokeStyle;
  if (dom.props.lineWidth !== undefined) CanvasXML_Canvas2d.context().lineWidth = dom.props.lineWidth;
  if (dom.props.transform !== undefined) dom.props.transform.forEach(i => Object.keys(i).forEach(n => transformUnit(n, i[n])));
  if (Boolean(dom.props.beginPath) === true) CanvasXML_Canvas2d.context().beginPath();
};
const renderMount_1 = dom => {
  if (Boolean(dom.props.clip) === true) CanvasXML_Canvas2d.context().clip();
  if (Boolean(dom.props.fill) === true) CanvasXML_Canvas2d.context().fill();
  if (Boolean(dom.props.stroke) === true) CanvasXML_Canvas2d.context().stroke();
  if (Boolean(dom.props.isolated) === true) CanvasXML_Canvas2d.context().restore();
};
const renderUnmount_0 = dom => {
  if (Boolean(dom.props.isolated) !== true) CanvasXML_Canvas2d.context().restore();
};
const renderUnmount_1 = (dom, cover) => {
  const typeArray = [{
    type: 'click',
    event: dom.props.onClick,
    eventAway: dom.props.onClickAway,
    option: dom.props.onClickOption
  }, {
    type: 'touchstart',
    event: dom.props.onTouchStart || dom.props.onPointerDown,
    eventAway: dom.props.onTouchStartAway || dom.props.onPointerDownAway,
    option: dom.props.onTouchStartOption || dom.props.onPointerDownOption
  }, {
    type: 'touchmove',
    event: dom.props.onTouchMove || dom.props.onPointerMove,
    eventAway: dom.props.onTouchMoveAway || dom.props.onPointerMoveAway,
    option: dom.props.onTouchMoveOption || dom.props.onPointerMoveOption
  }, {
    type: 'touchend',
    event: dom.props.onTouchEnd || dom.props.onPointerUp,
    eventAway: dom.props.onTouchEndAway || dom.props.onPointerUpAway,
    option: dom.props.onTouchEndOption || dom.props.onPointerUpOption
  }, {
    type: 'mousedown',
    event: dom.props.onMouseDown || dom.props.onPointerDown,
    eventAway: dom.props.onMouseDownAway || dom.props.onPointerDownAway,
    option: dom.props.onMouseDownOption || dom.props.onPointerDownOption
  }, {
    type: 'mousemove',
    event: dom.props.onMouseMove || dom.props.onPointerMove,
    eventAway: dom.props.onMouseMoveAway || dom.props.onPointerMoveAway,
    option: dom.props.onMouseOption || dom.props.onPointerMoveOption
  }, {
    type: 'mouseup',
    event: dom.props.onMouseUp || dom.props.onPointerUp,
    eventAway: dom.props.onMouseUpAway || dom.props.onPointerUpAway,
    option: dom.props.onMouseUpOption || dom.props.onPointerUpOption
  }
  // {
  //   type: 'pointerdown',
  //   event: dom.props.onPointerDown,
  //   eventAway: dom.props.onPointerDownAway,
  //   option: dom.props.onPointerDownOption,
  // },
  // {
  //   type: 'pointermove',
  //   event: dom.props.onPointerMove,
  //   eventAway: dom.props.onPointerMoveAway,
  //   option: dom.props.onPointerMoveOption,
  // },
  // {
  //   type: 'pointerup',
  //   event: dom.props.onPointerUp,
  //   eventAway: dom.props.onPointerUpAway,
  //   option: dom.props.onPointerUpOption,
  // }
  ];
  const event = (e, i) => {
    const cr = e.xs.some((i, index) => cover(e.xs[index], e.ys[index]));
    if (cr === true && i.event) i.event({
      ...e,
      dom
    });
    if (cr !== true && i.eventAway) i.eventAway({
      ...e,
      dom
    });
  };
  typeArray.forEach(i => {
    if (i.event || i.eventAway) CanvasXML_Canvas2d.Event.addEventListener(i.type, e => event(e, i), i.option);
  });
};
const relocation = dom => {
  const tagComponent = pick(dom.element.tag);
  if (tagComponent !== undefined) tagComponent.locationMount(dom);
  if (tagComponent !== undefined && typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom);
  if (dom.children) dom.children.forEach(i => relocation(i));
  if (tagComponent !== undefined) tagComponent.locationUnmount(dom);
  if (tagComponent !== undefined && typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom);
};
const rerender = dom => {
  const tagComponent = pick(dom.element.tag);
  if (tagComponent !== undefined) tagComponent.renderMount(dom);
  if (tagComponent !== undefined && typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom);
  if (dom.children) dom.children.toSorted((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i));
  if (tagComponent !== undefined) tagComponent.renderUnmount(dom);
  if (tagComponent !== undefined && typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom);
};
const pick = tag => {
  if (tag === 'arc') return CanvasXML_Canvas2d_Tag_Component_Arc;
  if (tag === 'circle') return CanvasXML_Canvas2d_Tag_Component_Circle;
  if (tag === 'clip') return CanvasXML_Canvas2d_Tag_Component_Clip;
  if (tag === 'fill') return CanvasXML_Canvas2d_Tag_Component_Fill;
  if (tag === 'image') return CanvasXML_Canvas2d_Tag_Component_Image;
  if (tag === 'layout') return CanvasXML_Canvas2d_Tag_Component_Layout;
  if (tag === 'line') return CanvasXML_Canvas2d_Tag_Component_Line;
  if (tag === 'rect') return CanvasXML_Canvas2d_Tag_Component_Rect;
  if (tag === 'rotate') return CanvasXML_Canvas2d_Tag_Component_Rotate;
  if (tag === 'scale') return CanvasXML_Canvas2d_Tag_Component_Scale;
  if (tag === 'stroke') return CanvasXML_Canvas2d_Tag_Component_Stroke;
  if (tag === 'text') return CanvasXML_Canvas2d_Tag_Component_Text;
  if (tag === 'translate') return CanvasXML_Canvas2d_Tag_Component_Translate;
};
const Canvas2dTag = {
  pick,
  relocation,
  rerender,
  locationAnalysis,
  locationMount,
  locationUnmount,
  renderMount_0,
  renderMount_1,
  renderUnmount_0,
  renderUnmount_1,
  Arc: CanvasXML_Canvas2d_Tag_Component_Arc,
  Clip: CanvasXML_Canvas2d_Tag_Component_Clip,
  Fill: CanvasXML_Canvas2d_Tag_Component_Fill,
  Image: CanvasXML_Canvas2d_Tag_Component_Image,
  Layout: CanvasXML_Canvas2d_Tag_Component_Layout,
  Rect: CanvasXML_Canvas2d_Tag_Component_Rect,
  Stroke: CanvasXML_Canvas2d_Tag_Component_Stroke,
  Text: CanvasXML_Canvas2d_Tag_Component_Text
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag = (Canvas2dTag);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Event.js

var CanvasXML_Canvas2d_Event_event = [];
var eventWithCanvas = [];
const addEventListener = (type, callback, option) => {
  if (callback) CanvasXML_Canvas2d_Event_event = [...CanvasXML_Canvas2d_Event_event, {
    type,
    callback,
    option
  }];
};
const removeEventListener = (type, callback) => {
  if (callback) CanvasXML_Canvas2d_Event_event = CanvasXML_Canvas2d_Event_event.filter(i => i.type !== type || i.callback !== callback);
};
const clearEventListener = () => {
  CanvasXML_Canvas2d_Event_event = [];
};
const execute = (e, type) => {
  const exe = CanvasXML_Canvas2d_Event_event.filter(i => i.type === type).sort((a, b) => {
    const a_ = a.option === undefined || a.option.priority === undefined ? 0 : a.option.priority;
    const b_ = b.option === undefined || b.option.priority === undefined ? 0 : b.option.priority;
    return b_ - a_;
  });
  var stopPropagation = false;
  exe.forEach(i => {
    var x;
    var y;
    var xs;
    var ys;
    var device;
    if (e.pageX) x = (e.pageX - CanvasXML_Canvas2d.rect().x) * CanvasXML_Canvas2d.dpr();
    if (e.pageY) y = (e.pageY - CanvasXML_Canvas2d.rect().y) * CanvasXML_Canvas2d.dpr();
    if (e.changedTouches) xs = [...e.changedTouches].map(i => (i.pageX - CanvasXML_Canvas2d.rect().x) * CanvasXML_Canvas2d.dpr());
    if (e.changedTouches) ys = [...e.changedTouches].map(i => (i.pageY - CanvasXML_Canvas2d.rect().y) * CanvasXML_Canvas2d.dpr());
    if (window.ontouchstart === undefined) device = 'mouse';
    if (window.ontouchstart !== undefined) device = 'touch';
    if (x === undefined && xs === undefined) return;
    if (y === undefined && ys === undefined) return;
    if (x === undefined) x = xs[0];
    if (y === undefined) y = ys[0];
    if (xs === undefined) xs = [x];
    if (ys === undefined) ys = [y];
    const re = {
      native: e,
      x: x,
      y: y,
      xs: xs,
      ys: ys,
      device: device,
      stopPropagation: () => stopPropagation = true
    };
    if (stopPropagation === false) i.callback(re);
  });
};
const addEventListenerWithCanvas = canvas => {
  const add = type => {
    const event = e => execute(e, type);
    canvas.addEventListener(type, event, {
      passive: true
    });
    eventWithCanvas.push({
      type,
      event
    });
  };
  new Array('click', 'pointerdown', 'pointermove', 'pointerup').forEach(add);
  if (window.ontouchstart !== undefined) {
    new Array('touchstart', 'touchmove', 'touchend').forEach(add);
  }
  if (window.ontouchstart === undefined) {
    new Array('mousedown', 'mousemove', 'mouseup').forEach(add);
  }
};
const removeEventListenerWithCanvas = canvas => {
  eventWithCanvas.forEach(i => canvas.removeEventListener(i.type, i.event));
  eventWithCanvas = [];
};
const Canvas2dEvent = {
  addEventListener,
  removeEventListener,
  clearEventListener,
  addEventListenerWithCanvas,
  removeEventListenerWithCanvas
};
/* harmony default export */ const CanvasXML_Canvas2d_Event = (Canvas2dEvent);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Location.js
const nan = n => isNaN(n) ? NaN : n;
const x = location => nan(location.x);
const y = location => nan(location.y);
const w = location => nan(location.w);
const h = location => nan(location.h);
const locational = location => Object({
  x: x(location),
  y: y(location),
  w: w(location),
  h: h(location)
});
const l = location => nan(location.x);
const r = location => nan(location.x + location.w);
const t = location => nan(location.y);
const b = location => nan(location.y + location.h);
const wireframe = location => Object({
  l: l(location),
  r: r(location),
  t: t(location),
  b: b(location)
});
const cx = location => nan(location.x + location.w / 2);
const cy = location => nan(location.y + location.h / 2);
const ltx = location => nan(location.x);
const lty = location => nan(location.y);
const lbx = location => nan(location.x);
const lby = location => nan(location.y + location.h);
const rtx = location => nan(location.x + location.w);
const rty = location => nan(location.y);
const rbx = location => nan(location.x + location.w);
const rby = location => nan(location.y + location.h);
const point = location => Object({
  cx: cx(location),
  cy: cy(location),
  ltx: ltx(location),
  lty: lty(location),
  lbx: lbx(location),
  lby: lby(location),
  rtx: rtx(location),
  rty: rty(location),
  rbx: rbx(location),
  rby: rby(location)
});
const vmin = location => nan(Math.min(location.w, location.h) * 0.01);
const vmax = location => nan(Math.max(location.w, location.h) * 0.01);
const vw = location => nan(location.w * 0.01);
const vh = location => nan(location.h * 0.01);
const viewport = location => Object({
  vmin: vmin(location),
  vmax: vmax(location),
  vw: vw(location),
  vh: vh(location)
});
const coordinate = location => {
  return Object({
    ...locational(location),
    ...wireframe(location),
    ...point(location),
    ...viewport(location)
  });
};
const validate = positions => {
  const result = positions.reduce((t, i) => {
    return t && typeof i.x === 'number' && typeof i.y === 'number' && typeof i.w === 'number' && typeof i.h === 'number';
  }, true);
  return result;
};
const add = positions => {
  const sum = positions.reduce((t, i) => {
    return {
      x: t.x !== undefined ? t.x + i.x : i.x,
      y: t.y !== undefined ? t.y + i.y : i.y,
      w: t.w !== undefined ? t.w + i.w : i.w,
      h: t.h !== undefined ? t.h + i.h : i.h
    };
  }, {
    x: undefined,
    y: undefined,
    w: undefined,
    h: undefined
  });
  return sum;
};
const box = positions => {
  const point = positions.reduce((t, i) => {
    return {
      boxt: t.boxt !== undefined ? isNaN(i.y) ? t.boxt : Math.min(t.boxt, i.y) : isNaN(i.y) ? t.boxt : i.y,
      boxb: t.boxb !== undefined ? isNaN(i.y + i.h) ? t.boxb : Math.max(t.boxb, i.y + i.h) : isNaN(i.y + i.h) ? t.boxt : i.y + i.h,
      boxl: t.boxl !== undefined ? isNaN(i.x) ? t.boxl : Math.min(t.boxl, i.x) : isNaN(i.x) ? t.boxt : i.x,
      boxr: t.boxr !== undefined ? isNaN(i.x + i.w) ? t.boxr : Math.max(t.boxr, i.x + i.w) : isNaN(i.x + i.w) ? t.boxt : i.x + i.w
    };
  }, {
    boxt: undefined,
    boxb: undefined,
    boxl: undefined,
    boxr: undefined
  });
  return {
    x: point.boxl,
    y: point.boxt,
    w: point.boxr - point.boxl,
    h: point.boxb - point.boxt
  };
};
const wmin = positions => positions.reduce((t, i) => i.w ? Math.min(i.w, t) : t, 0);
const wmax = positions => positions.reduce((t, i) => i.w ? Math.max(i.w, t) : t, 0);
const hmin = positions => positions.reduce((t, i) => i.h ? Math.min(i.h, t) : t, 0);
const hmax = positions => positions.reduce((t, i) => i.h ? Math.max(i.h, t) : t, 0);
const Canvas2dLocation = {
  x,
  y,
  w,
  h,
  locational,
  l,
  r,
  t,
  b,
  wireframe,
  cx,
  cy,
  ltx,
  lty,
  lbx,
  lby,
  rtx,
  rty,
  rbx,
  rby,
  point,
  vmin,
  vmax,
  vw,
  vh,
  viewport,
  coordinate,
  validate,
  add,
  box,
  wmin,
  wmax,
  hmin,
  hmax
};
/* harmony default export */ const CanvasXML_Canvas2d_Location = (Canvas2dLocation);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.js



var canvas;
var context;
var dpr;
var rect;
const CanvasXML_Canvas2d_update = () => {
  rect = canvas.getBoundingClientRect();
  if (rect.x === undefined) rect.x = rect.left;
  if (rect.y === undefined) rect.y = rect.top;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  canvas.coordinate = CanvasXML_Canvas2d_Location.coordinate({
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height
  });
};
const CanvasXML_Canvas2d_mount = (canvas_0, dpr_0) => {
  canvas = canvas_0;
  dpr = dpr_0;
  context = canvas.getContext('2d');
  CanvasXML_Canvas2d_update();
  CanvasXML_Canvas2d_Event.removeEventListenerWithCanvas(canvas);
  CanvasXML_Canvas2d_Event.addEventListenerWithCanvas(canvas);
};
const unMount = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas = undefined;
  context = undefined;
  dpr = undefined;
  rect = undefined;
  CanvasXML_Canvas2d_Event.clearEventListener();
};
const CanvasXML_Canvas2d_render = dom => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  CanvasXML_Canvas2d_Event.clearEventListener();
  CanvasXML_Canvas2d_Tag.relocation(dom);
  CanvasXML_Canvas2d_Tag.rerender(dom);
};
const Export = {
  dpr: () => dpr,
  canvas: () => canvas,
  context: () => context,
  rect: () => rect,
  update: CanvasXML_Canvas2d_update,
  mount: CanvasXML_Canvas2d_mount,
  unMount,
  render: CanvasXML_Canvas2d_render,
  Tag: CanvasXML_Canvas2d_Tag,
  Event: CanvasXML_Canvas2d_Event,
  Location: CanvasXML_Canvas2d_Location
};
/* harmony default export */ const CanvasXML_Canvas2d = (Export);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.Accordion.js



function CanvasXML_ReactCanvas2d_Component_Accordion_App(props) {
  const titleH = props.titleH || 0;
  const contentH = props.contentH || 0;
  const x = props.x || undefined;
  const y = props.y || undefined;
  const w = props.w || undefined;
  const h = props.h || undefined;
  const [expand, setExpand] = CanvasXML_React.useState(props.defaultExpand || false);
  const expandUse = props.expand === undefined ? expand : props.expand;
  const {
    animationCount: animationCountContentH
  } = CanvasXML_React.Plugin.useAnimationDestination({
    play: true,
    defaultCount: expandUse ? contentH : 0,
    destination: expandUse ? contentH : 0,
    rate: contentH / 5,
    postprocess: n => Number(n.toFixed(2))
  });
  CanvasXML_React.Plugin.useEffectUpdate(() => {
    if (props.onChangeExpand) props.onChangeExpand(expandUse);
  }, [expandUse]);
  CanvasXML_React.Plugin.useEffectUpdate(() => {
    if (props.onChangeHeight) props.onChangeHeight(animationCountContentH);
  }, [animationCountContentH]);
  if (props.ref) props.ref({
    expand,
    setExpand
  });
  return /*#__PURE__*/CanvasXML_React.createElement("layout", {
    x: x,
    y: y,
    w: w,
    h: titleH + animationCountContentH,
    container: true,
    verticalForward: true
  }, /*#__PURE__*/CanvasXML_React.createElement("rect", props.onAccordion), /*#__PURE__*/CanvasXML_React.createElement("layout", {
    h: titleH,
    item: true
  }, /*#__PURE__*/CanvasXML_React.createElement("rect", props.onTitle), /*#__PURE__*/CanvasXML_React.createElement("rect", {
    beginPath: true,
    clip: true,
    onClick: () => setExpand(!expand)
  }, props.titleComponent)), /*#__PURE__*/CanvasXML_React.createElement("layout", {
    h: animationCountContentH,
    item: true
  }, /*#__PURE__*/CanvasXML_React.createElement("rect", props.onContent), /*#__PURE__*/CanvasXML_React.createElement("rect", {
    beginPath: true,
    clip: true
  }, props.contentComponent)));
}
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component_Accordion = (CanvasXML_ReactCanvas2d_Component_Accordion_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.Button.js
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }



function CanvasXML_ReactCanvas2d_Component_Button_App(props) {
  const text = props.text || '';
  const textColor = props.textColor || new Array([215, 255], [215, 255], [215, 255], [1, 1]);
  const rectColor = props.rectColor || new Array([45, 85], [45, 85], [45, 85], [1, 1]);
  const radius = props.radius || 0;
  const fontSize = props.fontSize || 24;
  const fontFamily = props.fontFamily || 'monospace';
  const fontAlign = props.fontAlign || 'center';
  const mode = props.mode || 'fill';
  const lineWidth = props.lineWidth || 1;
  const padding = props.padding || 24;
  const x = props.x || undefined;
  const y = props.y || undefined;
  const w = props.w || undefined;
  const h = props.h || undefined;
  const [hover, setHover] = CanvasXML_React.useState(false);
  const animationCountTextRGBA = textColor.map((i, index) => CanvasXML_React.Plugin.useAnimationDestination({
    play: true,
    defaultCount: i[0],
    destination: i[hover ? 1 : 0],
    rate: Math.abs(i[1] - i[0]) / 15,
    postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0))
  }));
  const animationCountRectRGBA = rectColor.map((i, index) => CanvasXML_React.Plugin.useAnimationDestination({
    play: true,
    defaultCount: i[0],
    destination: i[hover ? 1 : 0],
    rate: Math.abs(i[1] - i[0]) / 15,
    postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0))
  }));
  const textRGBA = `rgba(${animationCountTextRGBA[0].animationCount}, ${animationCountTextRGBA[1].animationCount}, ${animationCountTextRGBA[2].animationCount}, ${animationCountTextRGBA[3].animationCount})`;
  const rectRGBA = `rgba(${animationCountRectRGBA[0].animationCount}, ${animationCountRectRGBA[1].animationCount}, ${animationCountRectRGBA[2].animationCount}, ${animationCountRectRGBA[3].animationCount})`;
  const font = `${fontSize}px ${fontFamily}`;
  const gap = fontSize / 2;
  const lineHeight = 1;
  return /*#__PURE__*/CanvasXML_React.createElement("layout", {
    x: x,
    y: y,
    w: w,
    h: h
  }, /*#__PURE__*/CanvasXML_React.createElement("rect", _extends({
    beginPath: true,
    radius: radius
  }, props.onButton)), /*#__PURE__*/CanvasXML_React.createElement("rect", {
    beginPath: true,
    fill: mode === 'fill',
    stroke: mode === 'stroke',
    clip: true,
    fillStyle: mode === 'fill' ? rectRGBA : undefined,
    strokeStyle: mode === 'stroke' ? rectRGBA : undefined,
    lineWidth: lineWidth,
    radius: radius,
    onPointerDown: () => setHover(true),
    onPointerMove: () => setHover(true),
    onPointerMoveAway: () => setHover(false),
    onPointerUp: () => setHover(false)
  }, /*#__PURE__*/CanvasXML_React.createElement("layout", {
    container: true,
    horizontalAlignCenter: true,
    verticalAlignCenter: true
  }, /*#__PURE__*/CanvasXML_React.createElement("layout", {
    w: `calc(100% - ${padding})`,
    h: `calc(100% - ${padding})`,
    item: true,
    container: true,
    horizontalAlignCenter: true,
    verticalAlignCenter: true
  }, /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_ReactCanvas2d.Component.TextCaculateLine, {
    text: text,
    font: font,
    lineHeight: lineHeight,
    gap: gap,
    w: w - padding,
    split: " "
  }, (line, location) => {
    return /*#__PURE__*/CanvasXML_React.createElement("layout", {
      h: location.h,
      item: true
    }, /*#__PURE__*/CanvasXML_React.createElement("text", {
      fillText: true,
      fillStyle: textRGBA,
      align: fontAlign,
      text: text,
      font: font,
      lineHeight: lineHeight,
      gap: gap,
      w: w - padding,
      split: " ",
      wrap: true,
      line: line
    }));
  })))));
}
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component_Button = (CanvasXML_ReactCanvas2d_Component_Button_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.CoordinateHelper.js

const CanvasXML_ReactCanvas2d_Component_CoordinateHelper_App = props => {
  const [repeatX, setRepeatX] = CanvasXML_React.useState();
  const [repeatY, setRepeatY] = CanvasXML_React.useState();
  const caculateRepeat = dom => {
    setRepeatX(Math.ceil(dom.props.w / props.gap / 2));
    setRepeatY(Math.ceil(dom.props.h / props.gap / 2));
  };
  return /*#__PURE__*/CanvasXML_React.createElement("layout", {
    onRenderUnmount: dom => caculateRepeat(dom)
  }, repeatX !== undefined && repeatY !== undefined ? /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
    beginPath: true,
    fill: true,
    w: "0.1vmax",
    cx: "calc(50%)",
    globalAlpha: 0.5,
    fillStyle: props.color
  }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
    beginPath: true,
    fill: true,
    h: "0.1vmax",
    cy: "calc(50%)",
    globalAlpha: 0.5,
    fillStyle: props.color
  }), new Array(repeatX).fill().map((i, index) => {
    return /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      w: "0.1vmax",
      cx: `calc(50% + ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      w: "0.1vmax",
      cx: `calc(50% - ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }));
  }), new Array(repeatY).fill().map((i, index) => {
    return /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      h: "0.1vmax",
      cy: `calc(50% + ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      h: "0.1vmax",
      cy: `calc(50% - ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }));
  })) : null);
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component_CoordinateHelper = (CanvasXML_ReactCanvas2d_Component_CoordinateHelper_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.TextCaculateLine.js


const CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLine = CanvasXML_Canvas2d.Tag.Text.caculateLine;
const CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLineLocation = CanvasXML_Canvas2d.Tag.Text.caculateLineLocation;
const CanvasXML_ReactCanvas2d_Component_TextCaculateLine_App = props => {
  const line = CanvasXML_React.useMemo(() => {
    return CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLine(props.text, props.font, props.w, props.wrap, props.ellipsis, props.split);
  }, [props.text, props.font, props.w, props.wrap, props.ellipsis, props.split]);
  const location = CanvasXML_React.useMemo(() => {
    var w;
    var h;
    if (props.lineHeight !== undefined && props.gap !== undefined) {
      const location = CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLineLocation(line, props.lineHeight, props.gap);
      w = location.w;
      h = location.h;
    }
    return {
      w: w,
      h: h
    };
  }, [line, props.lineHeight, props.gap]);
  return props.children.map(i => i(line, location));
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component_TextCaculateLine = (CanvasXML_ReactCanvas2d_Component_TextCaculateLine_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.js




const ReactCanvas2dComponent = {
  Accordion: CanvasXML_ReactCanvas2d_Component_Accordion,
  Button: CanvasXML_ReactCanvas2d_Component_Button,
  CoordinateHelper: CanvasXML_ReactCanvas2d_Component_CoordinateHelper,
  TextCaculateLine: CanvasXML_ReactCanvas2d_Component_TextCaculateLine
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component = (ReactCanvas2dComponent);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Utils.js
const flatDom = dom => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()];
};
const getDomById = (dom, id) => {
  if (dom.props.id === id) return dom;
  if (dom.props.id !== id && dom.children !== undefined) return dom.children.find(i => getDomById(i, id));
  if (dom.props.id !== id && dom.children === undefined) return undefined;
};
const ReactCanvas2dUtils = {
  flatDom,
  getDomById
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Utils = (ReactCanvas2dUtils);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Plugin.js



const useAudio = props => {
  const [load, setLoad] = CanvasXML_React.useState(false);
  const audio = CanvasXML_React.useMemo(() => new Audio(), []);
  CanvasXML_React.useEffectImmediate(() => audio.src = props.src, [props.src]);
  CanvasXML_React.useEffectImmediate(() => setLoad(false), [props.src]);
  CanvasXML_React.useEffectImmediate(() => audio.onload = () => setLoad(true), [props.src]);
  CanvasXML_React.useEffectImmediate(() => audio.onloadeddata = () => setLoad(true), [props.src]);
  CanvasXML_React.useEffectImmediate(() => audio.oncanplay = () => setLoad(true), [props.src]);
  CanvasXML_React.useEffectImmediate(() => audio.oncanplaythrough = () => setLoad(true), [props.src]);
  return {
    load,
    audio
  };
};
const useImage = props => {
  const [load, setLoad] = CanvasXML_React.useState(false);
  const image = CanvasXML_React.useMemo(() => new Image(), []);
  CanvasXML_React.useEffectImmediate(() => image.src = props.src, [props.src]);
  CanvasXML_React.useEffectImmediate(() => setLoad(false), [props.src]);
  CanvasXML_React.useEffectImmediate(() => image.onload = () => setLoad(true), [props.src]);
  CanvasXML_React.useEffectImmediate(() => image.onloadeddata = () => setLoad(true), [props.src]);
  return {
    load,
    image
  };
};
const useResourceReload = props => {
  const [resourceCount, setResourceCount] = CanvasXML_React.useState(0);
  const [resourceLoading, setResourceLoading] = CanvasXML_React.useState(true);
  CanvasXML_React.useEffectImmediate(() => {
    setResourceCount(0);
    setResourceLoading(true);
    props.resource.forEach(i => fetch(i).then(() => setResourceCount(pre => pre + 1)));
  }, [...props.resource]);
  CanvasXML_React.useEffectImmediate(() => setResourceLoading(resourceCount < props.resource.length), [resourceCount]);
  return {
    resourceCount,
    resourceLoading
  };
};
const useLocationProperty = props => {
  const ref = CanvasXML_React.useRef();
  const [load, setLoad] = CanvasXML_React.useState(false);
  const [location, setLocation] = CanvasXML_React.useState(props.default);
  const locationProperty = Object.keys(location);
  CanvasXML_React.useEffect(() => {
    if (ref.current && locationProperty.some(i => location[i] !== ref.current.props[i])) {
      setLoad(true);
      setLocation(locationProperty.reduce((t, i) => Object({
        ...t,
        [i]: ref.current.props[i]
      }), Object));
    }
  });
  return {
    ref,
    load,
    location,
    setLocation
  };
};
const useLocationPropertyRef = props => {
  const ref = CanvasXML_React.useRef();
  const [load, setLoad] = CanvasXML_React.useState(false);
  const refLocation = CanvasXML_React.useRef(props.default);
  const locationProperty = Object.keys(location);
  CanvasXML_React.useEffect(() => {
    if (ref.current && locationProperty.some(i => location[i] !== ref.current.props[i])) {
      setLoad(true);
      refLocation.current = locationProperty.reduce((t, i) => Object({
        ...t,
        [i]: ref.current.props[i]
      }), Object);
    }
  });
  return {
    ref,
    load,
    location: refLocation.current
  };
};
const useLocationBox = props => {
  const ref = CanvasXML_React.useRef();
  const [location, setLocation] = CanvasXML_React.useState(props.default);
  CanvasXML_React.useEffect(() => {
    if (ref.current) {
      const key = Object.keys(location);
      const box = CanvasXML_Canvas2d.Location.box(CanvasXML_ReactCanvas2d_Utils.flatDom(ref.current).filter(i => i !== ref.current).map(i => i.props));
      if (key.some(i => location[i] !== box[i])) {
        setLocation(key.reduce((t, i) => Object({
          ...t,
          [i]: box[i]
        }), Object));
      }
    }
  });
  return {
    ref,
    location,
    setLocation
  };
};
const useEventDragControl = props => {
  const positionOrigin = CanvasXML_React.useRef();
  const positionTarget = CanvasXML_React.useRef();
  const onChange = CanvasXML_React.useCallback(params => {
    if (props.onChange) props.onChange(params);
  }, [props.onChange]);
  const onStart = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    const x = e.x;
    const y = e.y;
    positionOrigin.current = {
      x,
      y
    };
    positionTarget.current = {
      x,
      y
    };
    const changedX = 0;
    const changedY = 0;
    const continuedX = 0;
    const continuedY = 0;
    onChange({
      type: 'mouse',
      status: 'afterStart',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  const onMove = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    if (positionTarget.current === undefined) return;
    const x = e.x;
    const y = e.y;
    const changedX = x - positionTarget.current.x;
    const changedY = y - positionTarget.current.y;
    const continuedX = positionTarget.current.x - positionOrigin.current.x;
    const continuedY = positionTarget.current.y - positionOrigin.current.y;
    positionTarget.current = {
      x,
      y
    };
    onChange({
      type: 'mouse',
      status: 'afterMove',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  const onEnd = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    if (positionTarget.current === undefined) return;
    const x = e.x;
    const y = e.y;
    const changedX = x - positionTarget.current.x;
    const changedY = y - positionTarget.current.y;
    const continuedX = positionTarget.current.x - positionOrigin.current.x;
    const continuedY = positionTarget.current.y - positionOrigin.current.y;
    onChange({
      type: 'mouse',
      status: 'beforeEnd',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
    positionOrigin.current = undefined;
    positionTarget.current = undefined;
    onChange({
      type: 'mouse',
      status: 'afterEnd',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  return {
    onStart,
    onMove,
    onEnd
  };
};
const useEventCompose = props => {
  const onClick = [];
  const onClickAway = [];
  const onTouchStart = [];
  const onTouchStartAway = [];
  const onTouchMove = [];
  const onTouchMoveAway = [];
  const onTouchEnd = [];
  const onTouchEndAway = [];
  const onMouseDown = [];
  const onMouseDownAway = [];
  const onMouseMove = [];
  const onMouseMoveAway = [];
  const onMouseUp = [];
  const onMouseUpAway = [];
  const onPointerDown = [];
  const onPointerDownAway = [];
  const onPointerMove = [];
  const onPointerMoveAway = [];
  const onPointerUp = [];
  const onPointerUpAway = [];
  props.event.forEach(i => {
    if (i.onClick) onClick.push(i);
    if (i.onClickAway) onClickAway.push(i);
    if (i.onTouchStart) onTouchStart.push(i);
    if (i.onTouchStartAway) onTouchStartAway.push(i);
    if (i.onTouchMove) onTouchMove.push(i);
    if (i.onTouchMoveAway) onTouchMoveAway.push(i);
    if (i.onTouchEnd) onTouchEnd.push(i);
    if (i.onTouchEndAway) onTouchEndAway.push(i);
    if (i.onMouseDown) onMouseDown.push(i);
    if (i.onMouseDownAway) onMouseDownAway.push(i);
    if (i.onMouseMove) onMouseMove.push(i);
    if (i.onMouseMoveAway) onMouseMoveAway.push(i);
    if (i.onMouseUp) onMouseUp.push(i);
    if (i.onMouseUpAway) onMouseUpAway.push(i);
    if (i.onPointerDown) onPointerDown.push(i);
    if (i.onPointerDownAway) onPointerDownAway.push(i);
    if (i.onPointerMove) onPointerMove.push(i);
    if (i.onPointerMoveAway) onPointerMoveAway.push(i);
    if (i.onPointerUp) onPointerUp.push(i);
    if (i.onPointerUpAway) onPointerUpAway.push(i);
  });
  return {
    onClick: onClick.length === 0 ? undefined : () => onClick.forEach(i => i.onClick()),
    onClickAway: onClickAway.length === 0 ? undefined : () => onClickAway.forEach(i => i.onClickAway()),
    onTouchStart: onTouchStart.length === 0 ? undefined : () => onTouchStart.forEach(i => i.onTouchStart()),
    onTouchStartAway: onTouchStartAway.length === 0 ? undefined : () => onTouchStartAway.forEach(i => i.onTouchStartAway()),
    onTouchMove: onTouchMove.length === 0 ? undefined : () => onTouchMove.forEach(i => i.onTouchMove()),
    onTouchMoveAway: onTouchMoveAway.length === 0 ? undefined : () => onTouchMoveAway.forEach(i => i.onTouchMoveAway()),
    onTouchEnd: onTouchEnd.length === 0 ? undefined : () => onTouchEnd.forEach(i => i.onTouchEnd()),
    onTouchEndAway: onTouchEndAway.length === 0 ? undefined : () => onTouchEndAway.forEach(i => i.onTouchEndAway()),
    onMouseDown: onMouseDown.length === 0 ? undefined : () => onMouseDown.forEach(i => i.onMouseDown()),
    onMouseDownAway: onMouseDownAway.length === 0 ? undefined : () => onMouseDownAway.forEach(i => i.onMouseDownAway()),
    onMouseMove: onMouseMove.length === 0 ? undefined : () => onMouseMove.forEach(i => i.onMouseMove()),
    onMouseMoveAway: onMouseMoveAway.length === 0 ? undefined : () => onMouseMoveAway.forEach(i => i.onMouseMoveAway()),
    onMouseUp: onMouseUp.length === 0 ? undefined : () => onMouseUp.forEach(i => i.onMouseUp()),
    onMouseUpAway: onMouseUpAway.length === 0 ? undefined : () => onMouseUpAway.forEach(i => i.onMouseUpAway()),
    onPointerDown: onPointerDown.length === 0 ? undefined : () => onPointerDown.forEach(i => i.onPointerDown()),
    onPointerDownAway: onPointerDownAway.length === 0 ? undefined : () => onPointerDownAway.forEach(i => i.onPointerDownAway()),
    onPointerMove: onPointerMove.length === 0 ? undefined : () => onPointerMove.forEach(i => i.onPointerMove()),
    onPointerMoveAway: onPointerMoveAway.length === 0 ? undefined : () => onPointerMoveAway.forEach(i => i.onPointerMoveAway()),
    onPointerUp: onPointerUp.length === 0 ? undefined : () => onPointerUp.forEach(i => i.onPointerUp()),
    onPointerUpAway: onPointerUpAway.length === 0 ? undefined : () => onPointerUpAway.forEach(i => i.onPointerUpAway())
  };
};
const useEventClick = props => {
  const downRef = CanvasXML_React.useRef(false);
  const onDown = () => {
    downRef.current = true;
  };
  const onUp = () => {
    if (downRef.current === true) props.onClick();
    downRef.current = false;
  };
  const onUpAway = () => {
    downRef.current = false;
  };
  return {
    onDown,
    onUp,
    onUpAway
  };
};
const useEventPointerDown = props => {
  return {
    onTouchStart: props.onPointerDown,
    onMouseDown: props.onPointerDown
  };
};
const useEventPointerDownAway = props => {
  return {
    onTouchStartAway: props.onPointerDownAway,
    onMouseDownAway: props.onPointerDownAway
  };
};
const useEventPointerMove = props => {
  return {
    onTouchMove: props.onPointerMove,
    onMouseMove: props.onPointerMove
  };
};
const useEventPointerMoveAway = props => {
  return {
    onTouchMoveAway: props.onPointerMoveAway,
    onMouseMoveAway: props.onPointerMoveAway
  };
};
const useEventPointerUp = props => {
  return {
    onTouchEnd: props.onPointerUp,
    onMouseUp: props.onPointerUp
  };
};
const useEventPointerUpAway = props => {
  return {
    onTouchEndAway: props.onPointerUpAway,
    onMouseUpAway: props.onPointerUpAway
  };
};
const ReactCanvas2dPlugin = {
  useAudio,
  useImage,
  useResourceReload,
  useLocationProperty,
  useLocationPropertyRef,
  useLocationBox,
  useEventDragControl,
  useEventCompose,
  useEventClick,
  useEventPointerDown,
  useEventPointerDownAway,
  useEventPointerMove,
  useEventPointerMoveAway,
  useEventPointerUp,
  useEventPointerUpAway
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Plugin = (ReactCanvas2dPlugin);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.js





const createDom = node => {
  return {
    ...node,
    props: {
      ...node.element.props
    }
  };
};
const renderDom = dom => {
  while (dom.children.some(i => i.type !== 2)) {
    dom.children = dom.children.map(i => i.type !== 2 ? i.children : i).flat();
  }
  dom.children = dom.children.map(i => renderDom({
    ...createDom(i),
    parent: dom
  }));
  dom.getDomById = id => CanvasXML_ReactCanvas2d_Utils.getDomById(dom, id);
  return dom;
};
const renderCanvas = node => {
  const dom = createDom({
    element: {
      props: CanvasXML_Canvas2d.canvas().coordinate
    },
    children: [node]
  });
  const domCanvas2d = renderDom(dom);
  CanvasXML_Canvas2d.render(domCanvas2d);
};
const CanvasXML_ReactCanvas2d_update = () => {
  CanvasXML_Canvas2d.update();
  CanvasXML_React.shouldRender(CanvasXML_React.renderQueueNode());
};
const CanvasXML_ReactCanvas2d_mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2;
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0;
  CanvasXML_Canvas2d.mount(canvas, dpr);
  CanvasXML_React.mount(element, renderFrameTimeDiffMax, renderCanvas);
  return {
    render: CanvasXML_React.render
  };
};
const CanvasXML_ReactCanvas2d_unMount = () => {
  CanvasXML_Canvas2d.unMount();
  CanvasXML_React.unmount();
};
const ReactCanvas2d = {
  update: CanvasXML_ReactCanvas2d_update,
  mount: CanvasXML_ReactCanvas2d_mount,
  unMount: CanvasXML_ReactCanvas2d_unMount,
  Component: CanvasXML_ReactCanvas2d_Component,
  ...CanvasXML_ReactCanvas2d_Plugin,
  ...CanvasXML_ReactCanvas2d_Utils
};
/* harmony default export */ const CanvasXML_ReactCanvas2d = (ReactCanvas2d);
;// CONCATENATED MODULE: ./package/index.js



/* harmony default export */ const package_0 = ({
  React: CanvasXML_React,
  Canvas2d: CanvasXML_Canvas2d,
  ReactCanvas2d: CanvasXML_ReactCanvas2d
});

var __webpack_exports__Canvas2d = __webpack_exports__.$W;
var __webpack_exports__React = __webpack_exports__.q_;
var __webpack_exports__ReactCanvas2d = __webpack_exports__.EA;
var __webpack_exports__default = __webpack_exports__.Ay;
export { __webpack_exports__Canvas2d as Canvas2d, __webpack_exports__React as React, __webpack_exports__ReactCanvas2d as ReactCanvas2d, __webpack_exports__default as default };
