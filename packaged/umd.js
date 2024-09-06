(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CanvasXML"] = factory();
	else
		root["CanvasXML"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: Canvas2d, Canvas2dModule, React, ReactCanvas2d, ReactCanvas2dExtensions, ReactExtensions

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
    node.type = 0o00000001;
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'function') {
    node.type = 0o00000010;
    node.key = element.key;
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'string') {
    node.type = 0o00000100;
    node.key = element.key;
  }
  if (Boolean(element) === true && typeof element === 'object' && Array.isArray(element) === true) {
    node.type = 0o00001000;
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
  if (node.type === 0o00000010 && (node.memo !== true || updateQueueNodeFilter.includes(node) === true)) {
    childrenIteration = new Array(node.element.tag({
      ...node.element.props,
      children: node.element.props.children || node.element.children
    }));
  }
  if (node.type === 0o00000100 && (node.memo !== true || updateQueueNodeFilter.includes(node) === true)) {
    childrenIteration = node.element.props.children || node.element.children;
    if (Array.isArray(childrenIteration) === false) childrenIteration = [childrenIteration];
  }
  if (node.type === 0o00001000 && (node.memo !== true || updateQueueNodeFilter.includes(node) === true)) {
    childrenIteration = node.element;
  }
  if (node.type !== 0o00000001 && node.memo === true && updateQueueNodeFilter.includes(node) !== true) {
    childrenIteration = node.children.map(i => i.element);
  }
  childrenDestory = node.children;
  childrenIteration.forEach((i, index) => {
    var childrenNode;
    var equalIndex = node.children.findIndex(n => n && i && typeof n === 'object' && typeof i === 'object' && n.key !== undefined && n.key === i.key && n.element.tag === i.tag);
    if (equalIndex !== -1) childrenNode = node.children[equalIndex];
    if (equalIndex === -1) childrenNode = node.children[index];
    var inode;
    var cnode = createNode(i);
    const memo = Boolean(childrenNode && childrenNode.element === i);
    const update = Boolean(childrenNode && childrenNode.element && childrenNode.type === cnode.type && childrenNode.key === cnode.key && childrenNode.element.tag === cnode.element.tag) && memo === false;
    if (memo === true || update === true) {
      inode = childrenNode;
    }
    if (update === true) {
      inode.element = cnode.element;
      inode.key = cnode.key;
      inode.type = cnode.type;
    }
    if (memo === false && update === false) {
      inode = cnode;
    }
    inode.memo = memo;
    inode.update = update;
    inode.create = memo === false && update === false;
    inode.parent = node;
    if (memo === true || update === true) childrenDestory = childrenDestory.filter(i => i !== childrenNode);
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
/* harmony default export */ const React_Core = ({
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

/* harmony default export */ const package_React = (React_Core);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Canvas.js
const createOffscreenCanvas = (...props) => {
  try {
    if (wx) return wx.createCanvas(...props);
  } catch {
    return new OffscreenCanvas(...props);
  }
};
/* harmony default export */ const Module_Canvas = ({
  createOffscreenCanvas
});
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Event.js

var Module_Event_event = [];
var eventWithCanvas = [];
const addEventListener = (type, callback, option) => {
  if (type === 'pointerdown') type = window.ontouchstart === undefined ? 'mousedown' : 'touchstart';
  if (type === 'pointermove') type = window.ontouchstart === undefined ? 'mousemove' : 'touchmove';
  if (type === 'pointerup') type = window.ontouchstart === undefined ? 'mouseup' : 'touchend';
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
  const exe = Module_Event_event.filter(i => i.type === type).reverse().sort((a, b) => {
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
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Arc.js
const App = {
  onConstructMounted: dom => {
    dom.props.radius = dom.element.props.radius;
    dom.props.sAngle = dom.element.props.sAngle;
    dom.props.eAngle = dom.element.props.eAngle;
    dom.props.counterclockwise = dom.element.props.counterclockwise;
  },
  onLocationMount: dom => {
    if (dom.props.w === undefined && dom.props.radius) dom.props.w = dom.props.radius * 2;
    if (dom.props.h === undefined && dom.props.radius) dom.props.h = dom.props.radius * 2;
  },
  onRenderMount: dom => {
    if (dom.props.sAngle === undefined) dom.props.sAngle = Math.PI * 0;
    if (dom.props.eAngle === undefined) dom.props.eAngle = Math.PI * 2;
    if (dom.props.counterclockwise === undefined) dom.props.counterclockwise = false;
    dom.path = context => {
      context.arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise);
    };
  }
};
/* harmony default export */ const Module_Tag_Component_Arc = (App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Bezier.js
const Module_Tag_Component_Bezier_App = {
  onConstructMounted: dom => {
    dom.props.path = dom.element.props.path && JSON.parse(JSON.stringify(dom.element.props.path));
  },
  onRenderMount: dom => {
    if (dom.props.path === undefined) {
      dom.props.path = dom.children.filter(i => i.element.tag === 'path').map(i => i.props);
    }
    dom.path = context => {
      context.moveTo(dom.props.path[0].x, dom.props.path[0].y);
      context.quadraticCurveTo(dom.props.path[1].x, dom.props.path[1].y, dom.props.path[2].x, dom.props.path[2].y, dom.props.path[3].x, dom.props.path[3].y);
    };
  }
};
/* harmony default export */ const Module_Tag_Component_Bezier = (Module_Tag_Component_Bezier_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Circle.js
const Module_Tag_Component_Circle_App = {
  onConstructMounted: dom => {
    dom.props.radius = dom.element.props.radius;
    dom.props.sAngle = dom.element.props.sAngle;
    dom.props.eAngle = dom.element.props.eAngle;
    dom.props.counterclockwise = dom.element.props.counterclockwise;
  },
  onLocationMount: dom => {
    if (dom.props.w === undefined && dom.props.radius) dom.props.w = dom.props.radius * 2;
    if (dom.props.h === undefined && dom.props.radius) dom.props.h = dom.props.radius * 2;
  },
  onRenderMount: dom => {
    if (dom.props.sAngle === undefined) dom.props.sAngle = Math.PI * 0;
    if (dom.props.eAngle === undefined) dom.props.eAngle = Math.PI * 2;
    if (dom.props.counterclockwise === undefined) dom.props.counterclockwise = false;
    dom.path = context => {
      context.moveTo(dom.props.cx, dom.props.cy);
      context.arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise);
      context.lineTo(dom.props.cx, dom.props.cy);
    };
  }
};
/* harmony default export */ const Module_Tag_Component_Circle = (Module_Tag_Component_Circle_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Image.js
const Module_Tag_Component_Image_App = {
  onConstructMounted: dom => {
    dom.props.src = dom.element.props.src;
    dom.props.sx = dom.element.props.sx;
    dom.props.sy = dom.element.props.sy;
    dom.props.sw = dom.element.props.sw;
    dom.props.sh = dom.element.props.sh;
    dom.props.clipHorizontalForward = dom.element.props.clipHorizontalForward;
    dom.props.clipHorizontalCenter = dom.element.props.clipHorizontalCenter;
    dom.props.clipHorizontalReverse = dom.element.props.clipHorizontalReverse;
    dom.props.clipVerticalForward = dom.element.props.clipVerticalForward;
    dom.props.clipVerticalCenter = dom.element.props.clipVerticalCenter;
    dom.props.clipVerticalReverse = dom.element.props.clipVerticalReverse;
  },
  onLocationMount: dom => {
    if (dom.props.src) {
      dom.resize();
      var image = dom.props.src;
      var x = dom.props.x;
      var y = dom.props.y;
      var w = dom.props.w;
      var h = dom.props.h;
      var sx = 0;
      var sy = 0;
      var sw = image.width;
      var sh = image.height;
      const dw = w / sw;
      const dh = h / sh;
      const clipHorizontalFind = Object.keys(dom.props).find(i => {
        return ['clipHorizontalForward', 'clipHorizontalCenter', 'clipHorizontalReverse'].includes(i) && dom.props[i];
      });
      const clipVerticalFind = Object.keys(dom.props).find(i => {
        return ['clipVerticalForward', 'clipVerticalCenter', 'clipVerticalReverse'].includes(i) && dom.props[i];
      });
      if (dh > dw && clipHorizontalFind === 'clipHorizontalForward') {
        sx = 0;
        sw = sw * dw / dh;
      }
      if (dh > dw && clipHorizontalFind === 'clipHorizontalCenter') {
        sx = sw - sw * dw / dh;
        sx = sx / 2;
        sw = sw * dw / dh;
      }
      if (dh > dw && clipHorizontalFind === 'clipHorizontalReverse') {
        sx = sw - sw * dw / dh;
        sw = sw * dw / dh;
      }
      if (dw > dh && clipVerticalFind === 'clipVerticalForward') {
        sy = 0;
        sh = sh * dh / dw;
      }
      if (dw > dh && clipVerticalFind === 'clipVerticalCenter') {
        sy = sh - sh * dh / dw;
        sy = sy / 2;
        sh = sh * dh / dw;
      }
      if (dw > dh && clipVerticalFind === 'clipVerticalReverse') {
        sy = sh - sh * dh / dw;
        sh = sh * dh / dw;
      }
      dom.props.sx = sx;
      dom.props.sy = sy;
      dom.props.sw = sw;
      dom.props.sh = sh;
      const rdw = dom.props.w / sw;
      const rdh = dom.props.h / sh;
      if (rdh > rdw) dom.props.h = dom.props.h * rdw / rdh;
      if (rdw > rdh) dom.props.w = dom.props.w * rdw / rdh;
    }
  },
  onRenderMounted: dom => {
    if (dom.props.src) {
      dom.context.drawImage(dom.props.src, dom.props.sx, dom.props.sy, dom.props.sw, dom.props.sh, dom.props.x, dom.props.y, dom.props.w, dom.props.h);
    }
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
  onConstructMounted: dom => {
    dom.props.container = dom.element.props.container;
    dom.props.item = dom.element.props.item;
    dom.props.wrap = dom.element.props.wrap;
    dom.props.gap = dom.element.props.gap;
    dom.props.horizontalForward = dom.element.props.horizontalForward;
    dom.props.horizontalReverse = dom.element.props.horizontalReverse;
    dom.props.horizontalCenter = dom.element.props.horizontalCenter;
    dom.props.horizontalAround = dom.element.props.horizontalAround;
    dom.props.horizontalBetween = dom.element.props.horizontalBetween;
    dom.props.horizontalAlignForward = dom.element.props.horizontalAlignForward;
    dom.props.horizontalAlignReverse = dom.element.props.horizontalAlignReverse;
    dom.props.horizontalAlignCenter = dom.element.props.horizontalAlignCenter;
    dom.props.verticalForward = dom.element.props.verticalForward;
    dom.props.verticalReverse = dom.element.props.verticalReverse;
    dom.props.verticalCenter = dom.element.props.verticalCenter;
    dom.props.verticalAround = dom.element.props.verticalAround;
    dom.props.verticalBetween = dom.element.props.verticalBetween;
    dom.props.verticalAlignForward = dom.element.props.verticalAlignForward;
    dom.props.verticalAlignReverse = dom.element.props.verticalAlignReverse;
    dom.props.verticalAlignCenter = dom.element.props.verticalAlignCenter;
  },
  onLocationMounted: dom => {
    if (dom.props.gap === undefined) dom.props.gap = 0;
    if (dom.props.container) {
      const itemProps = [];
      dom.children.forEach(i => {
        if (i.element.tag === 'layout' && i.props.item) {
          i.resize();
          itemProps.push(i.props);
        }
      });
      const indexHorizontal = Object.keys(dom.props).findIndex(i => {
        return ['horizontalForward', 'horizontalReverse', 'horizontalCenter', 'horizontalAround', 'horizontalAround', 'horizontalBetween'].includes(i) && dom.props[i];
      });
      const indexVertical = Object.keys(dom.props).findIndex(i => {
        return ['verticalForward', 'verticalReverse', 'verticalCenter', 'verticalAround', 'verticalAround', 'verticalBetween'].includes(i) && dom.props[i];
      });
      const indexHorizontalAlign = Object.keys(dom.props).findIndex(i => {
        return ['horizontalAlignForward', 'horizontalAlignReverse', 'horizontalAlignCenter'].includes(i) && dom.props[i];
      });
      const indexVerticalAlign = Object.keys(dom.props).findIndex(i => {
        return ['verticalAlignForward', 'verticalAlignReverse', 'verticalAlignCenter'].includes(i) && dom.props[i];
      });
      if (Boolean(dom.props.wrap) === true) {
        if (indexHorizontal > -1 && indexVertical > -1 && indexHorizontal < indexVertical) {
          wrapHorizontal({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, maps[Object.keys(dom.props)[indexHorizontal]], maps[Object.keys(dom.props)[indexVertical]], dom.props.gap);
        }
        if (indexVertical > -1 && indexVertical > -1 && indexVertical < indexHorizontal) {
          wrapVertical({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, maps[Object.keys(dom.props)[indexVertical]], maps[Object.keys(dom.props)[indexHorizontal]], dom.props.gap);
        }
      }
      if (Boolean(dom.props.wrap) === false) {
        if (indexHorizontal > -1) {
          horizontalFlex({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, dom.props.gap);
        }
        if (indexVertical > -1) {
          verticalFlex({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, dom.props.gap);
        }
        if (indexHorizontal > -1) {
          maps[Object.keys(dom.props)[indexHorizontal]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, dom.props.gap);
        }
        if (indexVertical > -1) {
          maps[Object.keys(dom.props)[indexVertical]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, dom.props.gap);
        }
        if (indexHorizontalAlign > -1) {
          maps[Object.keys(dom.props)[indexHorizontalAlign]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, dom.props.gap);
        }
        if (indexVerticalAlign > -1) {
          maps[Object.keys(dom.props)[indexVerticalAlign]]({
            x: dom.props.x,
            y: dom.props.y,
            w: dom.props.w,
            h: dom.props.h
          }, itemProps, dom.props.gap);
        }
      }
    }
  }
};
/* harmony default export */ const Module_Tag_Component_Layout = (Module_Tag_Component_Layout_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Line.js
const Module_Tag_Component_Line_App = {
  onConstructMounted: dom => {
    dom.props.path = dom.element.props.path && JSON.parse(JSON.stringify(dom.element.props.path));
  },
  onRenderMount: dom => {
    if (dom.props.path === undefined) {
      dom.props.path = dom.children.filter(i => i.element.tag === 'path').map(i => i.props);
    }
    dom.path = context => {
      dom.props.path.forEach((i, index) => {
        if (index === 0) context.moveTo(i.x, i.y);
        if (index === 0) context.lineTo(i.x, i.y);
        if (index !== 0) context.lineTo(i.x, i.y);
      });
    };
  }
};
/* harmony default export */ const Module_Tag_Component_Line = (Module_Tag_Component_Line_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Quadratic.js
const Module_Tag_Component_Quadratic_App = {
  onConstructMounted: dom => {
    dom.props.path = dom.element.props.path && JSON.parse(JSON.stringify(dom.element.props.path));
  },
  onRenderMount: dom => {
    if (dom.props.path === undefined) {
      dom.props.path = dom.children.filter(i => i.element.tag === 'path').map(i => i.props);
    }
    dom.path = context => {
      context.moveTo(dom.props.path[0].x, dom.props.path[0].y);
      context.quadraticCurveTo(dom.props.path[1].x, dom.props.path[1].y, dom.props.path[2].x, dom.props.path[2].y);
    };
  }
};
/* harmony default export */ const Module_Tag_Component_Quadratic = (Module_Tag_Component_Quadratic_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Rect.js
const Module_Tag_Component_Rect_App = {
  onRenderMount: dom => {
    dom.path = context => {
      context.rect(dom.props.x, dom.props.y, dom.props.w, dom.props.h);
    };
  }
};
/* harmony default export */ const Module_Tag_Component_Rect = (Module_Tag_Component_Rect_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.RectRadius.js
const Module_Tag_Component_RectRadius_App = {
  onConstructMounted: dom => {
    dom.props.radius = dom.element.props.radius && JSON.parse(JSON.stringify(dom.element.props.radius));
  },
  onRenderMount: dom => {
    dom.path = context => {
      const fillRadius = radius => {
        var rRadius = new Array(4).fill(0);
        if (radius && typeof radius === 'object') rRadius = radius;
        if (radius && typeof radius === 'number') rRadius = new Array(4).fill(radius);
        return rRadius;
      };
      const radius = fillRadius(dom.props.radius);
      radius.forEach((i, index) => {
        if (radius[index] > dom.props.w / 2) radius[index] = dom.props.w / 2;
        if (radius[index] > dom.props.h / 2) radius[index] = dom.props.h / 2;
        if (radius[index] < 0) radius[index] = 0;
      });
      context.moveTo(dom.props.x, dom.props.y + radius[0]);
      context.arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0]);
      context.lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y);
      context.arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1]);
      context.lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2]);
      context.arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2]);
      context.lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h);
      context.arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3]);
      context.lineTo(dom.props.x, dom.props.y + radius[0]);
    };
  }
};
/* harmony default export */ const Module_Tag_Component_RectRadius = (Module_Tag_Component_RectRadius_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.Component.Text.js
const Module_Tag_Component_Text_App = {
  onConstructMounted: dom => {
    dom.props.text = dom.element.props.text;
    dom.props.fillText = dom.element.props.fillText;
    dom.props.strokeText = dom.element.props.strokeText;
  },
  onRenderMounted: dom => {
    const px = Number(dom.context.font.match(/[\d\.]+px/)[0].replace('px', ''));
    var text = dom.props.text;
    var x = dom.props.x;
    var y = dom.props.y + px * 0.82;
    if (dom.props.fillText) dom.context.fillText(text, x, y);
    if (dom.props.strokeText) dom.context.strokeText(text, x, y);
  }
};
/* harmony default export */ const Module_Tag_Component_Text = (Module_Tag_Component_Text_App);
;// CONCATENATED MODULE: ./package/Canvas2d/Module.Tag.js













const pick = tag => {
  if (tag === 'arc') return Module_Tag_Component_Arc;
  if (tag === 'bezier') return Module_Tag_Component_Bezier;
  if (tag === 'circle') return Module_Tag_Component_Circle;
  if (tag === 'image') return Module_Tag_Component_Image;
  if (tag === 'layout') return Module_Tag_Component_Layout;
  if (tag === 'line') return Module_Tag_Component_Line;
  if (tag === 'quadratic') return Module_Tag_Component_Quadratic;
  if (tag === 'rect') return Module_Tag_Component_Rect;
  if (tag === 'rectradius') return Module_Tag_Component_RectRadius;
  if (tag === 'text') return Module_Tag_Component_Text;
};
const constructMount = dom => {
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
  const resize = () => {
    if (dom.parent) {
      if (typeof dom.props.w !== 'undefined') dom.props.w = unit(dom.props.w, 'w');
      if (typeof dom.props.w === 'undefined') dom.props.w = dom.parent.props.w;
      if (typeof dom.props.h !== 'undefined') dom.props.h = unit(dom.props.h, 'h');
      if (typeof dom.props.h === 'undefined') dom.props.h = dom.parent.props.h;
    }
  };
  const relocation = () => {
    if (dom.parent) {
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
    }
  };
  const recoordinate = () => {
    Object.assign(dom.props, Module_Location.coordinate(dom.props));
  };
  const contextPaintMemoRecord = () => {
    dom.contextMemo.globalAlpha = dom.props.globalAlpha === undefined ? dom.parent && dom.parent.contextMemo.globalAlpha : dom.props.globalAlpha;
    dom.contextMemo.font = dom.props.font === undefined ? dom.parent && dom.parent.contextMemo.font : dom.props.font;
    dom.contextMemo.fillStyle = dom.props.fillStyle === undefined ? dom.parent && dom.parent.contextMemo.fillStyle : dom.props.fillStyle;
    dom.contextMemo.strokeStyle = dom.props.strokeStyle === undefined ? dom.parent && dom.parent.contextMemo.strokeStyle : dom.props.strokeStyle;
    dom.contextMemo.shadowBlur = dom.props.shadowBlur === undefined ? dom.parent && dom.parent.contextMemo.shadowBlur : dom.props.shadowBlur;
    dom.contextMemo.shadowColor = dom.props.shadowColor === undefined ? dom.parent && dom.parent.contextMemo.shadowColor : dom.props.shadowColor;
    dom.contextMemo.shadowOffsetX = dom.props.shadowOffsetX === undefined ? dom.parent && dom.parent.contextMemo.shadowOffsetX : dom.props.shadowOffsetX;
    dom.contextMemo.shadowOffsetY = dom.props.shadowOffsetY === undefined ? dom.parent && dom.parent.contextMemo.shadowOffsetY : dom.props.shadowOffsetY;
    dom.contextMemo.lineWidth = dom.props.lineWidth === undefined ? dom.parent && dom.parent.contextMemo.lineWidth : dom.props.lineWidth;
    dom.contextMemo.lineDashOffset = dom.props.lineDashOffset === undefined ? dom.parent && dom.parent.contextMemo.lineDashOffset : dom.props.lineDashOffset;
    dom.contextMemo.setLineDash = dom.props.setLineDash === undefined ? dom.parent && dom.parent.contextMemo.setLineDash : dom.props.setLineDash;
  };
  const contextPaintMemo = context => {
    if (dom.contextMemo.globalAlpha !== undefined) context.globalAlpha = dom.contextMemo.globalAlpha;
    if (dom.contextMemo.font !== undefined) context.font = dom.contextMemo.font;
    if (dom.contextMemo.fillStyle !== undefined) context.fillStyle = dom.contextMemo.fillStyle;
    if (dom.contextMemo.strokeStyle !== undefined) context.strokeStyle = dom.contextMemo.strokeStyle;
    if (dom.contextMemo.shadowBlur !== undefined) context.shadowBlur = dom.contextMemo.shadowBlur;
    if (dom.contextMemo.shadowColor !== undefined) context.shadowColor = dom.contextMemo.shadowColor;
    if (dom.contextMemo.shadowOffsetX !== undefined) context.shadowOffsetX = dom.contextMemo.shadowOffsetX;
    if (dom.contextMemo.shadowOffsetY !== undefined) context.shadowOffsetY = dom.contextMemo.shadowOffsetY;
    if (dom.contextMemo.lineWidth !== undefined) context.lineWidth = dom.contextMemo.lineWidth;
    if (dom.contextMemo.lineDashOffset !== undefined) context.lineDashOffset = dom.contextMemo.lineDashOffset;
    if (dom.contextMemo.setLineDash !== undefined) context.setLineDash(dom.contextMemo.setLineDash);
  };
  const contextPaint = context => {
    if (dom.props.globalAlpha !== undefined) context.globalAlpha = dom.props.globalAlpha;
    if (dom.props.font !== undefined) context.font = dom.props.font;
    if (dom.props.fillStyle !== undefined) context.fillStyle = dom.props.fillStyle;
    if (dom.props.strokeStyle !== undefined) context.strokeStyle = dom.props.strokeStyle;
    if (dom.props.shadowBlur !== undefined) context.shadowBlur = dom.props.shadowBlur;
    if (dom.props.shadowColor !== undefined) context.shadowColor = dom.props.shadowColor;
    if (dom.props.shadowOffsetX !== undefined) context.shadowOffsetX = dom.props.shadowOffsetX;
    if (dom.props.shadowOffsetY !== undefined) context.shadowOffsetY = dom.props.shadowOffsetY;
    if (dom.props.lineWidth !== undefined) context.lineWidth = dom.props.lineWidth;
    if (dom.props.lineDashOffset !== undefined) context.lineDashOffset = dom.props.lineDashOffset;
    if (dom.props.setLineDash !== undefined) context.setLineDash(dom.props.setLineDash);
    contextPaintMemoRecord();
  };
  const contextTransformMemoRecord = () => {
    dom.contextMemo.transform = [...(dom.parent && dom.parent.contextMemo.transform || []), ...(dom.props.transform || [])];
  };
  const contextTransformMemo = context => {
    const unit = (type, value) => {
      if (type === 'rotate') context.rotate(value.angle);
      if (type === 'scale') context.scale(value.w, value.h);
      if (type === 'translate') context.translate(value.x, value.y);
    };
    if (dom.contextMemo.transform) dom.contextMemo.transform.forEach(i => Object.keys(i).forEach(n => unit(n, i[n])));
  };
  const contextTransform = context => {
    const unit = (type, value) => {
      if (type === 'rotate') context.rotate(value.angle);
      if (type === 'scale') context.scale(value.w, value.h);
      if (type === 'translate') context.translate(value.x, value.y);
    };
    if (dom.props.transform) dom.props.transform.forEach(i => Object.keys(i).forEach(n => unit(n, i[n])));
    contextTransformMemoRecord();
  };
  const contextSave = context => {
    if (dom.props.globalAlpha !== undefined || dom.props.font !== undefined || dom.props.fillStyle !== undefined || dom.props.strokeStyle !== undefined || dom.props.shadowBlur !== undefined || dom.props.shadowColor !== undefined || dom.props.shadowOffsetX !== undefined || dom.props.shadowOffsetY !== undefined || dom.props.lineWidth !== undefined || dom.props.lineDashOffset !== undefined || dom.props.setLineDash !== undefined || dom.props.transform !== undefined || dom.props.clip !== undefined) {
      if (dom.props.save === undefined || dom.props.save) context.save();
    }
  };
  const contextRestore = context => {
    if (dom.props.globalAlpha !== undefined || dom.props.font !== undefined || dom.props.fillStyle !== undefined || dom.props.strokeStyle !== undefined || dom.props.shadowBlur !== undefined || dom.props.shadowColor !== undefined || dom.props.shadowOffsetX !== undefined || dom.props.shadowOffsetY !== undefined || dom.props.lineWidth !== undefined || dom.props.lineDashOffset !== undefined || dom.props.setLineDash !== undefined || dom.props.transform !== undefined || dom.props.clip !== undefined) {
      if (dom.props.save === undefined || dom.props.save) context.restore();
    }
  };
  const contextPath = context => {
    if (dom.path) context.beginPath();
    if (dom.path) dom.path(context);
  };
  const contextDraw = context => {
    if (dom.props.clip) context.clip();
    if (dom.props.fill) context.fill();
    if (dom.props.stroke) context.stroke();
  };
  const addEventListener = () => {
    const type = [{
      type: 'pointerdown',
      event: dom.props.onPointerDown,
      eventAway: dom.props.onPointerDownAway,
      option: dom.props.onPointerDownOption
    }, {
      type: 'pointermove',
      event: dom.props.onPointerMove,
      eventAway: dom.props.onPointerMoveAway,
      option: dom.props.onPointerMoveOption
    }, {
      type: 'pointerup',
      event: dom.props.onPointerUp,
      eventAway: dom.props.onPointerUpAway,
      option: dom.props.onPointerUpOption
    }];
    const event = (e, i) => {
      const isPointIn = (x, y) => {
        Canvas2d_Core.offscreenContext().clearRect(0, 0, Canvas2d_Core.offscreenCanvas().width, Canvas2d_Core.offscreenCanvas().height);
        Canvas2d_Core.offscreenContext().save();
        if (dom.contextPaintMemo) dom.contextPaintMemo(Canvas2d_Core.offscreenContext());
        if (dom.contextTransformMemo) dom.contextTransformMemo(Canvas2d_Core.offscreenContext());
        if (dom.contextPath) dom.contextPath(Canvas2d_Core.offscreenContext());
        if (dom.contextDraw) dom.contextDraw(Canvas2d_Core.offscreenContext());
        const inPath = Canvas2d_Core.offscreenContext().isPointInPath(x, y);
        const inStroke = Canvas2d_Core.offscreenContext().isPointInStroke(x, y);
        Canvas2d_Core.offscreenContext().restore();
        return {
          inPath,
          inStroke
        };
      };
      var inPath = false;
      var inStroke = false;
      var index = 0;
      while (inPath !== true && inStroke !== true && e.xs[index] !== undefined && e.ys[index] !== undefined) {
        const pointIn = isPointIn(e.xs[index], e.ys[index]);
        inPath = pointIn.inPath || inPath;
        inStroke = pointIn.inStroke || inStroke;
        index = index + 1;
      }
      if ((inPath === true || inStroke === true) && i.event) i.event({
        ...e,
        dom,
        inPath,
        inStroke
      });
      if (inPath !== true && inStroke !== true && i.eventAway) i.eventAway({
        ...e,
        dom,
        inPath,
        inStroke
      });
    };
    type.forEach(i => {
      if (i.event || i.eventAway) Module_Event.addEventListener(i.type, e => event(e, i), i.option);
    });
  };
  dom.props = Object();
  dom.props.key = dom.element.props.key;
  dom.props.zIndex = dom.element.props.zIndex;
  dom.props.x = dom.element.props.x;
  dom.props.y = dom.element.props.y;
  dom.props.w = dom.element.props.w;
  dom.props.h = dom.element.props.h;
  dom.props.cx = dom.element.props.cx;
  dom.props.cy = dom.element.props.cy;
  dom.props.gx = dom.element.props.gx;
  dom.props.gy = dom.element.props.gy;
  dom.props.l = dom.element.props.l;
  dom.props.r = dom.element.props.r;
  dom.props.t = dom.element.props.t;
  dom.props.b = dom.element.props.b;
  dom.props.globalAlpha = dom.element.props.globalAlpha;
  dom.props.font = dom.element.props.font;
  dom.props.fillStyle = dom.element.props.fillStyle;
  dom.props.strokeStyle = dom.element.props.strokeStyle;
  dom.props.shadowBlur = dom.element.props.shadowBlur;
  dom.props.shadowColor = dom.element.props.shadowColor;
  dom.props.shadowOffsetX = dom.element.props.shadowOffsetX;
  dom.props.shadowOffsetY = dom.element.props.shadowOffsetY;
  dom.props.lineWidth = dom.element.props.lineWidth;
  dom.props.setLineDash = dom.element.props.setLineDash;
  dom.props.transform = dom.element.props.transform && JSON.parse(JSON.stringify(dom.element.props.transform));
  dom.props.clip = dom.element.props.clip;
  dom.props.save = dom.element.props.save;
  dom.props.fill = dom.element.props.fill;
  dom.props.stroke = dom.element.props.stroke;
  dom.props.onPointerDown = dom.element.props.onPointerDown;
  dom.props.onPointerDownAway = dom.element.props.onPointerDownAway;
  dom.props.onPointerDownOption = dom.element.props.onPointerDownOption;
  dom.props.onPointerMove = dom.element.props.onPointerMove;
  dom.props.onPointerMoveAway = dom.element.props.onPointerMoveAway;
  dom.props.onPointerMoveOption = dom.element.props.onPointerMoveOption;
  dom.props.onPointerUp = dom.element.props.onPointerUp;
  dom.props.onPointerUpAway = dom.element.props.onPointerUpAway;
  dom.props.onPointerUpOption = dom.element.props.onPointerUpOption;
  dom.canvas = dom.props.canvas || dom.parent && dom.parent.props.canvas || Canvas2d_Core.canvas();
  dom.context = dom.props.context || dom.parent && dom.parent.props.context || Canvas2d_Core.context();
  dom.contextMemo = Object();
  dom.resize = resize;
  dom.relocation = relocation;
  dom.recoordinate = recoordinate;
  dom.contextPaint = contextPaint;
  dom.contextPaintMemo = contextPaintMemo;
  dom.contextTransform = contextTransform;
  dom.contextTransformMemo = contextTransformMemo;
  dom.contextSave = contextSave;
  dom.contextRestore = contextRestore;
  dom.contextPath = contextPath;
  dom.contextDraw = contextDraw;
  dom.addEventListener = addEventListener;
};
const constructUnmount = dom => {
  if (dom) {}
};
const locationMount = dom => {
  if (dom.resize) dom.resize();
  if (dom.relocation) dom.relocation();
  if (dom.recoordinate) dom.recoordinate();
};
const locationUnmount = dom => {
  if (dom) {}
};
const renderMount = dom => {
  if (dom.contextSave) dom.contextSave(dom.context);
  if (dom.contextPaint) dom.contextPaint(dom.context);
  if (dom.contextTransform) dom.contextTransform(dom.context);
  if (dom.contextPath) dom.contextPath(dom.context);
  if (dom.contextDraw) dom.contextDraw(dom.context);
  if (dom.addEventListener) dom.addEventListener();
};
const renderUnmount = dom => {
  if (dom.contextRestore) dom.contextRestore(dom.context);
};
const onConstruct = dom => {
  const tagComponent = pick(dom.element.tag);
  if (typeof dom.element.props.onConstructMount === 'function') dom.element.props.onConstructMount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onConstructMount === 'function') tagComponent.onConstructMount(dom);
  constructMount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onConstructMounted === 'function') tagComponent.onConstructMounted(dom);
  if (typeof dom.element.props.onConstructMounted === 'function') dom.element.props.onConstructMounted(dom);
  if (dom.children) dom.children.forEach(i => onConstruct(i));
  if (typeof dom.element.props.onConstructUnmount === 'function') dom.element.props.onConstructUnmount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onConstructUnmount === 'function') tagComponent.onConstructUnmount(dom);
  constructUnmount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onConstructUnmounted === 'function') tagComponent.onConstructUnmounted(dom);
  if (typeof dom.element.props.onConstructUnmounted === 'function') dom.element.props.onConstructUnmounted(dom);
};
const onLocation = dom => {
  const tagComponent = pick(dom.element.tag);
  if (typeof dom.element.props.onLocationMount === 'function') dom.element.props.onLocationMount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onLocationMount === 'function') tagComponent.onLocationMount(dom);
  locationMount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onLocationMounted === 'function') tagComponent.onLocationMounted(dom);
  if (typeof dom.element.props.onLocationMounted === 'function') dom.element.props.onLocationMounted(dom);
  if (dom.children) dom.children.forEach(i => onLocation(i));
  if (typeof dom.element.props.onLocationUnmount === 'function') dom.element.props.onLocationUnmount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onLocationUnmount === 'function') tagComponent.onLocationUnmount(dom);
  locationUnmount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onLocationUnmounted === 'function') tagComponent.onLocationUnmounted(dom);
  if (typeof dom.element.props.onLocationUnmounted === 'function') dom.element.props.onLocationUnmounted(dom);
};
const onRender = dom => {
  const tagComponent = pick(dom.element.tag);
  if (typeof dom.element.props.onRenderMount === 'function') dom.element.props.onRenderMount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onRenderMount === 'function') tagComponent.onRenderMount(dom);
  renderMount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onRenderMounted === 'function') tagComponent.onRenderMounted(dom);
  if (typeof dom.element.props.onRenderMounted === 'function') dom.element.props.onRenderMounted(dom);
  if (dom.children) dom.children.sort((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => onRender(i));
  if (typeof dom.element.props.onRenderUnmount === 'function') dom.element.props.onRenderUnmount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onRenderUnmount === 'function') tagComponent.onRenderUnmount(dom);
  renderUnmount(dom);
  if (tagComponent !== undefined && typeof tagComponent.onRenderUnmounted === 'function') tagComponent.onRenderUnmounted(dom);
  if (typeof dom.element.props.onRenderUnmounted === 'function') dom.element.props.onRenderUnmounted(dom);
};
/* harmony default export */ const Module_Tag = ({
  onConstruct,
  onLocation,
  onRender
});
;// CONCATENATED MODULE: ./package/Canvas2d/Core.js



var canvas;
var context;
var dpr;
var rect;
var offscreenCanvas;
var offscreenContext;
const Core_update = () => {
  rect = canvas.getBoundingClientRect();
  rect.x = rect.x;
  rect.y = rect.y;
  if (rect.x === undefined) rect.x = rect.left;
  if (rect.y === undefined) rect.y = rect.top;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  offscreenCanvas.width = rect.width * dpr;
  offscreenCanvas.height = rect.height * dpr;
};
const Core_mount = (canvas_0, dpr_0) => {
  canvas = canvas_0;
  dpr = dpr_0;
  context = canvas.getContext('2d');
  offscreenCanvas = Module_Canvas.createOffscreenCanvas(0, 0);
  offscreenContext = offscreenCanvas.getContext('2d');
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
  Module_Tag.onConstruct(dom);
  Module_Tag.onLocation(dom);
  Module_Tag.onRender(dom);
};
/* harmony default export */ const Canvas2d_Core = ({
  dpr: () => dpr,
  canvas: () => canvas,
  context: () => context,
  rect: () => rect,
  offscreenCanvas: () => offscreenCanvas,
  offscreenContext: () => offscreenContext,
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
  if (px === ax && py === ay) return 0;
  if (px === bx && py === by) return 0;
  let ab_distance = Math.sqrt(abx ** 2 + aby ** 2);
  let ab_dot = apx * abx + apy * aby;
  let ab_rate = ab_dot / ab_distance;
  if (ab_rate < 0) {
    return distancePointPoint(point, line[0]);
  }
  if (ab_rate > ab_distance) {
    return distancePointPoint(point, line[1]);
  }
  if (ab_rate > 0 && ab_rate < ab_distance) {
    return Math.sqrt(apx ** 2 + apy ** 2 - ab_rate ** 2);
  }
};

// console.log(distancePointLine({ x: 1 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 2 ,y: 2 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 0 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 3 ,y: 3 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 1 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(distancePointLine({ x: 0 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))

const rotatePoint = (originPoint, targetPoint, angle) => {
  const x = originPoint.x;
  const y = originPoint.y;
  const targetX = targetPoint.x;
  const targetY = targetPoint.y;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const rotateX = (x - targetX) * cos - (y - targetY) * sin + targetX;
  const rotateY = (x - targetX) * sin + (y - targetY) * cos + targetY;
  return {
    x: rotateX,
    y: rotateY
  };
};
const conversionRectPoint = rect => {
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
const conversionRectLine = rect => {
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
  return [[point0, point1], [point1, point2], [point2, point3], [point3, point0]];
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
const intersectionPointCircle = (point, circle) => {
  const cx = circle.cx;
  const cy = circle.cy;
  const r = circle.radius;
  return distancePointPoint(point, {
    x: cx,
    y: cy
  }) <= r;
};
const intersectionCircleCircle = (circle0, circle1) => {
  const cx0 = circle0.cx;
  const cy0 = circle0.cy;
  const r0 = circle0.radius;
  const cx1 = circle1.cx;
  const cy1 = circle1.cy;
  const r1 = circle1.radius;
  return distancePointPoint({
    x: cx0,
    y: cy0
  }, {
    x: cx1,
    y: cy1
  }) <= r0 + r1;
};

// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 0, cy: 0, radius: 0.1 }))
// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 0, cy: 0, radius: 1 }))
// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 2, cy: 0, radius: 1 }))
// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 1, cy: 0, radius: 1 }))
// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 1, cy: 1, radius: 1 }))
// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 1, cy: 1, radius: 0.5 }))
// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 1, cy: 1, radius: 0.1 }))
// console.log(intersectionCircleCircle({ cx: 0, cy: 0, radius: 1 }, { cx: 0, cy: 2, radius: 0.01 }))

const intersectionPointLine = (point, line) => {
  const p0 = line[0];
  const p1 = line[1];
  const crossProduct = (p0, p1, p2, p3) => (p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x);
  const selfCrossProduct = crossProduct(point, p0, point, p1);
  const inside = point.x >= Math.min(p0.x, p1.x) && point.x <= Math.max(p0.x, p1.x) && point.y >= Math.min(p0.y, p1.y) && point.y <= Math.max(p0.y, p1.y);
  return selfCrossProduct === 0 && inside;
};

// console.log(intersectionPointLine({ x: 1 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 2 ,y: 2 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 1.5 ,y: 1.5 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 1.75 ,y: 1.75 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 0 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 3 ,y: 3 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 1 ,y: 0 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))
// console.log(intersectionPointLine({ x: 0 ,y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 2 }]))

const intersectionLineCircle = (line, circle) => {
  const cx = circle.cx;
  const cy = circle.cy;
  const r = circle.radius;
  const point = {
    x: cx,
    y: cy
  };
  return distancePointLine(point, line) <= r;
};

// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.1 })) // true
// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 4, y: 0 }], { cx: 0.5, cy: 0.5, radius: 0.01 })) // false
// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.5 })) // true
// console.log(intersectionLineCircle([{ x: 0, y: 0 }, { x: 1, y: 1 }], { cx: 0.5, cy: 0.5, radius: 0.6 })) // true

const intersectionPointPolygon = (point, polygon) => {
  let count = 0;
  const inLine = new Array(polygon.length).fill().some((i, index) => {
    const p0 = polygon[index];
    const p1 = polygon[(index + 1) % polygon.length];
    if (intersectionPointLine(point, [p0, p1])) {
      return true;
    }
    if (point.y > Math.min(p0.y, p1.y) && point.y <= Math.max(p0.y, p1.y) && (point.y - p0.y) * (p1.x - p0.x) / (p1.y - p0.y) + p0.x > point.x) {
      count = count + 1;
    }
  });
  return inLine || count % 2 === 1;
};
const intersectionLinePolygon = (line, polygon) => {
  const p0 = line[0];
  const p1 = line[1];
  return [p0, p1].some(point => intersectionPointPolygon(point, polygon));
};

// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }, { x: 4, y: 4 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 5, y: 6 }, { x: 7, y: 7 }, { x: 7, y: 2 }])) // false
// console.log(intersectionPointPolygon({ x: 2, y: 4 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }])) // false
// console.log(intersectionPointPolygon({ x: 4, y: 2 }, [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 4 }])) // false
// console.log(intersectionPointPolygon({ x: 2, y: 2 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // false
// console.log(intersectionPointPolygon({ x: 5, y: 5 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 4 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true
// console.log(intersectionPointPolygon({ x: 8, y: 8 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true
// console.log(intersectionPointPolygon({ x: 4, y: 8 }, [{ x: 4, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }])) // true

const intersectionPolygonPolygon = (polygon0, polygon1) => {
  return polygon0.some(point => intersectionPointPolygon(point, polygon1));
};
/* harmony default export */ const Module_Graph = ({
  distancePointPoint,
  distancePointLine,
  rotatePoint,
  conversionRectPoint,
  conversionRectLine,
  intersectionLineLine,
  intersectionPointCircle,
  intersectionCircleCircle,
  intersectionPointLine,
  intersectionLineCircle,
  intersectionPointPolygon,
  intersectionLinePolygon,
  intersectionPolygonPolygon
});
;// CONCATENATED MODULE: ./package/Canvas2d/index.js






/* harmony default export */ const Canvas2d = (Canvas2d_Core);

;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.CanvasLayout.js


function Component_CanvasLayout_App(props) {
  const onLocationMounted = dom => {
    dom.props.x = 0;
    dom.props.y = 0;
    dom.props.w = Canvas2d.rect().width * Canvas2d.dpr();
    dom.props.h = Canvas2d.rect().height * Canvas2d.dpr();
    dom.recoordinate();
  };
  return /*#__PURE__*/package_React.createElement("layout", {
    canvas: Canvas2d.canvas(),
    context: Canvas2d.context(),
    onLocationMounted: onLocationMounted
  }, props.children);
}
/* harmony default export */ const Component_CanvasLayout = (Component_CanvasLayout_App);
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
/* harmony default export */ const Hook_UseAnimationCount = ((/* unused pure expression or super */ null && (useAnimationCount)));
;// CONCATENATED MODULE: ./package/ReactExtensions/Hook.UseAnimationDestination.js

const useAnimationDestination = props => {
  const [animationCount, setAnimationCount] = package_React.useState(props.defaultCount);
  package_React.useEffect(() => {
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
/* harmony default export */ const Hook_UseEffectUpdate = ((/* unused pure expression or super */ null && (useEffectUpdate)));
;// CONCATENATED MODULE: ./package/ReactExtensions/index.js




;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.Text.js


const Component_Text_App = props => {
  const text = props.text;
  const font = props.font;
  const w = props.w;
  const wrap = props.wrap;
  const ellipsis = props.ellipsis || '';
  const split = props.split || '';
  const lineHeight = props.lineHeight || 1;
  const gap = props.gap || 0;
  const line = package_React.useMemo(() => {
    const px = Number(font.match(/[\d\.]+px/)[0].replace('px', ''));
    Canvas2d.context().save();
    Canvas2d.context().font = font;
    var caculateText = '';
    var caculateTextLine = [];
    var texts = text.split(split).map((i, index) => index ? [split, i] : [i]).flat();
    if (Boolean(wrap) === true) {
      texts.forEach(i => {
        const tw = Canvas2d.context().measureText(caculateText + i).width;
        if (tw > w && caculateText !== '') caculateTextLine.push(caculateText);
        if (tw > w && caculateText !== '') caculateText = i;
        if (tw > w && caculateText === '') caculateTextLine.push(i);
        if (tw < w) caculateText = caculateText + i;
      });
    }
    if (Boolean(wrap) !== true) {
      texts.some(i => {
        const tw = Canvas2d.context().measureText(caculateText + i + ellipsis).width;
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
        w: Canvas2d.context().measureText(i.trim()).width,
        h: px,
        font: font
      };
    });
    Canvas2d.context().restore();
    return caculateTextLine;
  }, [text, font, w, wrap, ellipsis, split]);
  const location = package_React.useMemo(() => {
    const w = Math.max(...line.map(i => i.w));
    const h = line.reduce((t, i, index) => t + i.h * lineHeight + (index ? gap : 0), 0);
    line.forEach((i, index) => i.y = i.h * (lineHeight - 1) + index * (i.h * lineHeight + gap));
    return {
      w: w,
      h: h
    };
  }, [line, lineHeight, gap]);
  return props.children.map(i => i(line, location));
};
/* harmony default export */ const Component_Text = (Component_Text_App);
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
    return /*#__PURE__*/package_React.createElement("layout", {
      container: true,
      verticalCenter: true,
      horizontalAlignCenter: true,
      globalAlpha: animationCountIntersection - animationCountDestory
    }, /*#__PURE__*/package_React.createElement(Component_Text, {
      text: `CanvasXML`,
      font: `bolder ${min * 0.06}px sans-serif`,
      w: Infinity
    }, (line, location) => {
      return line.map(i => {
        return /*#__PURE__*/package_React.createElement("layout", {
          w: i.w,
          h: i.h,
          item: true
        }, /*#__PURE__*/package_React.createElement("text", {
          fillText: true,
          fillStyle: "rgb(255, 255, 255)",
          w: i.w,
          h: i.h,
          text: i.text,
          font: i.font
        }));
      });
    }), /*#__PURE__*/package_React.createElement("layout", {
      h: min * 0.02,
      item: true
    }), /*#__PURE__*/package_React.createElement(Component_Text, {
      text: 'Powered by CanvasXML JS',
      font: `bolder ${min * 0.025}px sans-serif`,
      w: Infinity
    }, (line, location) => {
      return line.map(i => {
        return /*#__PURE__*/package_React.createElement("layout", {
          w: i.w,
          h: i.h,
          item: true
        }, /*#__PURE__*/package_React.createElement("text", {
          fillText: true,
          fillStyle: `rgb(130, 130, 130)`,
          w: i.w,
          h: i.h,
          text: i.text,
          font: i.font
        }));
      });
    }));
  }
}
/* harmony default export */ const Component_PoweredBy = (Component_PoweredBy_App);
;// CONCATENATED MODULE: ./package/ReactCanvas2d/Core.js




const translateNode = node => {
  const dom = {
    element: node.element,
    children: node.children
  };
  while (dom.children.some(i => i.type !== 0o00000100)) {
    dom.children = dom.children.map(i => i.type !== 0o00000100 ? i.children : i).flat();
  }
  dom.children = dom.children.map(i => translateNode(i));
  dom.children.forEach(i => i.parent = dom);
  return dom;
};
const ReactCanvas2d_Core_mount = (element, canvas, option) => {
  const dpr = option && option.dpr || 2;
  const renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 0;
  const powered = option && option.powered !== undefined ? option.powered : true;
  var Component;
  if (Boolean(powered) === true) Component = /*#__PURE__*/package_React.createElement("root", null, /*#__PURE__*/package_React.createElement(Component_CanvasLayout, null, /*#__PURE__*/package_React.createElement(Component_PoweredBy, null, element)));
  if (Boolean(powered) !== true) Component = /*#__PURE__*/package_React.createElement("root", null, /*#__PURE__*/package_React.createElement(Component_CanvasLayout, null, element));
  Canvas2d.mount(canvas, dpr);
  package_React.mount(Component, renderFrameTimeDiffMax, node => Canvas2d.render(translateNode(node)));
  return {
    render: package_React.render
  };
};
const Core_unMount = () => {
  Canvas2d.unMount();
  package_React.unmount();
};
const ReactCanvas2d_Core_update = () => {
  Canvas2d.update();
  package_React.shouldRender(package_React.renderQueueNode());
};
/* harmony default export */ const ReactCanvas2d_Core = ({
  mount: ReactCanvas2d_Core_mount,
  unMount: Core_unMount,
  update: ReactCanvas2d_Core_update
});
;// CONCATENATED MODULE: ./package/ReactCanvas2d/index.js

/* harmony default export */ const ReactCanvas2d = ((/* unused pure expression or super */ null && (Core)));
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
  } = ReactExtensions.useAnimationDestination({
    play: true,
    defaultCount: expandUse ? contentH : 0,
    destination: expandUse ? contentH : 0,
    rate: contentH / 5,
    postprocess: n => Number(n.toFixed(2))
  });
  ReactExtensions.useEffectUpdate(() => {
    if (props.onChangeExpand) props.onChangeExpand(expandUse);
  }, [expandUse]);
  ReactExtensions.useEffectUpdate(() => {
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
/* harmony default export */ const Component_Accordion = ((/* unused pure expression or super */ null && (Component_Accordion_App)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.Button.js
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }



function Component_Button_App(props) {
  const text = props.text || '';
  const textColor = props.textColor || new Array([215, 255], [215, 255], [215, 255], [1, 1]);
  const rectColor = props.rectColor || new Array([45, 85], [45, 85], [45, 85], [1, 1]);
  const radius = props.radius || 0;
  const fontSize = props.fontSize || 24;
  const fontFamily = props.fontFamily || 'monospace';
  const mode = props.mode || 'fill';
  const lineWidth = props.lineWidth || 1;
  const padding = props.padding || 24;
  const x = props.x || undefined;
  const y = props.y || undefined;
  const w = props.w || undefined;
  const h = props.h || undefined;
  const [hover, setHover] = React.useState(false);
  const animationCountTextRGBA = textColor.map((i, index) => ReactExtensions.useAnimationDestination({
    play: true,
    defaultCount: i[0],
    destination: i[hover ? 1 : 0],
    rate: Math.abs(i[1] - i[0]) / 15,
    postprocess: n => Number(n.toFixed(index === 3 ? 2 : 0))
  }));
  const animationCountRectRGBA = rectColor.map((i, index) => ReactExtensions.useAnimationDestination({
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
  }, /*#__PURE__*/React.createElement(Text, {
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
/* harmony default export */ const Component_Button = ((/* unused pure expression or super */ null && (Component_Button_App)));
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
/* harmony default export */ const Component_CoordinateHelper = ((/* unused pure expression or super */ null && (Component_CoordinateHelper_App)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.Rotate.js

function Component_Rotate_App(props) {
  const onLocationMounted = dom => {
    dom.props.transform = [{
      translate: {
        x: props.translateX,
        y: props.translateY
      }
    }, {
      rotate: {
        angle: props.rotateAngle
      }
    }, {
      translate: {
        x: 0 - props.translateX,
        y: 0 - props.translateY
      }
    }];
  };
  return /*#__PURE__*/React.createElement("layout", {
    onLocationMounted: onLocationMounted
  }, props.children);
}
/* harmony default export */ const Component_Rotate = ((/* unused pure expression or super */ null && (Component_Rotate_App)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Component.RotateCenter.js

function Component_RotateCenter_App(props) {
  const onLocationMounted = dom => {
    dom.props.transform = [{
      translate: {
        x: dom.props.cx,
        y: dom.props.cy
      }
    }, {
      rotate: {
        angle: props.rotateAngle
      }
    }, {
      translate: {
        x: 0 - dom.props.cx,
        y: 0 - dom.props.cy
      }
    }];
  };
  return /*#__PURE__*/React.createElement("layout", {
    onLocationMounted: onLocationMounted
  }, props.children);
}
/* harmony default export */ const Component_RotateCenter = ((/* unused pure expression or super */ null && (Component_RotateCenter_App)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.useLoadAudio.js

const useLoadAudio = props => {
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
/* harmony default export */ const Hook_useLoadAudio = ((/* unused pure expression or super */ null && (useLoadAudio)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseEventClick.js

const useEventClick = props => {
  const downRef = React.useRef(false);
  const onDown = () => {
    downRef.current = true;
  };
  const onUp = () => {
    if (downRef.current === true && (downRef.current = false) === false) props.onClick();
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
/* harmony default export */ const Hook_UseEventClick = ((/* unused pure expression or super */ null && (useEventClick)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.useEventDrag.js

const useEventDrag = props => {
  const [dragIng, setDragIng] = React.useState(false);
  const positionOrigin = React.useRef();
  const positionTarget = React.useRef();
  const onStart = React.useCallback(e => {
    if (props.enable === false) return;
    setDragIng(true);
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
    if (props.onChange) props.onChange({
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
    if (props.onChange) props.onChange({
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
    setDragIng(false);
    const x = e.x;
    const y = e.y;
    const changedX = x - positionTarget.current.x;
    const changedY = y - positionTarget.current.y;
    const continuedX = positionTarget.current.x - positionOrigin.current.x;
    const continuedY = positionTarget.current.y - positionOrigin.current.y;
    if (props.onChange) props.onChange({
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
    if (props.onChange) props.onChange({
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
    dragIng,
    onStart,
    onMove,
    onEnd
  };
};
/* harmony default export */ const Hook_useEventDrag = ((/* unused pure expression or super */ null && (useEventDrag)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.UseEventScroll.js


const useEventScroll = props => {
  const limitX = React.useRef(props.limitX);
  const limitY = React.useRef(props.limitY);
  const limitMinX = Math.min(...limitX.current);
  const limitMaxX = Math.max(...limitX.current);
  const limitMinY = Math.min(...limitY.current);
  const limitMaxY = Math.max(...limitY.current);
  const [moveX, setMoveX] = React.useState(0);
  const [moveY, setMoveY] = React.useState(0);
  const onChange = params => {
    const {
      status,
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    } = params;
    if (status === 'afterMove') {
      if (props.x) setMoveX(i => i + changedX);
      if (props.y) setMoveY(i => i + changedY);
    }
  };
  const {
    dragIng,
    onStart,
    onMove,
    onEnd
  } = ReactCanvas2dExtensions.useEventDrag({
    enable: true,
    onChange: onChange
  });
  React.useEffect(() => {
    if (dragIng === false) {
      if (moveX < limitMinX) {
        setMoveX(i => limitMinX - moveX < 1 ? limitMinX : i + (limitMinX - moveX) / 2);
      }
      if (moveX > limitMaxX) {
        setMoveX(i => moveX - limitMaxX < 1 ? limitMaxX : i - (moveX - limitMaxX) / 2);
      }
      if (moveY < limitMinY) {
        setMoveY(i => limitMinY - moveY < 1 ? limitMinY : i + (limitMinY - moveY) / 2);
      }
      if (moveY > limitMaxY) {
        setMoveY(i => moveY - limitMaxY < 1 ? limitMaxY : i - (moveY - limitMaxY) / 2);
      }
    }
  }, [dragIng, moveX, moveY]);
  const setLimitX = value => limitX.current = value;
  const setLimitY = value => limitY.current = value;
  return {
    moveIng,
    moveX,
    moveY,
    onStart,
    onMove,
    onEnd,
    setLimitX,
    setLimitY
  };
};
/* harmony default export */ const Hook_UseEventScroll = ((/* unused pure expression or super */ null && (useEventScroll)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/Hook.useLoadImage.js

const useLoadImage = props => {
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
/* harmony default export */ const Hook_useLoadImage = ((/* unused pure expression or super */ null && (useLoadImage)));
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
/* harmony default export */ const Hook_UseLocationProperty = ((/* unused pure expression or super */ null && (useLocationProperty)));
;// CONCATENATED MODULE: ./package/ReactCanvas2dExtensions/index.js

















;// CONCATENATED MODULE: ./package/index.js





const Canvas2dModule = {
  Event: Module_Event,
  Graph: Module_Graph,
  Location: Module_Location,
  Tag: Module_Tag
};

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});