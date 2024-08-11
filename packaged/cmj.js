/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Canvas2d: () => (/* reexport */ Canvas2d),
  Canvas2dModule: () => (/* binding */ Canvas2dModule),
  Event: () => (/* reexport */ Module_Event),
  Graph: () => (/* reexport */ Module_Graph),
  Location: () => (/* reexport */ Module_Location),
  React: () => (/* reexport */ React),
  ReactCanvas2d: () => (/* reexport */ ReactCanvas2d),
  ReactCanvas2dExtensions: () => (/* reexport */ ReactCanvas2dExtensions_namespaceObject),
  ReactExtensions: () => (/* reexport */ ReactExtensions_namespaceObject),
  Tag: () => (/* reexport */ Module_Tag)
});

// NAMESPACE OBJECT: ./package/ReactExtensions/index.js
var ReactExtensions_namespaceObject = {};
__webpack_require__.r(ReactExtensions_namespaceObject);
__webpack_require__.d(ReactExtensions_namespaceObject, {
  useAnimationCount: () => (Hook_UseAnimationCount),
  useAnimationDestination: () => (Hook_UseAnimationDestination),
  useEffectUpdate: () => (Hook_UseEffectUpdate)
});

// NAMESPACE OBJECT: ./package/ReactCanvas2dExtensions/index.js
var ReactCanvas2dExtensions_namespaceObject = {};
__webpack_require__.r(ReactCanvas2dExtensions_namespaceObject);
__webpack_require__.d(ReactCanvas2dExtensions_namespaceObject, {
  Accordion: () => (Component_Accordion),
  Button: () => (Component_Button),
  CanvasLayout: () => (Component_CanvasLayout),
  CoordinateHelper: () => (Component_CoordinateHelper),
  PoweredBy: () => (Component_PoweredBy),
  Rotate: () => (Component_Rotate),
  TextCaculateLine: () => (Component_TextCaculateLine),
  flatDom: () => (Utils_FlatDom),
  getDomById: () => (Utils_GetDomById),
  useAudio: () => (Hook_UseAudio),
  useEventClick: () => (Hook_UseEventClick),
  useEventCompose: () => (Hook_UseEventCompose),
  useEventDragControl: () => (Hook_UseEventDragControl),
  useImage: () => (Hook_UseImage),
  useLocationBox: () => (Hook_UseLocationBox),
  useLocationProperty: () => (Hook_UseLocationProperty),
  useLocationPropertyRef: () => (Hook_UseLocationPropertyRef),
  useResourceReload: () => (Hook_UseResourceReload),
  useTextCaculateLine: () => (Hook_UseTextCaculateLine)
});

;// CONCATENATED MODULE: ./package/React/Core.js
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
      children: node.element.props.children || node.element.children
    }));
  }
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 2) {
    childrenIteration = node.element.props.children || node.element.children;
  }
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 3) {
    childrenIteration = node.element;
  }
  if (node.memo === true && updateQueueNodeFilter.includes(node) !== true && node.type !== 0) {
    childrenIteration = node.children.map(i => i.element);
  }
  childrenDestory = node.children;
  childrenIteration.forEach((i, index) => {
    var equalIndex = node.children.findIndex(n => n && i && typeof n === 'object' && typeof i === 'object' && n.key !== undefined && n.key === i.key && n.element.tag === i.tag);
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
  return {
    render
  };
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
/* harmony default export */ const Core = ({
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
  useState: hook(useState),
  useRef: hook(useRef),
  useEffect: hook(useEffect),
  useEffectImmediateLoopEnd: hook(useEffectImmediateLoopEnd),
  useEffectImmediate: hook(useEffectImmediate),
  useMemo: hook(useMemo),
  useCallback: hook(useCallback)
});
;// CONCATENATED MODULE: ./package/React/index.js

/* harmony default export */ const React = (Core);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Location.js
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
/* harmony default export */ const Module_Location = ({
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
});
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Event.js

var Module_Event_event = [];
var eventWithCanvas = [];
const addEventListener = (type, callback, option) => {
  if (callback) Module_Event_event = [...Module_Event_event, {
    type,
    callback,
    option
  }];
};
const removeEventListener = (type, callback) => {
  if (callback) Module_Event_event = Module_Event_event.filter(i => i.type !== type || i.callback !== callback);
};
const clearEventListener = () => {
  Module_Event_event = [];
};
const execute = (e, type) => {
  const exe = Module_Event_event.filter(i => i.type === type).sort((a, b) => {
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
    if (e.pageX) x = (e.pageX - Canvas2d_Core.rect().x) * Canvas2d_Core.dpr();
    if (e.pageY) y = (e.pageY - Canvas2d_Core.rect().y) * Canvas2d_Core.dpr();
    if (e.changedTouches) xs = [...e.changedTouches].map(i => (i.pageX - Canvas2d_Core.rect().x) * Canvas2d_Core.dpr());
    if (e.changedTouches) ys = [...e.changedTouches].map(i => (i.pageY - Canvas2d_Core.rect().y) * Canvas2d_Core.dpr());
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
/* harmony default export */ const Module_Event = ({
  addEventListener,
  removeEventListener,
  clearEventListener,
  addEventListenerWithCanvas,
  removeEventListenerWithCanvas
});
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Arc.js


const cover = (targetX, targetY, circleX, circleY, radius) => {
  return (Math.abs(targetX - circleX) ** 2 + Math.abs(targetY - circleY) ** 2) ** 0.5 <= radius;
};
const App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
    Module_Tag.renderUnmount_1(dom, (x, y) => cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise));
  }
};
/* harmony default export */ const Module_Tag_Component_Arc = (App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Circle.js


const Module_Tag_Component_Circle_cover = (targetX, targetY, circleX, circleY, radius, sAngle, eAngle, counterclockwise) => {
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
const Module_Tag_Component_Circle_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().moveTo(dom.props.cx, dom.props.cy);
    Canvas2d_Core.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise);
    Canvas2d_Core.context().lineTo(dom.props.cx, dom.props.cy);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
    Module_Tag.renderUnmount_1(dom, (x, y) => Module_Tag_Component_Circle_cover(x, y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise));
  }
};
/* harmony default export */ const Module_Tag_Component_Circle = (Module_Tag_Component_Circle_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Clip.js


const Module_Tag_Component_Clip_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().clip();
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Clip = (Module_Tag_Component_Clip_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Fill.js


const Module_Tag_Component_Fill_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().fill();
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Fill = (Module_Tag_Component_Fill_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Image.js


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
const Module_Tag_Component_Image_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    if (dom.props.src) {
      const params = caculateImageParams({
        x: dom.props.x,
        y: dom.props.y,
        w: dom.props.w,
        h: dom.props.h
      }, dom.props.src, dom.props.size, dom.props.position);
      if (params !== undefined) {
        Canvas2d_Core.context().drawImage(dom.props.src, params.sx, params.sy, params.sw, params.sh, params.x, params.y, params.w, params.h);
      }
    }
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Image = (Module_Tag_Component_Image_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Layout.js



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
  var w = Module_Location.add(unitPositons).w + (unitPositons.length - 1) * gap;
  unitPositons.forEach(i => {
    i.x = (layoutPosition.w - w) / 2 + x;
    x = x + i.w + gap;
  });
  return unitPositons;
};
const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = Module_Location.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = (layoutPosition.w - w) / (unitPositons.length + 1) * (index + 1) + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = Module_Location.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = (layoutPosition.w - w) / (unitPositons.length - 1) * index + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = 0;
  });
  return unitPositons;
};
const horizontalAlignReverse = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.w - i.w;
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
  if (tw < layoutPosition.w && tgrow > 0) {
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
  var h = Module_Location.add(unitPositons).h + (unitPositons.length - 1) * gap;
  unitPositons.forEach(i => {
    i.y = (layoutPosition.h - h) / 2 + y;
    y = y + i.h + gap;
  });
  return unitPositons;
};
const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = Module_Location.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = (layoutPosition.h - h) / (unitPositons.length + 1) * (index + 1) + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = Module_Location.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = (layoutPosition.h - h) / (unitPositons.length - 1) * index + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = 0;
  });
  return unitPositons;
};
const verticalAlignReverse = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.h - i.h;
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
  if (th < layoutPosition.h && tgrow > 0) {
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
    h: Module_Location.hmax(i)
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
    w: Module_Location.wmax(i)
  })), gap).forEach((i, index) => accommodateResult[index].forEach(a => a.x = i.x));
  accommodateResult.forEach(i => layoutInner({
    y: layoutPosition.y,
    h: layoutPosition.h
  }, i), gap);
  return unitPositons;
};
const Module_Tag_Component_Layout_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
    if (Boolean(dom.props.container) === true && dom.children.length > 0) {
      const gap = dom.props.gap || 0;
      const layoutItem = dom.children.filter(i => i.element.tag === 'layout' && Boolean(i.props.item) === true);
      layoutItem.forEach(i => {
        Module_Tag.locationMount(i);
        i.props = {
          ...i.element.props,
          w: i.props.w,
          h: i.props.h
        };
      });
      const layoutItemProps = layoutItem.map(i => i.props);
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
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Layout = (Module_Tag_Component_Layout_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Line.js


const Module_Tag_Component_Line_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    dom.children.filter(i => i.element.tag === 'path').map(i => i.props).forEach((i, index) => {
      if (index === 0) Canvas2d_Core.context().moveTo(i.x, i.y);
      if (index === 0) Canvas2d_Core.context().lineTo(i.x, i.y);
      if (index !== 0) Canvas2d_Core.context().lineTo(i.x, i.y);
    });
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Line = (Module_Tag_Component_Line_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Path.js


const Module_Tag_Component_Path_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Path = (Module_Tag_Component_Path_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Rect.js


const coverRect = (targetX, targetY, rectX, rectY, rectWidth, rectHeight) => {
  return targetX >= rectX && targetX <= rectX + rectWidth && targetY >= rectY && targetY <= rectY + rectHeight;
};
const Module_Tag_Component_Rect_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().rect(dom.props.x, dom.props.y, dom.props.w, dom.props.h);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
    Module_Tag.renderUnmount_1(dom, (x, y) => coverRect(x, y, dom.props.x, dom.props.y, dom.props.w, dom.props.h));
  }
};
/* harmony default export */ const Module_Tag_Component_Rect = (Module_Tag_Component_Rect_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.RectRadius.js


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
const Module_Tag_Component_RectRadius_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    const radius = fillRadius(dom.props.radius);
    radius.forEach((i, index) => {
      if (radius[index] > dom.props.w / 2) radius[index] = dom.props.w / 2;
      if (radius[index] > dom.props.h / 2) radius[index] = dom.props.h / 2;
      if (radius[index] < 0) radius[index] = 0;
    });
    Canvas2d_Core.context().moveTo(dom.props.x, dom.props.y + radius[0]);
    Canvas2d_Core.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0]);
    Canvas2d_Core.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y);
    Canvas2d_Core.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1]);
    Canvas2d_Core.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2]);
    Canvas2d_Core.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2]);
    Canvas2d_Core.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h);
    Canvas2d_Core.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3]);
    Canvas2d_Core.context().lineTo(dom.props.x, dom.props.y + radius[0]);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
    Module_Tag.renderUnmount_1(dom, (x, y) => coverRectRadius(x, y, dom.props.x, dom.props.y, dom.props.w, dom.props.h, fillRadius(dom.props.radius)));
  }
};
/* harmony default export */ const Module_Tag_Component_RectRadius = (Module_Tag_Component_RectRadius_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Rotate.js


const Module_Tag_Component_Rotate_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().rotate(dom.props.rotateAngle);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Rotate = (Module_Tag_Component_Rotate_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Scale.js


const Module_Tag_Component_Scale_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().scale(dom.props.scaleW, dom.props.scaleH);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Scale = (Module_Tag_Component_Scale_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Stroke.js


const Module_Tag_Component_Stroke_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().stroke();
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Stroke = (Module_Tag_Component_Stroke_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Text.js


const caculateLine = (text, font, w, wrap, ellipsis, split) => {
  ellipsis = ellipsis || '';
  split = split || '';
  const px = Number(font.match(/[\d\.]+px/)[0].replace('px', ''));
  Canvas2d_Core.context().save();
  Canvas2d_Core.context().font = font;
  var caculateText = '';
  var caculateTextLine = [];
  text = text.split(split).map((i, index) => index ? [split, i] : [i]).flat();
  if (Boolean(wrap) === true) {
    text.forEach(i => {
      const tw = Canvas2d_Core.context().measureText(caculateText + i).width;
      if (tw > w && caculateText !== '') caculateTextLine.push(caculateText);
      if (tw > w && caculateText !== '') caculateText = i;
      if (tw > w && caculateText === '') caculateTextLine.push(i);
      if (tw < w) caculateText = caculateText + i;
    });
  }
  if (Boolean(wrap) !== true) {
    text.some(i => {
      const tw = Canvas2d_Core.context().measureText(caculateText + i + ellipsis).width;
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
      w: Canvas2d_Core.context().measureText(i.trim()).width,
      h: px,
      font: font
    };
  });
  Canvas2d_Core.context().restore();
  return caculateTextLine;
};
const caculateLineLocation = (line, lineHeight, gap) => {
  const w = Math.max(...line.map(i => i.w));
  const h = line.reduce((t, n, index) => t + n.h * lineHeight + (index ? gap : 0), 0);
  line.forEach((i, index) => {
    i.y = index * (i.h * lineHeight + gap);
  });
  return {
    w,
    h
  };
};
const Module_Tag_Component_Text_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    const px = Number(Canvas2d_Core.context().font.match(/[\d\.]+px/)[0].replace('px', ''));
    var text = dom.props.text;
    var x = dom.props.x;
    var y = dom.props.y + px * 0.82;
    if (Boolean(dom.props.fillText) === true) Canvas2d_Core.context().fillText(text, x, y);
    if (Boolean(dom.props.strokeText) === true) Canvas2d_Core.context().strokeText(text, x, y);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
Module_Tag_Component_Text_App.caculateLine = caculateLine;
Module_Tag_Component_Text_App.caculateLineLocation = caculateLineLocation;
/* harmony default export */ const Module_Tag_Component_Text = (Module_Tag_Component_Text_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Translate.js


const Module_Tag_Component_Translate_App = {
  locationMount: dom => {
    Module_Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    Module_Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    Module_Tag.renderMount_0(dom);
    Canvas2d_Core.context().translate(dom.props.translateX, dom.props.translateY);
    Module_Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    Module_Tag.renderUnmount_0(dom);
  }
};
/* harmony default export */ const Module_Tag_Component_Translate = (Module_Tag_Component_Translate_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.js


















const pick = tag => {
  if (tag === 'arc') return Module_Tag_Component_Arc;
  if (tag === 'circle') return Module_Tag_Component_Circle;
  if (tag === 'clip') return Module_Tag_Component_Clip;
  if (tag === 'fill') return Module_Tag_Component_Fill;
  if (tag === 'image') return Module_Tag_Component_Image;
  if (tag === 'layout') return Module_Tag_Component_Layout;
  if (tag === 'line') return Module_Tag_Component_Line;
  if (tag === 'path') return Module_Tag_Component_Path;
  if (tag === 'rect') return Module_Tag_Component_Rect;
  if (tag === 'rectradius') return Module_Tag_Component_RectRadius;
  if (tag === 'rotate') return Module_Tag_Component_Rotate;
  if (tag === 'scale') return Module_Tag_Component_Scale;
  if (tag === 'stroke') return Module_Tag_Component_Stroke;
  if (tag === 'text') return Module_Tag_Component_Text;
  if (tag === 'translate') return Module_Tag_Component_Translate;
};
const locationMount = dom => {
  const undefineds = property => {
    return property.every(i => typeof dom.props[i] === 'undefined');
  };
  const unit = (value, property) => {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      if (value.match(/^[\d\.-]+$/) && isNaN(value) === false) {
        return Number(value);
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
    }
  };
  if (typeof dom.props.w !== 'undefined') dom.props.w = unit(dom.props.w, 'w');
  if (typeof dom.props.w === 'undefined') dom.props.w = dom.parent.props.w;
  if (typeof dom.props.h !== 'undefined') dom.props.h = unit(dom.props.h, 'h');
  if (typeof dom.props.h === 'undefined') dom.props.h = dom.parent.props.h;
  if (typeof dom.props.x !== 'undefined') dom.props.x = dom.parent.props.x + unit(dom.props.x, 'x');
  if (typeof dom.props.x === 'undefined' && undefineds(['cx', 'gx', 'l', 'r'])) dom.props.x = dom.parent.props.x;
  if (typeof dom.props.y !== 'undefined') dom.props.y = dom.parent.props.y + unit(dom.props.y, 'y');
  if (typeof dom.props.y === 'undefined' && undefineds(['cy', 'gy', 't', 'b'])) dom.props.y = dom.parent.props.y;
  if (typeof dom.props.cx !== 'undefined' && undefineds(['x', 'gx', 'l', 'r'])) dom.props.x = dom.parent.props.x - dom.props.w / 2 + unit(dom.props.cx, 'cx');
  if (typeof dom.props.cy !== 'undefined' && undefineds(['y', 'gy', 't', 'b'])) dom.props.y = dom.parent.props.y - dom.props.h / 2 + unit(dom.props.cy, 'cy');
  if (typeof dom.props.gx !== 'undefined' && undefineds(['x', 'cx', 'l', 'r'])) dom.props.x = unit(dom.props.gx, 'gx');
  if (typeof dom.props.gy !== 'undefined' && undefineds(['y', 'cy', 't', 'b'])) dom.props.y = unit(dom.props.gy, 'gy');
  if (typeof dom.props.l !== 'undefined' && undefineds(['x', 'cx', 'gx', 'r'])) dom.props.x = dom.parent.props.x + unit(dom.props.l, 'l');
  if (typeof dom.props.r !== 'undefined' && undefineds(['x', 'cx', 'gx', 'l'])) dom.props.x = dom.parent.props.x + dom.parent.props.w - dom.props.w - unit(dom.props.r, 'r');
  if (typeof dom.props.t !== 'undefined' && undefineds(['y', 'cy', 'gy', 'b'])) dom.props.y = dom.parent.props.y + unit(dom.props.t, 't');
  if (typeof dom.props.b !== 'undefined' && undefineds(['y', 'cy', 'gy', 't'])) dom.props.y = dom.parent.props.y + dom.parent.props.h - dom.props.h - unit(dom.props.b, 'b');
  Object.assign(dom.props, Module_Location.coordinate(dom.props));
};
const locationUnmount = dom => {
  Object.assign(dom.props, Module_Location.coordinate(dom.props));
};
const renderMount_0 = dom => {
  dom._save = dom.props.save === undefined || Boolean(dom.props.save) === true;
  dom._beginPath = dom.props.beginPath === undefined || Boolean(dom.props.beginPath) === true;
  if (dom.element.tag !== 'clip' && dom.element.tag !== 'rotate' && dom.element.tag !== 'scale' && dom.element.tag !== 'translate' && dom.props.globalAlpha === undefined && dom.props.font === undefined && dom.props.fillStyle === undefined && dom.props.strokeStyle === undefined && dom.props.shadowBlur === undefined && dom.props.shadowColor === undefined && dom.props.shadowOffsetX === undefined && dom.props.shadowOffsetY === undefined && dom.props.transform === undefined && dom.props.clip === undefined) {
    dom._save = Boolean(dom.props.save) === true;
  }
  if (dom.element.tag !== 'arc' && dom.element.tag !== 'circle' && dom.element.tag !== 'line' && dom.element.tag !== 'rect' && dom.element.tag !== 'rectradius') {
    dom._beginPath = Boolean(dom.props.beginPath) === true;
  }
  if (dom._save === true) Canvas2d_Core.context().save();
  if (dom._beginPath === true) Canvas2d_Core.context().beginPath();
  if (dom.props.globalAlpha !== undefined) Canvas2d_Core.context().globalAlpha = Canvas2d_Core.context().globalAlpha * dom.props.globalAlpha;
  if (dom.props.font !== undefined) Canvas2d_Core.context().font = dom.props.font;
  if (dom.props.fillStyle !== undefined) Canvas2d_Core.context().fillStyle = dom.props.fillStyle;
  if (dom.props.strokeStyle !== undefined) Canvas2d_Core.context().strokeStyle = dom.props.strokeStyle;
  if (dom.props.shadowBlur !== undefined) Canvas2d_Core.context().shadowBlur = dom.props.shadowBlur;
  if (dom.props.shadowColor !== undefined) Canvas2d_Core.context().shadowColor = dom.props.shadowColor;
  if (dom.props.shadowOffsetX !== undefined) Canvas2d_Core.context().shadowOffsetX = dom.props.shadowOffsetX;
  if (dom.props.shadowOffsetY !== undefined) Canvas2d_Core.context().shadowOffsetY = dom.props.shadowOffsetY;
  if (dom.props.lineWidth !== undefined) Canvas2d_Core.context().lineWidth = dom.props.lineWidth;
  if (dom.props.transform !== undefined) {
    const transformUnit = (type, value) => {
      if (type === 'rotate') Canvas2d_Core.context().rotate(value.angle);
      if (type === 'scale') Canvas2d_Core.context().scale(value.w, value.h);
      if (type === 'translate') Canvas2d_Core.context().translate(value.x, value.y);
    };
    dom.props.transform.forEach(i => Object.keys(i).forEach(n => transformUnit(n, i[n])));
  }
};
const renderMount_1 = dom => {
  if (Boolean(dom.props.clip) === true) Canvas2d_Core.context().clip();
  if (Boolean(dom.props.fill) === true) Canvas2d_Core.context().fill();
  if (Boolean(dom.props.stroke) === true) Canvas2d_Core.context().stroke();
  if (Boolean(dom.props.isolated) === true && dom._save === true) Canvas2d_Core.context().restore();
};
const renderUnmount_0 = dom => {
  if (Boolean(dom.props.isolated) !== true && dom._save === true) Canvas2d_Core.context().restore();
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
  }];
  const event = (e, i) => {
    const covered = e.xs.some((i, index) => cover(e.xs[index], e.ys[index]) === true);
    const coveredAway = e.xs.some((i, index) => cover(e.xs[index], e.ys[index]) === false);
    if (covered === true && i.event) i.event({
      ...e,
      dom,
      cover
    });
    if (coveredAway === true && i.eventAway) i.eventAway({
      ...e,
      dom,
      cover
    });
  };
  typeArray.forEach(i => {
    if (i.event || i.eventAway) Module_Event.addEventListener(i.type, e => event(e, i), i.option);
  });
};
const relocation = dom => {
  const tagComponent = pick(dom.element.tag);
  if (tagComponent !== undefined && typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom);
  if (tagComponent !== undefined) tagComponent.locationMount(dom);
  if (tagComponent !== undefined && typeof dom.props.onLocationMounted === 'function') dom.props.onLocationMounted(dom);
  if (dom.children) dom.children.forEach(i => relocation(i));
  if (tagComponent !== undefined && typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom);
  if (tagComponent !== undefined) tagComponent.locationUnmount(dom);
  if (tagComponent !== undefined && typeof dom.props.onLocationUnmounted === 'function') dom.props.onLocationUnmounted(dom);
};
const rerender = dom => {
  const tagComponent = pick(dom.element.tag);
  if (tagComponent !== undefined && typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom);
  if (tagComponent !== undefined) tagComponent.renderMount(dom);
  if (tagComponent !== undefined && typeof dom.props.onRenderMounted === 'function') dom.props.onRenderMounted(dom);
  if (dom.children) dom.children.sort((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i));
  if (tagComponent !== undefined && typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom);
  if (tagComponent !== undefined) tagComponent.renderUnmount(dom);
  if (tagComponent !== undefined && typeof dom.props.onRenderUnmounted === 'function') dom.props.onRenderUnmounted(dom);
};
/* harmony default export */ const Module_Tag = ({
  pick,
  relocation,
  rerender,
  locationMount,
  locationUnmount,
  renderMount_0,
  renderMount_1,
  renderUnmount_0,
  renderUnmount_1,
  Arc: Module_Tag_Component_Arc,
  Circle: Module_Tag_Component_Circle,
  Clip: Module_Tag_Component_Clip,
  Fill: Module_Tag_Component_Fill,
  Image: Module_Tag_Component_Image,
  Layout: Module_Tag_Component_Layout,
  Line: Module_Tag_Component_Line,
  Path: Module_Tag_Component_Path,
  Rect: Module_Tag_Component_Rect,
  RectRadius: Module_Tag_Component_RectRadius,
  Scale: Module_Tag_Component_Scale,
  Rotate: Module_Tag_Component_Rotate,
  Stroke: Module_Tag_Component_Stroke,
  Text: Module_Tag_Component_Text,
  Translate: Module_Tag_Component_Translate
});
;// CONCATENATED MODULE: ./package/Canvas2d/Core.js


var canvas;
var context;
var dpr;
var rect;
const Core_update = () => {
  rect = canvas.getBoundingClientRect();
  rect.x = rect.x;
  rect.y = rect.y;
  if (rect.x === undefined) rect.x = rect.left;
  if (rect.y === undefined) rect.y = rect.top;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
};
const Core_mount = (canvas_0, dpr_0) => {
  canvas = canvas_0;
  dpr = dpr_0;
  context = canvas.getContext('2d');
  Core_update();
  Module_Event.removeEventListenerWithCanvas(canvas);
  Module_Event.addEventListenerWithCanvas(canvas);
};
const unMount = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas = undefined;
  context = undefined;
  dpr = undefined;
  rect = undefined;
  Module_Event.clearEventListener();
};
const Core_render = dom => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  Module_Event.clearEventListener();
  Module_Tag.relocation(dom);
  Module_Tag.rerender(dom);
};
/* harmony default export */ const Canvas2d_Core = ({
  dpr: () => dpr,
  canvas: () => canvas,
  context: () => context,
  rect: () => rect,
  mount: Core_mount,
  unMount,
  render: Core_render,
  update: Core_update
});
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Graph.js
const distancePointPoint = (point0, point1) => {
  return Math.sqrt((point1.x - point0.x) ** 2 + (point1.y - point0.y) ** 2);
};
const distancePointLine = (point, line) => {
  const px = point.x;
  const py = point.y;
  const ax = line[0].x;
  const ay = line[0].y;
  const bx = line[1].x;
  const by = line[1].y;
  let abx = bx - ax;
  let aby = by - ay;
  let apx = px - ax;
  let apy = py - ay;
  let ab_distance = Math.sqrt(abx ** 2 + aby ** 2);
  let ab_dot = apx * abx + apy * aby;
  let ab_rate = ab_dot / ab_distance;
  if (ab_rate < 0) {
    return distancePointPoint(point, line[0]);
  }
  if (ab_rate > ab_distance) {
    return distancePointPoint(point, line[1]);
  }
  if (ab_rate >= 0 && ab_rate <= ab_distance) {
    return Math.sqrt(apx ** 2 + apy ** 2 - ab_rate ** 2);
  }
};
const rotatePoint = (point, targetPoint, angle) => {
  const x = point.x;
  const y = point.y;
  const targetX = targetPoint.x;
  const targetY = targetPoint.y;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const resultX = (x - targetX) * cos - (y - targetY) * sin + targetX;
  const resultY = (x - targetX) * sin + (y - targetY) * cos + targetY;
  return {
    x: resultX,
    y: resultY
  };
};
const conversionRect = rect => {
  const x = rect.x;
  const y = rect.y;
  const w = rect.w;
  const h = rect.h;
  const point0 = {
    x,
    y
  };
  const point1 = {
    x: x + w,
    y
  };
  const point2 = {
    x: x + w,
    y: y + h
  };
  const point3 = {
    x,
    y: y + h
  };
  return [point0, point1, point2, point3];
};
const intersectionLineLine = (line0, line1) => {
  const p0 = line0[0];
  const p1 = line0[1];
  const p2 = line1[0];
  const p3 = line1[1];
  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x);
  const selfCrossProduct = crossProduct(p0, p1, p2, p3);
  const pointCrossProduct_0 = crossProduct(p0, p1, p0, p2);
  const pointCrossProduct_1 = crossProduct(p0, p1, p0, p3);
  const pointCrossProduct_2 = crossProduct(p2, p3, p2, p0);
  const pointCrossProduct_3 = crossProduct(p2, p3, p2, p1);
  if (selfCrossProduct === 0) {
    return Math.min(p0.x, p1.x) <= Math.max(p2.x, p3.x) && Math.min(p2.x, p3.x) <= Math.max(p0.x, p1.x) && Math.min(p0.y, p1.y) <= Math.max(p2.y, p3.y) && Math.min(p2.y, p3.y) <= Math.max(p0.y, p1.y);
  }
  if (selfCrossProduct !== 0) {
    return pointCrossProduct_0 * pointCrossProduct_1 <= 0 && pointCrossProduct_2 * pointCrossProduct_3 <= 0;
  }
};
const intersectionCircleCircle = (circle0, circle1) => {
  const cx0 = circle0.cx;
  const cy0 = circle0.cy;
  const r0 = circle0.radius;
  const cx1 = circle1.cx;
  const cy1 = circle1.cy;
  const r1 = circle1.radius;
  const distance = Math.sqrt((cx0 - cx1) ** 2 + (cy0 - cy1) ** 2);
  return distance <= r0 + r1;
};
const intersectionPointLine = (point, line) => {
  const p0 = line[0];
  const p1 = line[1];
  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x);
  const selfCrossProduct = crossProduct(point, p0, point, p1);
  const inside = point.x >= Math.min(p0.x, p1.x) && point.x <= Math.max(p0.x, p1.x) && point.y >= Math.min(p0.y, p1.y) && point.y <= Math.max(p0.y, p1.y);
  return selfCrossProduct === 0 && inside;
};
const intersectionLineCircle = (line, circle) => {
  const p0 = line[0];
  const p1 = line[1];
  const cx = circle.cx;
  const cy = circle.cy;
  const r = circle.radius;
  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x);
  const selfCrossProduct = crossProduct(p0, p1, {
    x: cx,
    y: cy
  }, {
    x: cx + r,
    y: cy
  });
  const pointCrossProduct_0 = crossProduct(p0, p1, p0, {
    x: cx,
    y: cy
  });
  const distance = Math.abs(pointCrossProduct_0) / Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2);
  return selfCrossProduct === 0 && distance <= r;
};

// 使用示例

// console.log(distancePointLine({ x: 0, y: 0 }, [{ x: 0, y: 12 }, { x: 2, y: 2 }])) // 0.7071067811865476

// 写 intersectLineCircle 的测试用例

// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.1 })) // true
// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.01 })) // false
// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.5 })) // true
// console.log(intersectLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.6 })) // true

/* harmony default export */ const Module_Graph = ({
  distancePointPoint,
  distancePointLine,
  rotatePoint,
  conversionRect,
  intersectionLineLine,
  intersectionCircleCircle,
  intersectionPointLine,
  intersectionLineCircle
});
;// CONCATENATED MODULE: ./package/Canvas2d/index.js





/* harmony default export */ const Canvas2d = (Canvas2d_Core);

;// CONCATENATED MODULE: ./package/ReactExtensions/Hook.UseAnimationCount.js

const useAnimationCount = props => {
  const [animationCount, setAnimationCount] = React.useState(props.defaultCount);
  const [animationDelay, setAnimationDelay] = React.useState(props.defaultDelay || 0);
  const [animationFlow, setAnimationFlow] = React.useState(props.defaultFlow || 0);
  React.useEffect(() => {
    if (animationDelay !== 0) setAnimationDelay(animationDelay - 1);
  });
  React.useEffect(() => {
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.min || animationCount < props.min)) setAnimationFlow(0);
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.max || animationCount > props.max)) setAnimationFlow(1);
  });
  React.useEffect(() => {
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
/* harmony default export */ const Hook_UseAnimationCount = (useAnimationCount);
;// CONCATENATED MODULE: ./package/ReactExtensions/Hook.UseAnimationDestination.js

const useAnimationDestination = props => {
  const [animationCount, setAnimationCount] = React.useState(props.defaultCount);
  React.useEffect(() => {
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
/* harmony default export */ const Hook_UseAnimationDestination = (useAnimationDestination);
;// CONCATENATED MODULE: ./package/ReactExtensions/Hook.UseEffectUpdate.js

const useEffectUpdate = (callback, dep) => {
  const ref = React.useRef(false);
  React.useEffect(() => {
    if (ref.current === true) callback();
    if (ref.current === false) ref.current = true;
  }, dep);
};
/* harmony default export */ const Hook_UseEffectUpdate = (useEffectUpdate);
;// CONCATENATED MODULE: ./package/ReactExtensions/index.js




;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.CanvasLayout.js


function Component_CanvasLayout_App(props) {
  const onLocationMounted = dom => {
    dom.props.x = Canvas2d.rect().x;
    dom.props.y = Canvas2d.rect().y;
    dom.props.w = Canvas2d.rect().width * Canvas2d.dpr();
    dom.props.h = Canvas2d.rect().height * Canvas2d.dpr();
  };
  return /*#__PURE__*/React.createElement("layout", {
    onLocationMounted: onLocationMounted
  }, props.children);
}
/* harmony default export */ const Component_CanvasLayout = (Component_CanvasLayout_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.TextCaculateLine.js


const Component_TextCaculateLine_caculateLine = Module_Tag.Text.caculateLine;
const Component_TextCaculateLine_caculateLineLocation = Module_Tag.Text.caculateLineLocation;
const Component_TextCaculateLine_App = props => {
  const line = React.useMemo(() => {
    return Component_TextCaculateLine_caculateLine(props.text, props.font, props.w, props.wrap, props.ellipsis, props.split);
  }, [props.text, props.font, props.w, props.wrap, props.ellipsis, props.split]);
  const location = React.useMemo(() => {
    var w;
    var h;
    if (props.lineHeight !== undefined && props.gap !== undefined) {
      const location = Component_TextCaculateLine_caculateLineLocation(line, props.lineHeight, props.gap);
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
/* harmony default export */ const Component_TextCaculateLine = (Component_TextCaculateLine_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.PoweredBy.js





function Component_PoweredBy_App(props) {
  const w = Canvas2d.rect().width * Canvas2d.dpr();
  const h = Canvas2d.rect().height * Canvas2d.dpr();
  const min = Math.min(w, h);
  const {
    animationCount: animationCountIntersection
  } = Hook_UseAnimationDestination({
    play: true,
    defaultCount: 0,
    destination: 1,
    rate: 1 / 30,
    postprocess: n => Number(n.toFixed(3))
  });
  const {
    animationCount: animationCountDestoryWait
  } = Hook_UseAnimationDestination({
    play: true,
    defaultCount: 0,
    destination: 1,
    rate: 1 / 60,
    postprocess: n => Number(n.toFixed(3))
  });
  const {
    animationCount: animationCountDestory
  } = Hook_UseAnimationDestination({
    play: animationCountDestoryWait === 1,
    defaultCount: 0,
    destination: 1,
    rate: 1 / 30,
    postprocess: n => Number(n.toFixed(3))
  });
  if (animationCountDestory === 1) {
    return props.children;
  }
  if (animationCountDestory !== 1) {
    return /*#__PURE__*/React.createElement(Component_CanvasLayout, null, /*#__PURE__*/React.createElement("layout", {
      container: true,
      verticalCenter: true,
      horizontalAlignCenter: true,
      globalAlpha: animationCountIntersection - animationCountDestory
    }, /*#__PURE__*/React.createElement(Component_TextCaculateLine, {
      text: `CanvasXML`,
      font: `${min * 0.06}px sans-serif`,
      lineHeight: 1,
      gap: 0,
      w: w - min * 0.02,
      split: " ",
      wrap: true
    }, (line, location) => {
      return line.map(i => {
        return /*#__PURE__*/React.createElement("layout", {
          w: i.w,
          h: i.h,
          item: true
        }, /*#__PURE__*/React.createElement("text", {
          fillText: true,
          fillStyle: "white",
          w: i.w,
          h: i.h,
          text: i.text,
          font: i.font
        }));
      });
    }), /*#__PURE__*/React.createElement("layout", {
      h: min * 0.02,
      item: true
    }), /*#__PURE__*/React.createElement(Component_TextCaculateLine, {
      text: 'Powered by CanvasXML JS',
      font: `${min * 0.025}px sans-serif`,
      lineHeight: 1,
      gap: 0,
      w: w - min * 0.02,
      split: " ",
      wrap: true
    }, (line, location) => {
      return line.map(i => {
        return /*#__PURE__*/React.createElement("layout", {
          w: i.w,
          h: i.h,
          item: true
        }, /*#__PURE__*/React.createElement("text", {
          fillText: true,
          fillStyle: `rgb(130, 130, 130)`,
          w: i.w,
          h: i.h,
          text: i.text,
          font: i.font
        }));
      });
    })));
  }
}
/* harmony default export */ const Component_PoweredBy = (Component_PoweredBy_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2d/Core.js



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
  return dom;
};
const ReactCanvas2d_Core_mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2;
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0;
  const powered = option && option.powered !== undefined ? option.powered : true;
  var Component;
  if (Boolean(powered) === true) Component = /*#__PURE__*/React.createElement(Component_PoweredBy, null, element);
  if (Boolean(powered) !== true) Component = element;
  Canvas2d.mount(canvas, dpr);
  React.mount(Component, renderFrameTimeDiffMax, node => Canvas2d.render(renderDom(createDom(node))));
  return {
    render: React.render
  };
};
const Core_unMount = () => {
  Canvas2d.unMount();
  React.unmount();
};
const ReactCanvas2d_Core_update = () => {
  Canvas2d.update();
  React.shouldRender(React.renderQueueNode());
};
/* harmony default export */ const ReactCanvas2d_Core = ({
  mount: ReactCanvas2d_Core_mount,
  unMount: Core_unMount,
  update: ReactCanvas2d_Core_update
});
;// CONCATENATED MODULE: ./package/ReactCanvas2d/index.js

/* harmony default export */ const ReactCanvas2d = (ReactCanvas2d_Core);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.Accordion.js


function Component_Accordion_App(props) {
  const titleH = props.titleH || 0;
  const contentH = props.contentH || 0;
  const x = props.x || undefined;
  const y = props.y || undefined;
  const w = props.w || undefined;
  const h = props.h || undefined;
  const [expand, setExpand] = React.useState(props.defaultExpand || false);
  const expandUse = props.expand === undefined ? expand : props.expand;
  const {
    animationCount: animationCountContentH
  } = Hook_UseAnimationDestination({
    play: true,
    defaultCount: expandUse ? contentH : 0,
    destination: expandUse ? contentH : 0,
    rate: contentH / 5,
    postprocess: n => Number(n.toFixed(2))
  });
  Hook_UseEffectUpdate(() => {
    if (props.onChangeExpand) props.onChangeExpand(expandUse);
  }, [expandUse]);
  Hook_UseEffectUpdate(() => {
    if (props.onChangeHeight) props.onChangeHeight(animationCountContentH);
  }, [animationCountContentH]);
  if (props.ref) props.ref({
    expand,
    setExpand
  });
  return /*#__PURE__*/React.createElement("layout", {
    x: x,
    y: y,
    w: w,
    h: titleH + animationCountContentH,
    container: true,
    verticalForward: true
  }, /*#__PURE__*/React.createElement("rectradius", props.onAccordion), /*#__PURE__*/React.createElement("layout", {
    h: titleH,
    item: true
  }, /*#__PURE__*/React.createElement("rectradius", props.onTitle), /*#__PURE__*/React.createElement("rectradius", {
    beginPath: true,
    clip: true,
    onClick: () => setExpand(!expand)
  }, props.titleComponent)), /*#__PURE__*/React.createElement("layout", {
    h: animationCountContentH,
    item: true
  }, /*#__PURE__*/React.createElement("rectradius", props.onContent), /*#__PURE__*/React.createElement("rectradius", {
    beginPath: true,
    clip: true
  }, props.contentComponent)));
}
/* harmony default export */ const Component_Accordion = (Component_Accordion_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.Button.js
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }



function Component_Button_App(props) {
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
  const [hover, setHover] = React.useState(false);
  const animationCountTextRGBA = textColor.map((i, index) => Hook_UseAnimationDestination({
    play: true,
    defaultCount: i[0],
    destination: i[hover ? 1 : 0],
    rate: Math.abs(i[1] - i[0]) / 15,
    postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0))
  }));
  const animationCountRectRGBA = rectColor.map((i, index) => Hook_UseAnimationDestination({
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
  return /*#__PURE__*/React.createElement("layout", {
    x: x,
    y: y,
    w: w,
    h: h
  }, /*#__PURE__*/React.createElement("rectradius", _extends({
    beginPath: true,
    radius: radius
  }, props.onButton)), /*#__PURE__*/React.createElement("rectradius", {
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
  }, /*#__PURE__*/React.createElement("layout", {
    container: true,
    horizontalAlignCenter: true,
    verticalAlignCenter: true
  }, /*#__PURE__*/React.createElement("layout", {
    w: `calc(100% - ${padding})`,
    h: `calc(100% - ${padding})`,
    item: true,
    container: true,
    horizontalAlignCenter: true,
    verticalAlignCenter: true
  }, /*#__PURE__*/React.createElement(Component_TextCaculateLine, {
    text: text,
    font: font,
    lineHeight: lineHeight,
    gap: gap,
    w: w - padding,
    split: " "
  }, (line, location) => {
    return /*#__PURE__*/React.createElement("layout", {
      w: location.w,
      h: location.h,
      item: true
    }, line.map(n => {
      return /*#__PURE__*/React.createElement("text", {
        fillText: true,
        fillStyle: textRGBA,
        w: n.w,
        y: n.y,
        text: n.text,
        font: n.font
      });
    }));
  })))));
}
/* harmony default export */ const Component_Button = (Component_Button_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.CoordinateHelper.js

const Component_CoordinateHelper_App = props => {
  const [repeatX, setRepeatX] = React.useState();
  const [repeatY, setRepeatY] = React.useState();
  const caculateRepeat = dom => {
    setRepeatX(Math.ceil(dom.props.w / props.gap / 2));
    setRepeatY(Math.ceil(dom.props.h / props.gap / 2));
  };
  return /*#__PURE__*/React.createElement("layout", {
    onRenderUnmounted: dom => caculateRepeat(dom)
  }, repeatX !== undefined && repeatY !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rectradius", {
    beginPath: true,
    fill: true,
    w: "0.1vmax",
    cx: "50%",
    globalAlpha: 0.5,
    fillStyle: props.color
  }), /*#__PURE__*/React.createElement("rectradius", {
    beginPath: true,
    fill: true,
    h: "0.1vmax",
    cy: "50%",
    globalAlpha: 0.5,
    fillStyle: props.color
  }), new Array(repeatX).fill().map((i, index) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rectradius", {
      beginPath: true,
      fill: true,
      w: "0.1vmax",
      cx: `calc(50% + ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }), /*#__PURE__*/React.createElement("rectradius", {
      beginPath: true,
      fill: true,
      w: "0.1vmax",
      cx: `calc(50% - ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }));
  }), new Array(repeatY).fill().map((i, index) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rectradius", {
      beginPath: true,
      fill: true,
      h: "0.1vmax",
      cy: `calc(50% + ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }), /*#__PURE__*/React.createElement("rectradius", {
      beginPath: true,
      fill: true,
      h: "0.1vmax",
      cy: `calc(50% - ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }));
  })) : null);
};
/* harmony default export */ const Component_CoordinateHelper = (Component_CoordinateHelper_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.Rotate.js

function Component_Rotate_App(props) {
  return /*#__PURE__*/React.createElement("translate", {
    translateX: props.translateX,
    translateY: props.translateY
  }, /*#__PURE__*/React.createElement("rotate", {
    rotateAngle: props.rotateAngle
  }, /*#__PURE__*/React.createElement("translate", {
    translateX: props.translateX * -1,
    translateY: props.translateY * -1
  }, props.children)));
}
/* harmony default export */ const Component_Rotate = (Component_Rotate_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseAudio.js

const useAudio = props => {
  const [load, setLoad] = React.useState(false);
  const audio = React.useMemo(() => new Audio(), []);
  React.useEffectImmediate(() => audio.src = props.src, [props.src]);
  React.useEffectImmediate(() => setLoad(false), [props.src]);
  React.useEffectImmediate(() => audio.onload = () => setLoad(true), [props.src]);
  React.useEffectImmediate(() => audio.onloadeddata = () => setLoad(true), [props.src]);
  React.useEffectImmediate(() => audio.oncanplay = () => setLoad(true), [props.src]);
  React.useEffectImmediate(() => audio.oncanplaythrough = () => setLoad(true), [props.src]);
  React.useEffectImmediate(() => audio.onerror = () => setLoad(true), [props.src]);
  return {
    load,
    audio
  };
};
/* harmony default export */ const Hook_UseAudio = (useAudio);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseEventClick.js

const useEventClick = props => {
  const downRef = React.useRef(false);
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
/* harmony default export */ const Hook_UseEventClick = (useEventClick);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseEventCompose.js
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
/* harmony default export */ const Hook_UseEventCompose = (useEventCompose);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseEventDragControl.js

const useEventDragControl = props => {
  const positionOrigin = React.useRef();
  const positionTarget = React.useRef();
  const onChange = React.useCallback(params => {
    if (props.onChange) props.onChange(params);
  }, [props.onChange]);
  const onStart = React.useCallback(e => {
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
  const onMove = React.useCallback(e => {
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
  const onEnd = React.useCallback(e => {
    if (props.enable === false) return;
    if (positionTarget.current === undefined) return;
    const x = e.x;
    const y = e.y;
    const changedX = x - positionTarget.current.x;
    const changedY = y - positionTarget.current.y;
    const continuedX = positionTarget.current.x - positionOrigin.current.x;
    const continuedY = positionTarget.current.y - positionOrigin.current.y;
    onChange({
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
/* harmony default export */ const Hook_UseEventDragControl = (useEventDragControl);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseImage.js

const useImage = props => {
  const [load, setLoad] = React.useState(false);
  const image = React.useMemo(() => new Image(), []);
  React.useEffectImmediate(() => image.src = props.src, [props.src]);
  React.useEffectImmediate(() => setLoad(false), [props.src]);
  React.useEffectImmediate(() => image.onload = () => setLoad(true), [props.src]);
  React.useEffectImmediate(() => image.onloadeddata = () => setLoad(true), [props.src]);
  React.useEffectImmediate(() => image.onerror = () => setLoad(true), [props.src]);
  return {
    load,
    image
  };
};
/* harmony default export */ const Hook_UseImage = (useImage);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseLocationBox.js

const useLocationBox = props => {
  const ref = React.useRef();
  const [location, setLocation] = React.useState(props.default);
  React.useEffect(() => {
    if (ref.current) {
      const key = Object.keys(location);
      const box = Location.box(ReactCanvas2dUtils.flatDom(ref.current).filter(i => i !== ref.current).map(i => i.props));
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
/* harmony default export */ const Hook_UseLocationBox = (useLocationBox);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseLocationProperty.js

const useLocationProperty = props => {
  const ref = React.useRef();
  const [load, setLoad] = React.useState(false);
  const [location, setLocation] = React.useState(props.default);
  const locationProperty = Object.keys(location);
  React.useEffect(() => {
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
/* harmony default export */ const Hook_UseLocationProperty = (useLocationProperty);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseLocationPropertyRef.js

const useLocationPropertyRef = props => {
  const ref = React.useRef();
  const [load, setLoad] = React.useState(false);
  const refLocation = React.useRef(props.default);
  const locationProperty = Object.keys(location);
  React.useEffect(() => {
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
/* harmony default export */ const Hook_UseLocationPropertyRef = (useLocationPropertyRef);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseResourceReload.js

const useResourceReload = props => {
  const [resourceCount, setResourceCount] = React.useState(0);
  const [resourceLoading, setResourceLoading] = React.useState(true);
  React.useEffectImmediate(() => {
    setResourceCount(0);
    setResourceLoading(true);
    props.resource.forEach(i => fetch(i).then(() => setResourceCount(pre => pre + 1)));
  }, [...props.resource]);
  React.useEffectImmediate(() => setResourceLoading(resourceCount < props.resource.length), [resourceCount]);
  return {
    resourceCount,
    resourceLoading
  };
};
/* harmony default export */ const Hook_UseResourceReload = (useResourceReload);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseTextCaculateLine.js


const Hook_UseTextCaculateLine_caculateLine = Module_Tag.Text.caculateLine;
const Hook_UseTextCaculateLine_caculateLineLocation = Module_Tag.Text.caculateLineLocation;
const useTextCaculateLine = props => {
  const line = React.useMemo(() => {
    return Hook_UseTextCaculateLine_caculateLine(props.text, props.font, props.w, props.wrap, props.ellipsis, props.split);
  }, [props.text, props.font, props.w, props.wrap, props.ellipsis, props.split]);
  const location = React.useMemo(() => {
    var w;
    var h;
    if (props.lineHeight !== undefined && props.gap !== undefined) {
      const location = Hook_UseTextCaculateLine_caculateLineLocation(line, props.lineHeight, props.gap);
      w = location.w;
      h = location.h;
    }
    return {
      w: w,
      h: h
    };
  }, [line, props.lineHeight, props.gap]);
  return {
    line,
    location
  };
};
/* harmony default export */ const Hook_UseTextCaculateLine = (useTextCaculateLine);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Utils.FlatDom.js
const flatDom = dom => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()];
};
/* harmony default export */ const Utils_FlatDom = (flatDom);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Utils.GetDomById.js
const getDomById = (dom, id) => {
  if (dom.props.id === id) return dom;
  if (dom.props.id !== id && dom.children !== undefined) return dom.children.find(i => getDomById(i, id));
  if (dom.props.id !== id && dom.children === undefined) return undefined;
};
/* harmony default export */ const Utils_GetDomById = (getDomById);
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/index.js




















;// CONCATENATED MODULE: ./package/index.js





const Canvas2dModule = {
  Event: Module_Event,
  Graph: Module_Graph,
  Location: Module_Location,
  Tag: Module_Tag
};


var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;